import { useState } from "react";

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

function fmt(v) {
  return Math.round(v).toLocaleString("en-US") + " ៛";
}
function fmtUSD(v) {
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function n(v) { return parseFloat(v) || 0; }

// ── DEFINITIONS ───────────────────────────────────────────────
const DEFS = [
  {
    term: "អាករលើតម្លៃបន្ថែម — VAT (អតប)",
    color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
    body: `អតប គឺជាប្រភេទអាករដែលយកលើតម្លៃបន្ថែម
ពីការផ្គត់ផ្គង់ទំនិញ ឬ សេវា។
• ប្រមូលគ្រប់ដំណាក់កាល (Multi-stage)
• អ្នកជាប់ពន្ធ Self-Assessment → ចុះបញ្ជី VAT
• Output VAT − Input VAT = VAT ត្រូវបង់
• ប្រកាស/បង់: ផ្ទាល់ ថ្ងៃទី 20 · Online ថ្ងៃទី 25
• VAT 2 អត្រា: 10% (ក្នុងស្រុក/នាំចូល) | 0% (នាំចេញ)`,
  },
  {
    term: "Output VAT (អាករលើធាតុចេញ)",
    color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
    body: `Output VAT = ទំនិញ/សេវាផ្គត់ផ្គង់ជូនអតិថិជន
→ អតប ប្រមូលលើ: ការផ្គត់ផ្គង់ · អំណោយ
  · ការដកយកប្រើផ្ទាល់ · ការនាំចូល

Output VAT = មូលដ្ឋានគិតអតប × 10%
• ការផ្គត់ផ្គង់ក្នុងស្រុក: ថ្លៃទំនិញ/សេវា
• ការផ្គត់ផ្គង់ = តម្លៃ + VAT
• ករណីដឹងតែ incl. VAT: Base = Total / 1.1`,
  },
  {
    term: "Input VAT (អាករលើធាតុចូល)",
    color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    body: `Input VAT = អតប ដែលបានបង់លើការទិញ
(ទំនិញ/សេវា សម្រាប់ប្រើក្នុងអាជីវកម្ម)

ស្នើសុំឥណទានបាន ប្រសិនបើ:
① ទិញដើម្បីលក់ជាប់ VAT ឬ ប្រើផ្គត់ផ្គង់ VAT
② មានច្បាប់ VAT Invoice ពីអ្នកជាប់ VAT
③ មានឯកសារភស្តុតាង (CIF + ពន្ធគយ ករណីនាំចូល)

មិនអាចឥណទាន: រថយន្ត ≤ 10 អង្គុយ · ការទទួលភ្ញៀវ
  · ប្រេងសាំង/ម៉ាស៊ូត/រំអិល · ទូរស័ព្ទចល័ត`,
  },
  {
    term: "Apportionment — ករណីចម្រុះ VAT/Non-VAT",
    color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
    body: `ករណី Input VAT ប្រើចំរុះ (Taxable + Exempt):

រូបមន្ត: ឥណទាន = ក × ខ / គ
• ក = Input VAT សរុបខែ
• ខ = ការផ្គត់ផ្គង់ជាប់ VAT (taxable)
• គ = ការផ្គត់ផ្គង់ Total (taxable + exempt)

លទ្ធផល ខ/គ:
< 0.05 → Input VAT 0 (គ្មានឥណទាន)
0.05 – 0.95 → ឥណទានតាមសមាមាត្រ
{">"} 0.95 → Input VAT 100% (ឥណទានទាំងអស់)`,
  },
  {
    term: "ករណីលើកលែង VAT (VAT-Exempt Supplies)",
    color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
    body: `ការផ្គត់ផ្គង់មិនជាប់ VAT:
① សេវាប្រៃសណីយ៍សាធារណៈ
② មន្ទីរពេទ្យ / គ្លីនិក / ទន្តពេទ្យ
③ ដឹកអ្នកដំណើរ (ប្រព័ន្ធរដ្ឋ)
④ ធានារ៉ាប់រង
⑤ សេវាហិរញ្ញវត្ថុ (ស្តង់ដារ MEF)
⑥ ផលិតផលកសិកម្មមិនទាន់កែច្នៃ
⑦ អប់រំ / ពន្លឺ / ទឹកស្អាត / សំរាម
⑧ NGO (ទទួលស្គាល់ MEF) · ការទូត`,
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
  dedTotalGreen: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedVal:    { color: "#2563EB", fontWeight: 700 },
  dedValRed: { color: "#DC2626", fontWeight: 700 },
  dedValGreen: { color: "#166534", fontWeight: 700 },
};

const INFO_CARDS = [
  { icon: "🏷️", bg: "#EFF6FF", title: "VAT ក្នុងស្រុក/នាំចូល", value: "10%",         note: "Output VAT − Input VAT" },
  { icon: "✈️", bg: "#F0FDF4", title: "VAT នាំចេញ",         value: "0%",           note: "Zero-rated export" },
  { icon: "📥", bg: "#FFFBEB", title: "Input VAT Credit",      value: "ឥណទានបាន",     note: "ប្រសិនបើទាក់ទងអាជីវកម្ម VAT" },
  { icon: "📊", bg: "#FAF5FF", title: "Apportionment",         value: "ក × ខ / គ",    note: "ករណីចំរុះ Taxable + Exempt" },
  { icon: "📅", bg: "#FEF2F2", title: "ថ្ងៃប្រកាស",            value: "ទី 20/25",     note: "ផ្ទាល់ 20 · Online 25 ខែបន្ទាប់" },
];

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0, boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>📖 និយមន័យ និងការពន្យល់ — អាករលើតម្លៃបន្ថែម (VAT)</span>
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
// TAB 1 — STANDARD VAT CALCULATOR (Output − Input)
// ══════════════════════════════════════════════════════════════
function StandardTab() {
  const [supplyType,  setSupplyType]  = useState("standard");
  const [salesBase,   setSalesBase]   = useState("");
  const [salesIncl,   setSalesIncl]   = useState("excl");
  const [purchBase,   setPurchBase]   = useState("");
  const [creditFwd,   setCreditFwd]   = useState("0");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const s    = n(salesBase);
    const p    = n(purchBase);
    const cf   = n(creditFwd);
    if (!s) return;

    const outputRate   = supplyType === "export" ? 0 : 0.10;
    const salesExcl    = salesIncl === "incl" ? s / 1.1 : s;
    const outputVAT    = salesExcl * outputRate;
    const inputVAT     = p * 0.10;
    const netVAT       = outputVAT - inputVAT - cf;
    const payable      = Math.max(0, netVAT);
    const creditCarry  = netVAT < 0 ? Math.abs(netVAT) : 0;

    setResult({ salesExcl, outputVAT, inputVAT, cf, netVAT, payable, creditCarry, supplyType, p });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទការផ្គត់ផ្គង់</div>
        <div style={S.tabRow}>
          <button style={supplyType === "standard" ? S.tabOn : S.tab}
            onClick={() => { setSupplyType("standard"); setResult(null); }}>
            ក្នុងស្រុក​ — 10%
          </button>
          <button style={supplyType === "export" ? S.tabOn : S.tab}
            onClick={() => { setSupplyType("export"); setResult(null); }}>
            នាំចេញ / Export — 0%
          </button>
        </div>

        <div style={S.cardTitle}>ការផ្គត់ផ្គង់ (Output)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ថ្លៃលក់ / ការផ្គត់ផ្គង់ (៛)</label>
            <input style={S.input} type="number" placeholder="ឧ: 5000000"
              value={salesBase} onChange={e => { setSalesBase(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃបញ្ចូលរួម VAT ហើយឬនៅ?</label>
            <select style={S.select} value={salesIncl}
              onChange={e => { setSalesIncl(e.target.value); setResult(null); }}>
              <option value="excl">មិនទាន់រួម VAT (Exclusive)</option>
              <option value="incl">រួមមាន VAT ស្រាប់ (Inclusive → ÷ 1.1)</option>
            </select>
          </div>
        </div>

        <div style={S.cardTitle}>ការទិញ (Input)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ថ្លៃទិញ មូលដ្ឋាន excl. VAT (៛)</label>
            <input style={S.input} type="number" placeholder="ឧ: 3000000"
              value={purchBase} onChange={e => { setPurchBase(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ឥណទាន VAT ចម្លងពីខែមុន (៛)</label>
            <input style={S.input} type="number" placeholder="0"
              value={creditFwd} onChange={e => { setCreditFwd(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.note}>
          • Output VAT = ថ្លៃលក់ (excl.) × {supplyType === "export" ? "0%" : "10%"}<br />
          • Input VAT = ថ្លៃទិញ (excl.) × 10%<br />
          • VAT ត្រូវបង់ = Output − Input − ឥណទានចម្លង<br />
          • ករណី negative → ឥណទានយោងខែបន្ទាប់
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនា VAT ត្រូវបង់</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>Output VAT ({result.supplyType === "export" ? "0%" : "10%"})</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.outputVAT)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Input VAT (Credit)</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#166534", fontFamily: FONT }}>{fmt(result.inputVAT)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>{result.payable > 0 ? "VAT ត្រូវបង់" : "ឥណទានយោង"}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: result.payable > 0 ? "#c0392b" : "#166534", fontFamily: FONT }}>
                {result.payable > 0 ? fmt(result.payable) : fmt(result.creditCarry)}
              </div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត VAT</div>
            <table style={S.tbl}>
              <thead>
                <tr>
                  <th style={S.th}>បរិយាយ</th>
                  <th style={S.th}>មូលដ្ឋាន (excl.)</th>
                  <th style={S.th}>អត្រា</th>
                  <th style={S.th}>VAT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={S.td}>Output VAT (ការផ្គត់ផ្គង់)</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.salesExcl)}</td>
                  <td style={S.td}>{result.supplyType === "export" ? "0%" : "10%"}</td>
                  <td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.outputVAT)}</td>
                </tr>
                <tr>
                  <td style={S.td}>Input VAT (ការទិញ)</td>
                  <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>{fmt(result.p)}</td>
                  <td style={S.td}>10%</td>
                  <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>−{fmt(result.inputVAT)}</td>
                </tr>
                {result.cf > 0 && (
                  <tr>
                    <td style={S.td}>ឥណទានចម្លងពីខែមុន</td>
                    <td style={S.td}>—</td>
                    <td style={S.td}>—</td>
                    <td style={{ ...S.td, color: "#166534", fontWeight: 700 }}>−{fmt(result.cf)}</td>
                  </tr>
                )}
              </tbody>
            </table>
            {result.payable > 0 ? (
              <div style={S.dedTotal}>
                <span>VAT ត្រូវបង់ជូនរដ្ឋ (Output − Input − ឥណទានចម្លង)</span>
                <span>{fmt(result.payable)}</span>
              </div>
            ) : (
              <div style={S.dedTotalGreen}>
                <span>ឥណទាន VAT យោងទៅខែបន្ទាប់</span>
                <span>{fmt(result.creditCarry)}</span>
              </div>
            )}
            <div style={S.note}>
              <strong>រូបមន្ត:</strong><br />
              • Output VAT = {fmt(result.salesExcl)} × {result.supplyType === "export" ? "0%" : "10%"} = {fmt(result.outputVAT)}<br />
              • Input VAT = {fmt(result.p)} × 10% = {fmt(result.inputVAT)}<br />
              • លទ្ធផល = {fmt(result.outputVAT)} − {fmt(result.inputVAT)} − {fmt(result.cf)} = <strong>{fmt(result.netVAT)}</strong><br />
              {result.payable > 0
                ? <>→ <strong>VAT ត្រូវបង់: {fmt(result.payable)}</strong> (ថ្ងៃទី 20/25 ខែបន្ទាប់)</>
                : <>→ <strong>ឥណទានយោង: {fmt(result.creditCarry)}</strong> (ប្រើក្នុងខែបន្ទាប់)</>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — IMPORT VAT
// ══════════════════════════════════════════════════════════════
function ImportTab() {
  const [cif,       setCif]       = useState("");
  const [duty,      setDuty]      = useState("");
  const [excise,    setExcise]    = useState("0");
  const [result,    setResult]    = useState(null);

  function calculate() {
    const c = n(cif); const d = n(duty); const e = n(excise);
    if (!c) return;
    const vatBase = c + d + e;
    const vat     = vatBase * 0.10;
    setResult({ c, d, e, vatBase, vat });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ការនាំចូល — VAT Base = CIF + ពន្ធគយ + អាករពិសេស</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>CIF (Cost + Insurance + Freight) — ៛</label>
            <input style={S.input} type="number" placeholder="ឧ: 10000000"
              value={cif} onChange={e => { setCif(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ពន្ធគយ (Import Duty) — ៛</label>
            <input style={S.input} type="number" placeholder="ឧ: 1500000"
              value={duty} onChange={e => { setDuty(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>អាករពិសេស (Excise Tax) — ៛ — 0 ករណីគ្មាន</label>
          <input style={S.input} type="number" placeholder="0"
            value={excise} onChange={e => { setExcise(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • VAT Base = CIF + ពន្ធគយ + អាករពិសេស<br />
          • VAT នាំចូល = VAT Base × <strong>10%</strong><br />
          • ភស្តុតាង: ប្រតិវេទន៍គយ + បង្កាន់ដៃបង់ — ស្នើ Input VAT credit បាន
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនា VAT នាំចូល</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>CIF</div><div style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{fmt(result.c)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>VAT Base</div><div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", fontFamily: FONT }}>{fmt(result.vatBase)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>VAT នាំចូល (10%)</div><div style={{ fontSize: 14, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.vat)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ទឹកប្រាក់</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>CIF</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.c)}</td></tr>
                <tr><td style={S.td}>+ ពន្ធគយ (Import Duty)</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.d)}</td></tr>
                {result.e > 0 && <tr><td style={S.td}>+ អាករពិសេស</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.e)}</td></tr>}
                <tr><td style={{ ...S.td, fontWeight: 700 }}>= VAT Base</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{fmt(result.vatBase)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedTotal}>
              <span>VAT នាំចូល ({fmt(result.vatBase)} × 10%)</span>
              <span>{fmt(result.vat)}</span>
            </div>
            <div style={S.note}>
              <strong>រូបមន្ត:</strong> ({fmt(result.c)} + {fmt(result.d)}{result.e > 0 ? " + " + fmt(result.e) : ""}) × 10% = <strong>{fmt(result.vat)}</strong><br />
              VAT នេះ អាចស្នើ Input Credit បាន ប្រសិនបើ ទំនិញទាក់ទងអាជីវកម្ម VAT
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — APPORTIONMENT (Mixed Taxable + Exempt)
// ══════════════════════════════════════════════════════════════
function ApportionTab() {
  const [inputVAT,    setInputVAT]    = useState("");
  const [taxableSales, setTaxableSales] = useState("");
  const [totalSales,  setTotalSales]  = useState("");
  const [result,      setResult]      = useState(null);

  function calculate() {
    const ka = n(inputVAT);
    const kh = n(taxableSales);
    const ko = n(totalSales);
    if (!ka || !ko) return;

    const ratio  = kh / ko;
    let credit   = 0;
    let rule     = "";

    if (ratio < 0.05) {
      credit = 0;
      rule   = "ខ/គ < 0.05 → Input VAT មិនត្រូវអនុញ្ញាត (ឥណទាន = 0)";
    } else if (ratio > 0.95) {
      credit = ka;
      rule   = "ខ/គ > 0.95 → Input VAT ទាំងអស់ត្រូវអនុញ្ញាត (ឥណទាន = 100%)";
    } else {
      credit = ka * (kh / ko);
      rule   = `ខ/គ = ${(ratio * 100).toFixed(1)}% → ឥណទានតាមសមាមាត្រ: ក × ខ / គ`;
    }

    const nonCredit = ka - credit;
    setResult({ ka, kh, ko, ratio, credit, nonCredit, rule });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ករណីចំរុះ — Taxable + VAT-Exempt Supplies</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ក — Input VAT សរុបខែ (៛)</label>
            <input style={S.input} type="number" placeholder="ឧ: 5000000"
              value={inputVAT} onChange={e => { setInputVAT(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ខ — ការផ្គត់ផ្គង់ជាប់ VAT (Taxable) ខែ (៛)</label>
            <input style={S.input} type="number" placeholder="ឧ: 40000000"
              value={taxableSales} onChange={e => { setTaxableSales(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>គ — ការផ្គត់ផ្គង់សរុប (Taxable + Exempt) ខែ (៛)</label>
          <input style={S.input} type="number" placeholder="ឧ: 50000000"
            value={totalSales} onChange={e => { setTotalSales(e.target.value); setResult(null); }} />
        </div>
        <div style={S.note}>
          • រូបមន្ត Apportionment: <strong>ឥណទាន = ក × ខ / គ</strong><br />
          • ខ/គ {"<"} 0.05 → 0 | 0.05 – 0.95 → proportional | {">"} 0.95 → 100%
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនា Input VAT Credit</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>សមាមាត្រ ខ/គ</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{(result.ratio * 100).toFixed(2)}%</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Input VAT Credit</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#166534", fontFamily: FONT }}>{fmt(result.credit)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Input VAT មិនអនុញ្ញាត</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{fmt(result.nonCredit)}</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិត Apportionment</div>
            <div style={S.dedRow}><span>ក — Input VAT សរុប</span><span style={S.dedVal}>{fmt(result.ka)}</span></div>
            <div style={S.dedRow}><span>ខ — ការផ្គត់ផ្គង់ Taxable</span><span style={S.dedVal}>{fmt(result.kh)}</span></div>
            <div style={S.dedRow}><span>គ — ការផ្គត់ផ្គង់ Total</span><span style={S.dedVal}>{fmt(result.ko)}</span></div>
            <div style={S.dedRow}><span>សមាមាត្រ ខ/គ</span><span style={S.dedVal}>{(result.ratio * 100).toFixed(2)}%</span></div>
            <div style={result.credit > 0 ? S.dedTotalGreen : S.dedTotal}>
              <span>Input VAT Credit អនុញ្ញាត ({result.rule.split("→")[0].trim()})</span>
              <span>{fmt(result.credit)}</span>
            </div>
            <div style={S.noteWarn}>
              <strong>{result.rule}</strong><br />
              • ឥណទានបាន: {fmt(result.credit)}<br />
              • ឥណទានមិនបាន: {fmt(result.nonCredit)}<br />
              • ក − ឥណទាន = ចំណាយអាជីវកម្ម (មិន credit)
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — RATE REFERENCE TABLE
// ══════════════════════════════════════════════════════════════
function RatesTab() {
  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>អត្រា VAT — ឯកសារយោង</div>
        <table style={S.tbl}>
          <thead>
            <tr>
              <th style={S.th}>អត្រា</th>
              <th style={S.th}>ប្រភេទការផ្គត់ផ្គង់</th>
              <th style={S.th}>ឧទាហរណ៍</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["10%", "ការផ្គត់ផ្គង់ក្នុងស្រុក", "ទំនិញ · សេវា · ហ្គេម · ភោជនីយដ្ឋាន"],
              ["10%", "ទំនិញនាំចូល", "CIF + ពន្ធគយ + អាករពិសេស × 10%"],
              ["0%",  "នាំចេញ (Zero-rated)", "ទំនិញ · សេវាប្រើក្រៅប្រទេស"],
              ["0%",  "ដឹកជញ្ជូនអន្តរជាតិ", "ពី/ទៅ/ឆ្លងប្រទេស (ផ្លូវគោក/ទឹក/អាកាស)"],
              ["N/A", "Exempt — មិនជាប់", "ពេទ្យ · អប់រំ · ប្រៃសណីយ៍ · ធានារ៉ាប់រង"],
            ].map(([rate, type, ex]) => (
              <tr key={rate + type}>
                <td style={{ ...S.td, fontWeight: 700, color: rate === "N/A" ? "#64748B" : rate === "0%" ? "#166534" : "#c0392b" }}>{rate}</td>
                <td style={S.td}>{type}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#475569" }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>Input VAT — ករណីមិនអាច Credit</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>#</th><th style={S.th}>ប្រភេទ</th><th style={S.th}>ករណីលើកលែង</th></tr></thead>
          <tbody>
            {[
              ["1.", "រថយន្ត ≤ 10 អង្គុយ", "លើកលែង: ប្រកបអាជីវកម្មលក់/ជួលរថយន្ត"],
              ["2.", "ការទទួលភ្ញៀវ / ចំណីអាហារ / ភេស្ជៈ", "លើកលែង: ប្រកបអាជីវកម្មទទួលភ្ញៀវ"],
              ["3.", "ប្រេងសាំង / ម៉ាស៊ូត / ប្រេងរំអិល", "លើកលែង: ប្រកបអាជីវកម្មផ្គត់ផ្គង់ប្រេង"],
              ["4.", "ទូរស័ព្ទចល័ត", "—"],
            ].map(([num, type, exc]) => (
              <tr key={num}>
                <td style={{ ...S.td, fontWeight: 700, color: "#2563EB", width: 28 }}>{num}</td>
                <td style={S.td}>{type}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#166534" }}>{exc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={S.note}>
          <strong>Apportionment Rule:</strong><br />
          • ខ/គ {"<"} 0.05 → 0 | 0.05–0.95 → ក × ខ / គ | {">"} 0.95 → 100%<br />
          ប្រកាស/បង់: ផ្ទាល់ <strong>ថ្ងៃទី 20</strong> | Online (e-Filing) <strong>ថ្ងៃទី 25</strong> នៃខែបន្ទាប់
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function VATPage({ setPage }) {
  const [tab, setTab] = useState("standard");

  const TABS = [
    { id: "standard",   label: " VAT ស្តង់ដារ" },
    { id: "import",     label: " VAT នាំចូល" },
    { id: "apportion",  label: " Apportionment" },
    { id: "rates",      label: "តារាងអត្រា" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button onClick={() => setPage && setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>អាករលើតម្លៃបន្ថែម (VAT / អតប)</div>
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

        {tab === "standard"  && <StandardTab />}
        {tab === "import"    && <ImportTab />}
        {tab === "apportion" && <ApportionTab />}
        {tab === "rates"     && <RatesTab />}

      </div>
    </div>
  );
}