import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

function fmt(v) {
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtKHR(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── SPECIAL TAX RATES ─────────────────────────────────────────
const GOODS_RATES = [
  { id: "wine",       label: "ស្រា (Wine/Spirits) — គ្រប់ប្រភេទ",                rate: 0.35, base: "domestic", note: "×90% Invoice" },
  { id: "beer",       label: "ស្រាបៀរ — គ្រប់ប្រភេទ",                            rate: 0.30, base: "domestic", note: "×90% Invoice" },
  { id: "cigar",      label: "ស៊ីហ្គា — គ្រប់ប្រភេទ",                            rate: 0.25, base: "domestic", note: "×90% Invoice" },
  { id: "cigarette",  label: "បារី — គ្រប់ប្រភេទ",                               rate: 0.20, base: "domestic", note: "×90% Invoice" },
  { id: "energy",     label: "ភេស្ជៈប៉ូវកម្លាំង (Energy Drink)",                 rate: 0.15, base: "domestic", note: "×90% Invoice" },
  { id: "softdrink",  label: "ភេស្ជៈគ្មានជាតិសុរា (Soft Drink)",                 rate: 0.10, base: "domestic", note: "×90% Invoice" },
  { id: "juice",      label: "ទឹកផ្លែឈើ (Fruit Juice)",                          rate: 0.05, base: "domestic", note: "×90% Invoice" },
  { id: "plastic",    label: "ផលិតផលប្លាស្ទិក",                                   rate: 0.10, base: "domestic", note: "×90% Invoice" },
  { id: "cement",     label: "ស៊ីម៉ងត៍ — គ្រប់ប្រភេទ",                           rate: 0.05, base: "domestic", note: "×90% Invoice" },
  { id: "electronic", label: "គ្រឿងអេឡិចត្រូនិក",                                rate: null, base: "domestic", note: "អត្រាកំណត់ដាច់ដោយឡែក" },
  { id: "moto",       label: "ទោចក្រយានយន្ត",                                    rate: null, base: "domestic", note: "អត្រាកំណត់ដាច់ដោយឡែក" },
  { id: "car",        label: "រថយន្ត",                                              rate: null, base: "domestic", note: "អត្រាកំណត់ដាច់ដោយឡែក" },
  { id: "sparepart",  label: "គ្រឿងបន្លាស់យានយន្ត",                               rate: null, base: "domestic", note: "អត្រាកំណត់ដាច់ដោយឡែក" },
  { id: "cosmetic",   label: "ផលិតផលគ្រឿងសម្អាង (Cosmetics)",                    rate: null, base: "domestic", note: "អត្រាកំណត់ដាច់ដោយឡែក" },
  { id: "glass",      label: "ផលិតផលកញ្ចក់ — គ្រឿងសំណង់",                       rate: null, base: "domestic", note: "អត្រាកំណត់ដាច់ដោយឡែក" },
];

const SERVICE_RATES = [
  { id: "telecom",    label: "សេវាទូរគមនាគមន៍ (Telecom)",                         rate: 0.03, base: "service" },
  { id: "airline",    label: "សេវាដឹកជញ្ជូន អ្នកដំណើរ (Airline)",               rate: 0.10, base: "service" },
  { id: "entertain",  label: "សេវាលំហែកម្សាន្ត (Entertainment)",                 rate: 0.10, base: "service" },
];

const IMPORT_RATES = [
  { id: "wine_i",      label: "ស្រា (Wine/Spirits) — នាំចូល",                    rate: 0.35 },
  { id: "beer_i",      label: "ស្រាបៀរ — នាំចូល",                                 rate: 0.30 },
  { id: "cigar_i",     label: "ស៊ីហ្គា — នាំចូល",                                 rate: 0.25 },
  { id: "cig_i",       label: "បារី — នាំចូល",                                     rate: 0.20 },
  { id: "energy_i",    label: "ភេស្ជៈប៉ូវកម្លាំង — នាំចូល",                      rate: 0.15 },
  { id: "soft_i",      label: "ភេស្ជៈគ្មានជាតិសុរា — នាំចូល",                    rate: 0.10 },
  { id: "juice_i",     label: "ទឹកផ្លែឈើ — នាំចូល",                              rate: 0.05 },
  { id: "plastic_i",   label: "ផលិតផលប្លាស្ទិក — នាំចូល",                        rate: 0.10 },
  { id: "cement_i",    label: "ស៊ីម៉ងត៍ — នាំចូល",                                rate: 0.05 },
  { id: "electronic_i",label: "គ្រឿងអេឡិចត្រូនិក — នាំចូល",                     rate: null },
  { id: "moto_i",      label: "ទោចក្រយានយន្ត — នាំចូល",                          rate: null },
  { id: "car_i",       label: "រថយន្ត — នាំចូល",                                   rate: null },
  { id: "sparepart_i", label: "គ្រឿងបន្លាស់យានយន្ត — នាំចូល",                    rate: null },
  { id: "cosmetic_i",  label: "ផលិតផលគ្រឿងសម្អាង — នាំចូល",                      rate: null },
  { id: "glass_i",     label: "ផលិតផលកញ្ចក់ (គ្រឿងសំណង់) — នាំចូល",             rate: null },
];

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "អាករពិសេស (Special Tax / Excise Tax)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `អាករពិសេស ត្រូវប្រមូលលើទំនិញ ឬ សេវាដែលមាន
លក្ខណៈប្រណីត ឬ ប៉ះពាល់ដល់សុខភាព/បរិស្ថាន។
• អនុវត្តលើ: ការនាំចូល · ការផលិត · ការចែកចាយ
• ជំនួស: អ្នកនាំចូល ឬ អ្នកផលិត ឬ អ្នកផ្គត់ផ្គង់
• ប្រកាស: ប្រចាំខែ យ៉ាងយូរ ថ្ងៃទី 20 (ផ្ទាល់)
          ឬ ថ្ងៃទី 25 (Online) នៃខែបន្ទាប់
• បង់: ធនាគារដៃគូ GDT · e-Payment · Prefiling App`,
  },
  {
    term: "មូលដ្ឋានគិតអាករ — ទំនិញក្នុងស្រុក",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `មូលដ្ឋានគិតអាករ = 90% × តម្លៃផ្គត់ផ្គង់
(ដោយ មិន រួមបញ្ចូល VAT · PLT · អាករពិសេសខ្លួនឯង)

ឧទាហរណ៍: ស្រាបៀរ 1,000 ករ តម្លៃ $10,000
→ មូលដ្ឋាន = $10,000 × 90% = $9,000
→ អាករ = $9,000 × 30% = $2,700

ហេតុអ្វី × 90%?
→ ស្មើនឹងដក Margin 10% ដែលជា profit/overhead
→ ដើម្បីមិនអាករពីរដង (Double Taxation)`,
  },
  {
    term: "មូលដ្ឋានគិតអាករ — ទំនិញនាំចូល",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `មូលដ្ឋានគិតអាករ = CIF + ពន្ធនាំចូល
(CIF = Cost + Insurance + Freight)
→ គណនាតាម Custom Valuation Law
→ មិន × 90% ដូចទំនិញក្នុងស្រុក

ឧទាហរណ៍: CIF $5,000 + ពន្ធនាំចូល $500 = $5,500
→ អាករពិសេស (ស្រា) = $5,500 × 35% = $1,925`,
  },
  {
    term: "មូលដ្ឋានគិតអាករ — សេវា",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `មូលដ្ឋានគិតអាករ = ថ្លៃសេវាក្នុង Invoice
(ដោយ មិន ទាន់គិត VAT + អាករពិសេស)

• Telecom: 3% × ថ្លៃ Call/Data/SMS
• Airline: 10% × ថ្លៃសំបុត្រ
• Entertainment: 10% × ថ្លៃចូល/សេវា

ឧទាហរណ៍: សំបុត្រយន្តហោះ $1,000
→ អាករ = $1,000 × 10% = $100`,
  },
  {
    term: "ករណីលើកលែង (Personal Allowance)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `បុគ្គលគ្មានកាតព្វកិច្ចចុះបញ្ជីពន្ធ
អាចនាំចូលដោយមិនជាប់អាករពិសេស:
• បារី: 200 ដើម
• ស៊ីហ្គា: 50 ដើម
• ស្រា: 2 លីត្រ
→ លើសពីនេះ → ជាប់អាករពិសេស`,
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
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  barTrack: { height: 16, borderRadius: 999, overflow: "hidden", display: "flex", background: "#E2E8F0", marginBottom: 10 },
  barLabels: { display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, color: "#475569", flexWrap: "wrap", fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
};

const INFO_CARDS = [
  { icon: "🍷", bg: "#FEF2F2", title: "ស្រា / Wine",        value: "35%",  note: "អត្រាអាករពិសេសខ្ពស់បំផុត" },
  { icon: "🍺", bg: "#FFFBEB", title: "ស្រាបៀរ",            value: "30%",  note: "លើ 90% × តម្លៃផ្គត់ផ្គង់" },
  { icon: "🚬", bg: "#F0FDF4", title: "បារី / ស៊ីហ្គា",     value: "20–25%", note: "ស៊ីហ្គា 25% · បារី 20%" },
  { icon: "✈️", bg: "#EFF6FF", title: "សំបុត្រ Airline",    value: "10%",  note: "ថ្លៃសំបុត្រ (មិនរួម VAT)" },
  { icon: "📅", bg: "#FAF5FF", title: "ថ្ងៃប្រកាស",          value: "ទី 20/25", note: "ផ្ទាល់: 20 · Online: 25 ខែបន្ទាប់" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — អាករពិសេស</span>
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

// ── RESULT BLOCK ──────────────────────────────────────────────
function ResultBlock({ label, invoiceAmt, taxBase, taxAmt, taxRate, baseType, currency }) {
  const taxPct = invoiceAmt > 0 ? Math.min((taxAmt / invoiceAmt) * 100, 100) : 0;
  const netPct = 100 - taxPct;
  const c = currency === "KHR" ? fmtKHR : (v => "$" + fmt(v));

  return (
    <>
      <div style={S.metricGrid}>
        <div style={S.metric}>
          <div style={S.mLabel}>ចំនួនទឹកប្រាក់ Invoice</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{c(invoiceAmt)}</div>
        </div>
        <div style={S.metric}>
          <div style={S.mLabel}>មូលដ្ឋានគិតអាករ</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{c(taxBase)}</div>
        </div>
        <div style={S.metric}>
          <div style={S.mLabel}>អាករពិសេស ({(taxRate * 100).toFixed(0)}%)</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{c(taxAmt)}</div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>ប្រៀបធៀបអាករពិសេស vs តម្លៃ</div>
        <div style={S.barTrack}>
          <div style={{ width: taxPct.toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width .4s" }} />
          <div style={{ width: netPct.toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width .4s" }} />
        </div>
        <div style={S.barLabels}>
          <span>🔴 អាករពិសេស: {taxPct.toFixed(1)}%</span>
          <span>🟢 តម្លៃក្រោយដក: {netPct.toFixed(1)}%</span>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>តារាងលម្អិត</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ការគណនា</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
          <tbody>
            <tr>
              <td style={S.td}>ចំនួនទឹកប្រាក់ Invoice (excl. ET)</td>
              <td style={S.td}>—</td>
              <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{c(invoiceAmt)}</td>
            </tr>
            <tr>
              <td style={S.td}>
                {baseType === "domestic"
                  ? "មូលដ្ឋានគិតអាករ (× 90%)"
                  : baseType === "import"
                  ? "មូលដ្ឋានគិតអាករ (CIF + ពន្ធនាំចូល)"
                  : "មូលដ្ឋានគិតអាករ (ថ្លៃសេវា)"}
              </td>
              <td style={S.td}>
                {baseType === "domestic"
                  ? `${c(invoiceAmt)} × 90%`
                  : baseType === "import"
                  ? "CIF + Import Duty"
                  : c(invoiceAmt)}
              </td>
              <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{c(taxBase)}</td>
            </tr>
            <tr>
              <td style={S.td}>អត្រាអាករពិសេស</td>
              <td style={S.td}>{(taxRate * 100).toFixed(0)}%</td>
              <td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{c(taxAmt)}</td>
            </tr>
          </tbody>
        </table>
        <div style={S.dedTotal}>
          <span>អាករពិសេសត្រូវបង់ ({c(taxBase)} × {(taxRate * 100).toFixed(0)}%)</span>
          <span>{c(taxAmt)}</span>
        </div>
        <div style={S.note}>
          <strong>រូបមន្ត:</strong><br />
          {baseType === "domestic"
            ? <>• មូលដ្ឋាន = {c(invoiceAmt)} × 90% = {c(taxBase)}<br /></>
            : baseType === "import"
            ? <>• មូលដ្ឋាន = CIF + ពន្ធនាំចូល = {c(taxBase)}<br /></>
            : <>• មូលដ្ឋាន = ថ្លៃសេវា = {c(taxBase)}<br /></>
          }
          • អាករ = {c(taxBase)} × {(taxRate * 100).toFixed(0)}% = <strong>{c(taxAmt)}</strong><br /><br />
          ប្រកាស និងបង់ ប្រចាំខែ — ផ្ទាល់: <strong>ថ្ងៃទី 20</strong> | Online: <strong>ថ្ងៃទី 25</strong> នៃខែបន្ទាប់
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 1 — DOMESTIC GOODS
// ══════════════════════════════════════════════════════════════
function DomesticTab() {
  const [goodsType, setGoodsType] = useState("beer");
  const [amount,    setAmount]    = useState("");
  const [currency,  setCurrency]  = useState("USD");
  const [result,    setResult]    = useState(null);

  function calculate() {
    const amt = n(amount);
    if (!amt) return;
    const gr = GOODS_RATES.find(r => r.id === goodsType);
    if (!gr.rate) {
      setResult({ noRate: true, label: gr.label });
      return;
    }
    const taxBase = amt * 0.90;
    const taxAmt  = taxBase * gr.rate;
    setResult({ invoiceAmt: amt, taxBase, taxAmt, taxRate: gr.rate, currency });
  }

  const selectedRate = GOODS_RATES.find(r => r.id === goodsType);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានទំនិញ — ផលិត/ចែកចាយក្នុងស្រុក</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទទំនិញ</label>
            <select style={S.select} value={goodsType} onChange={e => { setGoodsType(e.target.value); setResult(null); }}>
              {GOODS_RATES.map(r => <option key={r.id} value={r.id}>{r.label} {r.rate ? `(${(r.rate * 100).toFixed(0)}%)` : "(អត្រាផ្ទាល់)"}</option>)}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="USD">ដុល្លារ ($)</option>
              <option value="KHR">រៀល (៛)</option>
            </select>
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>
            តម្លៃផ្គត់ផ្គង់ក្នុង Invoice ({currency === "USD" ? "$" : "៛"}) — មិនរួម VAT · PLT · ET
          </label>
          <input style={S.input} type="number"
            placeholder={currency === "USD" ? "ឧ: 10000" : "ឧ: 40000000"}
            value={amount} onChange={e => { setAmount(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • មូលដ្ឋានគិតអាករ = <strong>90%</strong> × តម្លៃ Invoice<br />
          {selectedRate && !selectedRate.rate
            ? <><strong style={{ color: "#92400E" }}>⚠ ទំនិញប្រភេទនេះ: អត្រាកំណត់ដាច់ដោយឡែក — សូមពិនិត្យ Prakas GDT</strong></>
            : <>• អាករ = មូលដ្ឋាន × <strong>{selectedRate ? (selectedRate.rate * 100).toFixed(0) : "—"}%</strong></>
          }<br />
          • មិន​រួម​ VAT · PLT · អាករពិសេស​ខ្លួន​ឯ​ង ក្នុង​ Invoice
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាអាករពិសេស — ទំនិញក្នុងស្រុក</button>
      {result && result.noRate ? (
        <div style={{ ...S.card }}>
          <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 16, color: "#92400E", lineHeight: 1.7, fontSize: 13, fontFamily: FONT }}>
            ⚠ <strong>{result.label}</strong><br />
            ទំនិញប្រភេទនេះ ជាប់អាករពិសេស តែ <strong>អត្រាត្រូវកំណត់ដាច់ដោយឡែក</strong> ដោយ Prakas GDT
            (Sub-decree / Announcement) ដែលមិនបានចុះក្នុងបញ្ជីអត្រាទូទៅ។<br />
            → សូមពិនិត្យ Prakas ពន្ធដារ ឬ ទំនាក់ទំនង GDT ដើម្បីបញ្ជាក់អត្រា។
          </div>
        </div>
      ) : result ? (
        <ResultBlock {...result} baseType="domestic" label="ទំនិញក្នុងស្រុក" />
      ) : null}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — IMPORTED GOODS
// ══════════════════════════════════════════════════════════════
function ImportTab() {
  const [goodsType,   setGoodsType]   = useState("beer_i");
  const [cifAmount,   setCifAmount]   = useState("");
  const [importDuty,  setImportDuty]  = useState("");
  const [currency,    setCurrency]    = useState("USD");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const cif  = n(cifAmount);
    const duty = n(importDuty);
    if (!cif) return;
    const gr = IMPORT_RATES.find(r => r.id === goodsType);
    if (!gr.rate) {
      setResult({ noRate: true, label: gr.label });
      return;
    }
    const taxBase = cif + duty;
    const taxAmt  = taxBase * gr.rate;
    setResult({ invoiceAmt: cif, taxBase, taxAmt, taxRate: gr.rate, currency, duty });
  }

  const selectedRate = IMPORT_RATES.find(r => r.id === goodsType);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានទំនិញ — នាំចូល</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទទំនិញ</label>
            <select style={S.select} value={goodsType} onChange={e => { setGoodsType(e.target.value); setResult(null); }}>
              {IMPORT_RATES.map(r => <option key={r.id} value={r.id}>{r.label} {r.rate ? `(${(r.rate * 100).toFixed(0)}%)` : "(អត្រាផ្ទាល់)"}</option>)}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="USD">ដុល្លារ ($)</option>
              <option value="KHR">រៀល (៛)</option>
            </select>
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>តម្លៃ CIF ({currency === "USD" ? "$" : "៛"})</label>
            <input style={S.input} type="number" placeholder="ឧ: 5000"
              value={cifAmount} onChange={e => { setCifAmount(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ពន្ធនាំចូល ({currency === "USD" ? "$" : "៛"})</label>
            <input style={S.input} type="number" placeholder="ឧ: 500"
              value={importDuty} onChange={e => { setImportDuty(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.note}>
          • មូលដ្ឋានគិតអាករ = <strong>CIF + ពន្ធនាំចូល</strong> (គ្មាន × 90%)<br />
          {selectedRate && !selectedRate.rate
            ? <><strong style={{ color: "#92400E" }}>⚠ ទំនិញប្រភេទនេះ: អត្រាកំណត់ដាច់ដោយឡែក — សូមពិនិត្យ Prakas GDT</strong></>
            : <>• អាករ = (CIF + ពន្ធនាំចូល) × <strong>{selectedRate ? (selectedRate.rate * 100).toFixed(0) : "—"}%</strong></>
          }<br />
          • CIF = Cost + Insurance + Freight
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាអាករពិសេស — ទំនិញនាំចូល</button>
      {result && result.noRate ? (
        <div style={S.card}>
          <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 16, color: "#92400E", lineHeight: 1.7, fontSize: 13, fontFamily: FONT }}>
            ⚠ <strong>{result.label}</strong><br />
            ទំនិញប្រភេទនេះ ជាប់អាករពិសេស តែ <strong>អត្រាត្រូវកំណត់ដាច់ដោយឡែក</strong> ដោយ Prakas GDT។<br />
            → សូមពិនិត្យ Prakas ពន្ធដារ ឬ ទំនាក់ទំនង GDT ដើម្បីបញ្ជាក់អត្រា។
          </div>
        </div>
      ) : result ? (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>CIF</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.currency === "KHR" ? fmtKHR(result.invoiceAmt) : "$" + fmt(result.invoiceAmt)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ពន្ធនាំចូល</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f97316", fontFamily: FONT }}>{result.currency === "KHR" ? fmtKHR(result.duty) : "$" + fmt(result.duty)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>មូលដ្ឋានគិតអាករ</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{result.currency === "KHR" ? fmtKHR(result.taxBase) : "$" + fmt(result.taxBase)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>អាករពិសេស ({(result.taxRate * 100).toFixed(0)}%)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{result.currency === "KHR" ? fmtKHR(result.taxAmt) : "$" + fmt(result.taxAmt)}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>CIF (Cost + Insurance + Freight)</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "KHR" ? fmtKHR(result.invoiceAmt) : "$" + fmt(result.invoiceAmt)}</td></tr>
                <tr><td style={S.td}>+ ពន្ធនាំចូល (Import Duty)</td><td style={{ ...S.td, color: "#f97316", fontWeight: 700 }}>{result.currency === "KHR" ? fmtKHR(result.duty) : "$" + fmt(result.duty)}</td></tr>
                <tr><td style={{ ...S.td, fontWeight: 700 }}>= មូលដ្ឋានគិតអាករ</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.currency === "KHR" ? fmtKHR(result.taxBase) : "$" + fmt(result.taxBase)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>អាករពិសេសត្រូវបង់ × {(result.taxRate * 100).toFixed(0)}%</span>
              <span>{result.currency === "KHR" ? fmtKHR(result.taxAmt) : "$" + fmt(result.taxAmt)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្ត:</strong><br />
              • មូលដ្ឋាន = {result.currency === "KHR" ? fmtKHR(result.invoiceAmt) : "$" + fmt(result.invoiceAmt)} + {result.currency === "KHR" ? fmtKHR(result.duty) : "$" + fmt(result.duty)} = {result.currency === "KHR" ? fmtKHR(result.taxBase) : "$" + fmt(result.taxBase)}<br />
              • អាករ = {result.currency === "KHR" ? fmtKHR(result.taxBase) : "$" + fmt(result.taxBase)} × {(result.taxRate * 100).toFixed(0)}% = <strong>{result.currency === "KHR" ? fmtKHR(result.taxAmt) : "$" + fmt(result.taxAmt)}</strong><br /><br />
              ប្រកាស/បង់ — ផ្ទាល់: <strong>ថ្ងៃទី 20</strong> | Online: <strong>ថ្ងៃទី 25</strong> នៃខែបន្ទាប់
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
// ══════════════════════════════════════════════════════════════
function ServiceTab() {
  const [svcType,  setSvcType]  = useState("airline");
  const [amount,   setAmount]   = useState("");
  const [currency, setCurrency] = useState("USD");
  const [result,   setResult]   = useState(null);

  function calculate() {
    const amt = n(amount);
    if (!amt) return;
    const sr     = SERVICE_RATES.find(r => r.id === svcType);
    const taxAmt = amt * sr.rate;
    setResult({ invoiceAmt: amt, taxBase: amt, taxAmt, taxRate: sr.rate, currency });
  }

  const selectedRate = SERVICE_RATES.find(r => r.id === svcType);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានសេវា</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទសេវា</label>
            <select style={S.select} value={svcType} onChange={e => { setSvcType(e.target.value); setResult(null); }}>
              {SERVICE_RATES.map(r => <option key={r.id} value={r.id}>{r.label} ({(r.rate * 100).toFixed(0)}%)</option>)}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="USD">ដុល្លារ ($)</option>
              <option value="KHR">រៀល (៛)</option>
            </select>
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>
            ថ្លៃសេវាក្នុង Invoice ({currency === "USD" ? "$" : "៛"}) — មិនរួម VAT · ET
          </label>
          <input style={S.input} type="number"
            placeholder={currency === "USD" ? "ឧ: 1000" : "ឧ: 4000000"}
            value={amount} onChange={e => { setAmount(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • មូលដ្ឋានគិតអាករ = <strong>ថ្លៃសេវា Invoice</strong> (គ្មាន × 90%)<br />
          • អាករ = ថ្លៃសេវា × <strong>{selectedRate ? (selectedRate.rate * 100).toFixed(0) : "—"}%</strong><br />
          • ឧ: Telecom 3% · Airline 10% · Entertainment 10%
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាអាករពិសេស — សេវា</button>
      {result && <ResultBlock {...result} baseType="service" label="សេវា" />}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — RATE REFERENCE TABLE
// ══════════════════════════════════════════════════════════════
function RatesTab() {
  const RATE_ROWS = [
    { cat: "ទំនិញ", name: "ស្រា (Wine/Spirits)",        rate: "35%",       base: "90% × Invoice", color: "#c0392b" },
    { cat: "ទំនិញ", name: "ស្រាបៀរ",                   rate: "30%",       base: "90% × Invoice", color: "#c0392b" },
    { cat: "ទំនិញ", name: "ស៊ីហ្គា",                    rate: "25%",       base: "90% × Invoice", color: "#92400E" },
    { cat: "ទំនិញ", name: "បារី",                        rate: "20%",       base: "90% × Invoice", color: "#92400E" },
    { cat: "ទំនិញ", name: "ភេស្ជៈប៉ូវកម្លាំង",          rate: "15%",       base: "90% × Invoice", color: "#0B1F4E" },
    { cat: "ទំនិញ", name: "ភេស្ជៈគ្មានជាតិសុរា",        rate: "10%",       base: "90% × Invoice", color: "#0B1F4E" },
    { cat: "ទំនិញ", name: "ទឹកផ្លែឈើ",                  rate: "5%",        base: "90% × Invoice", color: "#166534" },
    { cat: "ទំនិញ", name: "ផលិតផលប្លាស្ទិក",            rate: "10%",       base: "90% × Invoice", color: "#0B1F4E" },
    { cat: "ទំនិញ", name: "ស៊ីម៉ងត៍",                   rate: "5%",        base: "90% × Invoice", color: "#166534" },
    { cat: "ទំនិញ", name: "គ្រឿងអេឡិចត្រូនិក",          rate: "Prakas",    base: "90% × Invoice", color: "#64748B" },
    { cat: "ទំនិញ", name: "ទោចក្រយានយន្ត",              rate: "Prakas",    base: "90% × Invoice", color: "#64748B" },
    { cat: "ទំនិញ", name: "រថយន្ត",                      rate: "Prakas",    base: "90% × Invoice", color: "#64748B" },
    { cat: "ទំនិញ", name: "គ្រឿងបន្លាស់យានយន្ត",        rate: "Prakas",    base: "90% × Invoice", color: "#64748B" },
    { cat: "ទំនិញ", name: "ផលិតផលគ្រឿងសម្អាង",          rate: "Prakas",    base: "90% × Invoice", color: "#64748B" },
    { cat: "ទំនិញ", name: "ផលិតផលកញ្ចក់ (គ្រឿងសំណង់)", rate: "Prakas",    base: "90% × Invoice", color: "#64748B" },
    { cat: "សេវា",  name: "ទូរគមនាគមន៍ (Telecom)",       rate: "3%",        base: "ថ្លៃសេវា Invoice", color: "#166534" },
    { cat: "សេវា",  name: "Airline (ដឹកជញ្ជូន)",          rate: "10%",       base: "ថ្លៃសំបុត្រ",    color: "#0B1F4E" },
    { cat: "សេវា",  name: "លំហែកម្សាន្ត (Entertainment)", rate: "10%",       base: "ថ្លៃសេវា/ចូល",  color: "#0B1F4E" },
  ];

  return (
    <div style={S.card}>
      <div style={S.cardTitle}>តារាងអត្រាអាករពិសេស — ឯកសារយោង</div>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.th}>ប្រភេទ</th>
            <th style={S.th}>ទំនិញ / សេវា</th>
            <th style={S.th}>អត្រា</th>
            <th style={S.th}>មូលដ្ឋានគិតអាករ</th>
          </tr>
        </thead>
        <tbody>
          {RATE_ROWS.map((r, i) => (
            <tr key={i}>
              <td style={{ ...S.td, fontSize: 12, color: "#64748B" }}>{r.cat}</td>
              <td style={S.td}>{r.name}</td>
              <td style={{ ...S.td, color: r.color, fontWeight: 700 }}>{r.rate}</td>
              <td style={{ ...S.td, fontSize: 12, color: "#475569" }}>{r.base}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={S.note}>
        <strong>មូលដ្ឋានគិតអាករ:</strong><br />
        • ក្នុងស្រុក: <strong>90%</strong> × តម្លៃ Invoice (excl. VAT · PLT · ET)<br />
        • នាំចូល: <strong>CIF + ពន្ធនាំចូល</strong> (គ្មាន × 90%)<br />
        • សេវា: <strong>ថ្លៃសេវា Invoice</strong> (excl. VAT · ET)<br /><br />
        <strong>ករណីលើកលែង (បុគ្គលគ្មានកាតព្វកិច្ច):</strong> បារី ≤ 200 ដើម · ស៊ីហ្គា ≤ 50 ដើម · ស្រា ≤ 2 លីត្រ
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function SpecialTaxPage({ setPage }) {
  const [tab, setTab] = useState("domestic");

  const TABS = [
    { id: "domestic", label: " ទំនិញក្នុងស្រុក" },
    { id: "import",   label: " ទំនិញនាំចូល" },
    { id: "service",  label: " សេវា" },
    { id: "rates",    label: " តារាងអត្រា" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>អាករពិសេស </div>
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

        {/* DEFINITION ACCORDION */}
        <DefSection />

        {/* TABS */}
        <div style={S.tabRow}>
          {TABS.map(t => (
            <button key={t.id} style={tab === t.id ? S.tabOn : S.tab} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {tab === "domestic" && <DomesticTab />}
        {tab === "import"   && <ImportTab />}
        {tab === "service"  && <ServiceTab />}
        {tab === "rates"    && <RatesTab />}

      </div>
    </div>
  );
}