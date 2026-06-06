import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

function fmt(v) {
  return Math.round(Math.abs(v)).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── និយមន័យ ───────────────────────────────────────────────
const DEFS = [
  {
    term: "ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ — PTOI",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ (PTOI) គឺជាការបង់ជាមុននៃពន្ធលើប្រាក់ចំណេញ
ដោយគណនាលើ ១% នៃផលរបរប្រចាំខែ។
• ប្រមូលប្រចាំខែ
• គណនាលើ ផលរបរ — មិនមែន ប្រាក់ចំណេញ
• ពន្ធត្រូវបង់ − ប្រាក់រំដោះពន្ធបានបង់ = សមតុល្យពន្ធត្រូវបង់
• ប្រកាស/បង់: ផ្ទាល់ ថ្ងៃទី ២០ | E-Filing ថ្ងៃទី ២០
• ទម្រង់: ព ០១ (ពន្ធ ០១)`,
  },
  {
    term: "ផលរបរ — មូលដ្ឋានគិតពន្ធ",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `ផលរបរ = ប្រាក់ចំណូលសរុបពីការផ្គត់ផ្គង់
ទំនិញ ឬ សេវា ក្នុងប្រទេស។

វិធីគណនា:
• ករណីរួមបញ្ចូល VAT: មូលដ្ឋានគិតពន្ធ = សរុប / ១.១
• ករណីមិនរួមបញ្ចូល VAT: មូលដ្ឋានគិតពន្ធ = សរុប
ប្រាក់រំដោះពន្ធ = មូលដ្ឋានគិតពន្ធ × ១%

ចំណាំ: ផលរបររួមបញ្ចូលអាករគ្រប់ប្រភេទ
លើកលែងតែ អាករលើតម្លៃបន្ថែម (VAT) ១០%`,
  },
  {
    term: "អ្នកមានកាតព្វកិច្ចបង់ប្រាក់រំដោះពន្ធ",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `សហគ្រាសដែលត្រូវបង់ប្រាក់រំដោះពន្ធ:
① ជាប់ពន្ធលើប្រាក់ចំណេញ (របបពិត)
② គម្រោងវិនិយោគមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ (QIP) ដែលជាប់ ៩% (ក្រោយរយៈពេលលើកលែងពន្ធ)
③ ចុះបញ្ជីពន្ធ VAT ឬ លក្ខណៈស្វ័យប្រកាស

ករណីលើកលែងប្រាក់រំដោះពន្ធ:
• QIP ក្នុងដំណាក់កាលលើកលែងពន្ធ
• សហគ្រាសរបបម៉ៅការ
• អង្គការក្រៅរដ្ឋាភិបាលដែលមិនរកប្រាក់ចំណេញ`,
  },
  {
    term: "ការទូទាត់លើពន្ធប៉ាន់ស្មាន",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ប្រាក់រំដោះពន្ធត្រូវប្រើដូចជាឥណទានពន្ធ:

វិធីគណនា៖
• ពន្ធប្រចាំឆ្នាំ = ប្រាក់ចំណូលជាប់ពន្ធ × អត្រា
• ដក: ប្រាក់រំដោះពន្ធបានបង់ក្នុងឆ្នាំ
• សមតុល្យ = ប្រាក់ត្រូវបង់ (ឬស្នើសុំសងត្រឡប់)

ប្រសិនបើ ប្រាក់រំដោះពន្ធ > ពន្ធប្រចាំឆ្នាំ → ឥណទានយោង
ប្រសិនបើ ប្រាក់រំដោះពន្ធ < ពន្ធប្រចាំឆ្នាំ → បង់សមតុល្យបន្ថែម
• ទម្រង់: TO1 (លិខិតប្រកាសពន្ធលើប្រាក់ចំណេញ) — ប្រចាំឆ្នាំ`,
  },
  {
    term: "ការប្រកាស និង ការបង់ប្រាក់រំដោះពន្ធ",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `កាលបរិច្ឆេទ:
• ថ្ងៃទី ០១ ដល់ ថ្ងៃទី ២០ នៃខែបន្ទាប់
• ប្រកាសតាម ទម្រង់ ព ០១ ឬ E-Filing

ករណីនៃការខកខានបង់:
① ពន្ធប្រក្រតី: ១០% នៃប្រាក់ពន្ធ
② ការប្រាក់: ២% ក្នុងមួយខែ
③ ពិន័យបន្ថែម: ករណីក្លែងបន្លំ

ច្បាប់ប្រើ: ច្បាប់ស្តីពីសារពើពន្ធ ១៩៩៧
+ ប្រកាសលេខ ០០១, ៥០៦`,
  },
];

// ── រចនាប័ទ្ម ─────────────────────────
const S = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", padding: "24px 16px", fontFamily: FONT },
  wrap: { width: "100%", maxWidth: 1200, margin: "0 auto" },
  topBar: { display: "flex", justifyContent: "flex-start", marginBottom: 16 },
  backBtn: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, color: "#334155", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,.04)", fontFamily: FONT },
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
  noteWarn: { background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 14, color: "#92400E", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 13, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedTotalGreen: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedVal: { color: "#2563EB", fontWeight: 700 },
  dedValRed: { color: "#DC2626", fontWeight: 700 },
  dedValGreen: { color: "#166534", fontWeight: 700 },
};

