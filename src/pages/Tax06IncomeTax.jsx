import { useState, useCallback } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";
const USD_KHR = 4085;

// ── BRACKETS — Individual / Partnership (KHR annual) ──────────
const BRACKETS = [
  { min: 0,          max: 18_000_000,  rate: 0,  offset: 0,          label: "0 – 18,000,000 ៛" },
  { min: 18_000_001, max: 24_000_000,  rate: 5,  offset: 900_000,    label: "18,000,001 – 24,000,000 ៛" },
  { min: 24_000_001, max: 102_000_000, rate: 10, offset: 2_100_000,  label: "24,000,001 – 102,000,000 ៛" },
  { min: 102_000_001,max: 150_000_000, rate: 15, offset: 7_200_000,  label: "102,000,001 – 150,000,000 ៛" },
  { min: 150_000_001,max: Infinity,    rate: 20, offset: 14_200_000, label: "150,000,001+ ៛" },
];

// ── DEPRECIATION CLASS TABLE ──────────────────────────────────
const DEPRE_CLASSES = [
  { cls: "1", label: "ថ្នាក់ទី 1", desc: "អគារ និងសំណង់",                         method: "Straight-Line",    rate: 5  },
  { cls: "2", label: "ថ្នាក់ទី 2", desc: "កុំព្យូទ័រ / IT / Software",              method: "Declining Balance", rate: 50 },
  { cls: "3", label: "ថ្នាក់ទី 3", desc: "យានយន្ត / គ្រឿងម៉ាស៊ីន / ការិយាល័យ",  method: "Declining Balance", rate: 25 },
  { cls: "4", label: "ថ្នាក់ទី 4", desc: "ទ្រព្យសកម្មផ្សេងទៀតទាំងអស់",            method: "Declining Balance", rate: 20 },
];

