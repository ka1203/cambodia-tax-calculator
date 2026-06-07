import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

function fmt(v) {
  return Math.round(Math.abs(v)).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── TAX TABLES (from Prakas 531) ──────────────────────────────

// Tourist car: by CC and age (years old from manufacture year to 2024)
const TOURIST_CAR = [
  // [ccMin, ccMax, label, [<=5yr, 5-10yr, >10yr]]
  [0,     1000,  "≤ 1000 CC",     [200000,   150000,   100000]],
  [1001,  1500,  "1001 – 1500 CC",    [400000,   300000,   200000]],
  [1501,  2000,  "1501 – 2000 CC",    [800000,   600000,   400000]],
  [2001,  2500,  "2001 – 2500 CC",    [1200000,  1000000,  600000]],
  [2501,  3000,  "2501 – 3000 CC",    [1600000,  1200000,  800000]],
  [3001,  3500,  "3001 – 3500 CC",    [2000000,  1500000,  1000000]],  // matches example: 3500CC >10yr=600000, 5-10yr=1000000
  [3501,  4000,  "3501 – 4000 CC",    [2400000,  1800000,  1200000]],
  [4001,  4500,  "4001 – 4500 CC",    [2800000,  2100000,  1400000]],
  [4501,  9999,  "> 4500 CC",         [3200000,  2400000,  1600000]],
];

// Freight truck: by GVW (tons)
const FREIGHT_TRUCK = [
  [0,    5,   "≤ 5 តោន",        500000],
  [5,    10,  "5 – 10 តោន",     750000],
  [10,   15,  "10 – 15 តោន",   1000000],
  [15,   20,  "15 – 20 តោន",   1500000],
  [20,   30,  "20 – 30 តោន",   2000000],
  [30,   40,  "30 – 40 តោន",   2500000],
  [40,  999,  "> 40 តោន",      3000000],
];

// Passenger bus: by seats
const PASSENGER_BUS = [
  [0,   10,  "≤ 10 កៅអី",    200000],
  [10,  20,  "10 – 20 កៅអី", 400000],
  [20,  30,  "20 – 30 កៅអី", 600000],
  [30,  40,  "30 – 40 កៅអី", 800000],
  [40,  999, "> 40 កៅអី",   1000000],
];

// Tractor head / semi-trailer: by GVW
const TRACTOR_HEAD = [
  [0,   10,  "≤ 10 តោន",       500000],
  [10,  20,  "10 – 20 តោន",   1000000],
  [20,  30,  "20 – 30 តោន",   1500000],
  [30,  999, "> 30 តោន",      2000000],
];

// ── DEFINITIONS ──────────────────────────────────────────────
const DEFS = [
  {
    term: "ពន្ធលើមធ្យោបាយដឹកជញ្ជូន — TMT",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធប្រចាំឆ្នាំ លើយានយន្ត/ជលយាន
គ្រប់ប្រភេទ នៅក្នុងព្រះរាជាណាចក្រកម្ពុជា។
• ប្រភេទ: ស្វ័យប្រកាស (Self-Assessment)
• អ្នកជាប់ពន្ធ: ម្ចាស់កម្មសិទ្ធិ
• ច្បាប់: ប្រកាសលេខ 531 សហវ.ប្រក
• ប្រចាំ: 1 មិថុនា – 30 វិច្ឆិកា`,
  },
  {
    term: "ការលើកលែងពន្ធ (Exemptions)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `ការលើកលែង TMT:
① រថយន្តគីលានសង្គ្រោះ / ពន្លត់អគ្គិភ័យ (រដ្ឋ)
② យានយន្តកងយោធ / កងរាជអាវុធហត្ថ / នគរបាល
③ យានទូត ស្ថានកុងស៊ុល អង្គការអន្តរជាតិ
④ ទោចក្រ / ត្រីចក្រ / ត្រាក់ទ័រ ≤ 150 HP
   + ជលយានយន្ត ≤ 150 HP`,
  },
  {
    term: "រថយន្តទេសចរណ៍ — គណនាតាម CC + អាយុ",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `ប្រភេទទេសចរណ៍ (Tourist Car):
• មូលដ្ឋានគណនា: ទំហំស៊ីឡាំង (CC)
• ផ្សំជាមួយ: អាយុរថយន្ត (ពីឆ្នាំផលិត)
  - ≤ 5 ឆ្នាំ → Tax A (ខ្ពស់ជាង)
  - 5 – 10 ឆ្នាំ → Tax B
  - > 10 ឆ្នាំ → Tax C (ទាបជាង)
ឧ: LEXUS 3500CC 2007 (>10yr) = 600,000 ៛
ឧ: LEXUS 3500CC 2015 (5-10yr) = 1,000,000 ៛`,
  },
  {
    term: "រថយន្តដឹកទំនិញ — គណនាតាមទម្ងន់",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ប្រភេទដឹកទំនិញ (Freight):
• មូលដ្ឋានគណនា: GVW (Gross Vehicle Weight)
  = ទម្ងន់រថយន្ត + ទម្ងន់ផ្ទុក + មនុស្ស
• ឧ: HYUNDAI 15 តោន = 1,000,000 ៛
• ឧ: HINO 25 តោន = 2,000,000 ៛

ក្បាលរថយន្តសណ្តោង/រ៉ឺម៉ក → GVW ផងដែរ`,
  },
  {
    term: "ការប្រកាសបង់ និងឯកសារ",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ការបង់ TMT:
• រយៈពេល: 1 មិថុនា – 30 វិច្ឆិកា
• ទីកន្លែង: GDT / សាខា / ធនាគារដៃគូ
           GDT Taxpayer App

ឯកសារភ្ជាប់:
① បណ្ណសម្គាល់យានយន្ត / បង្កាន់ដៃនាំចូល
② វិញ្ញាបនបត្រត្រួតពិនិត្យបច្ចេកទេស
③ អត្តសញ្ញាណបណ្ណ / លិខិតឆ្លងដែន
④ វិញ្ញាបនបត្រចុះបញ្ជីអតប (ករណីសហគ្រាស)`,
  },
];

// ── SHARED STYLES ─────────────────────────────────────────────
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
  noteGreen: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 14, color: "#166534", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
};

const INFO_CARDS = [
  { icon: "🚗", bg: "#EFF6FF", title: "ពន្ធទេសចរណ៍",     value: "CC + អាយុ",        note: "ប្រកាស 531 ផ្នែក II" },
  { icon: "🚛", bg: "#F0FDF4", title: "ពន្ធដឹកទំនិញ",     value: "GVW (តោន)",        note: "ប្រកាស 531 ផ្នែក I" },
  { icon: "🚌", bg: "#FFFBEB", title: "ពន្ធដឹកអ្នកដំណើរ", value: "ចំនួនកៅអី",         note: "Bus / Van" },
  { icon: "📅", bg: "#FAF5FF", title: "រយៈពេលបង់",        value: "មិថុនា–វិច្ឆិកា", note: "ប្រចាំឆ្នាំ" },
  
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — ពន្ធលើមធ្យោបាយដឹកជញ្ជូន (TMT)</span>
        <span style={{ fontSize: 18, color: "#64748B", display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {DEFS.map((d, i) => (
            <div key={i} style={{ borderRadius: 16, padding: "16px 18px", background: d.bg, border: `1px solid ${d.border}`, lineHeight: 1.7, fontFamily: FONT }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: d.color, marginBottom: 8 }}>{d.term}</div>
              <div style={{ fontSize: 12.5, whiteSpace: "pre-line", color: d.color + "BB" }}>{d.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 1 — TOURIST CAR
// ══════════════════════════════════════════════════════════════
function TouristCarTab() {
  const [ccIdx, setCcIdx] = useState("");
  const [year,  setYear]  = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const yearVal = n(year);
    if (ccIdx === "" || !yearVal) return;

    const row    = TOURIST_CAR[parseInt(ccIdx)];
    const age    = 2024 - yearVal;
    const ageIdx = age <= 5 ? 0 : age <= 10 ? 1 : 2;
    const ageLabel = age <= 5 ? "≤ 5 ឆ្នាំ" : age <= 10 ? "5 – 10 ឆ្នាំ" : "> 10 ឆ្នាំ";
    const tax = row[3][ageIdx];
    setResult({ ccLabel: row[2], year: yearVal, age, ageLabel, tax });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>រថយន្តទេសចរណ៍ — Tourist Car (ប្រចាំឆ្នាំ 2024)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ទំហំស៊ីឡាំង (CC)</label>
            <select style={S.select} value={ccIdx} onChange={e => { setCcIdx(e.target.value); setResult(null); }}>
              <option value="">-- សូមជ្រើសរើស CC --</option>
              {TOURIST_CAR.map((row, i) => (
                <option key={i} value={i}>{row[2]}</option>
              ))}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ឆ្នាំផលិត (Manufacturing Year)</label>
            <input style={S.input} type="number" placeholder="ឧ. 2015"
              value={year} onChange={e => { setYear(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.note}>
          • ពន្ធ = CC bracket × អាយុ (ឆ្នាំ 2024 − ឆ្នាំផលិត)<br />
          • ≤ 5 ឆ្នាំ | 5–10 ឆ្នាំ | {">"} 10 ឆ្នាំ → 3 ចំណាត់ថ្នាក់
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធ</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ទំហំស៊ីឡាំង</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.ccLabel}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>អាយុរថយន្ត</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#5B21B6", fontFamily: FONT }}>{result.age} ឆ្នាំ ({result.ageLabel})</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ពន្ធត្រូវបង់</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.tax)}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>លម្អិតការគណនា</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>ប្រភេទ</th><th style={S.th}>ព័ត៌មាន</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ទំហំស៊ីឡាំង</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.ccLabel}</td></tr>
                <tr><td style={S.td}>ឆ្នាំផលិត</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.year}</td></tr>
                <tr><td style={S.td}>អាយុ (2024 − {result.year})</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.age} ឆ្នាំ → {result.ageLabel}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>ពន្ធត្រូវបង់ ({result.ccLabel} / {result.ageLabel})</span>
              <span>{fmt(result.tax)}</span>
            </div>
            <div style={S.note}>
              ប្រកាសបង់: <strong>1 មិថុនា – 30 វិច្ឆិកា {new Date().getFullYear()}</strong> · GDT / ធនាគារ / GDT App
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — FREIGHT TRUCK
// ══════════════════════════════════════════════════════════════
function FreightTab() {
  const [subType, setSubType] = useState("freight");
  const [gvw, setGvw] = useState("");
  const [result, setResult] = useState(null);

  const TABLE = subType === "freight" ? FREIGHT_TRUCK : TRACTOR_HEAD;

  function calculate() {
    const g = n(gvw);
    if (!g) return;
    const row = TABLE.find(r => g > r[0] && g <= r[1]) || TABLE[TABLE.length - 1];
    setResult({ gvw: g, label: row[2], tax: row[3], subType });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទយានដឹកទំនិញ</div>
        <div style={S.tabRow}>
          <button style={subType === "freight" ? S.tabOn : S.tab} onClick={() => { setSubType("freight"); setResult(null); }}>🚛 រថយន្តដឹកទំនិញ</button>
          <button style={subType === "tractor" ? S.tabOn : S.tab} onClick={() => { setSubType("tractor"); setResult(null); }}>🚜 ក្បាលរថ / រ៉ឺម៉ក</button>
        </div>
        <div style={S.field}>
          <label style={S.label}>ទម្ងន់ផ្ទុកសរុប GVW (តោន)</label>
          <input style={S.input} type="number" placeholder="ឧ. 15"
            value={gvw} onChange={e => { setGvw(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • GVW = ទម្ងន់រថយន្ត + ទម្ងន់ផ្ទុក + ទម្ងន់មនុស្ស<br />
          • ផ្អែកតាមតារាងឧបសម្ព័ន្ធ I ប្រកាស 531
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធ</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ទម្ងន់ GVW</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.gvw} តោន ({result.label})</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ពន្ធត្រូវបង់</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.tax)}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>លម្អិតការគណនា</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>ប្រភេទ</th><th style={S.th}>ព័ត៌មាន</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ប្រភេទ</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.subType === "freight" ? "រថយន្តដឹកទំនិញ" : "ក្បាលរថ / រ៉ឺម៉ក"}</td></tr>
                <tr><td style={S.td}>ទម្ងន់ GVW</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.gvw} តោន → {result.label}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>ពន្ធត្រូវបង់ ({result.label})</span>
              <span>{fmt(result.tax)}</span>
            </div>
            <div style={S.note}>
              ប្រកាសបង់: <strong>1 មិថុនា – 30 វិច្ឆិកា</strong> · ប្រកាសលេខ 531 ផ្នែក I
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — PASSENGER BUS
// ══════════════════════════════════════════════════════════════
function PassengerTab() {
  const [seats, setSeats] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const s = n(seats);
    if (!s) return;
    const row = PASSENGER_BUS.find(r => s > r[0] && s <= r[1]) || PASSENGER_BUS[PASSENGER_BUS.length - 1];
    setResult({ seats: s, label: row[2], tax: row[3] });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>រថយន្តដឹកអ្នកដំណើរ — Passenger Bus / Van</div>
        <div style={S.field}>
          <label style={S.label}>ចំនួនកៅអី (Seats)</label>
          <input style={S.input} type="number" placeholder="ឧ. 35"
            value={seats} onChange={e => { setSeats(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • ពន្ធ = ចំណាត់ថ្នាក់ according to total seats<br />
          • ផ្អែកតាម ប្រកាស 531 ឧបសម្ព័ន្ធ III
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធ</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ចំនួនកៅអី</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.seats} ({result.label})</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ពន្ធត្រូវបង់</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.tax)}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>លម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>ប្រភេទ</th><th style={S.th}>ព័ត៌មាន</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ចំនួនកៅអី</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.seats} → {result.label}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>ពន្ធត្រូវបង់ ({result.label})</span>
              <span>{fmt(result.tax)}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — RATES REFERENCE
// ══════════════════════════════════════════════════════════════
function RatesTab() {
  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>តារាងពន្ធ — រថយន្តទេសចរណ៍ (Tourist Car) ឆ្នាំ 2024</div>
        <table style={S.tbl}>
          <thead>
            <tr>
              <th style={S.th}>CC</th>
              <th style={S.th}>≤ 5 ឆ្នាំ</th>
              <th style={S.th}>5 – 10 ឆ្នាំ</th>
              <th style={S.th}>{"> 10 ឆ្នាំ"}</th>
            </tr>
          </thead>
          <tbody>
            {TOURIST_CAR.map(([, , label, taxes]) => (
              <tr key={label}>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{label}</td>
                <td style={S.td}>{fmt(taxes[0])}</td>
                <td style={S.td}>{fmt(taxes[1])}</td>
                <td style={S.td}>{fmt(taxes[2])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>តារាងពន្ធ — រថយន្តដឹកទំនិញ (GVW)</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>ទម្ងន់ GVW</th><th style={S.th}>ពន្ធ (រៀល)</th></tr></thead>
          <tbody>
            {FREIGHT_TRUCK.map(([, , label, tax]) => (
              <tr key={label}>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{label}</td>
                <td style={S.td}>{fmt(tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>តារាងពន្ធ — រថយន្តដឹកអ្នកដំណើរ (Seats)</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>ចំនួនកៅអី</th><th style={S.th}>ពន្ធ (រៀល)</th></tr></thead>
          <tbody>
            {PASSENGER_BUS.map(([, , label, tax]) => (
              <tr key={label}>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{label}</td>
                <td style={S.td}>{fmt(tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={S.note}>
          <strong>ការលើកលែង:</strong> ទោចក្រ/ត្រីចក្រ/ត្រាក់ទ័រ ≤ 150 HP · យានទូត · យានយោធ/នគរបាល<br />
          <strong>ប្រភព:</strong> ប្រកាសលេខ 531 សហវ.ប្រក — ក្រសួងសេដ្ឋកិច្ច និង ហិរញ្ញវត្ថុ
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function TransportTaxCalculator({ setPage }) {
  const [tab, setTab] = useState("tourist");

  const TABS = [
    { id: "tourist",   label: " រថយន្តទេសចរណ៍" },
    { id: "freight",   label: " ដឹកទំនិញ / រ៉ឺម៉ក" },
    { id: "passenger", label: " ដឹកអ្នកដំណើរ" },
    { id: "rates",     label: " តារាងអត្រា" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>ពន្ធលើមធ្យោបាយដឹកជញ្ជូន</div>
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

        {tab === "tourist"   && <TouristCarTab />}
        {tab === "freight"   && <FreightTab />}
        {tab === "passenger" && <PassengerTab />}
        {tab === "rates"     && <RatesTab />}
      </div>
    </div>
  );
}