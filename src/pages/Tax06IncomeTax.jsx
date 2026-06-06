import { useState, useCallback } from "react";

const FONT = "'Khmer OS Siemreap','Khmer OS Battambang','Battambang',sans-serif";

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
    padding: "24px 16px",
    fontFamily: FONT,
  },
  wrap: { width: "100%", maxWidth: 1100, margin: "0 auto" },
  header: {
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#fff",
    borderRadius: 20,
    padding: "24px 30px",
    marginBottom: 24,
    boxShadow: "0 10px 25px rgba(37,99,235,.15)",
  },
  h1: { fontSize: 22, fontWeight: 800, marginBottom: 6, fontFamily: FONT, lineHeight: 1.4 },
  hSub: { fontSize: 13, opacity: 0.9, fontFamily: FONT, lineHeight: 1.7 },
  tabRow: { display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" },
  tab: (on) => ({
    padding: "11px 20px",
    borderRadius: 12,
    border: on ? "none" : "1px solid #E2E8F0",
    background: on ? "linear-gradient(135deg,#2563EB,#1D4ED8)" : "#fff",
    color: on ? "#fff" : "#64748B",
    cursor: "pointer",
    fontWeight: on ? 700 : 600,
    fontSize: 13,
    fontFamily: FONT,
    boxShadow: on ? "0 4px 12px rgba(37,99,235,.2)" : "none",
  }),
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 20px rgba(15,23,42,.04)",
  },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#2563EB", marginBottom: 16, fontFamily: FONT },
  row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 },
  row3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: {
    width: "100%", boxSizing: "border-box", padding: "11px 14px",
    border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14,
    background: "#fff", outline: "none", fontFamily: FONT,
  },
  select: {
    width: "100%", boxSizing: "border-box", padding: "11px 14px",
    border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14,
    background: "#fff", outline: "none", fontFamily: FONT,
  },
  btn: {
    width: "100%", padding: 14, fontSize: 15, fontWeight: 700,
    borderRadius: 12, border: "none", cursor: "pointer",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "#fff", boxShadow: "0 4px 12px rgba(37,99,235,.15)",
    marginBottom: 0, fontFamily: FONT, marginTop: 8,
  },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: {
    background: "#fff", borderRadius: 20, padding: 20,
    textAlign: "center", border: "1px solid #E2E8F0",
    boxShadow: "0 4px 12px rgba(0,0,0,.03)",
  },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  mVal: (color) => ({ fontSize: 20, fontWeight: 800, color: color || "#1E40AF", fontFamily: FONT }),
  mSub: { fontSize: 11, color: "#94A3B8", marginTop: 4, fontFamily: FONT },
  note: {
    background: "#EFF6FF", border: "1px solid #BFDBFE",
    borderRadius: 12, padding: 14, color: "#1E40AF",
    marginTop: 12, lineHeight: 1.7, fontSize: 13, fontFamily: FONT,
  },
  noteWarn: {
    background: "#FEF2F2", border: "1px solid #FCA5A5",
    borderRadius: 12, padding: 14, color: "#991B1B",
    marginTop: 12, lineHeight: 1.7, fontSize: 13, fontFamily: FONT,
  },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: {
    background: "#EFF6FF", color: "#1E40AF", padding: "11px 12px",
    textAlign: "left", fontWeight: 700, fontSize: 13,
    borderBottom: "1px solid #DBEAFE", fontFamily: FONT,
  },
  td: { padding: "11px 12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  tdHi: {
    padding: "11px 12px", fontSize: 13, lineHeight: 1.6,
    borderBottom: "1px solid #DBEAFE", background: "#EFF6FF",
    color: "#1E40AF", fontWeight: 700, fontFamily: FONT,
  },
  stepRow: {
    display: "flex", justifyContent: "space-between",
    padding: "11px 0", fontSize: 13,
    borderBottom: "1px solid #F1F5F9", fontFamily: FONT,
  },
  stepLbl: { color: "#475569" },
  stepVal: (color) => ({ color: color || "#0F172A", fontWeight: 700, fontFamily: FONT }),
  badge: (color) => ({
    display: "inline-block", padding: "2px 10px", borderRadius: 20,
    fontSize: 12, fontWeight: 700,
    background: (color || "#2563EB") + "18",
    color: color || "#2563EB", fontFamily: FONT,
  }),
  divider: { borderTop: "1px solid #E2E8F0", margin: "16px 0" },
};

// ── ថ្នាក់ប្រភេទពន្ធ ─────────────────────────────────────────────────────────
const USD_KHR = 4085;

