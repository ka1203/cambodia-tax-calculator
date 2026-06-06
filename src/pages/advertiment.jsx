import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

function fmt(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function n(v) { return parseFloat(v) || 0; }

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "ពន្ធលើផ្ទាំងផ្សព្វផ្សាយ (Advertisement Tax)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `ពន្ធលើផ្ទាំងផ្សព្វផ្សាយ គឺជាប្រភេទពន្ធប្រចាំឆ្នាំ
អនុវត្តលើផ្ទាំងផ្សព្វផ្សាយគ្រប់ប្រភេទ ទាំងចល័ត
និងអចល័ត នៅទូទាំងព្រះរាជាណាចក្រកម្ពុជា។
• ថ្ងៃប្រកាស/បង់: ១ មករា – ៣១ មីនា នៃឆ្នាំជាប់ពន្ធ
• ផ្ទាំងថ្មី ៦ ខែដើម: ១០០% | ៦ ខែចុង: ៥០%
• ផ្សព្វផ្សាយ: ដាក់ប្រកាសមុនធ្វើការផ្សព្វផ្សាយ
• ចំនួន: ប្រចាំផ្ទាំង / ប្រចាំ ដម² / ប្រចាំទំព័រ`,
  },
  {
    term: "ប្រភេទផ្ទាំងផ្សព្វផ្សាយ (Types of Advertisement)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `① បណ្ណប្រកាស (ក្រដាស) → គិតតាម ទំព័រ
   ≤ ៤០ ដម² : ៥០០–១,៥០០ ៛/ទំព័រ
   {">"} ៤០ ដម² : ៧០០–២,១០០ ៛/ទំព័រ

② បណ្ណប្រកាស (កៅស៊ូ/សំពត់/វត្ថុ) → គិតតាម ផ្ទាំង
   ≤ ៤០ ដម² : ៧០០–២,១០០ ៛/ផ្ទាំង
   ៤០–១០០ ដម² : ១,០០០–៣,០០០ ៛/ផ្ទាំង

③ ស្លាកអាជីវកម្ម → គិតតាម ដម²/ឆ្នាំ
   ១០០–៣០០ ៛/ដម² (+ អក្សរបរទេស)

④ ផ្ទាំងអក្សរ/រូបភាពពាណិជ្ជកម្ម → គិតតាម ដម²/ឆ្នាំ
   ៥០០–១,៥០០ ៛/ដម² (+ អក្សរបរទេស)`,
  },
  {
    term: "អក្សរបរទេស (Foreign Language Surcharge)",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ករណីផ្ទាំងផ្សព្វផ្សាយ មានអក្សរបរទេស
ត្រូវគិតបន្ថែម ក្នុងអក្សរ ១ តួ និងកម្ពស់ ១ ដម:
• ស្លាកអាជីវកម្មដ្ឋាន: + ២០០ ៛/ដម/ឆ្នាំ (ជាក់លាក់)
• ផ្ទាំងអក្សរ/រូបភាព: + ២,០០០ ៛/ដម (ជាក់លាក់)
ករណីបណ្ណប្រកាស → ស្រាប់ចាត់ថ្នាក់ខ្ពស់ជាង:
  ក្រដាស ≤ ៤០: ១,៥០០ ៛ | {">"} ៤០: ២,១០០ ៛/ទំព័រ
  កៅស៊ូ ≤ ៤០: ២,១០០ ៛ | ៤០–១០០: ៣,០០០ ៛/ផ្ទាំង
❌ Logo · អាសយដ្ឋាន · លេខទូរស័ព្ទ · គេហទំព័រ
  → មិនរាប់ជាអក្សរបរទេស`,
  },
  {
    term: "ការលើកលែងពន្ធ (Exemptions)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ករណីលើកលែងពន្ធ (គ្មានបំណងរកប្រាក់ចំណេញ):
① ស្ថាប័នរដ្ឋ
② ស្ថានទូត / កុងស៊ុល / អង្គការអន្តរជាតិ
③ NGO / សមាគម
④ ផ្ទាំងអប់រំសង្គម មានជាអាទិ៍:
   • ការថែរក្សាបរិស្ថាន
   • ការបញ្ឈប់អំពើហឹង្សាគ្រួសារ
   • ការអប់រំចរាចរណ៍
   • ការអប់រំសុខភាព`,
  },
  {
    term: "ពាក់កណ្តាលឆ្នាំ + ផ្ទាំងថ្មី (Mid-Year Rule)",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `ផ្ទាំងថ្មី (ស្លាក/ផ្ទាំងអក្សរ/រូបភាព) ដែលផលិតថ្មី:
• ១ មករា – ៣០ មិថុនា (៦ ខែដើម) → បង់ ១០០%
• ១ កក្កដា – ៣១ធ្នូ (៦ ខែចុង) → បង់ ៥០%

ផ្ទាំងដែលដំណើរការស្រាប់:
• បង់ ១ មករា – ៣១ មីនា នៃឆ្នាំជាប់ពន្ធ

ករណីស្លាកភ្ជាប់បណ្ណប្រកាសសហគ្រាសផ្សេង:
→ គិតតាមចំណែករបស់ម្ចាស់នីមួយៗ
→ គិតតាមប្រភេទបណ្ណប្រកាសផ្ទាំងនោះ`,
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
  infoCardValue: { fontSize: 14, fontWeight: 800, color: "#0B1F4E", fontFamily: FONT, lineHeight: 1.4 },
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
  { icon: "📋", bg: "#EFF6FF", title: "ពន្ធបណ្ណប្រកាស",      value: "៥០០–៣,០០០ ៛",  note: "ក្រដាស / កៅស៊ូ / សំពត់" },
  { icon: "🏪", bg: "#F0FDF4", title: "ស្លាកអាជីវកម្ម",      value: "១០០–២៥០ ៛/ដម²",  note: "គ្មាន/មានពន្លឺ · ត្រង់/កែង" },
  { icon: "🖼️", bg: "#FAF5FF", title: "ផ្ទាំងរូបភាព/អក្សរ", value: "៥០០–១,៥០០ ៛/ដម²", note: "ពាណិជ្ជកម្ម / មានពន្លឺ" },
  { icon: "🔤", bg: "#FFFBEB", title: "អក្សរបរទេស",           value: "+ ២,០០០ ៛/ដម",    note: "ក្នុងអក្សរ ១ តួ × កម្ពស់ ១ ដម" },
  { icon: "📅", bg: "#FEF2F2", title: "ថ្ងៃប្រកាស",           value: "១ មករា – ៣១ មីនា", note: "| ផ្ទាំងថ្មី ក្រោយ ១ កក្កដា = ៥០%" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — ពន្ធលើផ្ទាំងផ្សព្វផ្សាយ</span>
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

// ── RATE TABLES ───────────────────────────────────────────────
// Tab 1: Commercial Leaflet / Brochure (ក្រដាស)
// Tab 2: Rubber/Fabric banners
// Tab 3: Business Sign (ស្លាក)
// Tab 4: Billboard / Image Board

// ══════════════════════════════════════════════════════════════
// TAB 1 — LEAFLET / BROCHURE (ក្រដាស)
// ══════════════════════════════════════════════════════════════
function LeafletTab() {
  const [area,    setArea]    = useState("");
  const [foreign, setForeign] = useState("no");
  const [qty,     setQty]     = useState("1");
  const [result,  setResult]  = useState(null);

  function calculate() {
    const a = n(area);
    const q = n(qty) || 1;
    if (!a) return;

    let rateKhmer, rateForeign;
    if (a <= 40) { rateKhmer = 500; rateForeign = 1500; }
    else          { rateKhmer = 700; rateForeign = 2100; }

    const ratePerPage = foreign === "yes" ? rateForeign : rateKhmer;
    const taxPerPage  = ratePerPage;
    const totalTax    = taxPerPage * q;

    setResult({ a, q, ratePerPage, taxPerPage, totalTax, foreign, tier: a <= 40 ? "≤ ៤០ ដម²" : "> ៤០ ដម²" });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានបណ្ណប្រកាស (ក្រដាសធម្មតា)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ផ្ទៃក្រឡា (ដម²)</label>
            <input style={S.input} type="number" placeholder="ឧ: 35 ឬ 60" value={area} onChange={e => { setArea(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនទំព័រ / ផ្ទាំង</label>
            <input style={S.input} type="number" placeholder="ឧ: 1000" value={qty} onChange={e => { setQty(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>មានអក្សរបរទេស?</label>
          <select style={S.select} value={foreign} onChange={e => { setForeign(e.target.value); setResult(null); }}>
            <option value="no">គ្មានអក្សរបរទេស</option>
            <option value="yes">មានអក្សរបរទេស</option>
          </select>
        </div>
        <div style={S.note}>
          • ≤ ៤០ ដម²: ៥០០ ៛/ទំព័រ | មានអក្សរបរទេស: ១,៥០០ ៛/ទំព័រ<br />
          • {">"} ៤០ ដម²: ៧០០ ៛/ទំព័រ | មានអក្សរបរទេស: ២,១០០ ៛/ទំព័រ<br />
          • ត្រូវដាក់ប្រកាស <strong>មុន</strong>ធ្វើការផ្សព្វផ្សាយ
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធបណ្ណប្រកាស (ក្រដាស)</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ថ្នាក់ផ្ទៃ</div><div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.tier}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អត្រា/ទំព័រ</div><div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmt(result.ratePerPage)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធសរុប ({result.q} ទំព័រ)</div><div style={{ fontSize: 14, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.totalTax)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ព័ត៌មាន</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ផ្ទៃក្រឡា</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.a} ដម²</td></tr>
                <tr><td style={S.td}>ថ្នាក់</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.tier}</td></tr>
                <tr><td style={S.td}>អក្សរបរទេស</td><td style={{ ...S.td, color: result.foreign === "yes" ? "#c0392b" : "#166534", fontWeight: 700 }}>{result.foreign === "yes" ? "មាន" : "គ្មាន"}</td></tr>
                <tr><td style={S.td}>អត្រា/ទំព័រ</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.ratePerPage)}</td></tr>
                <tr><td style={S.td}>ចំនួនទំព័រ</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.q} ទំព័រ</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}><span>ពន្ធត្រូវបង់ ({fmt(result.ratePerPage)} × {result.q})</span><span>{fmt(result.totalTax)}</span></div>
            <div style={S.note}><strong>រូបមន្ត:</strong> {fmt(result.ratePerPage)} × {result.q} ទំព័រ = <strong>{fmt(result.totalTax)}</strong></div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — RUBBER / FABRIC BANNER (កៅស៊ូ/សំពត់/វត្ថុ)
// ══════════════════════════════════════════════════════════════
function BannerTab() {
  const [area,    setArea]    = useState("");
  const [foreign, setForeign] = useState("no");
  const [qty,     setQty]     = useState("1");
  const [result,  setResult]  = useState(null);

  function calculate() {
    const a = n(area);
    const q = n(qty) || 1;
    if (!a) return;

    let rateKhmer, rateForeign, tier;
    if (a <= 40)       { rateKhmer = 700;  rateForeign = 2100; tier = "≤ ៤០ ដម²"; }
    else if (a <= 100) { rateKhmer = 1000; rateForeign = 3000; tier = "៤០–១០០ ដម²"; }
    else               { rateKhmer = 1000; rateForeign = 3000; tier = "> ១០០ ដម² (គិតជាផ្ទាំងអក្សរ)"; }

    const rate     = foreign === "yes" ? rateForeign : rateKhmer;
    const totalTax = rate * q;
    setResult({ a, q, rate, totalTax, foreign, tier });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានបណ្ណប្រកាស (កៅស៊ូ / សំពត់ / វត្ថុ)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ផ្ទៃក្រឡា (ដម²)</label>
            <input style={S.input} type="number" placeholder="ឧ: 50" value={area} onChange={e => { setArea(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនផ្ទាំង</label>
            <input style={S.input} type="number" placeholder="ឧ: 10" value={qty} onChange={e => { setQty(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>មានអក្សរបរទេស?</label>
          <select style={S.select} value={foreign} onChange={e => { setForeign(e.target.value); setResult(null); }}>
            <option value="no">គ្មានអក្សរបរទេស</option>
            <option value="yes">មានអក្សរបរទេស</option>
          </select>
        </div>
        <div style={S.note}>
          • ≤ ៤០ ដម²: ៧០០ ៛/ផ្ទាំង | មានអក្សរបរទេស: ២,១០០ ៛/ផ្ទាំង<br />
          • ៤០–១០០ ដម²: ១,០០០ ៛/ផ្ទាំង | មានអក្សរបរទេស: ៣,០០០ ៛/ផ្ទាំង<br />
          • {">"} ១០០ ដម²: គិតជាប្រភេទ <strong>ផ្ទាំងអក្សរ/រូបភាព</strong>
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធបណ្ណប្រកាស (កៅស៊ូ/សំពត់)</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ថ្នាក់ផ្ទៃ</div><div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.tier}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អត្រា/ផ្ទាំង</div><div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmt(result.rate)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធសរុប ({result.q} ផ្ទាំង)</div><div style={{ fontSize: 14, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.totalTax)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ព័ត៌មាន</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ផ្ទៃក្រឡា</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.a} ដម²</td></tr>
                <tr><td style={S.td}>ថ្នាក់</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.tier}</td></tr>
                <tr><td style={S.td}>អក្សរបរទេស</td><td style={{ ...S.td, color: result.foreign === "yes" ? "#c0392b" : "#166534", fontWeight: 700 }}>{result.foreign === "yes" ? "មាន" : "គ្មាន"}</td></tr>
                <tr><td style={S.td}>អត្រា/ផ្ទាំង</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.rate)}</td></tr>
                <tr><td style={S.td}>ចំនួនផ្ទាំង</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{result.q} ផ្ទាំង</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}><span>ពន្ធត្រូវបង់ ({fmt(result.rate)} × {result.q})</span><span>{fmt(result.totalTax)}</span></div>
            <div style={S.note}><strong>រូបមន្ត:</strong> {fmt(result.rate)} × {result.q} ផ្ទាំង = <strong>{fmt(result.totalTax)}</strong></div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — BUSINESS SIGN (ស្លាកអាជីវកម្មដ្ឋាន)
// ══════════════════════════════════════════════════════════════
const SIGN_RATES = [
  { id: "a", label: "គ្មានពន្លឺ — លើកស្របដងផ្លូវ", rate: 100, min: 200 },
  { id: "b", label: "គ្មានពន្លឺ — កែងដងផ្លូវ",     rate: 150, min: 300 },
  { id: "c", label: "មានពន្លឺ — លើកស្របដងផ្លូវ",  rate: 200, min: 400 },
  { id: "d", label: "មានពន្លឺ — កែងដងផ្លូវ",       rate: 250, min: 500 },
];

function BusinessSignTab() {
  const [signType,    setSignType]    = useState("a");
  const [width,       setWidth]       = useState("");
  const [height,      setHeight]      = useState("");
  const [foreignChar, setForeignChar] = useState("0");
  const [charHeight,  setCharHeight]  = useState("");
  const [semester,    setSemester]    = useState("full");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const w = n(width); const h = n(height);
    if (!w || !h) return;

    const areaDm2  = w * 10 * h * 10; // convert m to dm
    const sr       = SIGN_RATES.find(r => r.id === signType);
    const baseTax  = Math.max(areaDm2 * sr.rate, sr.min);

    const fc = n(foreignChar);
    const fh = n(charHeight) * 10; // m → dm
    const foreignTax = fc > 0 && fh > 0 ? fc * fh * 200 : 0;

    const subtotal = baseTax + foreignTax;
    const semPct   = semester === "half" ? 0.5 : 1.0;
    const total    = subtotal * semPct;

    setResult({ w, h, areaDm2, sr, baseTax, fc, fh, foreignTax, subtotal, semPct, total, semester });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានស្លាកអាជីវកម្មដ្ឋាន</div>
        <div style={S.field}>
          <label style={S.label}>ប្រភេទស្លាក</label>
          <select style={S.select} value={signType} onChange={e => { setSignType(e.target.value); setResult(null); }}>
            {SIGN_RATES.map(r => <option key={r.id} value={r.id}>{r.label} — {r.rate} ៛/ដម²</option>)}
          </select>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ទទឹង (ម)</label>
            <input style={S.input} type="number" placeholder="ឧ: 2" value={width} onChange={e => { setWidth(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>កម្ពស់ (ម)</label>
            <input style={S.input} type="number" placeholder="ឧ: 1" value={height} onChange={e => { setHeight(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.cardTitle}>អក្សរបរទេស (បន្ថែម)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំនួនអក្សរបរទេស (តួ)</label>
            <input style={S.input} type="number" placeholder="ឧ: 5 (មិនរាប់ Logo/Tel/Web)" value={foreignChar} onChange={e => { setForeignChar(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>កម្ពស់អក្សរ (ម)</label>
            <input style={S.input} type="number" placeholder="ឧ: 0.5" value={charHeight} onChange={e => { setCharHeight(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>ស្ថានភាពការផ្សព្វផ្សាយ</label>
          <select style={S.select} value={semester} onChange={e => { setSemester(e.target.value); setResult(null); }}>
            <option value="full">ស្លាកដំណើរការស្រាប់ / ១ ខែមករា–៣០ មិថុនា (១០០%)</option>
            <option value="half">ស្លាកថ្មី ១ កក្កដា–៣១ ធ្នូ (៥០%)</option>
          </select>
        </div>
        <div style={S.note}>
          • ពន្ធ = ផ្ទៃ (ដម²) × អត្រា — យ៉ាងតិច {SIGN_RATES.find(r => r.id === signType)?.min || "—"} ៛<br />
          • អក្សរបរទេស: + ២០០ ៛ × ចំនួនអក្សរ × កម្ពស់ (ដម)<br />
          • Logo · Tel · Website → <strong>មិនរាប់</strong>ជាអក្សរបរទេស
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធស្លាកអាជីវកម្ម</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ផ្ទៃស្លាក</div><div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.areaDm2.toFixed(0)} ដម²</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធផ្ទៃ</div><div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmt(result.baseTax)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធអក្សរបរទេស</div><div style={{ fontSize: 14, fontWeight: 700, color: "#f97316", fontFamily: FONT }}>{fmt(result.foreignTax)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធត្រូវបង់</div><div style={{ fontSize: 14, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.total)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ការគណនា</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ផ្ទៃស្លាក ({result.w}ម × {result.h}ម)</td><td style={S.td}>{result.w}×{result.h}×{100}={result.areaDm2.toFixed(0)} ដម²</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>—</td></tr>
                <tr><td style={S.td}>ពន្ធផ្ទៃ ({result.sr.rate} ៛/ដម²)</td><td style={S.td}>{result.areaDm2.toFixed(0)} × {result.sr.rate} = {Math.max(result.areaDm2 * result.sr.rate, result.sr.min).toFixed(0)}</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.baseTax)}</td></tr>
                {result.foreignTax > 0 && (
                  <tr><td style={S.td}>អក្សរបរទេស ({result.fc} តួ × {result.fh} ដម × ២០០)</td><td style={S.td}>{result.fc} × {result.fh} × ២០០</td><td style={{ ...S.td, color: "#f97316", fontWeight: 700 }}>{fmt(result.foreignTax)}</td></tr>
                )}
                <tr><td style={{ ...S.td, fontWeight: 700 }}>សរុបមុនបញ្ចុះ</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.subtotal)}</td></tr>
                <tr><td style={S.td}>ស្ថានភាព ({result.semester === "half" ? "ខែចុង ៥០%" : "ពេញ ១០០%"})</td><td style={S.td}>× {result.semPct * 100}%</td><td style={{ ...S.td, color: result.semester === "half" ? "#166534" : "#2563EB", fontWeight: 700 }}>{fmt(result.total)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}><span>ពន្ធស្លាកអាជីវកម្មត្រូវបង់</span><span>{fmt(result.total)}</span></div>
            <div style={S.note}><strong>រូបមន្ត:</strong> ({fmt(result.baseTax)} + {fmt(result.foreignTax)}) × {result.semPct * 100}% = <strong>{fmt(result.total)}</strong></div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — BILLBOARD / IMAGE BOARD (ផ្ទាំងអក្សរ/រូបភាព)
// ══════════════════════════════════════════════════════════════
const BILLBOARD_RATES = [
  { id: "a", label: "គ្មានពន្លឺ — លើកស្របដងផ្លូវ",           rate: 500,  min: 1000, foreignExtra: 2000 },
  { id: "b", label: "គ្មានពន្លឺ — កែងដងផ្លូវ",               rate: 700,  min: 1400, foreignExtra: 2000 },
  { id: "c", label: "មានពន្លឺ — លើកស្របដងផ្លូវ",            rate: 700,  min: 1400, foreignExtra: 2000 },
  { id: "d", label: "មានពន្លឺ — កែងដងផ្លូវ",                 rate: 1000, min: 2000, foreignExtra: 2000 },
  { id: "e", label: "ដាក់/ភ្ជាប់លើមធ្យោបាយដឹកជញ្ជូន",       rate: 1500, min: 3000, foreignExtra: 2000 },
];

function BillboardTab() {
  const [bbType,      setBbType]      = useState("a");
  const [width,       setWidth]       = useState("");
  const [height,      setHeight]      = useState("");
  const [foreignChar, setForeignChar] = useState("0");
  const [charHeight,  setCharHeight]  = useState("");
  const [semester,    setSemester]    = useState("full");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const w = n(width); const h = n(height);
    if (!w || !h) return;

    const areaDm2  = w * 10 * h * 10;
    const br       = BILLBOARD_RATES.find(r => r.id === bbType);
    const baseTax  = Math.max(areaDm2 * br.rate, br.min);

    const fc = n(foreignChar);
    const fh = n(charHeight) * 10;
    const foreignTax = fc > 0 && fh > 0 ? fc * fh * br.foreignExtra : 0;

    const subtotal = baseTax + foreignTax;
    const semPct   = semester === "half" ? 0.5 : 1.0;
    const total    = subtotal * semPct;

    setResult({ w, h, areaDm2, br, baseTax, fc, fh, foreignTax, subtotal, semPct, total, semester });
  }

  const selectedRate = BILLBOARD_RATES.find(r => r.id === bbType);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានផ្ទាំងអក្សរ / រូបភាពពាណិជ្ជកម្ម</div>
        <div style={S.field}>
          <label style={S.label}>ប្រភេទផ្ទាំង</label>
          <select style={S.select} value={bbType} onChange={e => { setBbType(e.target.value); setResult(null); }}>
            {BILLBOARD_RATES.map(r => <option key={r.id} value={r.id}>{r.label} — {r.rate} ៛/ដម²</option>)}
          </select>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ទទឹង (ម)</label>
            <input style={S.input} type="number" placeholder="ឧ: 2" value={width} onChange={e => { setWidth(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>កម្ពស់ (ម)</label>
            <input style={S.input} type="number" placeholder="ឧ: 4" value={height} onChange={e => { setHeight(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.cardTitle}>អក្សរបរទេស (បន្ថែម)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំនួនអក្សរបរទេស (តួ)</label>
            <input style={S.input} type="number" placeholder="ឧ: CLEAR=5 តួ" value={foreignChar} onChange={e => { setForeignChar(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>កម្ពស់អក្សរ (ម)</label>
            <input style={S.input} type="number" placeholder="ឧ: 0.50" value={charHeight} onChange={e => { setCharHeight(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>ស្ថានភាពការផ្សព្វផ្សាយ</label>
          <select style={S.select} value={semester} onChange={e => { setSemester(e.target.value); setResult(null); }}>
            <option value="full">ផ្ទាំងដំណើរការស្រាប់ / ១ ខែមករា–៣០ មិថុនា (១០០%)</option>
            <option value="half">ផ្ទាំងថ្មី ១ កក្កដា–៣១ ធ្នូ (៥០%)</option>
          </select>
        </div>
        <div style={S.note}>
          • ពន្ធ = ផ្ទៃ (ដម²) × {selectedRate?.rate} ៛ — យ៉ាងតិច {selectedRate?.min?.toLocaleString()} ៛<br />
          • អក្សរបរទេស: + ២,០០០ ៛ × ចំនួនអក្សរ × កម្ពស់ (ដម)<br />
          • Logo · Tel · Website → <strong>មិនរាប់</strong>ជាអក្សរបរទេស
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាពន្ធផ្ទាំងអក្សរ/រូបភាព</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ផ្ទៃផ្ទាំង</div><div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{result.areaDm2.toFixed(0)} ដម²</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធផ្ទៃ</div><div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmt(result.baseTax)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធអក្សរបរទេស</div><div style={{ fontSize: 14, fontWeight: 700, color: "#f97316", fontFamily: FONT }}>{fmt(result.foreignTax)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ពន្ធត្រូវបង់</div><div style={{ fontSize: 14, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.total)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ការគណនា</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ផ្ទៃផ្ទាំង ({result.w}ម × {result.h}ម)</td><td style={S.td}>{result.w}×{result.h}×{100}={result.areaDm2.toFixed(0)} ដម²</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>—</td></tr>
                <tr><td style={S.td}>ពន្ធផ្ទៃ ({result.br.rate} ៛/ដម²)</td><td style={S.td}>{result.areaDm2.toFixed(0)} × {result.br.rate}</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.baseTax)}</td></tr>
                {result.foreignTax > 0 && (
                  <tr><td style={S.td}>អក្សរបរទេស ({result.fc} តួ × {result.fh} ដម × ២,០០០)</td><td style={S.td}>{result.fc} × {result.fh} × ២,០០០</td><td style={{ ...S.td, color: "#f97316", fontWeight: 700 }}>{fmt(result.foreignTax)}</td></tr>
                )}
                <tr><td style={{ ...S.td, fontWeight: 700 }}>សរុបមុនបញ្ចុះ</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.subtotal)}</td></tr>
                <tr><td style={S.td}>ស្ថានភាព ({result.semester === "half" ? "ខែចុង ៥០%" : "ពេញ ១០០%"})</td><td style={S.td}>× {result.semPct * 100}%</td><td style={{ ...S.td, color: result.semester === "half" ? "#166534" : "#2563EB", fontWeight: 700 }}>{fmt(result.total)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}><span>ពន្ធផ្ទាំងអក្សរ/រូបភាពត្រូវបង់</span><span>{fmt(result.total)}</span></div>
            <div style={S.note}>
              <strong>ឧទាហរណ៍ (ពីឯកសារ): </strong>ផ្ទាំង ២ម×៤ម / មានពន្លឺ / កែង / "CLEAR" (៥ តួ, ០.៥ ម) + "C" (១ តួ, ០.៦ ម)<br />
              ផ្ទៃ = ២×៤×១០០ = ៨០០ ដម² · ពន្ធ = ៨០០×១,០០០ = ៨០០,០០០ ៛<br />
              អក្សរ = (៥×៥ + ១×៦)×២,០០០ = ២៦×២,០០០ = ៥២,០០០ ៛<br />
              <strong>សរុប = ៨០០,០០០ + ៥២,០០០ = ៨៥២,០០០ ៛</strong>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// RATE REFERENCE TABLE
// ══════════════════════════════════════════════════════════════
function RateTable() {
  return (
    <div style={S.card}>
      <div style={S.cardTitle}>តារាងអត្រាពន្ធផ្ទាំងផ្សព្វផ្សាយ — ឯកសារយោង</div>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.th}>#</th>
            <th style={S.th}>ប្រភេទ</th>
            <th style={S.th}>អត្រា (ខ្មែរ)</th>
            <th style={S.th}>អត្រា (បរទេស)</th>
            <th style={S.th}>ឯកតា</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["១ក", "ក្រដាស ≤ ៤០ ដម²",            "៥០០", "១,៥០០", "/ ទំព័រ"],
            ["១ខ", "ក្រដាស > ៤០ ដម²",             "៧០០", "២,១០០", "/ ទំព័រ"],
            ["២ក", "កៅស៊ូ/សំពត់ ≤ ៤០ ដម²",       "៧០០", "២,១០០", "/ ផ្ទាំង"],
            ["២ខ", "កៅស៊ូ/សំពត់ ៤០–១០០ ដម²",     "១,០០០", "៣,០០០", "/ ផ្ទាំង"],
            ["៣ក", "ស្លាក / គ្មានពន្លឺ / ត្រង់",  "១០០", "+២០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៣ខ", "ស្លាក / គ្មានពន្លឺ / កែង",   "១៥០", "+២០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៣គ", "ស្លាក / មានពន្លឺ / ត្រង់",    "២០០", "+២០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៣ឃ", "ស្លាក / មានពន្លឺ / កែង",      "២៥០", "+២០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៤ក", "ផ្ទាំង / គ្មានពន្លឺ / ត្រង់", "៥០០", "+២,០០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៤ខ", "ផ្ទាំង / គ្មានពន្លឺ / កែង",  "៧០០", "+២,០០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៤គ", "ផ្ទាំង / មានពន្លឺ / ត្រង់",   "៧០០", "+២,០០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៤ឃ", "ផ្ទាំង / មានពន្លឺ / កែង",     "១,០០០", "+២,០០០/ដម", "/ ដម² / ឆ្នាំ"],
            ["៤ង", "ភ្ជាប់មធ្យោបាយដឹកជញ្ជូន",    "១,៥០០", "+២,០០០/ដម", "/ ដម² / ឆ្នាំ"],
          ].map(([num, type, khmer, foreign, unit]) => (
            <tr key={num}>
              <td style={{ ...S.td, fontWeight: 700, color: "#2563EB", width: 36 }}>{num}</td>
              <td style={S.td}>{type}</td>
              <td style={{ ...S.td, color: "#0B1F4E", fontWeight: 700 }}>{khmer} ៛</td>
              <td style={{ ...S.td, color: "#c0392b", fontWeight: 700 }}>{foreign} ៛</td>
              <td style={{ ...S.td, color: "#64748B", fontSize: 12 }}>{unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={S.note}>
        • ស្លាក + ផ្ទាំង: ចំនួនអប្បបរមា (Min) អនុវត្ត ករណីផ្ទៃតូច<br />
        • Logo · លេខទូរស័ព្ទ · គេហទំព័រ → <strong>មិនរាប់</strong>ជាអក្សរបរទេស<br />
        • ផ្ទាំងថ្មី ៦ ខែចុង (ក្រោយ ១ កក្កដា) → <strong>គិតពន្ធ ៥០%</strong>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function AdvertisementTaxPage({ setPage }) {
  const [tab, setTab] = useState("leaflet");

  const TABS = [
    { id: "leaflet",   label: "📄 ក្រដាស" },
    { id: "banner",    label: "🎌 កៅស៊ូ/សំពត់" },
    { id: "sign",      label: "🏪 ស្លាកអាជីវកម្ម" },
    { id: "billboard", label: "🖼️ ផ្ទាំងរូបភាព" },
    { id: "rates",     label: "📊 តារាងអត្រា" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>ពន្ធលើផ្ទាំងផ្សព្វផ្សាយ </div>
          <div style={S.hSub}>កម្ពុជា · Advertisement Tax · ១ មករា – ៣១ មីនា | ផ្ទាំងថ្មី ខែចុង = ៥០%</div>
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

        {tab === "leaflet"   && <LeafletTab />}
        {tab === "banner"    && <BannerTab />}
        {tab === "sign"      && <BusinessSignTab />}
        {tab === "billboard" && <BillboardTab />}
        {tab === "rates"     && <RateTable />}

      </div>
    </div>
  );
}