import { useState } from "react";

// ── TAX BRACKETS (Sub-decree 48, 2024) ───────────────────────
const BRACKETS = [
  { max: 1500000,  rate: 0.00, offset: 0,       label: "0 – 1,500,000" },
  { max: 2000000,  rate: 0.05, offset: 75000,   label: "1,500,001 – 2,000,000" },
  { max: 8500000,  rate: 0.10, offset: 175000,  label: "2,000,001 – 8,500,000" },
  { max: 12500000, rate: 0.15, offset: 600000,  label: "8,500,001 – 12,500,000" },
  { max: Infinity, rate: 0.20, offset: 1225000, label: "លើសពី 12,500,000" },
];
const OFFSET_LABELS = ["—", "75,000", "175,000", "600,000", "1,225,000"];

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

function fmt(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── TAX ENGINE ────────────────────────────────────────────────
function calcResidentTax(taxable) {
  let activeBracket = 0;
  const bracketDetails = [];

  for (let i = 0; i < BRACKETS.length; i++) {
    const b    = BRACKETS[i];
    const low  = i === 0 ? 0 : BRACKETS[i - 1].max;
    const high = b.max === Infinity ? taxable : b.max;
    const portion = Math.max(0, Math.min(taxable, high) - low);
    bracketDetails.push({
      portion,
      taxInBracket: portion * b.rate,
      reached: taxable > low,
    });
    if (taxable <= b.max || b.max === Infinity) {
      activeBracket = i;
      break;
    }
  }

  const ab  = BRACKETS[activeBracket];
  const tax = taxable > 0 ? Math.max(0, taxable * ab.rate - ab.offset) : 0;
  return { tax, activeBracket, bracketDetails };
}

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "ពន្ធលើប្រាក់បៀវត្ស (Salary Tax / ToS)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធលើប្រាក់បៀវត្ស គឺជាពន្ធប្រចាំខែ
អនុវត្តលើប្រាក់ដែលនិយោជិតទទួលបាន
ក្នុងក្របខ័ណ្ឌបំពេញសកម្មភាពការងារ។
• និវាសនជន: ជាប់ពន្ធប្រភពកម្ពុជា + បរទេស
• អនិវាសនជន: ជាប់ 20% (ប្រភពកម្ពុជា)
• ប្រកាស/បង់: ផ្ទាល់ ថ្ងៃទី 20 · Online ថ្ងៃទី 25
• ជំនួស: និយោជក (Withholding) មុនបើកប្រាក់`,
  },
  {
    term: "ប្រាក់បៀវត្ស (Salary) — និយមន័យទូលំទូលាយ",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `ប្រាក់បៀវត្ស រួមមាន ៖
• បៀវត្សមូលដ្ឋាន · ប្រាក់ឈ្នួល
• លាភការ (Commission) · ប្រាក់រង្វាន់
• ប្រាក់បំណាច់ (Allowance/Severance)
• បុព្វលាភ (Incentive/Bonus)
• ប្រាក់ម៉ោងបន្ថែម (Overtime) — លើកលែង
• ប្រាក់ប៉ះប៉ូវ (Hardship Allowance)
• ប្រាក់បុរេប្រទាន (Advance) — ជាប់ពន្ធ
• អត្ថប្រយោជន៍បន្ថែម (Fringe Benefits) — 20%`,
  },
  {
    term: "ទាយជ្ជទាន (Deductions) — កូន + សហព័ទ្ធ",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ដក 150,000 ៛ / ខែ / នាក់ សម្រាប់:
① កូនក្នុងបន្ទុក (អាយុ < 14 ឬ និស្សិត < 25)
② សហព័ទ្ធជាមេផ្ទះ (មួយនាក់ប៉ុណ្ណោះ)

ឧ: សហព័ទ្ធ 1 + កូន 3
→ 150,000 × 4 = 600,000 ៛/ខែ
→ ដកចេញពីប្រាក់បៀវត្សសរុប

❌ មិនអនុញ្ញាត: សហព័ទ្ធធ្វើការ, ពុក-ម្តាយ`,
  },
  {
    term: "ប្រាក់បុរេប្រទាន + ប្រាក់ឧបត្ថម្ភដំណើរ",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `ប្រាក់បុរេប្រទាន (Advance Salary):
→ ជាប់ពន្ធ — គ្រប់ចំនួន
→ បូកបញ្ចូលក្នុងប្រាក់ជាប់ពន្ធ

ប្រាក់ឧបត្ថម្ភការធ្វើដំណើរ/បេសកកម្ម:
→ លើកលែង ប្រសិនបើ ≤ ប្រាក់ឧបត្ថម្ភរដ្ឋ
→ លើសពីកម្រិតរដ្ឋ → ជាប់ពន្ធ

អត្ថប្រយោជន៍បន្ថែម (Fringe Benefits):
→ ពន្ធ 20% flat — និយោជកបង់ (មិនកាត់)
→ ថ្លៃផ្ទះ · រថយន្ត · ការអប់រំ · ព្យាបាល`,
  },
  {
    term: "ករណីលើកលែងពន្ធ (Exemptions)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ប្រាក់/ប្រយោជន៍ ដែលមិនជាប់ពន្ធ:
① ប្រាក់សំណងចំណាយជាក់ស្តែង (Invoice)
② ប្រាក់បំណាច់ (ក្នុងកម្រិតច្បាប់ការងារ)
③ ប្រាក់ម៉ោងបន្ថែម (Overtime)
④ ការធ្វើដំណើរ ↔ ការងារ (ក្នុងកម្រិត)
⑤ អាហារ (ផ្តល់ស្មើបុគ្គលិកទាំងអស់)
⑥ NSSF / ធានារ៉ាប់រង (ស្មើគ្នា)
⑦ ទារកដ្ឋាន (តាមច្បាប់ការងារ)
⑧ ការទូត / NGO / អង្គការអន្តរជាតិ`,
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
  card: { background: "#FFFFFF", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,.04)" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 16, fontFamily: FONT },
  tabRow: { display: "flex", justifyContent: "flex-start", gap: 10, marginBottom: 24, flexWrap: "wrap" },
  tab: { padding: "12px 20px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#64748B", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: FONT },
  tabOn: { padding: "12px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#FFFFFF", cursor: "pointer", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 12px rgba(37,99,235,.2)", fontFamily: FONT },
  row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteWarn: { background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 14, color: "#991B1B", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteGreen: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 14, color: "#166534", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  barTrack: { height: 16, borderRadius: 999, overflow: "hidden", display: "flex", background: "#E2E8F0" },
  barLabels: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 10, color: "#475569", fontSize: 13, flexWrap: "wrap", fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  tdActive: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #DBEAFE", background: "#EFF6FF", color: "#1E40AF", fontWeight: 700, fontFamily: FONT },
  dedRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 13, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedRowTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#EFF6FF", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedVal:    { color: "#2563EB", fontWeight: 700 },
  dedValRed: { color: "#DC2626", fontWeight: 700 },
};

const INFO_CARDS = [
  { icon: "💰", bg: "#EFF6FF", title: "ប្រាក់បៀវត្ស ≤ 1.5 លាន",  value: "0%",         note: "មិនជាប់ពន្ធ" },
  { icon: "📊", bg: "#F0FDF4", title: "ថ្នាក់ខ្ពស់បំផុត",         value: "20%",        note: "លើស 12.5 លាន ៛/ខែ" },
  { icon: "👨‍👩‍👧", bg: "#FAF5FF", title: "ទាយជ្ជទាន/នាក់",        value: "150,000 ៛",  note: "កូន + សហព័ទ្ធជាមេផ្ទះ" },
  { icon: "🏢", bg: "#FFFBEB", title: "អនិវាសនជន",                value: "20% ",    note: "លើប្រាក់បៀវត្សប្រភពខ្មែរ" },
  { icon: "📅", bg: "#FEF2F2", title: "ថ្ងៃប្រកាស",                value: "ទី 20/25",   note: "ផ្ទាល់ 20 · Online 25 ខែបន្ទាប់" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — ពន្ធលើប្រាក់បៀវត្ស</span>
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
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function SalaryTaxPage({ setPage }) {
  const [taxType,  setTaxType]  = useState("resident");

  // Resident fields
  const [salary,   setSalary]   = useState("");
  const [bonus,    setBonus]    = useState("");
  const [advance,  setAdvance]  = useState("");   // ប្រាក់បុរេប្រទាន
  const [overtime, setOvertime] = useState("");   // OT — លើកលែងពន្ធ
  const [fringe,   setFringe]   = useState("");
  const [travel,   setTravel]   = useState("");   // ប្រាក់ឧបត្ថម្ភដំណើរ (exempt)
  const [spouse,   setSpouse]   = useState(0);
  const [children, setChildren] = useState(0);

  // Non-resident field
  const [nrSalary, setNrSalary] = useState("");

  const [result, setResult] = useState(null);

  function calculate() {
    if (taxType === "nonresident") {
      const sal  = n(nrSalary);
      const tax  = sal * 0.20;
      const net  = sal - tax;
      setResult({
        type: "nonresident",
        taxable: sal, tax, net,
        taxPct: sal > 0 ? (tax / sal) * 100 : 0,
      });
      return;
    }

    const sal  = n(salary);
    const bon  = n(bonus);
    const adv  = n(advance);
    const ot   = n(overtime);   // OT — exempt, not in taxable
    const fri  = n(fringe);
    // travel is exempt — shown in deduction detail but not added to taxable

    const gross      = sal + bon + adv;                    // advance is taxable, OT is NOT
    const deductions = (spouse + children) * 150000;
    const taxable    = Math.max(0, gross - deductions);

    const res        = calcResidentTax(taxable);
    const fringeTax  = fri * 0.20;
    const totalTax   = res.tax + fringeTax;
    const net        = sal + bon + ot - totalTax;          // OT included in take-home
    const base       = sal + bon;

    const ab = BRACKETS[res.activeBracket];
    let formulaNote = taxable <= 1500000
      ? "មូលដ្ឋានគិតពន្ធស្ថិតក្នុងថ្នាក់ 0% — មិនមានកាតព្វកិច្ចបង់ពន្ធឡើយ។"
      : `ពន្ធ = ${Math.round(taxable).toLocaleString()} × ${(ab.rate * 100).toFixed(0)}% − ${OFFSET_LABELS[res.activeBracket]} = ${fmt(res.tax)}`;
    if (fringeTax > 0)
      formulaNote += `   |   ពន្ធ Fringe = ${fmt(fri)} × 20% = ${fmt(fringeTax)}`;

    setResult({
      type: "resident",
      taxable, tax: totalTax, net,
      taxPct: base > 0 ? Math.min((totalTax / base) * 100, 100) : 0,
      sal, bon, adv, ot, fri, fringeTax,
      travel: n(travel),
      spouse, children, deductions,
      bracketDetails: res.bracketDetails,
      activeBracket:  res.activeBracket,
      salaryTax:      res.tax,
      formulaNote,
    });
  }

  function reset() { setResult(null); }

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK */}
        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>
            ← ត្រឡប់ទៅទំព័រដើម
          </button>
        </div>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>ពន្ធលើប្រាក់បៀវត្ស </div>
          <div style={S.hSub}> </div>
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

        {/* TAXPAYER TYPE */}
        <div style={S.card}>
          <div style={S.cardTitle}>ប្រភេទអ្នកបង់ពន្ធ</div>
          <div style={S.tabRow}>
            <button style={taxType === "resident" ? S.tabOn : S.tab}
              onClick={() => { setTaxType("resident"); reset(); }}>
              និវាសនជន — អ្នកនៅក្នុងប្រទេស (អត្រាកំណើន)
            </button>
            <button style={taxType === "nonresident" ? S.tabOn : S.tab}
              onClick={() => { setTaxType("nonresident"); reset(); }}>
              អនិវាសនជន — អ្នកនៅក្រៅប្រទេស (ថេរ 20%)
            </button>
          </div>

          {/* ── RESIDENT FORM ── */}
          {taxType === "resident" && (
            <>
              <div style={S.cardTitle}>ប្រាក់ចំណូល</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់បៀវត្សមូលដ្ឋាន (៛/ខែ)</label>
                  <input style={S.input} type="number" placeholder="ឧ: 2500000"
                    value={salary} onChange={e => { setSalary(e.target.value); reset(); }} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់រង្វាន់ / ប្រាក់ឧបត្ថម្ភជាប់ពន្ធ (៛)</label>
                  <input style={S.input} type="number" placeholder="0"
                    value={bonus} onChange={e => { setBonus(e.target.value); reset(); }} />
                </div>
              </div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់បុរេប្រទាន — ជាប់ពន្ធ (៛)</label>
                  <input style={S.input} type="number" placeholder="0"
                    value={advance} onChange={e => { setAdvance(e.target.value); reset(); }} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់ម៉ោងបន្ថែម OT — លើកលែងពន្ធ (៛)</label>
                  <input style={S.input} type="number" placeholder="0"
                    value={overtime} onChange={e => { setOvertime(e.target.value); reset(); }} />
                </div>
              </div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>អត្ថប្រយោជន៍បន្ថែម Fringe — ពន្ធ 20% (៛)</label>
                  <input style={S.input} type="number" placeholder="0"
                    value={fringe} onChange={e => { setFringe(e.target.value); reset(); }} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់ឧបត្ថម្ភបេសកកម្ម / ដំណើរ — លើកលែង (៛)</label>
                  <input style={S.input} type="number" placeholder="0"
                    value={travel} onChange={e => { setTravel(e.target.value); reset(); }} />
                </div>
              </div>

              <div style={{ ...S.cardTitle, marginTop: 8 }}>
                ការកាត់បន្ថយ — 150,000 ៛/នាក់/ខែ
              </div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>សហព័ទ្ធ (ប្តី/ប្រពន្ធ មិនធ្វើការ)</label>
                  <select style={S.select} value={spouse}
                    onChange={e => { setSpouse(parseInt(e.target.value)); reset(); }}>
                    <option value={0}>មិនមាន</option>
                    <option value={1}>មាន — កាត់ 150,000 ៛</option>
                  </select>
                </div>
                <div style={S.field}>
                  <label style={S.label}>
                    កូនក្នុងបន្ទុក (អាយុ {"<"} 14 ឬ និស្សិត {"<"} 25) — នាក់
                    {children > 0 && <span style={{ color: "#2563EB", marginLeft: 8 }}>កាត់ {(children * 150000).toLocaleString()} ៛</span>}
                  </label>
                  <input style={S.input} type="number" min="0" placeholder="ឧ: 3"
                    value={children === 0 ? "" : children}
                    onChange={e => { setChildren(Math.max(0, parseInt(e.target.value) || 0)); reset(); }} />
                </div>
              </div>
              <div style={S.note}>
                • ប្រាក់ជាប់ពន្ធ = បៀវត្ស + រង្វាន់ + បុរេប្រទាន − ទាយជ្ជទាន<br />
                • ប្រាក់ម៉ោងបន្ថែម OT → <strong>លើកលែងពន្ធ</strong> បូករួមក្នុងប្រាក់សុទ្ធ<br />
                • Fringe Benefit → ពន្ធ 20% បង់ដោយ <strong>និយោជក</strong>
              </div>
            </>
          )}

          {/* ── NON-RESIDENT FORM ── */}
          {taxType === "nonresident" && (
            <>
              <div style={S.cardTitle}>ប្រាក់បៀវត្សមានប្រភពក្នុងប្រទេសកម្ពុជា</div>
              <div style={S.field}>
                <label style={S.label}>ប្រាក់បៀវត្សប្រចាំខែ (៛)</label>
                <input style={S.input} type="number" placeholder="ឧ: 4000000"
                  value={nrSalary} onChange={e => { setNrSalary(e.target.value); reset(); }} />
              </div>
              <div style={S.note}>
                អនិវាសនជន = ស្នាក់នៅតិចជាង <strong>182 ថ្ងៃ</strong> ក្នុង 12 ខែ។
                ជាប់ពន្ធ <strong>20% Flat</strong> — គ្មានទាយជ្ជទាន គ្មានថ្នាក់ (ស្លាយ 27)។
              </div>
            </>
          )}
        </div>

        <button style={S.btn} onClick={calculate}>គណនាពន្ធលើប្រាក់បៀវត្ស</button>

        {/* ── RESULTS ── */}
        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>មូលដ្ឋានគិតពន្ធ</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.taxable)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ប្រាក់ពន្ធត្រូវបង់</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.tax)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ប្រាក់បៀវត្សសុទ្ធ</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a7a4a", fontFamily: FONT }}>{fmt(result.net)}</div>
              </div>
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>ប្រៀបធៀបប្រាក់ពន្ធ និងប្រាក់បៀវត្សសុទ្ធ</div>
              <div style={S.barTrack}>
                <div style={{ width: result.taxPct.toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width .4s" }} />
                <div style={{ width: (100 - result.taxPct).toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width .4s" }} />
              </div>
              <div style={S.barLabels}>
                <span>🔴 ពន្ធ: {result.taxPct.toFixed(1)}%</span>
                <span>🟢 ប្រាក់សុទ្ធ: {(100 - result.taxPct).toFixed(1)}%</span>
              </div>
            </div>

            {/* DEDUCTION BREAKDOWN — resident */}
            {result.type === "resident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>ព័ត៌មានលម្អិតមូលដ្ឋានគិតពន្ធ</div>
                <div style={S.dedRow}><span>ប្រាក់បៀវត្សមូលដ្ឋាន</span><span style={S.dedVal}>{fmt(result.sal)}</span></div>
                {result.bon  > 0 && <div style={S.dedRow}><span>+ ប្រាក់រង្វាន់ / ឧបត្ថម្ភ</span><span style={S.dedVal}>{fmt(result.bon)}</span></div>}
                {result.adv  > 0 && <div style={S.dedRow}><span>+ ប្រាក់បុរេប្រទាន (ជាប់ពន្ធ)</span><span style={S.dedVal}>{fmt(result.adv)}</span></div>}
                {result.ot   > 0 && <div style={S.dedRow}><span>+ ប្រាក់ម៉ោងបន្ថែម OT (លើកលែង)</span><span style={{ color: "#166534", fontWeight: 700 }}>{fmt(result.ot)}</span></div>}
                {result.travel > 0 && <div style={S.dedRow}><span>ប្រាក់ឧបត្ថម្ភដំណើរ (លើកលែង)</span><span style={{ color: "#166534", fontWeight: 700 }}>— {fmt(result.travel)}</span></div>}
                {result.spouse   > 0 && <div style={S.dedRow}><span>− ទាយជ្ជទានសហព័ទ្ធ (1 × 150,000)</span><span style={S.dedValRed}>−{fmt(150000)}</span></div>}
                {result.children > 0 && <div style={S.dedRow}><span>− ទាយជ្ជទានកូន ({result.children} × 150,000)</span><span style={S.dedValRed}>−{fmt(result.children * 150000)}</span></div>}
                {result.fri > 0 && <div style={S.dedRow}><span>ពន្ធ Fringe Benefit ({fmt(result.fri)} × 20%) — និយោជកបង់</span><span style={{ color: "#f97316", fontWeight: 700 }}>{fmt(result.fringeTax)}</span></div>}
                <div style={S.dedRowTotal}>
                  <span>មូលដ្ឋានគិតពន្ធ (Taxable Salary)</span>
                  <span style={S.dedVal}>{fmt(result.taxable)}</span>
                </div>
              </div>
            )}

            {/* BRACKET TABLE — resident */}
            {result.type === "resident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>តារាងថ្នាក់ពន្ធ (Progressive Rate)</div>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.th}>ថ្នាក់ពន្ធ (៛)</th>
                      <th style={S.th}>អត្រា</th>
                      <th style={S.th}>លំអៀងលើស</th>
                      <th style={S.th}>ប្រាក់ពន្ធក្នុងថ្នាក់</th>
                      <th style={S.th}>ស្ថានភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bracketDetails.map((bd, i) => {
                      const b        = BRACKETS[i];
                      const isActive = i === result.activeBracket && bd.reached;
                      const status   = !bd.reached
                        ? "មិនទាន់ដល់"
                        : isActive ? "ថ្នាក់សកម្ម ✓" : "ពេញ";
                      return (
                        <tr key={i}>
                          <td style={isActive ? S.tdActive : S.td}>{b.label} ៛</td>
                          <td style={isActive ? S.tdActive : S.td}>{(b.rate * 100).toFixed(0)}%</td>
                          <td style={{ ...(isActive ? S.tdActive : S.td), color: isActive ? "#1E40AF" : "#64748B" }}>{OFFSET_LABELS[i]} ៛</td>
                          <td style={isActive ? S.tdActive : S.td}>{bd.reached ? fmt(bd.taxInBracket) : "—"}</td>
                          <td style={isActive ? S.tdActive : S.td}>{status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={S.note}>{result.formulaNote}</div>
              </div>
            )}

            {/* NON-RESIDENT result note */}
            {result.type === "nonresident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>ព័ត៌មានការគណនា</div>
                <div style={S.dedRow}><span>ប្រាក់បៀវត្ស (ប្រភពកម្ពុជា)</span><span style={S.dedVal}>{fmt(result.taxable)}</span></div>
                <div style={S.dedRow}><span>អត្រាពន្ធ Flat</span><span style={S.dedVal}>20%</span></div>
                <div style={S.dedRowTotal}><span>ពន្ធ Withholding</span><span style={S.dedVal}>{fmt(result.tax)}</span></div>
                <div style={S.note}>
                  រូបមន្ត: {fmt(result.taxable)} × 20% = <strong>{fmt(result.tax)}</strong><br />
                  ប្រាក់សុទ្ធ = {fmt(result.taxable)} − {fmt(result.tax)} = <strong>{fmt(result.net)}</strong>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}