function fmt(v, dec = 0) {
  if (v == null || isNaN(v)) return "—";
  return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function fKHR(v) { return "៛" + fmt(Math.round(v)); }
function fUSD(v) { return "$" + fmt(v, 2); }
function fmtKHR(v) { return Math.round(v).toLocaleString("en-US") + " ៛"; }
function n(v) { return parseFloat((v + "").replace(/,/g, "")) || 0; }

function getBracket(income) {
  for (const b of BRACKETS) if (income <= b.max) return b;
  return BRACKETS[BRACKETS.length - 1];
}

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "ពន្ធលើប្រាក់ចំណូល — CIT (Corporate / Individual Income Tax)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធលើប្រាក់ចំណូល = ពន្ធប្រចាំឆ្នាំ
ប្រកាស/បង់: 1 មករា – 31 មីនា (ឆ្នាំជាប់ពន្ធបន្ទាប់)
• និវាសនជន: ចំណូលប្រភពកម្ពុជា + បរទេស
• អនិវាសនជន: ចំណូលប្រភពកម្ពុជាតែប៉ុណ្ណោះ
• និវាសនជន: ≥ 182 ថ្ងៃ ក្នុង 12 ខែ
• ចំណូលជាប់ពន្ធ = ចំណូលដុល − ចំណាយអនុញ្ញាត
យោង: ប្រកាស 1059 · ប្រកាស 779 · អនុក្រឹត្យ 48 (2024)`,
  },
  {
    term: "អ្នកជាប់ពន្ធ + អត្រា (Taxpayer Types & Rates)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `① នីតិបុគ្គល (ក្រុមហ៊ុន / SARL / Branch) → 20%
② ឯកបុគ្គល + ក្រុមហ៊ុនសហ → 0–20% (Progressive)
③ ធានារ៉ាប់រងទ្រព្យ/ហានិភ័យ → 5% (បុព្វលាភ)
④ ធានារ៉ាប់រងអាយុ/សន្សំ + ផ្សេង → 20%
⑤ ប្រេង/ឧស្ម័ន + ធនធានធម្មជាតិ → 30%
⑥ គ.ល.គ. (QIP) ក្នុងរយៈពេលលើកលែង → 0%`,
  },
  {
    term: "ពន្ធអប្បបរមា + ប្រាក់រំដោះ CIT",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ពន្ធអប្បបរមា (MOP) = 1% × ផលរបរ (incl. taxes, excl. VAT)
→ អនុវត្ត ករណី CIT < MOP / មិនកាន់គណនេយ្យ
→ ជំនួស CIT ក្នុងករណីទាំងនោះ

ប្រាក់រំដោះ CIT (Prepayment):
• 1% × ផលរបរ (excl. VAT) ខែមុន
• បង់ ≤ ថ្ងៃទី 20 ប្រចាំខែ
• ដក់ពី CIT ចុងក្រោយ នៅពេលទូទាត់`,
  },
  {
    term: "ចំណូលលើកលែង + ចំណាយ អ/មិនអនុញ្ញាត",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `ចំណូលលើកលែង:
✓ ចំណូលរដ្ឋ / ស្ថាប័នរដ្ឋ
✓ អង្គការ: សាសនា · សប្បុរស · វិទ្យាសាស្ត្រ · អប់រំ
✓ ភាគលាភពី QIP (បានបង់ CIT រួច)

ចំណាយ អនុញ្ញាត ✓:
ទាក់ទងអាជីវកម្ម + មានភស្តុតាង + កត់ត្រា

ចំណាយ មិនអនុញ្ញាត ✗:
ផ្ទាល់ខ្លួន · គ្មានវិក្កយបត្រ · ពន្ធ CIT · VAT
ការប្រាក់លើស · ការកម្សាន្ត · អំណោយ {">"} 5%`,
  },
  {
    term: "រំលស់ទ្រព្យសកម្ម (Asset Depreciation)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ថ្នាក់ 1: អគារ/សំណង់ → 5% Straight-Line
ថ្នាក់ 2: IT / Software → 50% Declining
ថ្នាក់ 3: យានយន្ត / ម៉ាស៊ីន → 25% Declining
ថ្នាក់ 4: ទ្រព្យសកម្មផ្សេង → 20% Declining

Declining Base = Opening + Additions − Disposals
Straight-Line: Cost × Rate (annually, evenly)
ខាតអាចដកក្នុង 5 ឆ្នាំបន្ទាប់ (Loss Carry-Forward)`,
  },
];

// ── SHARED STYLES ─────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", padding: "24px 16px", fontFamily: FONT },
  wrap: { width: "100%", maxWidth: 1200, margin: "0 auto" },
  topBar: { display: "flex", justifyContent: "flex-start", marginBottom: 16 },
  backBtn: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", color: "#334155", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT },
  header: { background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", borderRadius: 20, padding: "24px 30px", marginBottom: 24, boxShadow: "0 10px 25px rgba(37,99,235,.1)" },
  h1: { fontSize: 24, lineHeight: 1.35, fontWeight: 800, marginBottom: 8, fontFamily: FONT },
  hSub: { fontSize: 14, lineHeight: 1.7, opacity: 0.9, fontFamily: FONT },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 },
  infoCard: { background: "#FFFFFF", borderRadius: 16, padding: "16px 18px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,.04)" },
  infoCardInner: { display: "flex", alignItems: "flex-start", gap: 12 },
  infoCardDot: { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
  infoCardBody: { flex: 1 },
  infoCardTitle: { fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 4, fontFamily: FONT },
  infoCardValue: { fontSize: 15, fontWeight: 800, color: "#0B1F4E", fontFamily: FONT, lineHeight: 1.4 },
  infoCardNote: { fontSize: 11, color: "#64748B", marginTop: 3, fontFamily: FONT, lineHeight: 1.5 },
  tabRow: { display: "flex", justifyContent: "flex-start", gap: 10, marginBottom: 24, flexWrap: "wrap" },
  tab: { padding: "12px 20px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#64748B", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: FONT },
  tabOn: { padding: "12px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#FFFFFF", cursor: "pointer", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 12px rgba(37,99,235,.2)", fontFamily: FONT },
  card: { background: "#FFFFFF", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,.04)" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 16, fontFamily: FONT },
  row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 },
  row3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteGreen: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 14, color: "#166534", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteWarn: { background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 14, color: "#92400E", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteRed: { background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 14, color: "#991B1B", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 18, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 11, color: "#64748B", marginBottom: 6, fontFamily: FONT },
  mSub: { fontSize: 11, color: "#94A3B8", marginTop: 4, fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "10px 12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedTotalGreen: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  stepRow: { display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 13, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  divider: { height: 1, background: "#E2E8F0", margin: "16px 0" },
  badge: { display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: FONT },
};

const INFO_CARDS = [
  { icon: "🏢", bg: "#EFF6FF", title: "CIT — នីតិបុគ្គល",      value: "20%",            note: "ក្រុមហ៊ុន / SARL / Branch" },
  { icon: "👤", bg: "#F0FDF4", title: "ឯកបុគ្គល / ក្រុមហ៊ុនសហ", value: "0% – 20%",      note: "Progressive (5 ថ្នាក់)" },
  { icon: "⛽", bg: "#FEF2F2", title: "ប្រេង · រ៉ែ · ព្រៃឈើ",   value: "30%",            note: "ធនធានធម្មជាតិ" },
  { icon: "📅", bg: "#FFFBEB", title: "ថ្ងៃប្រកាស/បង់",          value: "1 មករា–31 មីនា", note: "ឆ្នាំជាប់ពន្ធបន្ទាប់" },
  { icon: "💰", bg: "#FAF5FF", title: "ពន្ធអប្បបរមា (MOP)",      value: "1% × ផលរបរ",    note: "excl. VAT" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — ពន្ធលើប្រាក់ចំណូល (CIT)</span>
        <span style={{ fontSize: 18, color: "#64748B", display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {DEFS.map((d, i) => (
            <div key={i} style={{ borderRadius: 16, padding: "16px 18px", background: d.bg, border: `1px solid ${d.border}`, lineHeight: 1.7, fontFamily: FONT }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: d.color, marginBottom: 8, fontFamily: FONT }}>{d.term}</div>
              <div style={{ fontSize: 12.5, whiteSpace: "pre-line", color: d.color + "BB", fontFamily: FONT }}>{d.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 1 — INDIVIDUAL / PARTNERSHIP (Progressive)
// ══════════════════════════════════════════════════════════════
function IndividualTab() {
  const [currency,  setCurrency]  = useState("KHR");
  const [income,    setIncome]    = useState("");
  const [withhold,  setWithhold]  = useState("");
  const [prepaid,   setPrepaid]   = useState("");
  const [result,    setResult]    = useState(null);

  const calc = useCallback(() => {
    let p = n(income);
    if (currency === "USD") p *= USD_KHR;
    const b = getBracket(p);
    const tax = Math.max(0, p * (b.rate / 100) - b.offset);
    const wh = n(withhold); const pp = n(prepaid);
    const net = tax - wh - pp;
    setResult({ p, pUSD: p / USD_KHR, tax, b, wh, pp, net, netUSD: net / USD_KHR });
  }, [income, currency, withhold, prepaid]);

  const OFFSET_LABELS = ["0", "900,000", "2,100,000", "7,200,000", "14,200,000"];

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានប្រាក់ចំណូល — ឯកបុគ្គល / ម្ចាស់អាជីវកម្ម</div>
        <div style={S.row3}>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ចំណូលជាប់ពន្ធប្រចាំឆ្នាំ</label>
            <input style={S.input} placeholder="ឧ: 140000000" value={income} onChange={e => { setIncome(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="KHR">រៀល (KHR)</option>
              <option value="USD">ដុល្លារ (USD)</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>− ឥណទានពន្ធកាត់ទុក (KHR)</label>
            <input style={S.input} placeholder="0" value={withhold} onChange={e => { setWithhold(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>− ពន្ធបង់មុន / ប្រាក់រំដោះ CIT (KHR)</label>
          <input style={S.input} placeholder="0" value={prepaid} onChange={e => { setPrepaid(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • Progressive 5 ថ្នាក់: 0% / 5% / 10% / 15% / 20%<br />
          • រូបមន្ត: P × Rate% − Offset | ឧ: 140,000,000 × 15% − 7,200,000 = 13,800,000 ៛<br />
          • អត្រាប្រែប្រាក់: 1 USD = {USD_KHR} ៛
        </div>
      </div>
      <button style={S.btn} onClick={calc}>គណនា CIT (Individual)</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ចំណូលជាប់ពន្ធ</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1D4ED8", fontFamily: FONT }}>{fKHR(result.p)}</div>
              <div style={S.mSub}>{fUSD(result.pUSD)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ថ្នាក់ + អត្រា</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#D97706", fontFamily: FONT }}>{result.b.rate}%</div>
              <div style={S.mSub}>{result.b.label}</div>
            </div>
            <div style={{ ...S.metric, border: "2px solid #BFDBFE", background: "#EFF6FF" }}>
              <div style={S.mLabel}>ពន្ធ CIT ត្រូវបង់</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: result.net > 0 ? "#2563EB" : "#166534", fontFamily: FONT }}>{fKHR(Math.max(0, result.net))}</div>
              <div style={S.mSub}>{fUSD(Math.max(0, result.netUSD))}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>ជំហានគណនា</div>
            {[
              ["ប្រាក់ចំណូលជាប់ពន្ធ (P)", fKHR(result.p), "#475569"],
              [`P × ${result.b.rate}% − ${OFFSET_LABELS[BRACKETS.indexOf(result.b)]} = ពន្ធ CIT`, fKHR(result.tax), "#2563EB"],
              result.wh > 0 ? ["− ឥណទានពន្ធកាត់ទុក", "− " + fKHR(result.wh), "#c0392b"] : null,
              result.pp > 0 ? ["− ប្រាក់រំដោះ CIT / ពន្ធបង់មុន", "− " + fKHR(result.pp), "#c0392b"] : null,
              ["= ពន្ធ CIT ត្រូវបង់", result.net > 0 ? fKHR(result.net) : "ត្រូវវិល " + fKHR(-result.net), result.net > 0 ? "#2563EB" : "#166534"],
            ].filter(Boolean).map(([lbl, val, color], i) => (
              <div key={i} style={S.stepRow}>
                <span style={{ color: "#475569", fontFamily: FONT }}>{lbl}</span>
                <span style={{ color, fontWeight: 700, fontFamily: FONT }}>{val}</span>
              </div>
            ))}
            <div style={S.note}>
              ប្រកាស/បង់: 1 មករា – 31 មីនា (ឆ្នាំជាប់ពន្ធបន្ទាប់)
            </div>
          </div>

          {/* Bracket reference table */}
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងថ្នាក់ Progressive (ឯកបុគ្គល)</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>ចំណូលជាប់ពន្ធ (KHR)</th><th style={S.th}>អត្រា</th><th style={S.th}>រូបមន្ត</th></tr></thead>
              <tbody>
                {BRACKETS.map((b, i) => (
                  <tr key={i} style={{ background: result.b === b ? "#EFF6FF" : "transparent" }}>
                    <td style={{ ...S.td, fontWeight: result.b === b ? 700 : 400 }}>{b.label}</td>
                    <td style={{ ...S.td, fontWeight: 700, color: result.b === b ? "#2563EB" : "#475569" }}>{b.rate}%</td>
                    <td style={{ ...S.td, color: "#64748B", fontSize: 12 }}>P × {b.rate}% − {OFFSET_LABELS[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — LEGAL ENTITY (flat rate)
// ══════════════════════════════════════════════════════════════
function LegalEntityTab() {
  const [entityType,        setEntityType]        = useState("company");
  const [accountingProfit,  setAccountingProfit]  = useState("");
  const [nonDeductibleExp,  setNonDeductibleExp]  = useState("");
  const [taxableNotBooked,  setTaxableNotBooked]  = useState("");
  const [deductibleNotBooked,setDeductibleNotBooked] = useState("");
  const [priorLoss,         setPriorLoss]         = useState("");
  const [annualRevenue,     setAnnualRevenue]     = useState("");
  const [foreignTaxCredit,  setForeignTaxCredit]  = useState("");
  const [withholdingCredit, setWithholdingCredit] = useState("");
  const [prepayments,       setPrepayments]       = useState("");
  const [priorCITCredit,    setPriorCITCredit]    = useState("");
  const [result,            setResult]            = useState(null);

  const RATES = { company: 0.20, petroleum: 0.30, insurance5: 0.05, qualified: 0.00 };
  const RATE_LABELS = { company: "20%", petroleum: "30%", insurance5: "5%", qualified: "0%" };

  const calc = useCallback(() => {
    const ap   = n(accountingProfit);
    const nde  = n(nonDeductibleExp);
    const tnb  = n(taxableNotBooked);
    const dnb  = n(deductibleNotBooked);
    const pl   = n(priorLoss);
    const rev  = n(annualRevenue);
    const ftc  = n(foreignTaxCredit);
    const wc   = n(withholdingCredit);
    const pp   = n(prepayments);
    const pcit = n(priorCITCredit);
    const r    = RATES[entityType];

    const afterAdj      = ap + nde + tnb - dnb;
    const periodProfit  = afterAdj;
    const taxableIncome = Math.max(0, periodProfit - pl);
    const citGross      = taxableIncome * r;
    const citNet        = Math.max(0, citGross - ftc - wc);
    const minTax        = rev * 0.01;
    const citPayable    = Math.max(citNet, minTax);
    const citDue        = citPayable - pp - pcit;
    const usedMOP       = minTax > citGross;

    setResult({ ap, nde, tnb, dnb, afterAdj, periodProfit, pl, taxableIncome, citGross, ftc, wc, citNet, minTax, rev, citPayable, pp, pcit, citDue, r, usedMOP, entityType });
  }, [accountingProfit, nonDeductibleExp, taxableNotBooked, deductibleNotBooked, priorLoss, annualRevenue, foreignTaxCredit, withholdingCredit, prepayments, priorCITCredit, entityType]);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទអ្នកជាប់ពន្ធ + ទិន្នន័យហិរញ្ញវត្ថុ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទ</label>
            <select style={S.select} value={entityType} onChange={e => { setEntityType(e.target.value); setResult(null); }}>
              <option value="company">នីតិបុគ្គលនិវាសជន (ក្រុមហ៊ុន) — 20%</option>
              <option value="petroleum">ប្រេងកាត / រ៉ែ / ធនធានធម្មជាតិ — 30%</option>
              <option value="insurance5">ធានារ៉ាប់រង (ទ្រព្យ/ហានិភ័យ) — 5%</option>
              <option value="qualified">គ.ល.គ. QIP (ក្នុងរយៈពេលលើកលែង) — 0%</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ចំណេញ/(ខាត) មុននិយ័តកម្ម (គណនេយ្យ) ៛</label>
            <input style={S.input} type="number" placeholder="ឧ: 50000000" value={accountingProfit} onChange={e => { setAccountingProfit(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.cardTitle}>Tax Reconciliation (និយ័តកម្ម)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>+ ចំណាយមិនអនុញ្ញាតឱ្យដក ៛</label>
            <input style={S.input} type="number" placeholder="0" value={nonDeductibleExp} onChange={e => { setNonDeductibleExp(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>+ ចំណូលជាប់ពន្ធ (មិនទាន់កត់ត្រា) ៛</label>
            <input style={S.input} type="number" placeholder="0" value={taxableNotBooked} onChange={e => { setTaxableNotBooked(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>− ចំណាយអនុញ្ញាត (មិនទាន់កត់ត្រា) ៛</label>
            <input style={S.input} type="number" placeholder="0" value={deductibleNotBooked} onChange={e => { setDeductibleNotBooked(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>− ខាតអនុញ្ញាតពីឆ្នាំមុន ៛</label>
            <input style={S.input} type="number" placeholder="0" value={priorLoss} onChange={e => { setPriorLoss(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.cardTitle}>ឥណទាន / ពន្ធអប្បបរមា / ប្រាក់រំដោះ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ផលរបរប្រចាំឆ្នាំ (excl. VAT) ៛ — MOP Base</label>
            <input style={S.input} type="number" placeholder="ឧ: 500000000" value={annualRevenue} onChange={e => { setAnnualRevenue(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>− ឥណទានពន្ធបរទេស ៛</label>
            <input style={S.input} type="number" placeholder="0" value={foreignTaxCredit} onChange={e => { setForeignTaxCredit(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>− ឥណទានពន្ធកាត់ទុក (Withholding) ៛</label>
            <input style={S.input} type="number" placeholder="0" value={withholdingCredit} onChange={e => { setWithholdingCredit(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>− ប្រាក់រំដោះ CIT (Prepayments) ៛</label>
            <input style={S.input} type="number" placeholder="0" value={prepayments} onChange={e => { setPrepayments(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>− ឥណទាន CIT ពីឆ្នាំមុន ៛</label>
            <input style={S.input} type="number" placeholder="0" value={priorCITCredit} onChange={e => { setPriorCITCredit(e.target.value); setResult(null); }} />
          </div>
        </div>
      </div>
      <button style={S.btn} onClick={calc}>គណនា CIT ({RATE_LABELS[entityType]})</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ចំណូលជាប់ពន្ធ</div><div style={{ fontSize: 13, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmtKHR(result.taxableIncome)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>CIT ({(result.r*100).toFixed(0)}%)</div><div style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmtKHR(result.citGross)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>MOP (1%)</div><div style={{ fontSize: 13, fontWeight: 700, color: "#f97316", fontFamily: FONT }}>{fmtKHR(result.minTax)}</div></div>
            <div style={{ ...S.metric, border: "2px solid #BFDBFE", background: "#EFF6FF" }}>
              <div style={S.mLabel}>CIT ចុងក្រោយត្រូវបង់</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmtKHR(Math.max(0, result.citDue))}</div>
              <div style={S.mSub}>{result.usedMOP ? "⚠ MOP ខ្ពស់ជាង CIT" : "CIT ធម្មតា"}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>Tax Reconciliation — ការគណនា CIT (ទម្រង់ GDT)</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={{ ...S.th, textAlign: "right" }}>ទឹកប្រាក់ (៛)</th></tr></thead>
              <tbody>
                {[
                  ["ប្រាក់ចំណេញ/(ខាត) មុននិយ័តកម្ម", result.ap, "#475569", false],
                  ["+ ចំណាយមិនអនុញ្ញាតឱ្យដក", result.nde, "#c0392b", false],
                  ["+ ចំណូលជាប់ពន្ធ (មិនទាន់កត់ត្រា)", result.tnb, "#c0392b", false],
                  ["− ចំណាយអនុញ្ញាត (មិនទាន់កត់ត្រា)", -result.dnb, "#166534", false],
                  ["ចំណូលសុទ្ធ/(ខាត) ក្រោយនិយ័តកម្ម", result.afterAdj, "#2563EB", true],
                  ["− ខាតអនុញ្ញាតពីឆ្នាំមុន", -result.pl, "#166534", false],
                  ["ចំណូល/(ខាត) ជាប់ពន្ធ", result.taxableIncome, "#2563EB", true],
                  [`ពន្ធ CIT (${(result.r*100).toFixed(0)}%)`, result.citGross, "#2563EB", false],
                  ["− ឥណទានពន្ធបរទេស", -result.ftc, "#166534", false],
                  ["− ឥណទានពន្ធកាត់ទុក", -result.wc, "#166534", false],
                  ["បំណុលពន្ធ CIT", result.citNet, "#2563EB", true],
                  ["ពន្ធអប្បបរមា MOP (1%)", result.minTax, "#f97316", false],
                  ["បំណុលពន្ធ CIT ត្រូវបង់ = max(CIT, MOP)", result.citPayable, "#c0392b", true],
                  ["− ប្រាក់រំដោះ CIT (Prepayments)", -result.pp, "#166534", false],
                  ["− ឥណទាន CIT ពីឆ្នាំមុន", -result.pcit, "#166534", false],
                ].map(([lbl, val, color, bold], i) => (
                  <tr key={i} style={{ background: bold ? "#F8FAFC" : "transparent" }}>
                    <td style={{ ...S.td, fontWeight: bold ? 700 : 400 }}>{lbl}</td>
                    <td style={{ ...S.td, color, fontWeight: bold ? 700 : 500, textAlign: "right" }}>{val !== 0 || bold ? fmtKHR(val) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={result.citDue >= 0 ? S.dedTotal : S.dedTotalGreen}>
              <span>{result.citDue >= 0 ? "CIT ចុងក្រោយត្រូវបង់" : "ឥណទាន CIT (យោងឆ្នាំបន្ទាប់)"}</span>
              <span>{fmtKHR(Math.abs(result.citDue))}</span>
            </div>
            {result.usedMOP && <div style={S.noteWarn}>⚠ MOP ({fmtKHR(result.minTax)}) ខ្ពស់ជាង CIT ({fmtKHR(result.citGross)}) — ត្រូវបង់តាម MOP</div>}
            <div style={S.note}>
              ប្រកាស/បង់: <strong>1 មករា – 31 មីនា</strong> | ប្រាក់រំដោះ: ≤ <strong>ថ្ងៃទី 20</strong> ប្រចាំខែ
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — DEPRECIATION
// ══════════════════════════════════════════════════════════════
function DepreciationTab() {
  const [cls,       setCls]       = useState("2");
  const [costV,     setCostV]     = useState("");
  const [opening,   setOpening]   = useState("");
  const [additions, setAdditions] = useState("");
  const [disposals, setDisposals] = useState("");
  const [years,     setYears]     = useState("5");
  const [result,    setResult]    = useState(null);

  const RATE_MAP = { "1": 5, "2": 50, "3": 25, "4": 20 };

  const calc = useCallback(() => {
    const rate = RATE_MAP[cls] / 100;
    const cv   = n(costV);
    const ob   = n(opening);
    const add  = n(additions);
    const dis  = n(disposals);
    const yrs  = Math.min(parseInt(years) || 5, 30);

    let schedule = [];
    if (cls === "1") {
      // Straight-Line
      const dep = cv * rate;
      let bv = cv;
      for (let y = 1; y <= yrs && bv > 0.01; y++) {
        const d = Math.min(dep, bv);
        bv = Math.max(0, bv - d);
        schedule.push({ year: y, dep: d, bv });
      }
      setResult({ method: "Straight-Line", rate: RATE_MAP[cls], schedule, base: cv, isSL: true });
    } else {
      // Declining Balance
      const base = cv > 0 ? cv : ob + add - dis;
      let bv = base;
      for (let y = 1; y <= yrs && bv > 0.01; y++) {
        const d = bv * rate;
        bv -= d;
        schedule.push({ year: y, dep: d, bv });
      }
      setResult({ method: "Declining Balance", rate: RATE_MAP[cls], schedule, base, yearDep: base * rate, yearClose: base - base * rate, isSL: false });
    }
  }, [cls, costV, opening, additions, disposals, years]);

  const dc = DEPRE_CLASSES.find(d => d.cls === cls);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ការគណនារំលស់ទ្រព្យសកម្ម</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ថ្នាក់ទ្រព្យសកម្ម</label>
            <select style={S.select} value={cls} onChange={e => { setCls(e.target.value); setResult(null); }}>
              {DEPRE_CLASSES.map(d => (
                <option key={d.cls} value={d.cls}>{d.label} — {d.desc} ({d.rate}% {d.method === "Straight-Line" ? "SL" : "DB"})</option>
              ))}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃដើម (Cost) ៛</label>
            <input style={S.input} type="number" placeholder="ឧ: 100000000" value={costV} onChange={e => { setCostV(e.target.value); setResult(null); }} />
          </div>
        </div>
        {cls !== "1" && (
          <div style={S.row3}>
            <div style={S.field}>
              <label style={S.label}>តម្លៃសេសសល់ដើមឆ្នាំ (Opening) ៛</label>
              <input style={S.input} type="number" placeholder="0" value={opening} onChange={e => { setOpening(e.target.value); setResult(null); }} />
            </div>
            <div style={S.field}>
              <label style={S.label}>+ ការទិញបន្ថែម (Additions) ៛</label>
              <input style={S.input} type="number" placeholder="0" value={additions} onChange={e => { setAdditions(e.target.value); setResult(null); }} />
            </div>
            <div style={S.field}>
              <label style={S.label}>− ការលក់/ដក (Disposals) ៛</label>
              <input style={S.input} type="number" placeholder="0" value={disposals} onChange={e => { setDisposals(e.target.value); setResult(null); }} />
            </div>
          </div>
        )}
        <div style={S.field}>
          <label style={S.label}>ចំនួនឆ្នាំគណនា</label>
          <input style={S.input} type="number" min="1" max="30" placeholder="5" value={years} onChange={e => { setYears(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • <strong>ថ្នាក់ {cls} ({dc?.rate}% {dc?.method}):</strong> {dc?.desc}<br />
          {cls === "1"
            ? "• Straight-Line: Cost × Rate% (ប្រចាំឆ្នាំ ស្មើៗគ្នា)"
            : "• Declining Balance = (Opening + Additions − Disposals) × Rate%"}
        </div>
      </div>
      <button style={S.btn} onClick={calc}>គណនារំលស់ទ្រព្យសកម្ម</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>វិធីសាស្ត្រ</div><div style={{ fontSize: 13, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.method}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អត្រារំលស់</div><div style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{result.rate}%</div></div>
            <div style={S.metric}><div style={S.mLabel}>មូលដ្ឋានគណនា</div><div style={{ fontSize: 13, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmtKHR(result.base)}</div></div>
            {!result.isSL && <div style={S.metric}><div style={S.mLabel}>រំលស់ឆ្នាំទី 1</div><div style={{ fontSize: 13, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmtKHR(result.yearDep)}</div></div>}
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងរំលស់ប្រចាំឆ្នាំ</div>
            <div style={{ overflowX: "auto" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <th style={S.th}>ឆ្នាំ</th>
                    <th style={S.th}>តម្លៃរំលស់ (Depreciation)</th>
                    <th style={S.th}>តម្លៃសៀវភៅ (Book Value)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((r, i) => (
                    <tr key={i}>
                      <td style={S.td}>ឆ្នាំទី {r.year}</td>
                      <td style={{ ...S.td, color: "#c0392b", fontWeight: 600 }}>{fmtKHR(r.dep)}</td>
                      <td style={{ ...S.td, color: r.bv < 1 ? "#94A3B8" : "#0B1F4E" }}>{fmtKHR(r.bv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Class reference table */}
      <div style={S.card}>
        <div style={S.cardTitle}>តារាងថ្នាក់ទ្រព្យសកម្ម — ឯកសារយោង</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>ថ្នាក់</th><th style={S.th}>ប្រភេទទ្រព្យ</th><th style={S.th}>វិធីសាស្ត្រ</th><th style={S.th}>អត្រា</th></tr></thead>
          <tbody>
            {DEPRE_CLASSES.map((d, i) => (
              <tr key={i} style={{ background: d.cls === cls ? "#EFF6FF" : "transparent" }}>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{d.label}</td>
                <td style={S.td}>{d.desc}</td>
                <td style={{ ...S.td, color: "#64748B" }}>{d.method}</td>
                <td style={{ ...S.td, fontWeight: 700, color: "#c0392b" }}>{d.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={S.note}>
          • Declining Balance Base = Opening + Additions − Disposals<br />
          • ខាតអាចដក (Carry-Forward) បន្ត <strong>5 ឆ្នាំ</strong> ក្នុងករណីទូទៅ
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — RATE REFERENCE + EXAMPLES
// ══════════════════════════════════════════════════════════════
function ReferenceTab() {
  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>តារាងអត្រាពន្ធ CIT — ឯកសារយោង</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>ប្រភេទអ្នកជាប់ពន្ធ</th><th style={S.th}>អត្រា</th><th style={S.th}>កំណត់ចំណាំ</th></tr></thead>
          <tbody>
            {[
              ["នីតិបុគ្គលនិវាសជន (ក្រុមហ៊ុន / SARL)", "20%", "អត្រាថេរ"],
              ["សកម្មភាពប្រេងកាត · ឧស្ម័ន · រ៉ែ · មាស · ព្រៃឈើ", "30%", "ធនធានធម្មជាតិ"],
              ["QIP (គ.ល.គ.) ក្នុងអំឡុងពេលលើកលែង (CDC)", "0%", "ក្រោម CDC"],
              ["ឯកបុគ្គល / ក្រុមហ៊ុនសហ", "0–20%", "Progressive 5 ថ្នាក់"],
              ["ធានារ៉ាប់រង — ទ្រព្យ/ហានិភ័យ", "5%", "5% នៃបុព្វលាភដុល"],
              ["ធានារ៉ាប់រង — អាយុ/សន្សំ + ផ្សេង", "20%", ""],
            ].map(([t, r, note], i) => (
              <tr key={i}>
                <td style={S.td}>{t}</td>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{r}</td>
                <td style={{ ...S.td, color: "#64748B", fontSize: 12 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>ថ្នាក់ Progressive — ឯកបុគ្គល / ក្រុមហ៊ុនសហ</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>#</th><th style={S.th}>ចំណូល (KHR/ឆ្នាំ)</th><th style={S.th}>អត្រា</th><th style={S.th}>រូបមន្ត</th></tr></thead>
          <tbody>
            {BRACKETS.map((b, i) => {
              const offsets = ["0", "900,000", "2,100,000", "7,200,000", "14,200,000"];
              return (
                <tr key={i}>
                  <td style={{ ...S.td, fontWeight: 700, color: "#2563EB", width: 30 }}>{i + 1}</td>
                  <td style={S.td}>{b.label}</td>
                  <td style={{ ...S.td, fontWeight: 700, color: b.rate > 0 ? "#c0392b" : "#166534" }}>{b.rate}%</td>
                  <td style={{ ...S.td, color: "#64748B", fontSize: 12 }}>P × {b.rate}% − {offsets[i]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>ចំណូលលើកលែងពន្ធ + ចំណាយមិនអនុញ្ញាត</div>
        <div style={S.row2}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#166534", marginBottom: 8, fontFamily: FONT }}>✅ ចំណូលលើកលែង</div>
            {["ចំណូលរដ្ឋ / ស្ថាប័នរដ្ឋ", "អង្គការ: សាសនា · សប្បុរស · វិទ្យាសាស្ត្រ · អប់រំ (មិនស្វែងប្រាក់)", "ភាគលាភពី QIP (បានបង់ CIT រួចហើយ)", "ចំណូលដែលបានជាប់ WHT ចុងក្រោយ"].map((item, i) => (
              <div key={i} style={{ ...S.noteGreen, marginTop: 6 }}>✓ {item}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#991B1B", marginBottom: 8, fontFamily: FONT }}>🚫 ចំណាយមិនអនុញ្ញាត</div>
            {["ចំណាយផ្ទាល់ខ្លួន / គ្រួសារ", "ប្រាក់បៀវត្ស/ប្រាក់ក្រៅ ដល់ម្ចាស់ឯកបុគ្គល", "ពន្ធ CIT + VAT ថ្លៃជាចំណាយ", "ការប្រាក់លើស + ការកម្សាន្ត", "អំណោយ/សប្បុរស {">"} 5% នៃចំណូលជាប់ពន្ធ", "ចំណាយគ្មានវិក្កយបត្រ / ភស្តុតាង"].map((item, i) => (
              <div key={i} style={{ ...S.noteRed, marginTop: 6 }}>✗ {item}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>💡 ឧទាហរណ៍គំរូ</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {[
            {
              title: "ឧទាហរណ៍ 1 — ឯកបុគ្គល (KHR)",
              rows: [["ចំណូលជាប់ពន្ធ", "140,000,000 ៛"], ["ថ្នាក់ ({"<"} 150 លាន ៛)", "15%"], ["ពន្ធ = 140M × 15% − 7,200,000", "= 13,800,000 ៛"]],
            },
            {
              title: "ឧទាហរណ៍ 2 — ឯកបុគ្គល (USD)",
              rows: [["ចំណូល", "$40,000"], ["បំប្លែង: 40,000 × 4,085", "= 163,400,000 ៛"], ["ថ្នាក់ ({">"} 150 លាន ៛)", "20%"], ["ពន្ធ = 163.4M × 20% − 14.2M", "= 18,480,000 ៛ ≈ $4,524"]],
            },
            {
              title: "ឧទាហរណ៍ 3 — ក្រុមហ៊ុន (USD)",
              rows: [["ចំណេញគណនេយ្យ", "$150,000"], ["+ ចំណាយមិនអនុញ្ញាត", "$15,000"], ["ចំណូលជាប់ពន្ធ", "$165,000"], ["CIT (20%)", "$33,000"]],
            },
          ].map((ex, i) => (
            <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1E40AF", marginBottom: 8, fontFamily: FONT }}>{ex.title}</div>
              {ex.rows.map(([lbl, val], j) => (
                <div key={j} style={S.stepRow}>
                  <span style={{ color: "#475569", fontFamily: FONT }}>{lbl}</span>
                  <span style={{ color: "#0F172A", fontWeight: 700, fontFamily: FONT }}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function CITPage({ setPage }) {
  const [tab, setTab] = useState("individual");
  const TABS = [
    { id: "individual",   label: "👤 ឯកបុគ្គល (0–20%)" },
    { id: "entity",       label: "🏢 នីតិបុគ្គល (20%)" },
    { id: "depreciation", label: "📉 រំលស់ទ្រព្យ" },
    { id: "reference",    label: "📋 តារាងយោង" },
  ];
  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>
        <div style={S.header}>
          <div style={S.h1}>ពន្ធលើប្រាក់ចំណូល</div>
          <div style={S.hSub}> </div>
        </div>
        <div style={S.infoGrid}>
          {INFO_CARDS.map((c, i) => (
            <div key={i} style={S.infoCard}>
              <div style={S.infoCardInner}>
                <div style={{ ...S.infoCardDot, background: c.bg }}>{c.icon}</div>
                <div style={S.infoCardBody}>
                  <div style={S.infoCardTitle}>{c.title}</div>
                  <div style={S.infoCardValue}>{c.value}</div>
                  <div style={S.infoCardNote}>{c.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DefSection />
        <div style={S.tabRow}>
          {TABS.map(t => (
            <button key={t.id} style={tab === t.id ? S.tabOn : S.tab} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        {tab === "individual"   && <IndividualTab />}
        {tab === "entity"       && <LegalEntityTab />}
        {tab === "depreciation" && <DepreciationTab />}
        {tab === "reference"    && <ReferenceTab />}
      </div>
    </div>
  );
}