const INFO_CARDS = [
  { icon: "💰", bg: "#EFF6FF", title: "អត្រាប្រាក់រំដោះពន្ធ",            value: "១%",             note: "លើផលរបរប្រចាំខែ" },
  { icon: "📅", bg: "#F0FDF4", title: "ថ្ងៃបង់ប្រចាំខែ",      value: "ទី ០១ – ២០",       note: "ខែបន្ទាប់ (E-Filing ដូចគ្នា)" },
  { icon: "📋", bg: "#FFFBEB", title: "ទម្រង់",                value: "ព ០១ / E-Filing",  note: "ប្រកាសប្រចាំខែ" },
  { icon: "🔄", bg: "#FAF5FF", title: "ប្រើដូចឥណទាន",        value: "ពន្ធប្រចាំឆ្នាំ",        note: "ប្រាក់រំដោះទូទាត់ជាមួយពន្ធប្រចាំឆ្នាំ" },
  { icon: "🏢", bg: "#FEF2F2", title: "អ្នកជាប់កាតព្វកិច្ច",              value: "របបពិត",       note: "QIP ក្រោយរយៈពេលលើកលែងពន្ធផងដែរ" },
];

// ── ផ្នែកនិយមន័យ ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ (PTOI)</span>
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
// TAB 1 — កម្មវិធីគណនា
// ══════════════════════════════════════════════════════════════
function CalcTab() {
  const [turnover,    setTurnover]    = useState("");
  const [includesVAT, setIncludesVAT] = useState("yes");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const amount = n(turnover);
    if (amount <= 0) return;
    const taxBase  = includesVAT === "yes" ? amount / 1.1 : amount;
    const taxAmount = taxBase * 0.01;
    setResult({ originalAmount: amount, taxBase, taxAmount, vatIncluded: includesVAT === "yes" });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ទិន្នន័យផលរបរប្រចាំខែ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ផលរបរសរុប (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧ. 11000000"
              value={turnover} onChange={e => { setTurnover(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>តើផលរបររួមបញ្ចូល VAT ១០% ដែរឬទេ?</label>
            <select style={S.select} value={includesVAT}
              onChange={e => { setIncludesVAT(e.target.value); setResult(null); }}>
              <option value="yes">បាទ/ចាស (រួមបញ្ចូល អ.ត.ប ១០%)</option>
              <option value="no">ទេ (មិនរួមបញ្ចូល អ.ត.ប)</option>
            </select>
          </div>
        </div>
        <div style={S.note}>
          • មូលដ្ឋានគិតពន្ធ = ផលរបររួម (អាករទាំងអស់) — <strong>លើកលែងតែ VAT</strong><br />
          • ករណីរួមបញ្ចូល VAT: មូលដ្ឋានគិតពន្ធ = សរុប ÷ ១.១<br />
          • ប្រាក់រំដោះពន្ធ = មូលដ្ឋានគិតពន្ធ × <strong>១%</strong>
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាប្រាក់រំដោះពន្ធ</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ផលរបរដែលបានបញ្ចូល</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.originalAmount)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>មូលដ្ឋានគិតពន្ធ {result.vatIncluded && "(÷ 1.1)"}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#5B21B6", fontFamily: FONT }}>{fmt(result.taxBase)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់រំដោះពន្ធ (១%)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.taxAmount)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិតប្រាក់រំដោះពន្ធ (PTOI)</div>
            <table style={S.tbl}>
              <thead>
                <tr>
                  <th style={S.th}>បរិយាយ</th>
                  <th style={S.th}>ទឹកប្រាក់</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={S.td}>ផលរបរដែលបញ្ចូល</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.originalAmount)}</td>
                </tr>
                {result.vatIncluded && (
                  <tr>
                    <td style={S.td}>− VAT ១០% (÷ 1.1 ដើម្បីទាញចេញ)</td>
                    <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>−{fmt(result.originalAmount - result.taxBase)}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ ...S.td, fontWeight: 700 }}>= មូលដ្ឋានគិតពន្ធ</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.taxBase)}</td>
                </tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>ប្រាក់រំដោះពន្ធ ({fmt(result.taxBase)} × ១%)</span>
              <span>{fmt(result.taxAmount)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្ត:</strong><br />
              {result.vatIncluded
                ? <>• មូលដ្ឋានគិតពន្ធ = {fmt(result.originalAmount)} ÷ 1.1 = {fmt(result.taxBase)}<br /></>
                : <>• មូលដ្ឋានគិតពន្ធ = {fmt(result.taxBase)}<br /></>
              }
              • ប្រាក់រំដោះពន្ធ = {fmt(result.taxBase)} × ១% = <strong>{fmt(result.taxAmount)}</strong><br />
              → បង់ <strong>ថ្ងៃទី ០១–២០</strong> នៃខែបន្ទាប់ · ទម្រង់ ព ០១ ឬ E-Filing
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — ការផ្ទៀងផ្ទាត់ប្រចាំឆ្នាំ
// ══════════════════════════════════════════════════════════════
function ReconcileTab() {
  const [annualTax,  setAnnualTax]  = useState("");
  const [ptoiPaid,   setPtoiPaid]   = useState("");
  const [result,     setResult]     = useState(null);

  function calculate() {
    const at = n(annualTax);
    const pp = n(ptoiPaid);
    if (!at) return;
    const balance     = at - pp;
    const due         = Math.max(0, balance);
    const creditCarry = balance < 0 ? Math.abs(balance) : 0;
    setResult({ at, pp, balance, due, creditCarry });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ការផ្ទៀងផ្ទាត់ប្រាក់រំដោះពន្ធ ជាមួយពន្ធប្រចាំឆ្នាំ (TO1)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ពន្ធប្រចាំឆ្នាំត្រូវបង់ (TO1) — ៛</label>
            <input style={S.input} type="number" placeholder="ឧ. 12000000"
              value={annualTax} onChange={e => { setAnnualTax(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់រំដោះពន្ធសរុបបានបង់ (១–១២ ខែ) — ៛</label>
            <input style={S.input} type="number" placeholder="ឧ. 9000000"
              value={ptoiPaid} onChange={e => { setPtoiPaid(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.note}>
          • សមតុល្យ = ពន្ធប្រចាំឆ្នាំ − ប្រាក់រំដោះពន្ធបានបង់<br />
          • សមតុល្យ {">"} ០ → បង់សមតុល្យបន្ថែម (ការដាក់ប្រកាស TO1)<br />
          • សមតុល្យ {"<"} ០ → ឥណទានយោង ឬ ស្នើសុំសងត្រឡប់
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាសមតុល្យប្រចាំឆ្នាំ</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ពន្ធប្រចាំឆ្នាំ</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.at)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់រំដោះពន្ធបានបង់</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#166534", fontFamily: FONT }}>{fmt(result.pp)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>{result.due > 0 ? "សមតុល្យត្រូវបង់ថែម" : "ឥណទាន / សងត្រឡប់"}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: result.due > 0 ? "#c0392b" : "#166534", fontFamily: FONT }}>
                {result.due > 0 ? fmt(result.due) : fmt(result.creditCarry)}
              </div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>តារាងផ្ទៀងផ្ទាត់</div>
            <div style={S.dedRow}><span>ពន្ធប្រចាំឆ្នាំ (TO1)</span><span style={S.dedVal}>{fmt(result.at)}</span></div>
            <div style={S.dedRow}><span>ប្រាក់រំដោះពន្ធបានបង់ (ឥណទាន)</span><span style={S.dedValGreen}>−{fmt(result.pp)}</span></div>
            {result.due > 0 ? (
              <div style={S.dedTotal}>
                <span>សមតុល្យត្រូវបង់ថែម</span>
                <span>{fmt(result.due)}</span>
              </div>
            ) : (
              <div style={S.dedTotalGreen}>
                <span>ឥណទានបន្ថែម / សងត្រឡប់</span>
                <span>{fmt(result.creditCarry)}</span>
              </div>
            )}
            <div style={result.due > 0 ? S.noteWarn : S.note}>
              <strong>រូបមន្ត:</strong><br />
              • សមតុល្យ = {fmt(result.at)} − {fmt(result.pp)} = <strong>{fmt(Math.abs(result.balance))}</strong><br />
              {result.due > 0
                ? <>→ <strong>ត្រូវបង់សមតុល្យ {fmt(result.due)}</strong> ត្រឹម ថ្ងៃទី ៣១/០៣ ឆ្នាំបន្ទាប់</>
                : <>→ <strong>ឥណទាន {fmt(result.creditCarry)}</strong> — ស្នើសុំសងត្រឡប់ ឬ យោងទៅមុខ</>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — តារាងឯកសារយោង
// ══════════════════════════════════════════════════════════════
function RatesTab() {
  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>អត្រា និង បទប្បញ្ញត្តិ — ឯកសារយោង</div>
        <table style={S.tbl}>
          <thead>
            <tr>
              <th style={S.th}>ប្រភេទ</th>
              <th style={S.th}>អត្រា</th>
              <th style={S.th}>ចំណាំ</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ប្រាក់រំដោះពន្ធ (របបពិត)",        "១%", "លើផលរបរមិនរួមបញ្ចូល VAT ប្រចាំខែ"],
              ["QIP ក្រោយរយៈពេលលើកលែងពន្ធ",    "១%", "ជាប់ ៩% → ប្រាក់រំដោះពន្ធ ១% ផងដែរ"],
              ["QIP ក្នុងរយៈពេលលើកលែងពន្ធ",    "០%", "លើកលែងប្រាក់រំដោះពន្ធ"],
              ["របបម៉ៅការ",          "—",  "មិនត្រូវបង់ប្រាក់រំដោះពន្ធទេ — ពន្ធកាត់រំលស់ ១ ដង"],
              ["សមតុល្យពន្ធប្រចាំឆ្នាំ",        "—",  "TO1 — ត្រឹម ថ្ងៃទី ៣១ មីនា"],
            ].map(([type, rate, note]) => (
              <tr key={type}>
                <td style={S.td}>{type}</td>
                <td style={{ ...S.td, fontWeight: 700, color: rate === "—" ? "#64748B" : rate === "០%" ? "#166534" : "#c0392b" }}>{rate}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#475569" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>ច្បាប់ និង បទប្បញ្ញត្តិយោង</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>ឯកសារ</th><th style={S.th}>ថ្ងៃខែឆ្នាំ</th><th style={S.th}>មាតិកា</th></tr></thead>
          <tbody>
            {[
              ["ច្បាប់ស្តីពីសារពើពន្ធ", "១៩៩៧", "ក្របខ័ណ្ឌពន្ធលើប្រាក់ចំណេញ"],
              ["ប្រកាសលេខ ០០១ ប្រក.សហវ.ពដ", "០២/០១/២០០១", "ការគណនាប្រាក់រំដោះពន្ធ ១%"],
              ["ប្រកាសលេខ ៥០៦ សហវ.ពដ", "២៤/០៧/២០០២", "ការអនុគ្រោះ QIP"],
            ].map(([doc, date, content]) => (
              <tr key={doc}>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{doc}</td>
                <td style={S.td}>{date}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#475569" }}>{content}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={S.note}>
          <strong>ការប្រកាស/បង់:</strong> ថ្ងៃទី ០១ – <strong>ទី ២០</strong> នៃខែបន្ទាប់ · ទម្រង់ ព ០១ ឬ E-Filing<br />
          <strong>ពន្ធប្រក្រតី:</strong> ១០% + ការប្រាក់ ២%/ខែ ករណីបង់យឺតយ៉ាវ
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function PrepaymentTaxCalculator({ setPage }) {
  const [tab, setTab] = useState("calc");

  const TABS = [
    { id: "calc",      label: "💰 កម្មវិធីគណនា PTOI" },
    { id: "reconcile", label: "🔄 ការផ្ទៀងផ្ទាត់ប្រចាំឆ្នាំ" },
    { id: "rates",     label: "📋 តារាងអត្រា & ច្បាប់" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ (PTOI)</div>
          <div style={S.hSub}>កម្ពុជា · អគ្គនាយកដ្ឋានពន្ធដារ · ១% លើផលរបរ · ប្រចាំខែ ថ្ងៃទី ០១–២០</div>
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

        {tab === "calc"      && <CalcTab />}
        {tab === "reconcile" && <ReconcileTab />}
        {tab === "rates"     && <RatesTab />}

      </div>
    </div>
  );
}