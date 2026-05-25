import { useState } from "react";

// ─── TAX BRACKETS (Sub-decree 48, 2024) ──────────────────────
const BRACKETS = [
  { max: 1500000,  rate: 0.00, offset: 0,       label: "0 – 1,500,000" },
  { max: 2000000,  rate: 0.05, offset: 75000,   label: "1,500,001 – 2,000,000" },
  { max: 8500000,  rate: 0.10, offset: 175000,  label: "2,000,001 – 8,500,000" },
  { max: 12500000, rate: 0.15, offset: 600000,  label: "8,500,001 – 12,500,000" },
  { max: Infinity, rate: 0.20, offset: 1225000, label: "លើសពី 12,500,000" },
];

const OFFSET_LABELS = ["—", "75,000", "175,000", "600,000", "1,225,000"];

// ─── HELPERS ─────────────────────────────────────────────────
function fmt(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}

// ─── TAX ENGINE ──────────────────────────────────────────────
function calcResidentTax(taxable) {
  let activeBracket = 0;
  const bracketDetails = [];

  for (let i = 0; i < BRACKETS.length; i++) {
    const b   = BRACKETS[i];
    const low = i === 0 ? 0 : BRACKETS[i - 1].max;
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

  // Shortcut formula from lesson slide 22
  const ab  = BRACKETS[activeBracket];
  const tax = taxable > 0 ? Math.max(0, taxable * ab.rate - ab.offset) : 0;

  return { tax, activeBracket, bracketDetails };
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function SalaryTaxPage({ setPage }) {
  const [taxType,  setTaxType]  = useState("resident");

  // Resident fields
  const [salary,   setSalary]   = useState("");
  const [bonus,    setBonus]    = useState("");
  const [advance,  setAdvance]  = useState("");
  const [fringe,   setFringe]   = useState("");
  const [travel,   setTravel]   = useState("");
  const [spouse,   setSpouse]   = useState(0);
  const [children, setChildren] = useState(0);

  // Non-resident field
  const [nrSalary, setNrSalary] = useState("");

  // Results
  const [result, setResult] = useState(null);

  // ── Calculate ──────────────────────────────────────────────
  function calculate() {
    if (taxType === "nonresident") {
      const sal  = parseFloat(nrSalary) || 0;
      const tax  = sal * 0.20;
      const net  = sal - tax;
      setResult({
        type: "nonresident",
        taxable: sal, tax, net,
        taxPct: sal > 0 ? (tax / sal) * 100 : 0,
      });
      return;
    }

    const sal  = parseFloat(salary)  || 0;
    const bon  = parseFloat(bonus)   || 0;
    const adv  = parseFloat(advance) || 0;
    const fri  = parseFloat(fringe)  || 0;

    const gross      = sal + bon + adv;
    const deductions = (spouse + children) * 150000;
    const taxable    = Math.max(0, gross - deductions);

    const res        = calcResidentTax(taxable);
    const fringeTax  = fri * 0.20;
    const totalTax   = res.tax + fringeTax;
    const net        = sal + bon - totalTax;
    const base       = sal + bon;

    // Formula note
    const ab = BRACKETS[res.activeBracket];
    let formulaNote = taxable <= 1500000
      ? "មូលដ្ឋានគិតពន្ធស្ថិតក្នុងថ្នាក់អត្រា 0% — មិនមានកាតព្វកិច្ចបង់ពន្ធលើប្រាក់បៀវត្សឡើយ។"
      : `ពន្ធលើប្រាក់បៀវត្ស៖ ${Math.round(taxable).toLocaleString()} × ${ab.rate * 100}% − ${OFFSET_LABELS[res.activeBracket]} = ${fmt(res.tax)}`;
    if (fringeTax > 0)
      formulaNote += `   |   ពន្ធលើអត្ថប្រយោជន៍បន្ថែម៖ ${fmt(fri)} × 20% = ${fmt(fringeTax)}`;

    setResult({
      type: "resident",
      taxable, tax: totalTax, net,
      taxPct: base > 0 ? Math.min((totalTax / base) * 100, 100) : 0,
      // deduction details
      sal, bon, adv, fri, fringeTax,
      spouse, children, deductions,
      // bracket details
      bracketDetails: res.bracketDetails,
      activeBracket:  res.activeBracket,
      salaryTax:      res.tax,
      formulaNote,
    });
  }

 // ស្ទាយរួមដែលបានកែសម្រួល Font Family ឱ្យត្រូវស្តង់ដារ
const FONT_SET = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Battambong', 'Inter', sans-serif";

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
    padding: "24px 16px", 
    fontFamily: FONT_SET,
  },

  wrap: {
    width: "100%",
    maxWidth: 1200, 
    margin: "0 auto",
  },

  topBar: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 16,
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    color: "#334155",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: ".2s",
    boxShadow: "0 2px 5px rgba(0,0,0,.04)",
    fontFamily: FONT_SET,
  },

  header: {
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    borderRadius: 20, 
    padding: "24px 30px", 
    marginBottom: 24,
    boxShadow: "0 10px 25px rgba(37,99,235,.1)",
  },

  h1: {
    fontSize: 24, 
    fontWeight: 800,
    marginBottom: 8,
    fontFamily: FONT_SET,
  },

  hSub: {
    fontSize: 14, 
    opacity: 0.9,
    fontFamily: FONT_SET,
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 24, 
    marginBottom: 20,
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 20px rgba(15,23,42,.04)",
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#2563EB",
    letterSpacing: "0.5px",
    marginBottom: 16,
    fontFamily: FONT_SET,
  },

  tabRow: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },

  tab: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    background: "#FFFFFF",
    color: "#64748B",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: ".2s",
    fontFamily: FONT_SET,
  },

  tabOn: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: "0 4px 12px rgba(37,99,235,.2)",
    fontFamily: FONT_SET,
  },

  row2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 16,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
    marginBottom: 6,
    fontFamily: FONT_SET,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    fontSize: 14,
    background: "#FFFFFF",
    outline: "none",
    fontFamily: FONT_SET,
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    fontSize: 14,
    background: "#FFFFFF",
    outline: "none",
    fontFamily: FONT_SET,
  },

  btn: {
    width: "100%",
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(37,99,235,.15)",
    marginBottom: 24,
    fontFamily: FONT_SET,
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16,
    marginBottom: 20,
  },

  metric: {
    background: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    textAlign: "center",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 12px rgba(0,0,0,.03)",
  },

  mLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 8,
    fontFamily: FONT_SET,
  },

  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 12,
    padding: 14,
    color: "#1E40AF",
    marginTop: 12,
    lineHeight: 1.6,
    fontSize: 13,
    fontFamily: FONT_SET,
  },

  noteWarn: {
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    borderRadius: 12,
    padding: 14,
    color: "#991B1B",
    marginTop: 12,
    lineHeight: 1.6,
    fontSize: 13,
    fontFamily: FONT_SET,
  },

  tbl: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#EFF6FF",
    color: "#1E40AF",
    padding: "12px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: 13,
    borderBottom: "1px solid #DBEAFE",
    fontFamily: FONT_SET,
  },

  td: {
    padding: "12px",
    fontSize: 13,
    borderBottom: "1px solid #F1F5F9",
    fontFamily: FONT_SET,
  },

  dedRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    fontSize: 13,
    borderBottom: "1px solid #F1F5F9",
    fontFamily: FONT_SET,
  },

  dedRowTotal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    background: "#EFF6FF",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: FONT_SET,
  },

  dedVal: {
    color: "#2563EB",
    fontWeight: 700,
  },

  dedValRed: {
    color: "#DC2626",
    fontWeight: 700,
  },
};

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK TO DASHBOARD HOME */}
        <button onClick={() => setPage("home")} style={S.backBtn}>
          ← ត្រឡប់ទៅទំព័រដើម
        </button>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}> ពន្ធលើប្រាក់បៀវត្ស — កម្មវិធីគណនាពន្ធ</div>
          <div style={S.hSub}>កម្ពុជា · អនុក្រឹត្យលេខ ៤៨ (២០២៤) · មេរៀន TAX-02</div>
        </div>

        {/* TAXPAYER TYPE */}
        <div style={S.card}>
          <div style={S.cardTitle}>ប្រភេទអ្នកបង់ពន្ធ</div>
          <div style={S.tabRow}>
            <button style={taxType === "resident" ? S.tabOn : S.tab} onClick={() => { setTaxType("resident"); setResult(null); }}>
              និវាសនជន — អ្នកនៅក្នុងប្រទេស (តាមអត្រាកំណើន)
            </button>
            <button style={taxType === "nonresident" ? S.tabOn : S.tab} onClick={() => { setTaxType("nonresident"); setResult(null); }}>
              អនិវាសនជន — អ្នកនៅក្រៅប្រទេស (អត្រាថេរ ២០%)
            </button>
          </div>

          {/* ── RESIDENT FORM ── */}
          {taxType === "resident" && (
            <>
              <div style={S.cardTitle}>ប្រាក់ចំណូល</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់បៀវត្សមូលដ្ឋាន (រៀល/ខែ)</label>
                  <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 2500000" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់រង្វាន់ / ប្រាក់ឧបត្ថម្ភជាប់ពន្ធ (រៀល)</label>
                  <input style={S.input} type="number" placeholder="0" value={bonus} onChange={e => setBonus(e.target.value)} />
                </div>
              </div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ប្រាក់បុរេប្រទាន / ប្រាក់កម្ចីត្រូវសងក្នុងខែនេះ (រៀល)</label>
                  <input style={S.input} type="number" placeholder="0" value={advance} onChange={e => setAdvance(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>អត្ថប្រយោជន៍បន្ថែម (រៀល)</label>
                  <input style={S.input} type="number" placeholder="0" value={fringe} onChange={e => setFringe(e.target.value)} />
                </div>
              </div>
              <div style={S.field}>
                <label style={S.label}>ប្រាក់ឧបត្ថម្ភការធ្វើដំណើរ / បេសកកម្ម — មិនជាប់ពន្ធបើស្ថិតក្នុងកម្រិតច្បាប់ (រៀល)</label>
                <input style={S.input} type="number" placeholder="0" value={travel} onChange={e => setTravel(e.target.value)} />
              </div>

              <div style={{ ...S.cardTitle, marginTop: 8 }}>ការកាត់បន្ថយតាមស្ថានភាពគ្រួសារ — ១៥០,០០០ រៀលក្នុងម្នាក់</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>សហព័ទ្ធ (ប្រពន្ធ ឬ ប្តី អត់ធ្វើការ)</label>
                  <select style={S.select} value={spouse} onChange={e => setSpouse(parseInt(e.target.value))}>
                    <option value={0}>មិនមាន</option>
                    <option value={1}>មាន — កាត់បន្ថយ ១៥០,០០០ រៀល</option>
                  </select>
                </div>
                <div style={S.field}>
                  <label style={S.label}>កូនក្នុងបន្ទុក (អាយុក្រោម ១៤ឆ្នាំ ឬ និស្សិតក្រោម ២៥ឆ្នាំ)</label>
                  <select style={S.select} value={children} onChange={e => setChildren(parseInt(e.target.value))}>
                    {[0,1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n}{n > 0 ? ` នាក់ — កាត់បន្ថយ ${(n * 150000).toLocaleString()} រៀល` : " នាក់"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── NON-RESIDENT FORM ── */}
          {taxType === "nonresident" && (
            <>
              <div style={S.cardTitle}>ប្រាក់បៀវត្សមានប្រភពក្នុងប្រទេសកម្ពុជា</div>
              <div style={S.field}>
                <label style={S.label}>ប្រាក់បៀវត្សប្រចាំខែ (រៀល)</label>
                <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 4000000" value={nrSalary} onChange={e => setNrSalary(e.target.value)} />
              </div>
              <div style={S.note}>
                អនិវាសនជនត្រូវជាប់ពន្ធតាមអត្រាថេរ <strong>២០%</strong> លើគ្រប់ប្រាក់បៀវត្សដែលមានប្រភពនៅកម្ពុជា។ 
                មិនត្រូវបានអនុញ្ញាតឱ្យមានការកាត់បន្ថយចំពោះសហព័ទ្ធ ឬកូនឡើយ (ស្លាយទី ២៧)។
              </div>
            </>
          )}
        </div>

        <button style={S.btn} onClick={calculate}>គណនាពន្ធ</button>

        {/* ── RESULTS ── */}
        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>មូលដ្ឋានគិតពន្ធសរុប</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1F4E" }}>{fmt(result.taxable)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ប្រាក់ពន្ធត្រូវបង់សរុប</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#c0392b" }}>{fmt(result.tax)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ប្រាក់បៀវត្សទទួលបានជាក់ស្តែង</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a7a4a" }}>{fmt(result.net)}</div>
              </div>
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>ប្រៀបធៀបប្រាក់ពន្ធ និងប្រាក់បៀវត្សសុទ្ធ</div>
              <div style={S.barTrack}>
                <div style={{ width: result.taxPct.toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width 0.4s" }} />
                <div style={{ width: (100 - result.taxPct).toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width 0.4s" }} />
              </div>
              <div style={S.barLabels}>
                <span>🔴 ទឹកប្រាក់ពន្ធ៖ {result.taxPct.toFixed(1)}%</span>
                <span>🟢 ប្រាក់បៀវត្សសុទ្ធ៖ {(100 - result.taxPct).toFixed(1)}%</span>
              </div>
            </div>

            {/* DEDUCTIONS — resident only */}
            {result.type === "resident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>ព័ត៌មានលម្អិតនៃការគណនាមូលដ្ឋានគិតពន្ធ</div>
                <div style={S.dedRow}><span>ប្រាក់បៀវត្សមូលដ្ឋាន</span><span style={S.dedVal}>{fmt(result.sal)}</span></div>
                {result.bon > 0 && <div style={S.dedRow}><span>ប្រាក់រង្វាន់ / ប្រាក់ឧបត្ថម្ភ</span><span style={S.dedVal}>+ {fmt(result.bon)}</span></div>}
                {result.adv > 0 && <div style={S.dedRow}><span>ប្រាក់បុរេប្រទានត្រូវបូកបញ្ចូលវិញ</span><span style={S.dedVal}>+ {fmt(result.adv)}</span></div>}
                {result.spouse > 0 && <div style={S.dedRow}><span>ការកាត់បន្ថយសហព័ទ្ធ (១ × ១៥០,០០០)</span><span style={S.dedVal}>− {fmt(150000)}</span></div>}
                {result.children > 0 && <div style={S.dedRow}><span>ការកាត់បន្ថយកូនក្នុងបន្ទុក ({result.children} × ១៥០,០០០)</span><span style={S.dedVal}>− {fmt(result.children * 150000)}</span></div>}
                {result.fri > 0 && <div style={S.dedRow}><span>ពន្ធលើអត្ថប្រយោជន៍បន្ថែម ({fmt(result.fri)} × ២០%)</span><span style={S.dedVal}>{fmt(result.fringeTax)}</span></div>}
                <div style={S.dedRowTotal}>
                  <span>មូលដ្ឋានគិតពន្ធសរុប ( taxable salary )</span>
                  <span style={S.dedVal}>{fmt(result.taxable)}</span>
                </div>
              </div>
            )}

            {/* BRACKETS — resident only */}
            {result.type === "resident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>តារាងកាត់ពន្ធតាមអត្រាកំណើនតាមថ្នាក់</div>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.th}>ថ្នាក់ពន្ធ (រៀល)</th>
                      <th style={S.th}>អត្រាពន្ធ</th>
                      <th style={S.th}>ប្រាក់ពន្ធក្នុងថ្នាក់នីមួយៗ</th>
                      <th style={S.th}>ស្ថានភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bracketDetails.map((bd, i) => {
                      const b        = BRACKETS[i];
                      const isActive = i === result.activeBracket && bd.reached;
                      const status   = !bd.reached ? "មិនទាន់ដល់" : isActive ? "ថ្នាក់សកម្ម ✓" : "ពេញកម្រិតថ្នាក់";
                      return (
                        <tr key={i}>
                          <td style={isActive ? S.tdActive : S.td}>{b.label}</td>
                          <td style={isActive ? S.tdActive : S.td}>{(b.rate * 100).toFixed(0)}%</td>
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

            {/* NON-RESIDENT formula note */}
            {result.type === "nonresident" && (
              <div style={S.card}>
                <div style={S.note}>
                  រូបមន្តអនិវាសនជនអត្រាថេរ៖ {fmt(result.taxable)} × 20% = {fmt(result.tax)}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}