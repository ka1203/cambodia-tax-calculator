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

  // ── Styles (plain objects — no Tailwind required) ──────────
  const S = {
    page:    { minHeight: "100vh", background: "#f5f7fb", padding: "32px 16px", fontFamily: "Arial, sans-serif" },
    wrap:    { maxWidth: 720, margin: "0 auto" },
    header:  { background: "#0B1F4E", color: "white", borderRadius: 12, padding: "22px 28px", marginBottom: 24 },
    h1:      { fontSize: 20, fontWeight: 700, marginBottom: 6 },
    hSub:    { fontSize: 13, opacity: 0.7 },
    card:    { background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 20 },
    cardTitle:{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 },
    tabRow:  { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
    tab:     { padding: "8px 18px", borderRadius: 20, border: "1px solid #d1d5db", fontSize: 14, cursor: "pointer", background: "white", color: "#6b7280" },
    tabOn:   { padding: "8px 18px", borderRadius: 20, border: "1px solid #0B1F4E", fontSize: 14, cursor: "pointer", background: "#0B1F4E", color: "white" },
    row2:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    field:   { marginBottom: 16 },
    label:   { display: "block", fontSize: 13, color: "#6b7280", marginBottom: 6 },
    input:   { width: "100%", padding: "9px 12px", fontSize: 14, border: "1px solid #d1d5db", borderRadius: 8, background: "white", color: "#1a1a1a", outline: "none" },
    select:  { width: "100%", padding: "9px 12px", fontSize: 14, border: "1px solid #d1d5db", borderRadius: 8, background: "white", color: "#1a1a1a" },
    btn:     { width: "100%", padding: 12, fontSize: 15, fontWeight: 700, background: "#0B1F4E", color: "white", border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 24 },
    note:    { background: "#eff6ff", borderLeft: "4px solid #0B1F4E", borderRadius: 6, padding: "12px 16px", fontSize: 13, color: "#374151", marginTop: 12 },
    metricGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 },
    metric:  { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16, textAlign: "center" },
    mLabel:  { fontSize: 12, color: "#6b7280", marginBottom: 6 },
    barTrack:{ height: 14, background: "#e5e7eb", borderRadius: 7, overflow: "hidden", display: "flex", marginBottom: 8 },
    barLabels:{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" },
    tbl:     { width: "100%", borderCollapse: "collapse", fontSize: 13 },
    th:      { background: "#f3f4f6", color: "#6b7280", fontWeight: 600, padding: "9px 12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" },
    td:      { padding: "9px 12px", borderBottom: "1px solid #f3f4f6", color: "#1a1a1a" },
    tdActive:{ padding: "9px 12px", borderBottom: "1px solid #f3f4f6", background: "#EFF6FF", color: "#0B1F4E", fontWeight: 700 },
    dedRow:  { display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 },
    dedRowTotal:{ display: "flex", justifyContent: "space-between", padding: "10px 8px", fontSize: 14, fontWeight: 700, background: "#f9fafb", borderRadius: 6, marginTop: 4 },
    dedVal:  { color: "#0B1F4E", fontWeight: 600 },
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