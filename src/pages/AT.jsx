import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";
const TAX_RATE = 0.02;

function fmtUSD(v) {
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " $";
}
function fmtKHR(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "អាករលើការស្នាក់នៅ (Accommodation Tax)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `អាករលើការស្នាក់នៅ ត្រូវបានកំណត់ និងប្រមូល
លើការស្នាក់នៅក្នុងសណ្ឋាគារ ជាប់ពន្ធតាមរបប
ស្វ័យប្រកាស ដើម្បីជាប្រយោជន៍ថវិកាថ្នាក់ក្រោមជាតិ។
• អត្រា: 2% នៃថ្លៃស្នាក់នៅ (មូលដ្ឋានគិតអាករ)
• ប្រកាស/បង់: រៀងរាល់ខែ ≤ ថ្ងៃទី 20 (ផ្ទាល់)
  ឬ ≤ ថ្ងៃទី 25 (e-Filing / Online)
• ប្រមូលពី: អ្នកស្នាក់នៅ (ដោយសណ្ឋាគារ)`,
  },
  {
    term: "សណ្ឋាគារ (Hotel / Accommodation Facility)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `សណ្ឋាគារ = ទីកន្លែងផ្គត់ផ្គង់សេវាស្នាក់នៅ
ដែលមានលក្ខណៈជាបន្ទប់គ្រែ + សម្បទានិងសេវា
ប្រភេទដែលជាប់អាករ:
① សណ្ឋាគារ / Apartment Hotel / Suite Hotel
② Resort · Motel · Lodge · Bungalow
③ Guesthouse / Boutique · Campsite
④ ទីកន្លែងស្នាក់នៅដទៃទៀតដែលស្រដៀងគ្នា

ករណីលើកលែង:
→ ផ្ទះជួល / ផ្ទះល្វែងជួល ដែលគ្មានសម្បទា
  និងសេវាបន្ថែម (ទោះខ្លី ឬ វែង)`,
  },
  {
    term: "មូលដ្ឋានគិតអាករ (Tax Base)",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `មូលដ្ឋានគិតអាករ = ថ្លៃស្នាក់នៅ + បន្ទុកផ្សេងៗ
  + ពន្ធអាករនានា
  − VAT (10%)
  − អាករស្នាក់នៅ (2%) ខ្លួនឯង

ករណីតម្លៃ មិនរួម VAT + Accommodation Tax:
  មូលដ្ឋាន = ថ្លៃបង់ (ផ្ទាល់)
  
ករណីតម្លៃ រួម VAT + Accommodation Tax:
  VAT Base = Total × 100/110
  Acc Base = VAT Base × 100/102
  
រូបមន្ត: អាករ = មូលដ្ឋានគិតអាករ × 2%`,
  },
  {
    term: "សម្បទានិងសេវា (Amenities & Services)",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `សម្បទានិងសេវា ដែលរួមបញ្ចូលក្នុងមូលដ្ឋានគិតអាករ:
• អាហារ · បោសសម្អាត · ផ្លាស់ប្តូរសម្ភារ
• សេវាទឹក · ភ្លើង · បោកគក់
• កន្លែងហាត់ប្រាណ · Gym · Pool
• Massage · Steam · Sauna
→ ការផ្គត់ផ្គង់សេវាទាំងនេះ ធ្វើឱ្យជាប់អាករ
→ ករណីគ្មានសេវាបន្ថែម → ផ្ទះជួល → លើកលែង`,
  },
  {
    term: "របៀបបង់ (Filing & Payment Methods)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ការប្រកាស:
① ផ្ទាល់ → ≤ ថ្ងៃទី 20 ខែបន្ទាប់
② e-Filing (អ្នកជាប់ពន្ធធំ/មធ្យម) → ≤ ថ្ងៃទី 25
③ GDT Tax Prefiling App (អ្នកជាប់ពន្ធតូច) → ≤ 25

ការបង់ពន្ធ:
• សាខាធនាគារពាណិជ្ជដៃគូ GDT
• e-Payment (អ្នកជាប់ពន្ធធំ/មធ្យម)
• GDT Tax Prefiling App (អ្នកជាប់ពន្ធតូច)`,
  },
];

// ── SHARED STYLES ─────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", padding: "24px 16px", fontFamily: FONT },
  wrap: { width: "100%", maxWidth: 1200, margin: "0 auto" },
  topBar: { display: "flex", justifyContent: "flex-start", marginBottom: 16 },
  backBtn: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", color: "#334155", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,.04)", fontFamily: FONT },
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
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteGreen: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 14, color: "#166534", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteWarn: { background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 14, color: "#92400E", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedTotalGreen: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontWeight: 700, fontSize: 14, fontFamily: FONT },
};

