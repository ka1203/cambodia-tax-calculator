import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";
const TAX_RATE = 0.04;

function fmt(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function fmtUSD(v) {
  return v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " $";
}
function n(v) { return parseFloat(v) || 0; }

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS_IMMOVABLE = [
  {
    term: "ពន្ធប្រថាប់ត្រា — អចលនទ្រព្យ (Stamp Tax on Immovable Property)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធប្រថាប់ត្រា គឺជាពន្ធដែលត្រូវបង់នៅពេលមានការ
ទិញ-លក់ ដោះដូរ ឬធ្វើអំណោយ ឬដាក់ភាគហ៊ុនជា
អចលនទ្រព្យ (ដី ផ្ទះ អគារ សំណង់) ក្នុងក្រុមហ៊ុន។
• អត្រា: 4% នៃតម្លៃអចលនទ្រព្យសរុប
• ជាប់ពន្ធ: ការផ្ទេរទាំងអចលនទ្រព្យចុះបញ្ជី + មិនចុះបញ្ជី
• ជំនួស: ម្ចាស់ទទួលសិទ្ធិ (អ្នកទទួលទ្រព្យ)
• ថ្ងៃបង់: ក្នុង 3 ខែ ក្រោយ «ដីកាបញ្ជូន»`,
  },
  {
    term: "អចលនទ្រព្យ (Immovable Property)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `អចលនទ្រព្យ = ដី + ផ្ទះ + អគារ + សំណង់ផ្សេងៗ
→ ទោះចុះបញ្ជី (មានប័ណ្ណ) ឬ មិនចុះបញ្ជី (គ្មានប័ណ្ណ)
ការផ្ទេរ 2 ប្រភេទ:
① ចុះបញ្ជី → រដ្ឋបាលសុរិយោដី (រាជធានី/ខេត្ត)
② មិនចុះបញ្ជី → អាជ្ញាធរដែនដី (ក្រុង-ស្រុក-ខណ្ឌ)
មូលដ្ឋានគិតពន្ធ: ផ្អែកលើតម្លៃ MEF Annex
ឬ តម្លៃក្នុងកិច្ចសន្យា (យកតម្លៃខ្ពស់ជាង)`,
  },
  {
    term: "រង្វង់ញាតិ និងការលើកលែង (Family Circle Exemption)",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ការផ្ទេរក្នុងរង្វង់ញាតិ — លើកលែងពន្ធទាំងស្រុង:
① ឪពុកម្តាយ ↔ កូនបង្កើត
② ប្តី ↔ ប្រពន្ធ
③ យាយតា ↔ ចៅបង្កើត
④ ឪពុកម្តាយ + កូន + កូនប្រសា (ទ្រព្យរួម)
ករណីលើកលែងទាំងស្រុង:
• សន្តតិកម្ម (ទ្រព្យពីអ្នកស្លាប់) — ទាំង 4 ខាងលើ
• ប្រទានកម្ម លើកទី 1 — ទាំង 4 ខាងលើ`,
  },
  {
    term: "ការអនុគ្រោះ + ប្រទានកម្ម លើកទី 2 (Tax Concession)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ប្រទានកម្ម លើកទី 2 ឡើងទៅ (ក្នុងរង្វង់ញាតិ):
→ ដកចេញ 100,000,000 ៛ ≈ ពន្ធ 4,000,000 ៛

ការផ្ទេររវាង ឪពុកម្តាយក្មេក ↔ កូនប្រសា
ឬ បងប្អូនបង្កើត ↔ បងប្អូនបង្កើត:
• សន្តតិកម្ម: ដក 200,000,000 ៛ (ពន្ធ 8,000,000 ៛)
• ប្រទានកម្ម: ដក 100,000,000 ៛ (ពន្ធ 4,000,000 ៛)`,
  },
  {
    term: "សន្តតិកម្ម vs ប្រទានកម្ម (Inheritance vs Gift)",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `សន្តតិកម្ម = ការផ្ទេរអចលនទ្រព្យពី អ្នកស្លាប់ ទៅញាតិ
តាមរយៈ: បណ្តាំ / លិខិតយថាភូត / សាលក្រម
→ លើកលែងទាំងស្រុង ករណីក្នុងរង្វង់ញាតិ

ប្រទានកម្ម = ការផ្ទេរអចលនទ្រព្យពី អ្នករស់ ទៅញាតិ
ដោយ មិនយកថ្លៃ
→ លើកលែង ករណីលើកទី 1 ក្នុងរង្វង់ញាតិ
→ អនុគ្រោះ (ដក 100 លាន ៛) ករណីលើកទី 2 ឡើង`,
  },
];

const DEFS_MOVABLE = [
  {
    term: "ពន្ធប្រថាប់ត្រា — ចលនទ្រព្យ (Stamp Tax on Movable/Vehicle)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធប្រថាប់ត្រា លើចលនទ្រព្យ ជាពន្ធដែលត្រូវបង់
នៅពេលផ្ទេរកម្មសិទ្ធិ ឬ សិទ្ធិកាន់កាប់ មធ្យោបាយ
ដឹកជញ្ជូន/យានជំនិះ គ្រប់ប្រភេទ។
• អត្រា: 4% នៃមូលដ្ឋានគិតពន្ធ
• មូលដ្ឋាន: កំណត់ដោយ GDT (ប្រកាស 001 ឆ្នាំ 2013)
• ជំនួស: អ្នកទទួលសិទ្ធិ (អ្នកទិញ)
• ថ្ងៃបង់: ក្នុង 3 ខែ ក្រោយ ស្នើសុំផ្ទេរ (MPWT)`,
  },
  {
    term: "ចលនទ្រព្យ — ប្រភេទ និងការលើកលែង",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `ចលនទ្រព្យ = យានជំនិះ/មធ្យោបាយដឹកជញ្ជូន:
រថយន្ត | ក្បាលរថយន្ត | សណ្តោង | ស៊ីមីរ៉ឺម៉ក
ទោចក្រយានយន្ត | ត្រីចក្រយានយន្ត | ត្រាក់ទ័រ
ជលយាន (ទូក, កាណូត, អូប័រ, កប៉ាល់, សាឡង់)

ករណីលើកលែងពន្ធ:
① ទោច/ត្រីចក្រ/ត្រាក់ទ័រ + ជលយាន ≤ 150 សេះ
② ចលនទ្រព្យរដ្ឋ (កត់ក្នុងសារពើភណ្ឌ)
③ ការទូត / កុងស៊ុល / អង្គការអន្តរជាតិ
④ យានជំនិះ ទំនិញ សម្រាប់លក់វិញ (ចុះបញ្ជីពន្ធ)`,
  },
  {
    term: "ប្រភេទរថយន្ត និងមូលដ្ឋានគិតពន្ធ",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `រថយន្តទេសចរណ៍: គិតតាម ឆ្នាំផលិត + ទំហំស៊ីឡាំង (cc)
ឧ: LEXUS RX330 (2005) ស៊ីឡាំង 3300cc
  → > 10 ឆ្នាំ + 2900–4000cc → មូលដ្ឋាន: 8,000,000 ៛
  → ពន្ធ = 8,000,000 × 4% = 320,000 ៛

រថយន្តដឹកទំនិញ: គិតតាម ទម្ងន់សរុប (GVW)
រ៉ឺម៉ក/ក្បាលរថ: គិតតាម ទម្ងន់សរុប
ដឹកអ្នកដំណើរ: គិតតាម ចំនួនកៅអី
ជលយាន: គិតតាម ទម្ងន់ / ប្រវែង / កម្លាំងសេះ`,
  },
  {
    term: "នីតិវិធីបង់ (Online + Walk-in)",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `Walk-in (ផ្ទាល់):
① យកឯកសារពី MPWT → GDT / សាខាខេត្ត
② បំពេញពាក្យស្នើសុំ ភ្ជាប់ឯកសារ
③ បង់ពន្ធ នៅ ធនាគារដៃគូ MEF
④ ទទួល: បង្កាន់ដៃ (ផ្កាឈូក 1 ច្បាប់)
       + លិខិតបញ្ជាក់ (2 ច្បាប់) → ត្រឡប់ MPWT

Online: www.tax.gov.kh/km/e-service
→ e-Stamp Tax for Vehicle Transfer
ផ្ទេរ: ក្នុង 3 ខែ ក្រោយ ស្នើសុំ MPWT`,
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
  row3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteGreen: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 14, color: "#166534", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteWarn: { background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: 14, color: "#92400E", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedTotalGreen: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontWeight: 700, fontSize: 14, fontFamily: FONT },
};

const INFO_CARDS = [
  { icon: "🏠", bg: "#EFF6FF", title: "ពន្ធអចលនទ្រព្យ",    value: "4%",            note: "ការទិញ-លក់ / ដោះដូរ / អំណោយ" },
  { icon: "🚗", bg: "#F0FDF4", title: "ពន្ធចលនទ្រព្យ",     value: "4%",            note: "រថយន្ត / ជលយាន / យានជំនិះ" },
  { icon: "👨‍👩‍👧", bg: "#FAF5FF", title: "រង្វង់ញាតិ",        value: "លើកលែង 100%", note: "ឪពុក-ម្តាយ · ប្តី-ប្រពន្ធ · ចៅ" },
  { icon: "📅", bg: "#FFFBEB", title: "ថ្ងៃបង់ពន្ធ",        value: "ក្នុង 3 ខែ",    note: "ក្រោយ «ដីកាបញ្ជូន»" },
  { icon: "💰", bg: "#FEF2F2", title: "អនុគ្រោះ (ញាតិ)",   value: "ដក 100 លាន៛",  note: "ប្រទានកម្ម លើកទី 2 ឡើង" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection({ defs, label }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 {label}</span>
        <span style={{ fontSize: 18, color: "#64748B", display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {defs.map((d, i) => (
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
// TAB 1 — IMMOVABLE PROPERTY
// ══════════════════════════════════════════════════════════════
const TRANSFER_TYPES = [
  { id: "sale",         label: "ទិញ-លក់ / ដោះដូរ (Sale/Exchange)" },
  { id: "gift1",        label: "ប្រទានកម្ម លើកទី 1 — ក្នុងរង្វង់ញាតិ" },
  { id: "gift2",        label: "ប្រទានកម្ម លើកទី 2+ — ក្នុងរង្វង់ញាតិ" },
  { id: "inheritance",  label: "សន្តតិកម្ម — ក្នុងរង្វង់ញាតិ" },
  { id: "sibling",      label: "បងប្អូន / ឪពុក-ម្តាយក្មេក ↔ កូនប្រសា" },
  { id: "state",        label: "ផ្ទេរពីរដ្ឋ / ស្ថាប័នរដ្ឋ (លើកលែង)" },
  { id: "diplomatic",   label: "ការទូត / កុងស៊ុល / អង្គការអន្តរជាតិ (លើកលែង)" },
];

function ImmovableTab() {
  const [transferType, setTransferType] = useState("sale");
  const [landArea,     setLandArea]     = useState("");
  const [landPrice,    setLandPrice]    = useState("");
  const [floorInputs,  setFloorInputs]  = useState([{ area: "", price: "" }]);
  const [exchangeRate, setExchangeRate] = useState("4000");
  const [currency,     setCurrency]     = useState("USD");
  const [result,       setResult]       = useState(null);

  function addFloor() { setFloorInputs(f => [...f, { area: "", price: "" }]); }
  function removeFloor(i) { setFloorInputs(f => f.filter((_, idx) => idx !== i)); }
  function updateFloor(i, key, val) {
    setFloorInputs(f => f.map((fl, idx) => idx === i ? { ...fl, [key]: val } : fl));
  }

  function calculate() {
    const rate = n(exchangeRate) || 4000;

    // Exempt cases
    if (["state", "diplomatic", "gift1", "inheritance"].includes(transferType)) {
      const label = TRANSFER_TYPES.find(t => t.id === transferType)?.label || "";
      setResult({ exempt: true, label });
      return;
    }

    const landVal   = n(landArea) * n(landPrice);
    const floorVal  = floorInputs.reduce((sum, fl) => sum + n(fl.area) * n(fl.price), 0);
    const totalUSD  = landVal + floorVal;
    const totalKHR  = currency === "USD" ? totalUSD * rate : totalUSD;

    let deduction = 0;
    let deductLabel = "";
    if (transferType === "gift2") {
      deduction = 100000000; deductLabel = "ការអនុគ្រោះ ប្រទានកម្ម លើកទី 2 (−100,000,000 ៛)";
    } else if (transferType === "sibling") {
      deduction = 100000000; deductLabel = "ការអនុគ្រោះ បងប្អូន/ឪពុក-ម្តាយក្មេក (−100,000,000 ៛)";
    }

    const taxBase = Math.max(0, totalKHR - deduction);
    const tax     = taxBase * TAX_RATE;

    setResult({ exempt: false, landVal, floorVal, totalUSD, totalKHR, deduction, deductLabel, taxBase, tax, rate, currency });
  }

  return (
    <>
      <DefSection defs={DEFS_IMMOVABLE} label="និយមន័យ និងការពន្យល់ — ពន្ធប្រថាប់ត្រាអចលនទ្រព្យ" />

      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទការផ្ទេរ</div>
        <div style={S.field}>
          <label style={S.label}>ប្រភេទប្រតិបត្តិការ</label>
          <select style={S.select} value={transferType} onChange={e => { setTransferType(e.target.value); setResult(null); }}>
            {TRANSFER_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>

        <div style={S.cardTitle}>ប្រភេទរូបិយប័ណ្ណ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណបញ្ចូលតម្លៃ</label>
            <select style={S.select} value={currency} onChange={e => { setCurrency(e.target.value); setResult(null); }}>
              <option value="USD">ដុល្លារអាមេរិក ($)</option>
              <option value="KHR">រៀល (៛)</option>
            </select>
          </div>
          {currency === "USD" && (
            <div style={S.field}>
              <label style={S.label}>អត្រាប្រែចូលរៀល (៛/$)</label>
              <input style={S.input} type="number" placeholder="4000" value={exchangeRate} onChange={e => { setExchangeRate(e.target.value); setResult(null); }} />
            </div>
          )}
        </div>

        <div style={S.cardTitle}>តម្លៃអចលនទ្រព្យ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ផ្ទៃដី (ម²)</label>
            <input style={S.input} type="number" placeholder="ឧ: 100" value={landArea} onChange={e => { setLandArea(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃដី/{currency === "USD" ? "$" : "៛"} ក្នុង ម²</label>
            <input style={S.input} type="number" placeholder={currency === "USD" ? "ឧ: 300" : "ឧ: 1200000"} value={landPrice} onChange={e => { setLandPrice(e.target.value); setResult(null); }} />
          </div>
        </div>

        {floorInputs.map((fl, i) => (
          <div key={i} style={{ ...S.row2, alignItems: "end", marginBottom: 8 }}>
            <div style={S.field}>
              <label style={S.label}>ផ្ទៃជាន់ E{i} (ម²)</label>
              <input style={S.input} type="number" placeholder="ឧ: 64" value={fl.area} onChange={e => { updateFloor(i, "area", e.target.value); setResult(null); }} />
            </div>
            <div style={S.field}>
              <label style={S.label}>តម្លៃ E{i} / {currency === "USD" ? "$" : "៛"} ក្នុង ម²</label>
              <input style={S.input} type="number" placeholder={currency === "USD" ? "ឧ: 250" : "ឧ: 1000000"} value={fl.price} onChange={e => { updateFloor(i, "price", e.target.value); setResult(null); }} />
            </div>
            <div style={{ ...S.field, display: "flex", gap: 8 }}>
              {floorInputs.length > 1 && (
                <button onClick={() => { removeFloor(i); setResult(null); }}
                  style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#991B1B", cursor: "pointer", fontSize: 13, fontFamily: FONT }}>
                  ✕ លុប
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={() => { addFloor(); setResult(null); }}
          style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #BFDBFE", background: "#EFF6FF", color: "#1E40AF", cursor: "pointer", fontSize: 13, fontFamily: FONT, marginBottom: 12 }}>
          + បន្ថែមជាន់
        </button>

        <div style={S.note}>
          • មូលដ្ឋានគិតពន្ធ = (តម្លៃដី + តម្លៃសំណង់ជាន់ E0+E1+...) × អត្រា 4%<br />
          • ប្រសិនបើ MEF Annex ≠ កិច្ចសន្យា → <strong>ប្រើតម្លៃខ្ពស់ជាង</strong>
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាពន្ធប្រថាប់ត្រាអចលនទ្រព្យ</button>

      {result && (
        result.exempt ? (
          <div style={S.card}>
            <div style={S.cardTitle}>លទ្ធផល</div>
            <div style={S.noteGreen}>
              ✅ <strong>ការផ្ទេរនេះត្រូវបានលើកលែងពន្ធប្រថាប់ត្រា</strong><br />
              {result.label}
            </div>
            <div style={{ ...S.dedTotal, ...S.dedTotalGreen, marginTop: 16 }}>
              <span>ប្រាក់ពន្ធប្រថាប់ត្រាត្រូវបង់</span>
              <span>0 ៛ (លើកលែង)</span>
            </div>
          </div>
        ) : (
          <>
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>តម្លៃអចលនទ្រព្យសរុប</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.totalKHR)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>មូលដ្ឋានគិតពន្ធ</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmt(result.taxBase)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ពន្ធប្រថាប់ត្រា (4%)</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.tax)}</div>
              </div>
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>តារាងលម្អិតនៃការគណនា</div>
              <table style={S.tbl}>
                <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
                <tbody>
                  <tr>
                    <td style={S.td}>តម្លៃដី ({result.currency === "USD" ? fmtUSD(result.landVal) : fmt(result.landVal)})</td>
                    <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.currency === "USD" ? result.landVal * result.rate : result.landVal)}</td>
                  </tr>
                  <tr>
                    <td style={S.td}>តម្លៃសំណង់ ({result.currency === "USD" ? fmtUSD(result.floorVal) : fmt(result.floorVal)})</td>
                    <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.currency === "USD" ? result.floorVal * result.rate : result.floorVal)}</td>
                  </tr>
                  <tr>
                    <td style={{ ...S.td, fontWeight: 700 }}>តម្លៃអចលនទ្រព្យសរុប</td>
                    <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.totalKHR)}</td>
                  </tr>
                  {result.deduction > 0 && (
                    <tr>
                      <td style={S.td}>{result.deductLabel}</td>
                      <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>−{fmt(result.deduction)}</td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ ...S.td, fontWeight: 700 }}>មូលដ្ឋានគិតពន្ធ</td>
                    <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.taxBase)}</td>
                  </tr>
                </tbody>
              </table>
              <div style={S.dedTotal}>
                <span>ពន្ធប្រថាប់ត្រាត្រូវបង់ ({fmt(result.taxBase)} × 4%)</span>
                <span>{fmt(result.tax)}</span>
              </div>
              <div style={S.note}>
                <strong>រូបមន្ត:</strong><br />
                • តម្លៃសរុប = {fmt(result.totalKHR)}<br />
                {result.deduction > 0 && <>• ដក: {fmt(result.deduction)}<br /></>}
                • មូលដ្ឋានគិតពន្ធ = {fmt(result.taxBase)}<br />
                • ពន្ធ = {fmt(result.taxBase)} × 4% = <strong>{fmt(result.tax)}</strong><br /><br />
                ដាក់ប្រកាស និងបង់ ក្នុង <strong>3 ខែ</strong> ក្រោយ «ដីកាបញ្ជូន»
                នៅ GDT ភ្នំពេញ ឬ សាខាខេត្ត
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — MOVABLE PROPERTY (VEHICLE)
// ══════════════════════════════════════════════════════════════
const TOURIST_CAR_BASE = [
  { label: "≤ 2000cc | ≤ 10 ឆ្នាំ",     base: 5000000  },
  { label: "≤ 2000cc | > 10 ឆ្នាំ",     base: 3000000  },
  { label: "2001–2900cc | ≤ 10 ឆ្នាំ",  base: 8000000  },
  { label: "2001–2900cc | > 10 ឆ្នាំ",  base: 5000000  },
  { label: "2901–4000cc | ≤ 10 ឆ្នាំ",  base: 12000000 },
  { label: "2901–4000cc | > 10 ឆ្នាំ",  base: 8000000  },
  { label: "> 4000cc | ≤ 10 ឆ្នាំ",     base: 20000000 },
  { label: "> 4000cc | > 10 ឆ្នាំ",     base: 12000000 },
];

const VEHICLE_EXEMPT = [
  { id: "none",        label: "ជាប់ពន្ធ — ផ្ទេរកម្មសិទ្ធិ" },
  { id: "moto150",     label: "ទោច/ត្រីចក្រ/ត្រាក់ទ័រ + ជលយាន ≤ 150 សេះ (លើកលែង)" },
  { id: "state",       label: "ចលនទ្រព្យរដ្ឋ (សារពើភណ្ឌ) (លើកលែង)" },
  { id: "diplomatic",  label: "ការទូត / កុងស៊ុល / អង្គការអន្តរជាតិ (លើកលែង)" },
  { id: "dealer",      label: "ឈ្មួញទំនិញ (ដើម្បីលក់វិញ — ចុះបញ្ជី VAT) (លើកលែង)" },
];

function MovableTab() {
  const [vehicleExempt,  setVehicleExempt]  = useState("none");
  const [vehicleType,    setVehicleType]    = useState("tourist");
  const [taxBaseTier,    setTaxBaseTier]    = useState("0");
  const [customBase,     setCustomBase]     = useState("");
  const [result,         setResult]         = useState(null);

  function calculate() {
    if (vehicleExempt !== "none") {
      const label = VEHICLE_EXEMPT.find(v => v.id === vehicleExempt)?.label || "";
      setResult({ exempt: true, label });
      return;
    }
    const base = vehicleType === "tourist"
      ? (TOURIST_CAR_BASE[parseInt(taxBaseTier)]?.base || 0)
      : n(customBase);
    const tax = base * TAX_RATE;
    setResult({ exempt: false, base, tax, vehicleType });
  }

  return (
    <>
      <DefSection defs={DEFS_MOVABLE} label="និយមន័យ និងការពន្យល់ — ពន្ធប្រថាប់ត្រាចលនទ្រព្យ" />

      <div style={S.card}>
        <div style={S.cardTitle}>ស្ថានភាពការផ្ទេរ</div>
        <div style={S.field}>
          <label style={S.label}>ប្រភេទការផ្ទេរ / ការលើកលែង</label>
          <select style={S.select} value={vehicleExempt} onChange={e => { setVehicleExempt(e.target.value); setResult(null); }}>
            {VEHICLE_EXEMPT.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>

        {vehicleExempt === "none" && (
          <>
            <div style={S.cardTitle}>ប្រភេទយានជំនិះ</div>
            <div style={S.field}>
              <label style={S.label}>ជ្រើសប្រភេទ</label>
              <select style={S.select} value={vehicleType} onChange={e => { setVehicleType(e.target.value); setResult(null); }}>
                <option value="tourist">រថយន្តទេសចរណ៍ (Tourist Car)</option>
                <option value="custom">ប្រភេទផ្សេង (បញ្ចូលមូលដ្ឋានផ្ទាល់)</option>
              </select>
            </div>

            {vehicleType === "tourist" ? (
              <div style={S.field}>
                <label style={S.label}>ស៊ីឡាំង + អាយុ → ជ្រើស Tier មូលដ្ឋានគិតពន្ធ</label>
                <select style={S.select} value={taxBaseTier} onChange={e => { setTaxBaseTier(e.target.value); setResult(null); }}>
                  {TOURIST_CAR_BASE.map((t, i) => (
                    <option key={i} value={String(i)}>{t.label} → {fmt(t.base)}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={S.field}>
                <label style={S.label}>មូលដ្ឋានគិតពន្ធ (៛) — ផ្អែកលើប្រកាស GDT</label>
                <input style={S.input} type="number" placeholder="ឧ: 8000000" value={customBase} onChange={e => { setCustomBase(e.target.value); setResult(null); }} />
              </div>
            )}

            <div style={S.note}>
              • មូលដ្ឋានគិតពន្ធ: ប្រកាស 001 ស.ហ.វ / 2013 (GDT)<br />
              • ពន្ធ = មូលដ្ឋានគិតពន្ធ × 4%<br />
              • ឧ: LEXUS RX330 (2005, 3300cc) → Tier: 2901–4000cc / {">"} 10 ឆ្នាំ → 8,000,000 × 4% = 320,000 ៛
            </div>
          </>
        )}
      </div>

      <button style={S.btn} onClick={calculate}>គណនាពន្ធប្រថាប់ត្រាចលនទ្រព្យ</button>

      {result && (
        result.exempt ? (
          <div style={S.card}>
            <div style={S.cardTitle}>លទ្ធផល</div>
            <div style={S.noteGreen}>✅ <strong>ជាប់ក្នុងករណីលើកលែងពន្ធ</strong><br />{result.label}</div>
            <div style={{ ...S.dedTotalGreen, marginTop: 16 }}>
              <span>ប្រាក់ពន្ធប្រថាប់ត្រាត្រូវបង់</span>
              <span>0 ៛ (លើកលែង)</span>
            </div>
          </div>
        ) : (
          <>
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>មូលដ្ឋានគិតពន្ធ</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.base)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>អត្រាពន្ធ</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>4%</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ពន្ធប្រថាប់ត្រា</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.tax)}</div>
              </div>
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>តារាងលម្អិតនៃការគណនា</div>
              <table style={S.tbl}>
                <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>អត្រា</th><th style={S.th}>ទឹកប្រាក់ (៛)</th></tr></thead>
                <tbody>
                  <tr>
                    <td style={S.td}>មូលដ្ឋានគិតពន្ធ (ប្រកាស GDT)</td>
                    <td style={S.td}>—</td>
                    <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.base)}</td>
                  </tr>
                  <tr>
                    <td style={S.td}>ពន្ធប្រថាប់ត្រា</td>
                    <td style={S.td}>4%</td>
                    <td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{fmt(result.tax)}</td>
                  </tr>
                </tbody>
              </table>
              <div style={S.dedTotal}>
                <span>ពន្ធប្រថាប់ត្រាត្រូវបង់ ({fmt(result.base)} × 4%)</span>
                <span>{fmt(result.tax)}</span>
              </div>
              <div style={S.note}>
                <strong>រូបមន្ត:</strong> {fmt(result.base)} × 4% = <strong>{fmt(result.tax)}</strong><br /><br />
                ដាក់ប្រកាស ក្នុង <strong>3 ខែ</strong> ក្រោយ ស្នើសុំ MPWT
                | <strong>Online:</strong> tax.gov.kh → e-Stamp Tax Vehicle
                | ឬ GDT / សាខាខេត្ត
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function StampTaxPage({ setPage }) {
  const [tab, setTab] = useState("immovable");

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>ពន្ធប្រថាប់ត្រា</div>
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

        {/* TABS */}
        <div style={S.tabRow}>
          <button style={tab === "immovable" ? S.tabOn : S.tab} onClick={() => setTab("immovable")}>
            🏠 ពន្ធប្រថាប់ត្រា — អចលនទ្រព្យ
          </button>
          <button style={tab === "movable" ? S.tabOn : S.tab} onClick={() => setTab("movable")}>
            🚗 ពន្ធប្រថាប់ត្រា — ចលនទ្រព្យ
          </button>
        </div>

        {tab === "immovable" && <ImmovableTab />}
        {tab === "movable"   && <MovableTab />}

      </div>
    </div>
  );
}