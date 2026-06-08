import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";
const PLT_RATE = 0.05;

function fmt(v) {
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtKHR(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "អាករសម្រាប់បំភ្លឺសាធារណៈ (PLT — Public Lighting Tax)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `អាករ PLT ត្រូវអនុវត្តលើការផ្គត់ផ្គង់ ផលិតផលសុរា
មេរ័យ ឬ ថ្នាំជក់ នៅក្នុងព្រះរាជាណាចក្រកម្ពុជា។
• អត្រា: 5% នៃមូលដ្ឋានគិតអាករ
• ជំនួស: អ្នកផលិត ឬ អ្នកនាំចូល (ផ្គត់ផ្គង់ដំបូង)
• ប្រកាស/បង់: ផ្ទាល់ ថ្ងៃទី 20 · Online ថ្ងៃទី 25
• ប្រមូល​នៅ​ពេ​ល​ផ្គ​ត់​ផ្គ​ង់​ដំ​បូ​ង​ប​ន្ទា​ប់​ពី​ផ​លិ​ត​ ឬ​​នាំ​ចូ​ល`,
  },
  {
    term: "មូលដ្ឋានគិតអាករ PLT (Tax Base)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `មូលដ្ឋានគិតអាករ = ថ្លៃផ្គត់ផ្គង់ក្នុង Invoice
+ ពន្ធ/អាករនានា — (VAT + PLT ខ្លួនឯង)

ន័យ: ថ្លៃ Invoice រួមមាន អាករពិសេស (ET) ស្រាប់
      ប៉ុន្តែ មិនរួមមាន VAT 10% និង PLT 5% ខ្លួនឯង

ឧ: ស្រាបៀរ Invoice 11,000 ៛ (excl. VAT, excl. PLT)
   → PLT = 11,000 × 5% = 550 ៛`,
  },
  {
    term: "ផលិតផលជាប់ PLT (Taxable Products)",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `① សុរា — ផលិតផលគ្រប់ប្រភេទ ដែលមានជាតិអាល់កុល
   (លើកលែង: អាល់កុលប្រើក្នុងវិស័យវេជ្ជសាស្ត្រ)

② មេរ័យ — ទឹកស្រវឹង: ស្រាបៀរ · ភេស្ជៈអាល់កុល
   (លើកលែង: ទឹកត្នោតជូរ + ស្រាស គ្មានការកែច្នៃ)

③ ថ្នាំជក់ — ផលិតផលសម្រាប់ជក់:
   • បារី (Cigarette)
   • ស៊ីហ្គា (Cigar)
   • បារីអេឡិចត្រូនិក (E-cigarette)
   • គ្រប់ប្រភេទ`,
  },
  {
    term: "អ្នកផលិត vs អ្នកនាំចូល (Producer vs Importer)",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `អ្នកផលិត = ម្ចាស់ផលិតផលដែល:
• ផលិតផលិតផលជាប់អាករដោយខ្លួនឯង
• ឬ ជួលបុគ្គលដទៃឱ្យផលិតឱ្យខ្លួន

អ្នកនាំចូល = ម្ចាស់ផលិតផលដែល:
• នាំចូលផលិតផលជាប់អាករដោយខ្លួនឯង
• ឬ ប្រគល់សិទ្ធិឱ្យបុគ្គលដទៃនាំចូលឱ្យ

→ ទាំងពីរ = បុគ្គលជាប់ PLT
→ ត្រូវបង់ PLT នៅពេល ផ្គត់ផ្គង់ដំបូង
→ ផ្គត់ផ្គង់ចំពោះ: អតិថិជន · ចែកចាយ · ប្រើផ្ទាល់`,
  },
  {
    term: "PLT vs VAT vs Special Tax — ភាពខុសគ្នា",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `PLT (អាករបំភ្លឺ):
→ 5% × Invoice (incl. ET, excl. VAT+PLT)
→ ប្រមូល​ 1 ​ដង​ (ដំ​បូ​ង​ប​ន្ទា​ប់​ពី​ផ​លិ​ត/​នាំ​ចូ​ល)
→ ផលិតផល: សុរា · មេរ័យ · ថ្នាំជក់

Special Tax (ET):
→ 20–35% × 90% Invoice (ក្នុងស្រុក)
→ ប្រមូល​ 1 ​ដ​ង​ (ការ​ផ​លិ​ត/​ចែ​ក​ចា​យ​)

VAT (អតប):
→ 10% × Invoice — ប្រមូលគ្រប់ដំណាក់កាល
→ Output − Input = VAT ត្រូវបង់`,
  },
];

// ── PRODUCT TYPES ────────────────────────────────────────────
const PRODUCT_TYPES = [
  { id: "beer",       label: "ស្រាបៀរ (Beer)" },
  { id: "wine",       label: "ស្រា / សុរា (Wine/Spirits)" },
  { id: "mead",       label: "មេរ័យ (Mead/Fermented Drink)" },
  { id: "cigarette",  label: "បារី (Cigarette)" },
  { id: "cigar",      label: "ស៊ីហ្គា (Cigar)" },
  { id: "ecigarette", label: "បារីអេឡិចត្រូនិក (E-cigarette)" },
];

// ── SHARED STYLES ────────────────────────────────────────────
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
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  barTrack: { height: 16, borderRadius: 999, overflow: "hidden", display: "flex", background: "#E2E8F0", marginBottom: 10 },
  barLabels: { display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, color: "#475569", flexWrap: "wrap", fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 13, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedVal: { color: "#2563EB", fontWeight: 700 },
  dedValRed: { color: "#DC2626", fontWeight: 700 },
};

const INFO_CARDS = [
  { icon: "🍺", bg: "#EFF6FF", title: "ផលិតផលជាប់ PLT",     value: "សុរា · មេរ័យ · ថ្នាំជក់", note: "ស្រា · ស្រាបៀរ · បារី · ស៊ីហ្គា" },
  { icon: "💡", bg: "#F0FDF4", title: "អត្រា PLT",            value: "5%",                        note: "នៃថ្លៃ Invoice (excl. VAT + PLT)" },
  { icon: "🏭", bg: "#FFFBEB", title: "ជំនួស",               value: "អ្នកផលិត / នាំចូល",         note: "ផ្គត់ផ្គង់ដំបូង" },
  { icon: "📅", bg: "#FAF5FF", title: "ថ្ងៃប្រកាស",          value: "ទី 20/25",                   note: "ផ្ទាល់ 20 · Online 25 ខែបន្ទាប់" },
  { icon: "🔗", bg: "#FEF2F2", title: "ប្រមូលរៀងម្ដង",       value: "1 ដង",                       note: "ប​ន្ទា​ប់​ពី​ផ​លិ​ត/​នាំ​ចូ​ល" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — អាករសម្រាប់បំភ្លឺសាធារណៈ (PLT)</span>
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
// TAB 1 — CALCULATOR
// ══════════════════════════════════════════════════════════════
function CalculatorTab() {
  const [productType,  setProductType]  = useState("beer");
  const [invoiceAmt,   setInvoiceAmt]   = useState("");
  const [result,       setResult]       = useState(null);

  function calculate() {
    const amt = n(invoiceAmt);
    if (!amt) return;
    const taxBase = amt;
    const plt     = taxBase * PLT_RATE;
    const vat     = taxBase * 0.10;
    const total   = taxBase + plt + vat;
    setResult({ taxBase, plt, vat, total });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានផលិតផល</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទផលិតផល</label>
            <select style={S.select} value={productType}
              onChange={e => { setProductType(e.target.value); setResult(null); }}>
              {PRODUCT_TYPES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
        </div>


        <div style={S.cardTitle}>ថ្លៃផ្គត់ផ្គង់ (Invoice)</div>
        <div style={S.field}>
          <label style={S.label}>
            ថ្លៃ Invoice (៛) — excl. VAT (10%) + excl. PLT (5%)
          </label>
          <input style={S.input} type="number"
            placeholder="ឧ: 45100000"
            value={invoiceAmt} onChange={e => { setInvoiceAmt(e.target.value); setResult(null); }} />
        </div>

        <div style={S.note}>
          • មូលដ្ឋានគិតអាករ PLT = ថ្លៃ Invoice <strong>(excl. VAT · excl. PLT ខ្លួនឯង)</strong><br />
          • PLT = មូលដ្ឋាន × <strong>5%</strong><br />
          • ករណី Invoice រួមមាន ET (អាករពិសេស) → <strong>ត្រូវ</strong>រួមបញ្ចូលក្នុងមូលដ្ឋាន PLT<br />
          • ករណី Invoice រួមមាន VAT → <strong>ដក VAT ចេញ</strong> មុនគណនា
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករសម្រាប់បំភ្លឺសាធារណៈ</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>មូលដ្ឋានគិតអាករ PLT</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmtKHR(result.taxBase)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>PLT (5%)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmtKHR(result.plt)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>VAT (10%)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmtKHR(result.vat)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>តម្លៃអតិថិជនបង់សរុប</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#166534", fontFamily: FONT }}>{fmtKHR(result.total)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិតការគណនា PLT</div>
            <table style={S.tbl}>
              <thead>
                <tr>
                  <th style={S.th}>បរិយាយ</th>
                  <th style={S.th}>អត្រា</th>
                  <th style={S.th}>ទឹកប្រាក់</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={S.td}>ថ្លៃ Invoice (មូលដ្ឋានគិត PLT)</td>
                  <td style={S.td}>—</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtKHR(result.taxBase)}</td>
                  
                </tr>
                <tr>
                  <td style={S.td}>PLT (អាករបំភ្លឺ)</td>
                  <td style={S.td}>5%</td>
                  <td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{fmtKHR(result.plt)}</td>
                  
                </tr>
                <tr>
                  <td style={S.td}>VAT (អាករ VAT)</td>
                  <td style={S.td}>10%</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtKHR(result.vat)}</td>
                  
                </tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>តម្លៃសរុបអតិថិជន (Invoice + PLT + VAT)</span>
              <span>{fmtKHR(result.total)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្ត:</strong><br />
              • PLT = {fmtKHR(result.taxBase)} × 5% = <strong>{fmtKHR(result.plt)}</strong><br />
              • VAT = {fmtKHR(result.taxBase)} × 10% = <strong>{fmtKHR(result.vat)}</strong><br />
              • សរុប = {fmtKHR(result.taxBase)} + {fmtKHR(result.plt)} + {fmtKHR(result.vat)} = <strong>{fmtKHR(result.total)}</strong><br /><br />
              ប្រកាស និងបង់ ប្រចាំខែ — ផ្ទាល់: <strong>ថ្ងៃទី 20</strong> | Online: <strong>ថ្ងៃទី 25</strong> នៃខែបន្ទាប់
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — INCLUSIVE PRICE BREAKDOWN
// ══════════════════════════════════════════════════════════════
function BreakdownTab() {
  const [grandTotal, setGrandTotal] = useState("");
  const [result,     setResult]     = useState(null);

  function calculate() {
    const gt = n(grandTotal);
    if (!gt) return;
    const base = gt / 1.15;
    const plt  = base * PLT_RATE;
    const vat  = base * 0.10;
    setResult({ gt, base, plt, vat });
  }


  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ដក PLT ចេញពី Grand Total (Inclusive Breakdown)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>តម្លៃ Grand Total (incl. PLT + VAT)</label>
            <input style={S.input} type="number"
              placeholder="ឧ: 52000000"
              value={grandTotal} onChange={e => { setGrandTotal(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.note}>
          • Grand Total = Invoice × (1 + 5% + 10%) = Invoice × <strong>1.15</strong><br />
          • Invoice (base) = Grand Total ÷ <strong>1.15</strong><br />
          • PLT = Invoice × 5% | VAT = Invoice × 10%
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>ដក PLT + VAT ចេញ</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>មូលដ្ឋានគិតអាករ PLT</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmtKHR(result.base)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>PLT (5%)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmtKHR(result.plt)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>VAT (10%)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmtKHR(result.vat)}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងបំបែក Grand Total</div>
            <table style={S.tbl}>
              <thead>
                <tr>
                  <th style={S.th}>បរិយាយ</th>
                  <th style={S.th}>អត្រា</th>
                  <th style={S.th}>ទឹកប្រាក់</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={S.td}>Invoice (Base = Grand Total ÷ 1.15)</td>
                  <td style={S.td}>—</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtKHR(result.base)}</td>
                </tr>
                <tr>
                  <td style={S.td}>PLT (អាករបំភ្លឺ)</td>
                  <td style={S.td}>5%</td>
                  <td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{fmtKHR(result.plt)}</td>
                </tr>
                <tr>
                  <td style={S.td}>VAT (អាករ VAT)</td>
                  <td style={S.td}>10%</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtKHR(result.vat)}</td>
                </tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>Grand Total (Invoice × 1.15)</span>
              <span>{fmtKHR(result.gt)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្ត:</strong><br />
              • Invoice = {fmtKHR(result.gt)} ÷ 1.15 = <strong>{fmtKHR(result.base)}</strong><br />
              • PLT = {fmtKHR(result.base)} × 5% = <strong>{fmtKHR(result.plt)}</strong><br />
              • VAT = {fmtKHR(result.base)} × 10% = <strong>{fmtKHR(result.vat)}</strong><br /><br />
              ប្រកាស និងបង់ ប្រចាំខែ — ផ្ទាល់: <strong>ថ្ងៃទី 20</strong> | Online: <strong>ថ្ងៃទី 25</strong> នៃខែបន្ទាប់
            </div>
          </div>
        </>
      )}
    </>
  );
}


// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function PLTPage({ setPage }) {
  const [tab, setTab] = useState("calculator");

  const TABS = [
    { id: "calculator", label: "គណនា PLT" },
    { id: "breakdown",  label: "ដក PLT ចេញ" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>អាករសម្រាប់បំភ្លឺសាធារណៈ (PLT)</div>
          <div style={S.hSub}></div>
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

        {tab === "calculator" && <CalculatorTab />}
        {tab === "breakdown"  && <BreakdownTab />}

      </div>
    </div>
  );
}