const INFO_CARDS = [
  { icon: "🏨", bg: "#EFF6FF", title: "អត្រាអាករ",          value: "2% / ខែ",          note: "នៃមូលដ្ឋានគិតអាករ" },
  { icon: "💵", bg: "#F0FDF4", title: "មូលដ្ឋានគិត",        value: "ថ្លៃស្នាក់ (net)", note: "ដកចេញ VAT + អាករ" },
  { icon: "📅", bg: "#FFFBEB", title: "ថ្ងៃប្រកាស (ផ្ទាល់)", value: "≤ ថ្ងៃទី 20",     note: "ខែបន្ទាប់ (ប្រចាំខែ)" },
  { icon: "💻", bg: "#FAF5FF", title: "ថ្ងៃប្រកាស (Online)", value: "≤ ថ្ងៃទី 25",     note: "e-Filing / GDT App" },
  { icon: "🏠", bg: "#FEF2F2", title: "ករណីលើកលែង",         value: "ផ្ទះជួល",          note: "គ្មានសម្បទានិងសេវា" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — អាករលើការស្នាក់នៅ</span>
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
// TAB 1 — SIMPLE (price excludes VAT & Acc Tax)
// ══════════════════════════════════════════════════════════════
function SimpleTab() {
  const [revenue,      setRevenue]      = useState("");
  const [currency,     setCurrency]     = useState("USD");
  const [exchangeRate, setExchangeRate] = useState("4100");
  const [result,       setResult]       = useState(null);

  function calculate() {
    const rev = n(revenue);
    if (!rev) return;
    const rate = n(exchangeRate) || 4100;
    const tax  = rev * TAX_RATE;
    const revKHR = currency === "USD" ? rev * rate : rev;
    const taxKHR = currency === "USD" ? tax * rate : tax;
    setResult({ rev, tax, revKHR, taxKHR, currency, rate });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ចំណូលសណ្ឋាគារ (មិនរួម VAT និង Accommodation Tax)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំណូលប្រចាំខែ</label>
            <input style={S.input} type="number" placeholder="ឧ: 1000" value={revenue} onChange={e => { setRevenue(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="USD">ដុល្លារអាមេរិក ($)</option>
              <option value="KHR">រៀល (៛)</option>
            </select>
          </div>
        </div>
        {currency === "USD" && (
          <div style={S.field}>
            <label style={S.label}>អត្រាប្រែ (៛/$)</label>
            <input style={S.input} type="number" placeholder="4100" value={exchangeRate} onChange={e => { setExchangeRate(e.target.value); setResult(null); }} />
          </div>
        )}
        <div style={S.note}>
          • ករណីនេះ: ចំណូល <strong>មិនរួម</strong> VAT និង Accommodation Tax<br />
          • អាករ = ចំណូល × 2% (ផ្ទាល់)<br />
          • ឧ: $1,000 → $1,000 × 2% = <strong>$20</strong>
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាអាករលើការស្នាក់នៅ (ករណីសាមញ្ញ)</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ចំណូលប្រចាំខែ</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>
                {result.currency === "USD" ? fmtUSD(result.rev) : fmtKHR(result.rev)}
              </div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>អត្រាអាករ</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>2%</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>អាករត្រូវបង់</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>
                {result.currency === "USD" ? fmtUSD(result.tax) : fmtKHR(result.tax)}
              </div>
            </div>
            {result.currency === "USD" && (
              <div style={S.metric}>
                <div style={S.mLabel}>អាករ (ជារៀល)</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmtKHR(result.taxKHR)}</div>
              </div>
            )}
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ចំណូលប្រចាំខែ (មូលដ្ឋានគិតអាករ)</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.rev) : fmtKHR(result.rev)}</td></tr>
                <tr><td style={S.td}>អត្រា</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>2%</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>អាករស្នាក់នៅត្រូវបង់ ({result.currency === "USD" ? fmtUSD(result.rev) : fmtKHR(result.rev)} × 2%)</span>
              <span>{result.currency === "USD" ? fmtUSD(result.tax) : fmtKHR(result.tax)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្ត:</strong> {result.currency === "USD" ? fmtUSD(result.rev) : fmtKHR(result.rev)} × 2% = <strong>{result.currency === "USD" ? fmtUSD(result.tax) : fmtKHR(result.tax)}</strong>
              {result.currency === "USD" && <><br />ប្រែជារៀល: {fmtUSD(result.tax)} × {result.rate} = <strong>{fmtKHR(result.taxKHR)}</strong></>}
              <br /><br />
              ត្រូវប្រកាស និងបង់ <strong>ប្រចាំខែ</strong> — ≤ ថ្ងៃទី 20 (ផ្ទាល់) ឬ ≤ ថ្ងៃទី 25 (Online)
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — INCLUSIVE (price includes VAT + Acc Tax)
// ══════════════════════════════════════════════════════════════
function InclusiveTab() {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [currency,     setCurrency]     = useState("USD");
  const [exchangeRate, setExchangeRate] = useState("4100");
  const [result,       setResult]       = useState(null);

  function calculate() {
    const total = n(totalRevenue);
    if (!total) return;
    const rate = n(exchangeRate) || 4100;

    // Step 1: extract VAT base (total includes VAT 10%)
    const vatBase    = total * 100 / 110;
    const vatAmount  = total - vatBase;

    // Step 2: extract Accommodation Tax base (vatBase includes Acc Tax 2%)
    const accBase    = vatBase * 100 / 102;
    const accTax     = vatBase - accBase;

    const totalKHR   = currency === "USD" ? total * rate : total;
    const vatKHR     = currency === "USD" ? vatAmount * rate : vatAmount;
    const accBaseKHR = currency === "USD" ? accBase * rate : accBase;
    const accTaxKHR  = currency === "USD" ? accTax * rate : accTax;

    setResult({ total, vatBase, vatAmount, accBase, accTax, totalKHR, vatKHR, accBaseKHR, accTaxKHR, currency, rate });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ចំណូលសណ្ឋាគារ (រួម VAT + Accommodation Tax)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំណូលប្រចាំខែ (inclusive)</label>
            <input style={S.input} type="number" placeholder="ឧ: 1020" value={totalRevenue} onChange={e => { setTotalRevenue(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="USD">ដុល្លារអាមេរិក ($)</option>
              <option value="KHR">រៀល (៛)</option>
            </select>
          </div>
        </div>
        {currency === "USD" && (
          <div style={S.field}>
            <label style={S.label}>អត្រាប្រែ (៛/$)</label>
            <input style={S.input} type="number" placeholder="4100" value={exchangeRate} onChange={e => { setExchangeRate(e.target.value); setResult(null); }} />
          </div>
        )}
        <div style={S.note}>
          • ករណីនេះ: ចំណូល <strong>រួម</strong> VAT (10%) + Accommodation Tax (2%)<br />
          • ជំហានទី 1: VAT Base = Total × 100/110<br />
          • ជំហានទី 2: Acc Base = VAT Base × 100/102<br />
          • ជំហានទី 3: Acc Tax = Acc Base × 2%<br />
          • ឧ: $1,020 → VAT Base $927.27 → Acc Base $909.09 → Acc Tax <strong>$18.18</strong>
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាអាករស្នាក់នៅ (ករណីរួម VAT)</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ចំណូលសរុប (Inclusive)</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.currency === "USD" ? fmtUSD(result.total) : fmtKHR(result.total)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>VAT Base (÷1.10)</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{result.currency === "USD" ? fmtUSD(result.vatBase) : fmtKHR(result.vatBase)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Accommodation Base (÷1.02)</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{result.currency === "USD" ? fmtUSD(result.accBase) : fmtKHR(result.accBase)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>អាករស្នាក់នៅ (2%)</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{result.currency === "USD" ? fmtUSD(result.accTax) : fmtKHR(result.accTax)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត (ការស្រង់ចេញ Step-by-Step)</div>
            <table style={S.tbl}>
              <thead>
                <tr>
                  <th style={S.th}>ជំហាន</th>
                  <th style={S.th}>បរិយាយ</th>
                  <th style={S.th}>រូបមន្ត</th>
                  <th style={S.th}>ទឹកប្រាក់</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>1</td>
                  <td style={S.td}>ចំណូលសរុប (Total Inclusive)</td>
                  <td style={S.td}>—</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.total) : fmtKHR(result.total)}</td>
                </tr>
                <tr>
                  <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>2</td>
                  <td style={S.td}>VAT Base (ដក VAT 10%)</td>
                  <td style={{ ...S.td, color: "#64748B" }}>Total × 100/110</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.vatBase) : fmtKHR(result.vatBase)}</td>
                </tr>
                <tr>
                  <td style={{ ...S.td, fontWeight: 700, color: "#f97316" }}>3</td>
                  <td style={S.td}>VAT Amount</td>
                  <td style={{ ...S.td, color: "#64748B" }}>Total − VAT Base</td>
                  <td style={{ ...S.td, color: "#f97316", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.vatAmount) : fmtKHR(result.vatAmount)}</td>
                </tr>
                <tr>
                  <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>4</td>
                  <td style={S.td}>Accommodation Base (ដក Acc Tax 2%)</td>
                  <td style={{ ...S.td, color: "#64748B" }}>VAT Base × 100/102</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.accBase) : fmtKHR(result.accBase)}</td>
                </tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>អាករស្នាក់នៅត្រូវបង់ (Acc Base × 2%)</span>
              <span>{result.currency === "USD" ? fmtUSD(result.accTax) : fmtKHR(result.accTax)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្តពេញ:</strong><br />
              • VAT Base = {result.currency === "USD" ? fmtUSD(result.total) : fmtKHR(result.total)} × 100/110 = <strong>{result.currency === "USD" ? fmtUSD(result.vatBase) : fmtKHR(result.vatBase)}</strong><br />
              • Acc Base = {result.currency === "USD" ? fmtUSD(result.vatBase) : fmtKHR(result.vatBase)} × 100/102 = <strong>{result.currency === "USD" ? fmtUSD(result.accBase) : fmtKHR(result.accBase)}</strong><br />
              • អាករ = {result.currency === "USD" ? fmtUSD(result.accBase) : fmtKHR(result.accBase)} × 2% = <strong>{result.currency === "USD" ? fmtUSD(result.accTax) : fmtKHR(result.accTax)}</strong>
              {result.currency === "USD" && (
                <><br />ប្រែជារៀល: {fmtUSD(result.accTax)} × {result.rate} = <strong>{fmtKHR(result.accTaxKHR)}</strong></>
              )}
              <br /><br />
              ត្រូវប្រកាស ≤ <strong>ថ្ងៃទី 20</strong> (ផ្ទាល់) ឬ ≤ <strong>ថ្ងៃទី 25</strong> (e-Filing/App) នៃខែបន្ទាប់
            </div>
          </div>

          {/* Verification breakdown */}
          <div style={S.card}>
            <div style={S.cardTitle}>ការផ្ទៀងផ្ទាត់ — សមាមាត្រចំណូលសរុប</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>សមាសធាតុ</th><th style={S.th}>ទឹកប្រាក់</th><th style={S.th}>%</th></tr></thead>
              <tbody>
                <tr>
                  <td style={S.td}>Accommodation Base (Net)</td>
                  <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.accBase) : fmtKHR(result.accBase)}</td>
                  <td style={{ ...S.td, color: "#166534" }}>{((result.accBase / result.total) * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td style={S.td}>Accommodation Tax (2%)</td>
                  <td style={{ ...S.td, color: "#c0392b", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.accTax) : fmtKHR(result.accTax)}</td>
                  <td style={{ ...S.td, color: "#c0392b" }}>{((result.accTax / result.total) * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td style={S.td}>VAT (10%)</td>
                  <td style={{ ...S.td, color: "#f97316", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.vatAmount) : fmtKHR(result.vatAmount)}</td>
                  <td style={{ ...S.td, color: "#f97316" }}>{((result.vatAmount / result.total) * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td style={{ ...S.td, fontWeight: 700 }}>សរុប</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "USD" ? fmtUSD(result.total) : fmtKHR(result.total)}</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function AccommodationTaxPage({ setPage }) {
  const [tab, setTab] = useState("simple");

  const TABS = [
    { id: "simple",    label: " ករណីសាមញ្ញ (មិនរួម VAT)" },
    { id: "inclusive", label: " ករណីរួម VAT + Acc Tax" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>អាករលើការស្នាក់នៅ </div>
          <div style={S.hSub}></div>
        </div>

        {/* INFO CARDS */}
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

        {/* DEFINITIONS */}
        <DefSection />

        {/* TABS */}
        <div style={S.tabRow}>
          {TABS.map(t => (
            <button key={t.id} style={tab === t.id ? S.tabOn : S.tab} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {tab === "simple"    && <SimpleTab />}
        {tab === "inclusive" && <InclusiveTab />}

      </div>
    </div>
  );
}