const BRACKETS = [
  { min: 0, max: 18_000_000, rate: 0, label: "០ – ១៨,០០០,០០០ ៛", calc: (p) => 0 },
  { min: 18_000_001, max: 24_000_000, rate: 5, label: "១៨,០០០,០០១ – ២៤,០០០,០០០ ៛", calc: (p) => p * 0.05 - 900_000 },
  { min: 24_000_001, max: 102_000_000, rate: 10, label: "២៤,០០០,០០១ – ១០២,០០០,០០០ ៛", calc: (p) => p * 0.10 - 2_100_000 },
  { min: 102_000_001, max: 150_000_000, rate: 15, label: "១០២,០០០,០០១ – ១៥០,០០០,០០០ ៛", calc: (p) => p * 0.15 - 7_200_000 },
  { min: 150_000_001, max: Infinity, rate: 20, label: "លើសពី ១៥០,០០០,០០០ ៛", calc: (p) => p * 0.20 - 14_200_000 },
];

const DEPRE = [
  { cls: "ថ្នាក់ទី ១", desc: "អគារ និងសំណង់", method: "លីនេអ៊ែរ (Straight-line)", rate: 5 },
  { cls: "ថ្នាក់ទី ២", desc: "កុំព្យូទ័រ ប្រព័ន្ធព័ត៌មានវិទ្យា និងកម្មវិធី", method: "ធ្លាក់ចុះជាលំដាប់", rate: 50 },
  { cls: "ថ្នាក់ទី ៣", desc: "យានយន្ត គ្រឿងម៉ាស៊ីន និងសម្ភារការិយាល័យ", method: "ធ្លាក់ចុះជាលំដាប់", rate: 25 },
  { cls: "ថ្នាក់ទី ៤", desc: "ទ្រព្យសកម្មផ្សេងទៀតទាំងអស់", method: "ធ្លាក់ចុះជាលំដាប់", rate: 20 },
];

function fmt(n, dec = 0) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
const fKHR = (n) => "៛" + fmt(Math.round(n));
const fUSD = (n) => "$" + fmt(n, 2);

function getBracket(income) {
  for (const b of BRACKETS) if (income <= b.max) return b;
  return BRACKETS[BRACKETS.length - 1];
}

const TABS = ["រូបវន្តបុគ្គល / ម្ចាស់អាជីវកម្ម", "នីតិបុគ្គល (ក្រុមហ៊ុន)", "រំលស់ទ្រព្យសកម្ម", "តារាងយោង"];

