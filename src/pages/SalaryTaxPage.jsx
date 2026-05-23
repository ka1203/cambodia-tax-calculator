import { useState } from "react";

// ─── TAX BRACKETS (Sub-decree 48, 2024) ──────────────────────
const BRACKETS = [
  { max: 1500000,  rate: 0.00, offset: 0,       label: "0 – 1,500,000" },
  { max: 2000000,  rate: 0.05, offset: 75000,   label: "1,500,001 – 2,000,000" },
  { max: 8500000,  rate: 0.10, offset: 175000,  label: "2,000,001 – 8,500,000" },
  { max: 12500000, rate: 0.15, offset: 600000,  label: "8,500,001 – 12,500,000" },
  { max: Infinity, rate: 0.20, offset: 1225000, label: "Over 12,500,000" },
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
export default function SalaryTaxPage() {
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
      ? "Taxable salary is within the 0% bracket — no salary tax due."
      : `Salary tax: ${Math.round(taxable).toLocaleString()} × ${ab.rate * 100}% − ${OFFSET_LABELS[res.activeBracket]} = ${fmt(res.tax)}`;
    if (fringeTax > 0)
      formulaNote += `   |   Fringe tax: ${fmt(fri)} × 20% = ${fmt(fringeTax)}`;

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

  const S = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
  },

  wrap: {
    maxWidth: 1000,
    margin: "0 auto",
  },

  header: {
    background:
      "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "white",
    borderRadius: 24,
    padding: "40px",
    marginBottom: 30,
    boxShadow: "0 20px 40px rgba(37,99,235,.15)",
  },

  h1: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 10,
  },

  hSub: {
    fontSize: 15,
    opacity: 0.85,
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 30,
    marginBottom: 24,
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 20px rgba(15,23,42,.05)",
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#2563EB",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: 20,
  },

  tabRow: {
    display: "flex",
    gap: 12,
    marginBottom: 25,
    flexWrap: "wrap",
  },

  tab: {
    padding: "12px 20px",
    borderRadius: 999,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    color: "#64748B",
    cursor: "pointer",
    fontWeight: 600,
    transition: ".2s",
  },

  tabOn: {
    padding: "12px 20px",
    borderRadius: 999,
    border: "none",
    background: "#2563EB",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 6px 18px rgba(37,99,235,.3)",
  },

  row2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 18,
  },

  field: {
    marginBottom: 18,
  },

  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #CBD5E1",
    borderRadius: 14,
    fontSize: 15,
    background: "#FFFFFF",
    transition: ".2s",
    outline: "none",
  },

  select: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #CBD5E1",
    borderRadius: 14,
    fontSize: 15,
    background: "#FFFFFF",
  },

  btn: {
    width: "100%",
    padding: "16px",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "white",
    boxShadow: "0 10px 25px rgba(37,99,235,.25)",
    marginBottom: 30,
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 18,
    marginBottom: 24,
  },

  metric: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    textAlign: "center",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 15px rgba(0,0,0,.04)",
  },

  mLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 10,
  },

  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 14,
    padding: "16px",
    color: "#1E40AF",
    marginTop: 16,
    lineHeight: 1.7,
  },

  barTrack: {
    height: 16,
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10,
  },

  barLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#64748B",
  },

  tbl: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#EFF6FF",
    color: "#1E40AF",
    padding: "14px",
    textAlign: "left",
    fontWeight: 700,
    borderBottom: "1px solid #DBEAFE",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #F1F5F9",
  },

  tdActive: {
    padding: "14px",
    background: "#DBEAFE",
    color: "#1D4ED8",
    fontWeight: 700,
    borderBottom: "1px solid #BFDBFE",
  },

  dedRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #F1F5F9",
  },

  dedRowTotal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    padding: "16px",
    borderRadius: 14,
    background: "#EFF6FF",
    fontWeight: 700,
  },

  dedVal: {
    color: "#2563EB",
    fontWeight: 700,
  },
};
  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>🇰🇭 ពន្ធលើប្រាក់បៀវត្ស — Salary Tax Calculator</div>
          <div style={S.hSub}>Cambodia · Sub-decree 48 (2024) · TAX-02 Lesson</div>
        </div>
         
        

        {/* TAXPAYER TYPE */}
        <div style={S.card}>
          <div style={S.cardTitle}>Taxpayer type (ប្រភេទអ្នកបង់ពន្ធ)</div>
          <div style={S.tabRow}>
            <button style={taxType === "resident" ? S.tabOn : S.tab} onClick={() => { setTaxType("resident"); setResult(null); }}>
              Resident — អ្នកនៅ (Progressive)
            </button>
            <button style={taxType === "nonresident" ? S.tabOn : S.tab} onClick={() => { setTaxType("nonresident"); setResult(null); }}>
              Non-resident — អនិវាសនជន (20% flat)
            </button>
          </div>

          {/* ── RESIDENT FORM ── */}
          {taxType === "resident" && (
            <>
              <div style={S.cardTitle}>Income (ចំណូល)</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>Base salary ប្រាក់បៀវត្ស (KHR/month)</label>
                  <input style={S.input} type="number" placeholder="e.g. 2500000" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Bonus / taxable allowances (KHR)</label>
                  <input style={S.input} type="number" placeholder="0" value={bonus} onChange={e => setBonus(e.target.value)} />
                </div>
              </div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>Advance / loan repayable this month (KHR)</label>
                  <input style={S.input} type="number" placeholder="0" value={advance} onChange={e => setAdvance(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Fringe benefits អត្ថប្រយោជន៍បន្ថែម (KHR)</label>
                  <input style={S.input} type="number" placeholder="0" value={fringe} onChange={e => setFringe(e.target.value)} />
                </div>
              </div>
              <div style={S.field}>
                <label style={S.label}>Travel / mission allowance — non-taxable if within legal limits (KHR)</label>
                <input style={S.input} type="number" placeholder="0" value={travel} onChange={e => setTravel(e.target.value)} />
              </div>

              <div style={{ ...S.cardTitle, marginTop: 8 }}>Dependant deductions — 150,000 KHR each</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>Non-working spouse (ប្រពន្ធ/ប្ដី មិនធ្វើការ)</label>
                  <select style={S.select} value={spouse} onChange={e => setSpouse(parseInt(e.target.value))}>
                    <option value={0}>No</option>
                    <option value={1}>Yes — deduct 150,000 KHR</option>
                  </select>
                </div>
                <div style={S.field}>
                  <label style={S.label}>Children in household (under 14, or student under 25)</label>
                  <select style={S.select} value={children} onChange={e => setChildren(parseInt(e.target.value))}>
                    {[0,1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n}{n > 0 ? ` — deduct ${(n * 150000).toLocaleString()} KHR` : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── NON-RESIDENT FORM ── */}
          {taxType === "nonresident" && (
            <>
              <div style={S.cardTitle}>Cambodian-source salary</div>
              <div style={S.field}>
                <label style={S.label}>Monthly salary ប្រាក់បៀវត្ស (KHR)</label>
                <input style={S.input} type="number" placeholder="e.g. 4000000" value={nrSalary} onChange={e => setNrSalary(e.target.value)} />
              </div>
              <div style={S.note}>
                Non-residents pay a flat <strong>20%</strong> on all Cambodian-source salary.
                No deductions for spouse or children are permitted (slide 27).
              </div>
            </>
          )}
        </div>

        <button style={S.btn} onClick={calculate}>គណនាពន្ធ — Calculate Tax</button>

        {/* ── RESULTS ── */}
        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>Taxable salary (មូលដ្ឋានគិតពន្ធ)</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1F4E" }}>{fmt(result.taxable)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>Salary tax (ពន្ធ)</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#c0392b" }}>{fmt(result.tax)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>Net take-home</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a7a4a" }}>{fmt(result.net)}</div>
              </div>
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>Tax vs net salary</div>
              <div style={S.barTrack}>
                <div style={{ width: result.taxPct.toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width 0.4s" }} />
                <div style={{ width: (100 - result.taxPct).toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width 0.4s" }} />
              </div>
              <div style={S.barLabels}>
                <span>🔴 Tax: {result.taxPct.toFixed(1)}%</span>
                <span>🟢 Net: {(100 - result.taxPct).toFixed(1)}%</span>
              </div>
            </div>

            {/* DEDUCTIONS — resident only */}
            {result.type === "resident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>Deduction breakdown (ការគណនាមូលដ្ឋានគិតពន្ធ)</div>
                <div style={S.dedRow}><span>Base salary</span><span style={S.dedVal}>{fmt(result.sal)}</span></div>
                {result.bon > 0 && <div style={S.dedRow}><span>Bonus / allowances</span><span style={S.dedVal}>+ {fmt(result.bon)}</span></div>}
                {result.adv > 0 && <div style={S.dedRow}><span>Advance repayable (add-back)</span><span style={S.dedVal}>+ {fmt(result.adv)}</span></div>}
                {result.spouse > 0 && <div style={S.dedRow}><span>Spouse deduction (1 × 150,000)</span><span style={S.dedVal}>− {fmt(150000)}</span></div>}
                {result.children > 0 && <div style={S.dedRow}><span>Children deduction ({result.children} × 150,000)</span><span style={S.dedVal}>− {fmt(result.children * 150000)}</span></div>}
                {result.fri > 0 && <div style={S.dedRow}><span>Fringe benefit tax ({fmt(result.fri)} × 20%)</span><span style={S.dedVal}>{fmt(result.fringeTax)}</span></div>}
                <div style={S.dedRowTotal}>
                  <span>Taxable salary (មូលដ្ឋានគិតពន្ធ)</span>
                  <span style={S.dedVal}>{fmt(result.taxable)}</span>
                </div>
              </div>
            )}

            {/* BRACKETS — resident only */}
            {result.type === "resident" && (
              <div style={S.card}>
                <div style={S.cardTitle}>Progressive tax brackets (អត្រាកំណើនតាមថ្នាក់)</div>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.th}>Bracket (KHR)</th>
                      <th style={S.th}>Rate</th>
                      <th style={S.th}>Tax in bracket</th>
                      <th style={S.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bracketDetails.map((bd, i) => {
                      const b        = BRACKETS[i];
                      const isActive = i === result.activeBracket && bd.reached;
                      const status   = !bd.reached ? "Below range" : isActive ? "Active ✓" : "Fully taxed";
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
                  Non-resident flat rate: {fmt(result.taxable)} × 20% = {fmt(result.tax)}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}