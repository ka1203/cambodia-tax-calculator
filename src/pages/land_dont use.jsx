import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";
const TAX_RATE = 0.02;
const EXEMPT_M2 = 50000; // 5 hectares = 50,000 m²

function fmt(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function fmtM2(v) {
  return Math.round(v).toLocaleString("en-US") + " ម²";
}
function n(v) {
  return parseFloat(v) || 0;
}

// ── DEFINITION DATA ───────────────────────────────────────────
const DEFS = [
  {
    term: "ពន្ធលើដីធ្លីមិនបានប្រើប្រាស់ (Unused Land Tax)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធលើដីធ្លីមិនបានប្រើប្រាស់ គឺជាប្រភេទពន្ធប្រចាំឆ្នាំ
អនុវត្តលើដីមានសំណង់ ឬគ្មានសំណង់ ដែលមិនបានប្រើប្រាស់
ស្ថិតនៅក្រៅតំបន់ជាកម្មវត្ថុនៃពន្ធលើអចលនទ្រព្យ។
• អត្រាពន្ធ: 2% ក្នុងមួយឆ្នាំ
• ឯកតាការប្រមូល: ប្រចាំឆ្នាំ
• ផ្អែកលើ: តម្លៃដីកំណត់ដោយគណៈកម្មការវាយតម្លៃ
• ថ្ងៃប្រកាស/បង់: 1 មករា – 30 កញ្ញា នៃឆ្នាំជាប់ពន្ធ`,
  },
  {
    term: "កម្មសិទ្ធិករ (Land Owner / Taxpayer)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `កម្មសិទ្ធិករ សំដៅដល់បុគ្គលណាដែលផ្នែកសុរិយោដី
ឬអាជ្ញាធរដែនដី (ចាប់ពីថ្នាក់ឃុំ-សង្កាត់ឡើងទៅ)
បានចេញឯកសារផ្លូវការទទួលស្គាល់សិទ្ធិប្រើប្រាស់ដី
ក្នុងតំបន់ណាមួយ ជាលក្ខណៈជាប់លាប់ ឬបណ្តោះអាសន្ន។
→ ជាប់ពន្ធ: គ្រប់ម្ចាស់ដីលើស 5 ហិកតា
→ ត្រូវបង់ដោយ: ម្ចាស់ដី ឬតំណាងស្របច្បាប់`,
  },
  {
    term: "ដីធ្លីមិនបានប្រើប្រាស់ (Unused Land)",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `ដីធ្លីមិនបានប្រើប្រាស់ = ដីមានសំណង់ ឬគ្មានសំណង់
ដែលមិនបានប្រើប្រាស់ ចំពោះសកម្មភាពណាមួយ។
ករណីលើកលែង (Exempt):
① ដីផ្ទៃ ≤ 5 ហិកតា (50,000 ម²) — មិនជាប់ពន្ធ
② ដីកសិកម្មកំពុងបង្កបង្កើនផល (មានបញ្ជាក់)
③ ដីស្ថិតក្រោមកិច្ចសន្យាជួល
④ ដីជាកម្មសិទ្ធិរដ្ឋ / ស្ថាប័នរដ្ឋ
⑤ ដីក្នុងតំបន់សេដ្ឋកិច្ចពិសេស (SEZ)
⑥ ដីប្រើប្រាស់ក្នុងវិស័យអប់រំ/បណ្តុះបណ្តាល`,
  },
  {
    term: "មូលដ្ឋានគិតពន្ធ (Tax Base)",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `មូលដ្ឋានគិតពន្ធ = (ផ្ទៃដីសរុប − 50,000 ម²) × តម្លៃដី
ប្រាក់ពន្ធ = មូលដ្ឋានគិតពន្ធ × 2%
• 50,000 ម² = 5 ហិកតា (ដកចេញដោយស្វ័យប្រវត្តិ)
• តម្លៃដី = ត្រូវកំណត់ដោយគណៈកម្មការ GDT
• 1 ហិកតា = 10,000 ម²
ឧទាហរណ៍: 90,000 ម² × 15,000 ៛/ម²
  → (90,000 − 50,000) × 15,000 × 2% = 12,000,000 ៛`,
  },
  {
    term: "របៀបប្រកាស និងបង់ពន្ធ",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ថ្ងៃកំណត់: 1 មករា – 30 កញ្ញា នៃឆ្នាំជាប់ពន្ធ
ទីតាំងប្រកាស:
① សាខាពន្ធដារខេត្ត (ដីស្ថិតក្នុងខេត្ត)
② អគ្គនាយកដ្ឋានពន្ធដារ (ដីទូទាំងប្រទេស)
③ GDT Taxpayer App (Online)
④ ធនាគារពាណិជ្ជដៃគូ GDT
ឯកសារតម្រូវ (PT 01):
• ប័ណ្ណ/វិញ្ញាបនត្រម្ចាស់ដី
• អត្តសញ្ញាណប័ណ្ណ / លិខិតឆ្លងដែន
• រូបថតអចលនទ្រព្យ
• នយាមការ (ទទឹង × បណ្តោយ)
• វិក្កយបត្រទឹក-អគ្គិស្នី (ប្រសិនបើមាន)`,
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
  // info grid
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 },
  infoCard: { background: "#FFFFFF", borderRadius: 16, padding: "16px 18px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,.04)" },
  infoCardInner: { display: "flex", alignItems: "flex-start", gap: 12 },
  infoCardDot: { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
  infoCardBody: { flex: 1 },
  infoCardTitle: { fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 4, fontFamily: FONT },
  infoCardValue: { fontSize: 15, fontWeight: 800, color: "#0B1F4E", fontFamily: FONT, lineHeight: 1.4 },
  infoCardNote: { fontSize: 11, color: "#64748B", marginTop: 3, fontFamily: FONT, lineHeight: 1.5 },
  // card
  card: { background: "#FFFFFF", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,.04)" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 16, fontFamily: FONT },
  row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteWarn: { background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 14, color: "#991B1B", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteGreen: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 14, color: "#166534", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  mVal: { fontSize: 18, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT },
  mValRed: { fontSize: 18, fontWeight: 700, color: "#c0392b", fontFamily: FONT },
  mValGreen: { fontSize: 18, fontWeight: 700, color: "#166534", fontFamily: FONT },
  barTrack: { height: 16, borderRadius: 999, overflow: "hidden", display: "flex", background: "#E2E8F0", marginBottom: 10 },
  barLabels: { display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, color: "#475569", flexWrap: "wrap", fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
};

// ── INFO CARDS ────────────────────────────────────────────────
const INFO_CARDS = [
  { icon: "🏞️", bg: "#EFF6FF", title: "អត្រាពន្ធ",        value: "2% / ឆ្នាំ",      note: "នៃតម្លៃដីប្រចាំឆ្នាំ" },
  { icon: "📐", bg: "#F0FDF4", title: "ផ្ទៃដកចេញ",        value: "50,000 ម²",      note: "= 5 ហិកតា / ដីមួយកន្លែង" },
  { icon: "📅", bg: "#FFFBEB", title: "ថ្ងៃបង់ពន្ធ",       value: "1 មករា–30 កញ្ញា", note: "នៃឆ្នាំជាប់ពន្ធ" },
  { icon: "🏘️", bg: "#FEF2F2", title: "ដីលើកលែង",        value: "≤ 5 ហិកតា",       note: "ឬ ដីកំពុងប្រើប្រាស់" },
  { icon: "📋", bg: "#FAF5FF", title: "ទម្រង់ប្រកាស",      value: "PT 01",            note: "ភ្ជាប់ជាមួយឯកសារដី" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16,
          padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0,
          boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>
          📖 និយមន័យ និងការពន្យល់ — ពន្ធលើដីធ្លីមិនបានប្រើប្រាស់
        </span>
        <span style={{ fontSize: 18, color: "#64748B", display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {DEFS.map((d, i) => (
            <div key={i} style={{ borderRadius: 16, padding: "16px 18px", background: d.bg, border: `1px solid ${d.border}`, lineHeight: 1.7, fontFamily: FONT }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: d.color, marginBottom: 8, fontFamily: FONT }}>{d.term}</div>
              <div style={{ fontSize: 12.5, whiteSpace: "pre-line", color: d.color + "CC", fontFamily: FONT }}>{d.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── EXEMPTION CHECKER ─────────────────────────────────────────
function ExemptBadge({ exempt, reason }) {
  if (!exempt) return null;
  return (
    <div style={S.noteGreen}>
      ✅ <strong>ដីនេះត្រូវបានលើកលែងពន្ធ</strong> — {reason}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function UnusedLandTaxPage({ setPage }) {
  const [areaM2,      setAreaM2]      = useState("");
  const [pricePerM2,  setPricePerM2]  = useState("");
  const [exemptType,  setExemptType]  = useState("none");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const area  = n(areaM2);
    const price = n(pricePerM2);
    if (!area || !price) return;

    // Exempt check
    if (exemptType !== "none") {
      setResult({ exempt: true, exemptType, area, price });
      return;
    }
    if (area <= EXEMPT_M2) {
      setResult({ exempt: true, exemptType: "size", area, price });
      return;
    }

    const taxableArea = area - EXEMPT_M2;
    const taxBase     = taxableArea * price;
    const tax         = taxBase * TAX_RATE;
    const taxPct      = Math.min((tax / (area * price)) * 100, 100);

    setResult({ exempt: false, area, price, taxableArea, taxBase, tax, taxPct });
  }

  const EXEMPT_LABELS = {
    size:          "ផ្ទៃដីមិនលើស 5 ហិកតា (50,000 ម²) — មិនជាប់ពន្ធ",
    agriculture:   "ដីកសិកម្មកំពុងបង្កបង្កើនផល (មានបញ្ជាក់)",
    economic:      "ដីបម្រើសកម្មភាពសេដ្ឋកិច្ចរបស់រូបវន្ត/នីតិបុគ្គល (ចុះបញ្ជីពន្ធ)",
    lease:         "ដីស្ថិតក្រោមកិច្ចសន្យាជួល",
    state:         "ដីជាកម្មសិទ្ធិរដ្ឋ / ស្ថាប័នរដ្ឋ",
    community:     "ដីជាកម្មសិទ្ធិសហគមន៍",
    concession:    "ដីសម្បទានសេដ្ឋកិច្ច (ជួលពីរដ្ឋ)",
    sez:           "ដីក្នុងតំបន់សេដ្ឋកិច្ចពិសេស (SEZ)",
    education:     "ដីចុះបញ្ជីក្នុងវិស័យអប់រំ / បណ្តុះបណ្តាល",
  };

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
          <div style={S.h1}>ពន្ធលើដីធ្លីមិនបានប្រើប្រាស់ </div>
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

        {/* FORM CARD */}
        <div style={S.card}>
          <div style={S.cardTitle}>ព័ត៌មានដីធ្លី</div>
          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>ផ្ទៃដីសរុប (ម²)</label>
              <input
                style={S.input} type="number"
                placeholder="ឧទាហរណ៍៖ 90000"
                value={areaM2}
                onChange={e => { setAreaM2(e.target.value); setResult(null); }}
              />
            </div>
            <div style={S.field}>
              <label style={S.label}>តម្លៃដី (៛/ម²) — កំណត់ដោយ GDT</label>
              <input
                style={S.input} type="number"
                placeholder="ឧទាហរណ៍៖ 15000"
                value={pricePerM2}
                onChange={e => { setPricePerM2(e.target.value); setResult(null); }}
              />
            </div>
          </div>

          <div style={S.cardTitle}>ស្ថានភាពការប្រើប្រាស់ / ការលើកលែងពន្ធ</div>
          <div style={S.field}>
            <label style={S.label}>ស្ថានភាពដី</label>
            <select style={S.select} value={exemptType}
              onChange={e => { setExemptType(e.target.value); setResult(null); }}>
              <option value="none">ដីមិនបានប្រើប្រាស់ — ជាប់ពន្ធ</option>
              <option value="agriculture">ដីកសិកម្មកំពុងបង្កបង្កើនផល</option>
              <option value="economic">ដីបម្រើសកម្មភាពសេដ្ឋកិច្ច (ចុះបញ្ជីពន្ធ)</option>
              <option value="lease">ដីស្ថិតក្រោមកិច្ចសន្យាជួល</option>
              <option value="state">ដីជាកម្មសិទ្ធិរដ្ឋ / ស្ថាប័នរដ្ឋ</option>
              <option value="community">ដីជាកម្មសិទ្ធិសហគមន៍</option>
              <option value="concession">ដីសម្បទានសេដ្ឋកិច្ច (ជួលពីរដ្ឋ)</option>
              <option value="sez">ដីក្នុងតំបន់សេដ្ឋកិច្ចពិសេស (SEZ)</option>
              <option value="education">ដីក្នុងវិស័យអប់រំ / បណ្តុះបណ្តាល</option>
            </select>
          </div>

          <div style={S.note}>
            • ផ្ទៃដក​ចេញ​ស្វ័យ​ប្រវត្តិ: <strong>50,000 ម² (= 5 ហិកតា)</strong> ក្នុង​មួយ​កន្លែង<br />
            • រូបមន្ត: <strong>(ផ្ទៃសរុប − 50,000 ម²) × តម្លៃ/ម² × 2%</strong><br />
            • 1 ហិកតា = 10,000 ម²
          </div>
        </div>

        <button style={S.btn} onClick={calculate}>
          គណនាពន្ធលើដីធ្លីមិនបានប្រើប្រាស់
        </button>

        {/* ── RESULTS ── */}
        {result && (
          <>
            {result.exempt ? (
              <div style={S.card}>
                <div style={S.cardTitle}>លទ្ធផលការគណនា</div>
                <div style={S.noteGreen}>
                  ✅ <strong>ដីនេះត្រូវបានលើកលែងពន្ធ</strong><br />
                  {EXEMPT_LABELS[result.exemptType] || "ផ្ទៃដី ≤ 5 ហិកតា"}
                </div>
                <div style={{ marginTop: 16 }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.th}>បរិយាយ</th>
                        <th style={S.th}>ទិន្នន័យ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={S.td}>ផ្ទៃដីសរុប</td>
                        <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtM2(result.area)}</td>
                      </tr>
                      <tr>
                        <td style={S.td}>តម្លៃដី (GDT)</td>
                        <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.price)} / ម²</td>
                      </tr>
                      <tr>
                        <td style={S.td}>ស្ថានភាព</td>
                        <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>លើកលែងពន្ធ</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ ...S.dedTotal, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534" }}>
                    <span>ប្រាក់ពន្ធត្រូវបង់</span>
                    <span>0 ៛ (លើកលែង)</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* METRICS */}
                <div style={S.metricGrid}>
                  <div style={S.metric}>
                    <div style={S.mLabel}>ផ្ទៃដីជាប់ពន្ធ</div>
                    <div style={S.mVal}>{fmtM2(result.taxableArea)}</div>
                  </div>
                  <div style={S.metric}>
                    <div style={S.mLabel}>មូលដ្ឋានគិតពន្ធ</div>
                    <div style={S.mVal}>{fmt(result.taxBase)}</div>
                  </div>
                  <div style={S.metric}>
                    <div style={S.mLabel}>ប្រាក់ពន្ធប្រចាំឆ្នាំ (2%)</div>
                    <div style={S.mValRed}>{fmt(result.tax)}</div>
                  </div>
                </div>

                {/* BAR */}
                <div style={S.card}>
                  <div style={S.cardTitle}>សមាមាត្រផ្ទៃដីជាប់ពន្ធ vs ដកចេញ</div>
                  <div style={S.barTrack}>
                    <div style={{ width: Math.min((EXEMPT_M2 / result.area) * 100, 100).toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width .4s" }} />
                    <div style={{ width: Math.min((result.taxableArea / result.area) * 100, 100).toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width .4s" }} />
                  </div>
                  <div style={S.barLabels}>
                    <span>🟢 ផ្ទៃដកចេញ 5 ហិ: {Math.min((EXEMPT_M2 / result.area) * 100, 100).toFixed(1)}%</span>
                    <span>🔴 ផ្ទៃជាប់ពន្ធ: {Math.min((result.taxableArea / result.area) * 100, 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* BREAKDOWN TABLE */}
                <div style={S.card}>
                  <div style={S.cardTitle}>តារាងលម្អិតនៃការគណនា</div>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.th}>បរិយាយ</th>
                        <th style={S.th}>ទំហំ / អត្រា</th>
                        <th style={S.th}>ទឹកប្រាក់</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={S.td}>ផ្ទៃដីសរុប</td>
                        <td style={S.td}>—</td>
                        <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtM2(result.area)}</td>
                      </tr>
                      <tr>
                        <td style={S.td}>ផ្ទៃដីដកចេញ (≤ 5 ហិ)</td>
                        <td style={S.td}>−50,000 ម²</td>
                        <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>{fmtM2(EXEMPT_M2)}</td>
                      </tr>
                      <tr>
                        <td style={{ ...S.td, fontWeight: 700 }}>ផ្ទៃដីជាប់ពន្ធ</td>
                        <td style={S.td}>—</td>
                        <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmtM2(result.taxableArea)}</td>
                      </tr>
                      <tr>
                        <td style={S.td}>តម្លៃដី (GDT)</td>
                        <td style={S.td}>{fmt(result.price)} / ម²</td>
                        <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>—</td>
                      </tr>
                      <tr>
                        <td style={{ ...S.td, fontWeight: 700 }}>មូលដ្ឋានគិតពន្ធ</td>
                        <td style={S.td}>{fmtM2(result.taxableArea)} × {fmt(result.price)}</td>
                        <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.taxBase)}</td>
                      </tr>
                      <tr>
                        <td style={S.td}>អត្រាពន្ធ</td>
                        <td style={S.td}>2%</td>
                        <td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>—</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={S.dedTotal}>
                    <span>ប្រាក់ពន្ធប្រចាំឆ្នាំត្រូវបង់ (2%)</span>
                    <span>{fmt(result.tax)}</span>
                  </div>
                  <div style={S.note}>
                    <strong>រូបមន្តគណនា៖</strong><br />
                    • ផ្ទៃជាប់ពន្ធ = {fmtM2(result.area)} − 50,000 ម² = {fmtM2(result.taxableArea)}<br />
                    • មូលដ្ឋានគិតពន្ធ = {fmtM2(result.taxableArea)} × {fmt(result.price)} = {fmt(result.taxBase)}<br />
                    • ប្រាក់ពន្ធ = {fmt(result.taxBase)} × 2% = <strong>{fmt(result.tax)}</strong><br /><br />
                    ត្រូវប្រកាស និងបង់ ចាប់ពី <strong>1 មករា</strong> ដល់ <strong>30 កញ្ញា</strong> នៃឆ្នាំជាប់ពន្ធ
                    តាមរយៈ GDT Taxpayer App ឬ សាខាពន្ធដារខេត្ត ឬ ធនាគារដៃគូ GDT
                  </div>
                </div>

                {/* DOCUMENTS CHECKLIST */}
                <div style={S.card}>
                  <div style={S.cardTitle}>ឯកសារតម្រូវសម្រាប់ប្រកាស (ទម្រង់ PT 01)</div>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.th}>#</th>
                        <th style={S.th}>ឯកសារ</th>
                        <th style={S.th}>ចំណាំ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["1", "ប័ណ្ណ / វិញ្ញាបនត្រម្ចាស់ដី ឬ ឯកសារកាន់កាប់", "ច្បាប់ចម្លង"],
                        ["2", "អត្តសញ្ញាណប័ណ្ណ / លិខិតឆ្លងដែន / សៀវភៅគ្រួសារ", "ច្បាប់ថតចម្លង"],
                        ["3", "រូបថតអចលនទ្រព្យ", "ថតបច្ចុប្បន្ន"],
                        ["4", "នយាមការ (ទទឹង × បណ្តោយ)", "ផែនដី / ប្ផែន"],
                        ["5", "វិក្កយបត្រទឹក-អគ្គិស្នី", "ប្រសិនបើមាន"],
                        ["6", "លិខិតអនុញ្ញាតសាងសង់ / លិខិតបញ្ជាក់", "ករណីដីមានសំណង់"],
                      ].map(([num, doc, note]) => (
                        <tr key={num}>
                          <td style={{ ...S.td, fontWeight: 700, color: "#2563EB", width: 30 }}>{num}</td>
                          <td style={S.td}>{doc}</td>
                          <td style={{ ...S.td, color: "#64748B", fontSize: 12 }}>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={S.note}>
                    បំពេញ <strong>ទម្រង់ PT 01</strong> "ពាក្យស្នើសុំចុះបញ្ជី និងធ្វើបច្ចុប្បន្នភាពព័ត៌មានអចលនទ្រព្យ"
                    ភ្ជាប់ជាមួយឯកសារខាងលើ ដាក់ជូន GDT ឬ តាម Online។
                  </div>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}