export default function App() {
  const [tab, setTab] = useState(0);
  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* ─ ចំណងជើង ─ */}
        <div style={S.header}>
          <h1 style={S.h1}>📊 កម្មវិធីគណនាពន្ធលើប្រាក់ចំណូល</h1>
          <p style={S.hSub}>
            យោងតាម៖ ច្បាប់ស្តីពីសារពើពន្ធ · ប្រកាស ១០៥៩ · ប្រកាស ៧៧៩ · អនុក្រឹត្យលេខ ៤៨ (២០២៤)<br />
            មុខវិជ្ជា៖ សេដ្ឋកិច្ចសម្រាប់វិស្វករ · ដេប៉ាតឺម៉ង់គណិតវិទ្យាអនុវត្ត និងស្ថិតិ · ITC
          </p>
        </div>

        {/* ─ ផ្ទាំងជ្រើស ─ */}
        <div style={S.tabRow}>
          {TABS.map((t, i) => (
            <button key={i} style={S.tab(tab === i)} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        {tab === 0 && <TabIndividual />}
        {tab === 1 && <TabCompany />}
        {tab === 2 && <TabDepreciation />}
        {tab === 3 && <TabReference />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// ផ្ទាំងទី ១ — រូបវន្តបុគ្គល / ម្ចាស់អាជីវកម្ម
// ══════════════════════════════════════════════════════
function TabIndividual() {
  const [currency, setCurrency] = useState("KHR");
  const [income, setIncome] = useState("");
  const [withhold, setWithhold] = useState("");
  const [prepaid, setPrepaid] = useState("");
  const [result, setResult] = useState(null);

  const calc = useCallback(() => {
    let p = parseFloat(income.replace(/,/g, "")) || 0;
    if (currency === "USD") p *= USD_KHR;
    const b = getBracket(p);
    const tax = Math.max(0, b.calc(p));
    const wh = parseFloat(withhold.replace(/,/g, "")) || 0;
    const pp = parseFloat(prepaid.replace(/,/g, "")) || 0;
    const net = tax - wh - pp;
    setResult({ p, pUSD: p / USD_KHR, tax, taxUSD: tax / USD_KHR, b, wh, pp, net, netUSD: net / USD_KHR });
  }, [income, currency, withhold, prepaid]);

  return (
    <>
      {/* ─ Input ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>📋 បញ្ចូលទិន្នន័យប្រាក់ចំណូល</div>
        <div style={S.row3}>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ចំណូលជាប់ពន្ធប្រចាំឆ្នាំ</label>
            <input style={S.input} placeholder="ឧ. ១៤០០០០០០០" value={income} onChange={e => setIncome(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>រូបិយប័ណ្ណ</label>
            <select style={S.select} value={currency} onChange={e => setCurrency(e.target.value)}>
              <option value="KHR">រៀល (KHR)</option>
              <option value="USD">ដុល្លារ (USD)</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>(−) ឥណទានពន្ធកាត់ទុក (KHR)</label>
            <input style={S.input} placeholder="០" value={withhold} onChange={e => setWithhold(e.target.value)} />
          </div>
        </div>
        <div style={{ ...S.row3, marginTop: -8 }}>
          <div style={S.field}>
            <label style={S.label}>(−) ពន្ធបង់មុន (KHR)</label>
            <input style={S.input} placeholder="០" value={prepaid} onChange={e => setPrepaid(e.target.value)} />
          </div>
        </div>
        <button style={S.btn} onClick={calc}>គណនាពន្ធ →</button>
      </div>

      {/* ─ លទ្ធផល ─ */}
      {result && (
        <div style={S.card}>
          <div style={S.cardTitle}>📊 លទ្ធផលការគណនា</div>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ចំណូលជាប់ពន្ធ</div>
              <div style={S.mVal("#1D4ED8")}>{fKHR(result.p)}</div>
              <div style={S.mSub}>{fUSD(result.pUSD)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>អត្រាពន្ធ</div>
              <div style={S.mVal("#D97706")}>{result.b.rate}%</div>
              <div style={S.mSub}>{result.b.label}</div>
            </div>
            <div style={{ ...S.metric, border: "2px solid #BFDBFE", background: "#EFF6FF" }}>
              <div style={S.mLabel}>ពន្ធត្រូវបង់ចុងក្រោយ</div>
              <div style={S.mVal(result.net > 0 ? "#2563EB" : "#16A34A")}>{fKHR(Math.max(0, result.net))}</div>
              <div style={S.mSub}>{fUSD(Math.max(0, result.netUSD))}</div>
            </div>
          </div>

          <div style={S.divider} />
          <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 10, fontFamily: FONT }}>ជំហានគណនា</div>

          {[
            ["ប្រាក់ចំណូលជាប់ពន្ធ (P)", fKHR(result.p), null],
            [`រូបមន្ត: P × ${result.b.rate}% − ${result.b.rate === 0 ? "0" : result.b.rate === 5 ? "៩០០,០០០" : result.b.rate === 10 ? "២,១០០,០០០" : result.b.rate === 15 ? "៧,២០០,០០០" : "១៤,២០០,០០០"}`, fKHR(result.tax), "#2563EB"],
            result.wh > 0 ? ["(−) ឥណទានពន្ធកាត់ទុក", "− " + fKHR(result.wh), "#DC2626"] : null,
            result.pp > 0 ? ["(−) ពន្ធបង់មុន", "− " + fKHR(result.pp), "#DC2626"] : null,
            ["= ពន្ធសុទ្ធត្រូវបង់", result.net > 0 ? fKHR(result.net) : "ពន្ធត្រូវបង្វិលសងវិញ " + fKHR(-result.net), result.net > 0 ? "#2563EB" : "#16A34A"],
          ].filter(Boolean).map(([lbl, val, color], i) => (
            <div key={i} style={S.stepRow}>
              <span style={S.stepLbl}>{lbl}</span>
              <span style={S.stepVal(color)}>{val}</span>
            </div>
          ))}

          <div style={S.note}>
            ℹ អត្រាប្តូរប្រាក់យោង: ១ USD = {USD_KHR} ៛ ·
            ប្រើចំពោះ: បុគ្គលរូបវន្ត សហគ្រាសឯកបុគ្គល និងចំណែករបស់សមាជិកក្រុមហ៊ុនសហកម្មសិទ្ធិ (អនុក្រឹត្យ ៤៨, ២០២៤)
          </div>
        </div>
      )}

      {/* ─ តារាងថ្នាក់ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>📋 តារាងអត្រាពន្ធប្រចាំឆ្នាំ (រូបវន្តបុគ្គល)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.th}>ភាគនៃប្រាក់ចំណូលជាប់ពន្ធ</th>
                <th style={S.th}>អត្រា</th>
                <th style={S.th}>រូបមន្ត (P = ប្រាក់ចំណូលជាប់ពន្ធ)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["០ – ១៨,០០០,០០០ ៛", "០%", "P × 0%"],
                ["១៨,០០០,០០១ – ២៤,០០០,០០០ ៛", "៥%", "P × 5% − ៩០០,០០០"],
                ["២៤,០០០,០០១ – ១០២,០០០,០០០ ៛", "១០%", "P × 10% − ២,១០០,០០០"],
                ["១០២,០០០,០០១ – ១៥០,០០០,០០០ ៛", "១៥%", "P × 15% − ៧,២០០,០០០"],
                ["លើសពី ១៥០,០០០,០០០ ៛", "២០%", "P × 20% − ១៤,២០០,០០០"],
              ].map(([range, rate, formula], i) => (
                <tr key={i}>
                  <td style={S.td}>{range}</td>
                  <td style={S.td}><span style={S.badge("#2563EB")}>{rate}</span></td>
                  <td style={{ ...S.td, color: "#64748B" }}>{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════
// ផ្ទាំងទី ២ — នីតិបុគ្គល (ក្រុមហ៊ុន)
// ══════════════════════════════════════════════════════
function TabCompany() {
  const [entityType, setEntityType] = useState("company");
  const [profit, setProfit] = useState("");
  const [addback, setAddback] = useState("");
  const [nonTaxInBook, setNonTaxInBook] = useState("");
  const [dedNotInBook, setDedNotInBook] = useState("");
  const [loss, setLoss] = useState("");
  const [revenue, setRevenue] = useState("");
  const [withhold, setWithhold] = useState("");
  const [prepaid, setPrepaid] = useState("");
  const [result, setResult] = useState(null);

  const RATES = { company: 20, petroleum: 30, qualified: 0 };

  const calc = useCallback(() => {
    const p = parseFloat(profit.replace(/,/g, "")) || 0;
    const ab = parseFloat(addback.replace(/,/g, "")) || 0;
    const nb = parseFloat(nonTaxInBook.replace(/,/g, "")) || 0;
    const db = parseFloat(dedNotInBook.replace(/,/g, "")) || 0;
    const ls = parseFloat(loss.replace(/,/g, "")) || 0;
    const rev = parseFloat(revenue.replace(/,/g, "")) || 0;
    const wh = parseFloat(withhold.replace(/,/g, "")) || 0;
    const pp = parseFloat(prepaid.replace(/,/g, "")) || 0;

    const taxProfit = p + ab - db - ls;
    const rate = RATES[entityType] / 100;
    const itax = Math.max(0, taxProfit * rate);
    const mop = rev * 0.01;
    const applicable = Math.max(itax, mop);
    const net = Math.max(0, applicable - wh - pp);

    setResult({ p, ab, nb, db, ls, rev, wh, pp, taxProfit, itax, mop, applicable, net, rate: RATES[entityType], usedMOP: mop > itax });
  }, [profit, addback, nonTaxInBook, dedNotInBook, loss, revenue, withhold, prepaid, entityType]);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>🏢 បញ្ចូលទិន្នន័យក្រុមហ៊ុន</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទអ្នកជាប់ពន្ធ</label>
            <select style={S.select} value={entityType} onChange={e => setEntityType(e.target.value)}>
              <option value="company">នីតិបុគ្គលនិវាសជន — ២០%</option>
              <option value="petroleum">សកម្មភាពប្រេងកាត និងរ៉ែ — ៣០%</option>
              <option value="qualified">គម្រោងវិនិយោគមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ (QIP) — ០%</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំណេញ/ខាតតាមគណនេយ្យ (USD)</label>
            <input style={S.input} placeholder="ឧ. 150000" value={profit} onChange={e => setProfit(e.target.value)} />
          </div>
        </div>
        <div style={S.row3}>
          <div style={S.field}>
            <label style={S.label}>(+) ចំណាយមិនអនុញ្ញាតឱ្យកាត់កង</label>
            <input style={S.input} placeholder="ឧ. 15000" value={addback} onChange={e => setAddback(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>(+) ចំណូលជាប់ពន្ធមិនទាន់កត់ត្រាក្នុងបញ្ជីការ</label>
            <input style={S.input} placeholder="ឧ. 27000" value={nonTaxInBook} onChange={e => setNonTaxInBook(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>(−) ចំណាយអនុញ្ញាតឱ្យកាត់កងមិនទាន់កត់ត្រាក្នុងបញ្ជីការ</label>
            <input style={S.input} placeholder="០" value={dedNotInBook} onChange={e => setDedNotInBook(e.target.value)} />
          </div>
        </div>
        <div style={S.row3}>
          <div style={S.field}>
            <label style={S.label}>(−) ការខាតបង់ពីឆ្នាំមុនៗអនុញ្ញាតឱ្យកាត់កង</label>
            <input style={S.input} placeholder="០" value={loss} onChange={e => setLoss(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំណូលដុលប្រចាំឆ្នាំ (សម្រាប់គណនាពន្ធអប្បបរិមា MOP)</label>
            <input style={S.input} placeholder="ឧ. 600000" value={revenue} onChange={e => setRevenue(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>(−) ឥណទានពន្ធកាត់ទុក</label>
            <input style={S.input} placeholder="ឧ. 6000" value={withhold} onChange={e => setWithhold(e.target.value)} />
          </div>
        </div>
        <div style={S.row3}>
          <div style={S.field}>
            <label style={S.label}>(−) ពន្ធបង់មុន</label>
            <input style={S.input} placeholder="០" value={prepaid} onChange={e => setPrepaid(e.target.value)} />
          </div>
        </div>
        <button style={S.btn} onClick={calc}>គណនាពន្ធ →</button>
      </div>

      {result && (
        <div style={S.card}>
          <div style={S.cardTitle}>📊 លទ្ធផលការគណនាពន្ធក្រុមហ៊ុន</div>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ចំណេញជាប់ពន្ធ (Taxable Profit)</div>
              <div style={S.mVal("#1D4ED8")}>{fUSD(result.taxProfit)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ពន្ធលើប្រាក់ចំណូល ({result.rate}%)</div>
              <div style={S.mVal("#D97706")}>{fUSD(result.itax)}</div>
              <div style={S.mSub}>ពន្ធអប្បបរិមា (MOP 1%): {fUSD(result.mop)}</div>
            </div>
            <div style={{ ...S.metric, border: "2px solid #BFDBFE", background: "#EFF6FF" }}>
              <div style={S.mLabel}>ពន្ធចុងក្រោយត្រូវបង់</div>
              <div style={S.mVal("#2563EB")}>{fUSD(result.net)}</div>
              <div style={S.mSub}>{result.usedMOP ? "⚠ ត្រូវបង់តាមពន្ធអប្បបរិមា (MOP)" : "ត្រូវបង់តាមពន្ធលើប្រាក់ចំណូល (ToI)"}</div>
            </div>
          </div>

          <div style={S.divider} />
          <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 10, fontFamily: FONT }}>ការបន្ស៊ីគ្នារវាងចំណេញគណនេយ្យ និងចំណេញជាប់ពន្ធ (Tax Reconciliation)</div>
          {[
            ["ចំណេញ/ខាតតាមគណនេយ្យ", fUSD(result.p), null],
            ["(+) ចំណាយមិនអនុញ្ញាតឱ្យកាត់កង", fUSD(result.ab), "#DC2626"],
            ["(+) ចំណូលជាប់ពន្ធមិនទាន់កត់ត្រាក្នុងបញ្ជីការ", fUSD(result.nb), "#DC2626"],
            ["(−) ចំណាយអនុញ្ញាតឱ្យកាត់កងមិនទាន់កត់ត្រាក្នុងបញ្ជីការ", fUSD(result.db), "#16A34A"],
            ["(−) ការខាតបង់បន្តទៅមុខពីឆ្នាំមុនៗ", fUSD(result.ls), "#16A34A"],
            ["= ប្រាក់ចំណេញជាប់ពន្ធ", fUSD(result.taxProfit), "#2563EB"],
            [`ពន្ធលើប្រាក់ចំណូល (ToI ${result.rate}%)`, fUSD(result.itax), null],
            ["ពន្ធអប្បបរិមា (MOP 1%)", fUSD(result.mop), null],
            ["ពន្ធត្រូវបង់ (តម្លៃខ្ពស់ជាងរវាង ToI និង MOP)", fUSD(result.applicable), "#2563EB"],
            ["(−) ឥណទានពន្ធកាត់ទុក", fUSD(result.wh), "#16A34A"],
            ["(−) ពន្ធបង់មុន", fUSD(result.pp), "#16A34A"],
            ["= ពន្ធចុងក្រោយត្រូវបង់", fUSD(result.net), "#2563EB"],
          ].map(([lbl, val, color], i) => (
            <div key={i} style={S.stepRow}>
              <span style={S.stepLbl}>{lbl}</span>
              <span style={S.stepVal(color)}>{val}</span>
            </div>
          ))}

          {result.usedMOP && (
            <div style={S.noteWarn}>
              ⚠ ពន្ធអប្បបរិមា (MOP) ខ្ពស់ជាងពន្ធលើប្រាក់ចំណូល (ToI) ដូច្នេះត្រូវបង់តាមប្រព័ន្ធពន្ធអប្បបរិមា។
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════
// ផ្ទាំងទី ៣ — រំលស់ទ្រព្យសកម្ម
// ══════════════════════════════════════════════════════
function TabDepreciation() {
  const [cls, setCls] = useState("2");
  const [costV, setCostV] = useState("");
  const [opening, setOpening] = useState("");
  const [additions, setAdditions] = useState("");
  const [disposals, setDisposals] = useState("");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState(null);

  const RATE_MAP = { "1": 5, "2": 50, "3": 25, "4": 20 };

  const calc = useCallback(() => {
    const rate = RATE_MAP[cls] / 100;
    const cv = parseFloat(costV.replace(/,/g, "")) || 0;
    const ob = parseFloat(opening.replace(/,/g, "")) || 0;
    const add = parseFloat(additions.replace(/,/g, "")) || 0;
    const dis = parseFloat(disposals.replace(/,/g, "")) || 0;
    const yrs = Math.min(parseInt(years) || 5, 20);

    let schedule = [];
    if (cls === "1") {
      // straight-line
      const dep = cv * rate;
      let bv = cv;
      for (let y = 1; y <= yrs && bv > 0.01; y++) {
        const d = Math.min(dep, bv);
        bv = Math.max(0, bv - d);
        schedule.push({ year: y, dep: d, bv });
      }
      setResult({ method: "លីនេអ៊ែរ (Straight-Line)", rate: RATE_MAP[cls], schedule, base: cv });
    } else {
      const base = ob + add - dis;
      let bv = cv > 0 ? cv : base;
      for (let y = 1; y <= yrs && bv > 0.01; y++) {
        const d = bv * rate;
        bv -= d;
        schedule.push({ year: y, dep: d, bv });
      }
      setResult({ method: "ធ្លាក់ចុះជាលំដាប់ (Declining Balance)", rate: RATE_MAP[cls], schedule, base, yearDep: base * rate, yearClose: base - base * rate });
    }
  }, [cls, costV, opening, additions, disposals, years]);

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>🏗 ការគណនារំលស់ទ្រព្យសកម្ម</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ថ្នាក់ទ្រព្យសកម្ម</label>
            <select style={S.select} value={cls} onChange={e => setCls(e.target.value)}>
              <option value="1">ថ្នាក់ទី ១ — អគារ និងសំណង់ (៥% លីនេអ៊ែរ)</option>
              <option value="2">ថ្នាក់ទី ២ — កុំព្យូទ័រ និងកម្មវិធី (៥០% ធ្លាក់ចុះ)</option>
              <option value="3">ថ្នាក់ទី ៣ — យានយន្ត និងគ្រឿងម៉ាស៊ីន (២៥% ធ្លាក់ចុះ)</option>
              <option value="4">ថ្នាក់ទី ៤ — ទ្រព្យសកម្មផ្សេងទៀត (២០% ធ្លាក់ចុះ)</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃដើមនៃទ្រព្យសកម្ម</label>
            <input style={S.input} placeholder="ឧ. 100000" value={costV} onChange={e => setCostV(e.target.value)} />
          </div>
        </div>
        {cls !== "1" && (
          <div style={S.row3}>
            <div style={S.field}>
              <label style={S.label}>តម្លៃសេសសល់ដើមឆ្នាំនៃថ្នាក់ទ្រព្យសកម្ម</label>
              <input style={S.input} placeholder="០" value={opening} onChange={e => setOpening(e.target.value)} />
            </div>
            <div style={S.field}>
              <label style={S.label}>(+) ការទិញបន្ថែមក្នុងឆ្នាំ</label>
              <input style={S.input} placeholder="០" value={additions} onChange={e => setAdditions(e.target.value)} />
            </div>
            <div style={S.field}>
              <label style={S.label}>(−) ការលក់/ដកចេញក្នុងឆ្នាំ</label>
              <input style={S.input} placeholder="០" value={disposals} onChange={e => setDisposals(e.target.value)} />
            </div>
          </div>
        )}
        <div style={{ ...S.row3, marginTop: -4 }}>
          <div style={S.field}>
            <label style={S.label}>ចំនួនឆ្នាំគណនា</label>
            <input style={S.input} type="number" min="1" max="20" value={years} onChange={e => setYears(e.target.value)} />
          </div>
        </div>
        <button style={S.btn} onClick={calc}>គណនារំលស់ →</button>
      </div>

      {result && (
        <div style={S.card}>
          <div style={S.cardTitle}>📉 តារាងរំលស់ប្រចាំឆ្នាំ</div>
          <div style={S.note}>
            វិធីសាស្ត្រ: <strong>{result.method}</strong> · អត្រា: <strong>{result.rate}%</strong>
            {result.yearDep !== undefined && ` · មូលដ្ឋានគណនារំលស់: ${fUSD(result.base)} · តម្លៃរំលស់ប្រចាំឆ្នាំ: ${fUSD(result.yearDep)}`}
          </div>
          <div style={{ overflowX: "auto", marginTop: 16 }}>
            <table style={S.tbl}>
              <thead>
                <tr>
                  <th style={S.th}>ឆ្នាំ</th>
                  <th style={S.th}>តម្លៃរំលស់ប្រចាំឆ្នាំ</th>
                  <th style={S.th}>តម្លៃសៀវភៅចុងឆ្នាំ</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((r, i) => (
                  <tr key={i}>
                    <td style={S.td}>ឆ្នាំទី {r.year}</td>
                    <td style={{ ...S.td, color: "#DC2626", fontWeight: 600 }}>{fUSD(r.dep)}</td>
                    <td style={r.bv < 1 ? { ...S.td, color: "#94A3B8" } : S.td}>{fUSD(r.bv)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─ ប្រភេទថ្នាក់ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>📋 តារាងប្រភេទថ្នាក់ទ្រព្យសកម្ម</div>
        <div style={{ overflowX: "auto" }}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.th}>ថ្នាក់</th>
                <th style={S.th}>ប្រភេទទ្រព្យសកម្ម</th>
                <th style={S.th}>វិធីសាស្ត្រ</th>
                <th style={S.th}>អត្រា</th>
              </tr>
            </thead>
            <tbody>
              {DEPRE.map((d, i) => (
                <tr key={i}>
                  <td style={S.td}><span style={S.badge("#2563EB")}>{d.cls}</span></td>
                  <td style={S.td}>{d.desc}</td>
                  <td style={{ ...S.td, color: "#64748B" }}>{d.method}</td>
                  <td style={S.td}><span style={S.badge("#D97706")}>{d.rate}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={S.note}>
          មូលដ្ឋានគណនារំលស់ (វិធីសាស្ត្រធ្លាក់ចុះជាលំដាប់) = តម្លៃសេសសល់ដើមឆ្នាំ + ការទិញបន្ថែម − ការលក់ចេញ/ដកចេញក្នុងឆ្នាំ។
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════
// ផ្ទាំងទី ៤ — តារាងយោង
// ══════════════════════════════════════════════════════
function TabReference() {
  return (
    <>
      {/* ─ អត្រាពន្ធ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>⚖ តារាងអត្រាពន្ធសង្ខេប</div>
        <div style={{ overflowX: "auto" }}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.th}>ប្រភេទអ្នកជាប់ពន្ធ</th>
                <th style={S.th}>អត្រា</th>
                <th style={S.th}>កំណត់ចំណាំ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["នីតិបុគ្គលនិវាសជន (ក្រុមហ៊ុន)", "២០%", "អត្រាថេរលើប្រាក់ចំណូលជាប់ពន្ធ"],
                ["សកម្មភាពប្រេងកាត និងរ៉ែ", "៣០%", "អត្រាពិសេសលើធនធានធម្មជាតិ"],
                ["គម្រោង QIP (គម្រោងវិនិយោគដែលមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់)", "០%", "ក្នុងអំឡុងពេលលើកលែងពន្ធ (CDC)"],
                ["រូបវន្តបុគ្គល / ម្ចាស់អាជីវកម្ម", "ប្រែប្រួល ០–២០%", "តាមថ្នាក់ទាំង ៥ នៃប្រាក់ចំណូលប្រចាំឆ្នាំ"],
                ["ធានារ៉ាប់រងលើទ្រព្យសម្បត្តិ ឬហានិភ័យផ្សេងៗ", "៥%", "៥% នៃបុព្វលាភធានារ៉ាប់រងដុលទទួលបាន"],
                ["ធានារ៉ាប់រងអាយុជីវិត", "២០%", "តាមច្បាប់កំណត់ស្តីពីសារពើពន្ធ"],
              ].map(([t, r, n], i) => (
                <tr key={i}>
                  <td style={S.td}>{t}</td>
                  <td style={S.td}><span style={S.badge("#2563EB")}>{r}</span></td>
                  <td style={{ ...S.td, color: "#64748B" }}>{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─ ចំណូលលើកលែងពន្ធ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>✅ ចំណូលលើកលែងពន្ធ (ច្បាប់ស្តីពីសារពើពន្ធ)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10 }}>
          {[
            ["ចំណូលដែលបានជាប់ពន្ធលើប្រាក់បៀវត្ស ឬអត្ថប្រយោជន៍បន្ថែមរួចហើយ"],
            ["ប្រាក់ចំណូលដែលបានបង់ពន្ធកាត់ទុកចុងក្រោយរួចរាល់"],
            ["ផលទុនពីការលក់ផលិតផលកសិកម្មដែលផលិតដោយខ្លួនឯង (បុគ្គលរូបវន្ត)"],
            ["ប្រាក់ចំណូលរបស់រាជរដ្ឋាភិបាល ឬស្ថាប័នរដ្ឋ"],
            ["អង្គការសាសនា សប្បុរសធម៌ អប់រំ ឬវិទ្យាសាស្ត្រ ដែលមិនស្វែងរកប្រាក់ចំណេញ"],
            ["សហជីព ឬសភាពាណិជ្ជកម្ម ដែលមិនស្វែងរកប្រាក់ចំណេញ"],
            ["ភាគលាភដែលទទួលបានពីក្រុមហ៊ុននិវាសជនដូចគ្នា (បានបង់ពន្ធ ToI រួច)"],
          ].map((item, i) => (
            <div key={i} style={{ ...S.note, marginTop: 0 }}>
              <span style={{ color: "#16A34A", marginRight: 6, fontWeight: 700 }}>✓</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* ─ ចំណាយមិនអាចកាត់ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>🚫 ចំណាយមិនអនុញ្ញាតឱ្យកាត់កង (ច្បាប់ស្តីពីសារពើពន្ធ)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10 }}>
          {[
            "ចំណាយផ្ទាល់ខ្លួន ឬគ្រួសារ",
            "ប្រាក់បៀវត្ស ឬកម្រៃសងជូនម្ចាស់សហគ្រាសឯកបុគ្គល",
            "ការប្រាក់សងជូនម្ចាស់សហគ្រាស ឬសមាជិកក្រុមហ៊ុន",
            "ការខាតបង់ពីការលក់ ឬផ្ទេរទ្រព្យសម្បត្តិឱ្យបុគ្គលទាក់ទិន",
            "ចំណាយចំពោះបុគ្គលទាក់ទិនដែលមិនទាន់បានទូទាត់ក្នុងរយៈពេល ១៨០ ថ្ងៃ",
            "ចំណាយដែលគ្មានវិក្កយបត្រត្រឹមត្រូវ ឬច្បាប់កំណត់",
            "ចំណាយកម្សាន្ត ការរៀបចំពិធីជប់លៀង ឬការស្វាគមន៍",
            "អំណោយ ឬជំនួយសប្បុរសធម៌ដែលលើសពី ៥% នៃប្រាក់ចំណេញជាប់ពន្ធ",
            "ប្រាក់ពិន័យ ការប្រាក់បន្ថែម និងទណ្ឌកម្មរដ្ឋបាលពន្ធដារ",
            "ពន្ធលើប្រាក់ចំណូល និងអាករលើតម្លៃបន្ថែម (VAT) ដែលទាមទារជាចំណាយ",
            "ការខាតបង់លើបំណុលអាក្រក់ដែលមិនទាន់បំពេញតាមលក្ខខណ្ឌច្បាប់",
            "ចំណាយការប្រាក់ដែលលើសពីកម្រិតកំណត់ (ច្បាប់ស្តីពីសារពើពន្ធ)",
          ].map((item, i) => (
            <div key={i} style={{ ...S.noteWarn, marginTop: 0 }}>
              <span style={{ color: "#DC2626", marginRight: 6, fontWeight: 700 }}>✗</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* ─ ការអនុញ្ញាតកាត់កងការខាតបង់ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>🔄 លក្ខខណ្ឌនៃការកាត់កងការខាតបង់ (Loss Carry-Forward)</div>
        <div style={S.note}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#1E40AF" }}>លក្ខខណ្ឌ៖</p>
          <p style={{ margin: "0 0 5px" }}>• ការខាតបង់ត្រូវតែបានកត់ត្រានិងប្រកាសក្នុងលិខិតប្រកាសពន្ធប្រចាំឆ្នាំ</p>
          <p style={{ margin: "0 0 5px" }}>• គ្មានការផ្លាស់ប្តូរម្ចាស់សហគ្រាស ឬភាគហ៊ុនលើសពីកម្រិតច្បាប់កំណត់</p>
          <p style={{ margin: "0 0 5px" }}>• គ្មានការផ្លាស់ប្តូរសកម្មភាពអាជីវកម្មចម្បង</p>
          <p style={{ margin: "0 0 5px" }}>• អនុញ្ញាតឱ្យកាត់កងបន្តទៅមុខក្នុងរយៈពេល <strong>មិនហួស ៥ ឆ្នាំ</strong></p>
          <p style={{ margin: "0 0 5px" }}>• ត្រូវកាត់កងតាមលំដាប់លំដោយនៃឆ្នាំដែលខាតបង់</p>
          <p style={{ margin: "0", color: "#991B1B", fontWeight: 600 }}>
            ✗ ការខាតបង់នឹងត្រូវបាត់បង់សិទ្ធិ៖ ប្រសិនបើមានការប្រែប្រួលម្ចាស់ មុខរបរ ឬរងការវាយតម្លៃពន្ធជាឯកតោភាគី។
          </p>
        </div>
      </div>

      {/* ─ ឧទាហរណ៍ ─ */}
      <div style={S.card}>
        <div style={S.cardTitle}>💡 ឧទាហរណ៍ (គំរូគណនា)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {[
            {
              title: "ឧទាហរណ៍ ១ — ម្ចាស់អាជីវកម្មឯកបុគ្គល (KHR)",
              rows: [
                ["ប្រាក់ចំណូលជាប់ពន្ធ", "៛ ១៤០,០០០,០០០"],
                ["ថ្នាក់ (ក្រោម ១៥០ លាន ៛)", "អត្រា ១៥%"],
                ["ពន្ធ = ១៤០,០០០,០០០ × ១៥% − ៧,២០០,០០០", "= ៛ ១៣,៨០០,០០០"],
              ],
            },
            {
              title: "ឧទាហរណ៍ ២ — ម្ចាស់អាជីវកម្មឯកបុគ្គល (USD)",
              rows: [
                ["ប្រាក់ចំណូល", "$40,000"],
                ["បំប្លែង៖ 40,000 × 4,085", "= ៛ ១៦៣,៤០០,០០០"],
                ["ថ្នាក់ (លើស ១៥០ លាន ៛)", "អត្រា ២០%"],
                ["ពន្ធ = ១៦៣,៤០០,០០០ × ២០% − ១៤,២០០,០០០", "= ៛ ១៨,៤៨០,០០០ ≈ $4,524"],
              ],
            },
            {
              title: "ឧទាហរណ៍ ៣ — ក្រុមហ៊ុននីតិបុគ្គល (USD)",
              rows: [
                ["ចំណេញ/ខាតតាមគណនេយ្យ", "$150,000"],
                ["(+) ចំណាយមិនអនុញ្ញាតឱ្យកាត់កង", "$15,000"],
                ["(=) ប្រាក់ចំណេញជាប់ពន្ធ (Taxable Profit)", "$165,000"],
                ["ពន្ធលើប្រាក់ចំណូល ToI (20%)", "$33,000"],
              ],
            },
          ].map((ex, i) => (
            <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1E40AF", marginBottom: 8 }}>{ex.title}</div>
              {ex.rows.map(([lbl, val], j) => (
                <div key={j} style={S.stepRow}>
                  <span style={S.stepLbl}>{lbl}</span>
                  <span style={S.stepVal()}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}