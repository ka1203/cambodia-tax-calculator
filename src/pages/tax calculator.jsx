import { useState } from "react";

// ─── HELPERS ─────────────────────────────────────────────────
function fmt(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}

// ─── SHARED STYLES (matching salary-tax style) ────────────────
const S = {
  page:     { minHeight: "100vh", background: "#f5f7fb", padding: "32px 16px", fontFamily: "Arial, sans-serif" },
  wrap:     { maxWidth: 720, margin: "0 auto" },
  header:   { background: "#0B1F4E", color: "white", borderRadius: 12, padding: "22px 28px", marginBottom: 24 },
  h1:       { fontSize: 20, fontWeight: 700, marginBottom: 6 },
  hSub:     { fontSize: 13, opacity: 0.7 },
  card:     { background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 20 },
  cardTitle:{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 },
  tabRow:   { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
  tab:      { padding: "8px 18px", borderRadius: 20, border: "1px solid #d1d5db", fontSize: 14, cursor: "pointer", background: "white", color: "#6b7280" },
  tabOn:    { padding: "8px 18px", borderRadius: 20, border: "1px solid #0B1F4E", fontSize: 14, cursor: "pointer", background: "#0B1F4E", color: "white" },
  row2:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field:    { marginBottom: 16 },
  label:    { display: "block", fontSize: 13, color: "#6b7280", marginBottom: 6 },
  input:    { width: "100%", padding: "9px 12px", fontSize: 14, border: "1px solid #d1d5db", borderRadius: 8, background: "white", color: "#1a1a1a", outline: "none", boxSizing: "border-box" },
  select:   { width: "100%", padding: "9px 12px", fontSize: 14, border: "1px solid #d1d5db", borderRadius: 8, background: "white", color: "#1a1a1a", boxSizing: "border-box" },
  btn:      { width: "100%", padding: 12, fontSize: 15, fontWeight: 700, background: "#0B1F4E", color: "white", border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 24 },
  note:     { background: "#eff6ff", borderLeft: "4px solid #0B1F4E", borderRadius: 6, padding: "12px 16px", fontSize: 13, color: "#374151", marginTop: 12 },
  noteWarn: { background: "#fff7ed", borderLeft: "4px solid #f97316", borderRadius: 6, padding: "12px 16px", fontSize: 13, color: "#374151", marginTop: 12 },
  noteRed:  { background: "#fef2f2", borderLeft: "4px solid #c0392b", borderRadius: 6, padding: "12px 16px", fontSize: 13, color: "#374151", marginTop: 0 },
  metricGrid:{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 },
  metric:   { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16, textAlign: "center" },
  mLabel:   { fontSize: 12, color: "#6b7280", marginBottom: 6 },
  tbl:      { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th:       { background: "#f3f4f6", color: "#6b7280", fontWeight: 600, padding: "9px 12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" },
  td:       { padding: "9px 12px", borderBottom: "1px solid #f3f4f6", color: "#1a1a1a" },
  tdActive: { padding: "9px 12px", borderBottom: "1px solid #f3f4f6", background: "#EFF6FF", color: "#0B1F4E", fontWeight: 700 },
  tdRed:    { padding: "9px 12px", borderBottom: "1px solid #f3f4f6", background: "#fef2f2", color: "#c0392b", fontWeight: 700 },
  dedRow:   { display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 },
  dedRowTotal:{ display: "flex", justifyContent: "space-between", padding: "10px 8px", fontSize: 14, fontWeight: 700, background: "#f9fafb", borderRadius: 6, marginTop: 4 },
  dedVal:   { color: "#0B1F4E", fontWeight: 600 },
  dedValRed:{ color: "#c0392b", fontWeight: 600 },
  chip:     { display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 },
};

// ─── TABS ─────────────────────────────────────────────────────
const TABS = [
  { id: "penalty",  label: "Penalty Calculator" },
  { id: "patent",   label: "Patent Tax" },
  { id: "income",   label: "Income Tax Audit" },
  { id: "classify", label: "Taxpayer Classification" },
];

// ══════════════════════════════════════════════════════════════
// TAB 1 — PENALTY CALCULATOR
// ══════════════════════════════════════════════════════════════
function PenaltyTab() {
  const [taxDue,   setTaxDue]   = useState("");
  const [taxPaid,  setTaxPaid]  = useState("");
  const [vtype,    setVtype]    = useState("auto");
  const [months,   setMonths]   = useState("");
  const [result,   setResult]   = useState(null);

  function calculate() {
    const due     = parseFloat(taxDue)  || 0;
    const paid    = parseFloat(taxPaid) || 0;
    const m       = parseInt(months)    || 0;
    const shortage = Math.max(0, due - paid);
    const pct     = due > 0 ? (shortage / due) * 100 : 0;

    let surchargeRate = 0, surchargeLabel = "", fixedPenalty = 0, violationLabel = "";

    const effective = vtype === "auto"
      ? (pct > 10 ? "major" : pct > 0 ? "minor" : "none")
      : vtype;

    switch (effective) {
      case "obstruction":
        fixedPenalty   = 2_000_000;
        surchargeLabel = "Fixed Penalty — Obstruction (2,000,000 ៛)";
        violationLabel = "Obstruction";
        break;
      case "unilateral":
        surchargeRate  = 0.40;
        surchargeLabel = "Surcharge 40% — Unilateral Assessment";
        violationLabel = "Unilateral";
        break;
      case "major":
        surchargeRate  = 0.25;
        surchargeLabel = "Surcharge 25% — Major (shortage > 10%)";
        violationLabel = "Major";
        break;
      case "minor":
        surchargeRate  = 0.10;
        surchargeLabel = "Surcharge 10% — Minor (shortage ≤ 10%)";
        violationLabel = "Minor";
        break;
      default:
        surchargeLabel = "No surcharge (no shortage)";
        violationLabel = "None";
    }

    const surcharge = effective === "obstruction" ? fixedPenalty : shortage * surchargeRate;
    const interest  = shortage * 0.015 * m;
    const total     = shortage + surcharge + interest;
    setResult({ due, paid, shortage, pct, surcharge, surchargeLabel, interest, total, m, violationLabel, effective });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>Tax amounts (ប្រាក់ពន្ធ)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Tax due — ពន្ធត្រូវបង់ (KHR)</label>
            <input style={S.input} type="number" placeholder="e.g. 250000000" value={taxDue} onChange={e => setTaxDue(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Tax actually paid (KHR)</label>
            <input style={S.input} type="number" placeholder="0" value={taxPaid} onChange={e => setTaxPaid(e.target.value)} />
          </div>
        </div>

        <div style={S.cardTitle}>Violation type & late months</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Violation type (ប្រភេទរំលោភ)</label>
            <select style={S.select} value={vtype} onChange={e => setVtype(e.target.value)}>
              <option value="auto">Auto-detect from shortage %</option>
              <option value="minor">Minor — 10% (shortage ≤ 10%)</option>
              <option value="major">Major — 25% (shortage &gt; 10%)</option>
              <option value="unilateral">Unilateral — 40%</option>
              <option value="obstruction">Obstruction — fixed 2,000,000 ៛</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>Months overdue (ខែចំណាយយូរ)</label>
            <input style={S.input} type="number" placeholder="e.g. 34" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        </div>
        <div style={S.note}>
          Interest rate: <strong>1.5% per month</strong> on the tax shortage. Obstruction penalty (មិនសហការ) is a fixed 2,000,000 ៛ regardless of shortage.
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាពន្ធ — Calculate Penalty</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>Tax shortage (ខ្វះ)</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#c0392b" }}>{fmt(result.shortage)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Surcharge + Interest</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#f97316" }}>{fmt(result.surcharge + result.interest)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Total due (សរុបត្រូវបង់)</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0B1F4E" }}>{fmt(result.total)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Penalty breakdown (លម្អិតការផាកពិន័យ)</div>
            <div style={S.dedRow}><span>Tax due</span><span style={S.dedVal}>{fmt(result.due)}</span></div>
            <div style={S.dedRow}><span>Tax paid</span><span style={S.dedVal}>{fmt(result.paid)}</span></div>
            <div style={S.dedRow}><span>Shortage ({result.pct.toFixed(1)}%)</span><span style={S.dedValRed}>{fmt(result.shortage)}</span></div>
            <div style={S.dedRow}><span>{result.surchargeLabel}</span><span style={S.dedValRed}>{fmt(result.surcharge)}</span></div>
            <div style={S.dedRow}><span>Interest — 1.5% × {result.m} months</span><span style={S.dedValRed}>{fmt(result.interest)}</span></div>
            <div style={S.dedRowTotal}><span>TOTAL amount due</span><span style={S.dedVal}>{fmt(result.total)}</span></div>
            <div style={{ ...S.note, marginTop: 12 }}>
              Violation classified as: <strong>{result.violationLabel}</strong> — {result.surchargeLabel}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — PATENT TAX
// ══════════════════════════════════════════════════════════════
function PatentTab() {
  const [year,    setYear]    = useState("");
  const [onTime,  setOnTime]  = useState("late");
  const [months,  setMonths]  = useState("");
  const [result,  setResult]  = useState(null);

  const PATENT = 1_200_000;

  function calculate() {
    const m         = parseInt(months) || 0;
    const surcharge = onTime === "late" ? PATENT * 0.10 : 0;
    const interest  = onTime === "late" ? PATENT * 0.015 * m : 0;
    const total     = PATENT + surcharge + interest;
    setResult({ m, surcharge, interest, total, onTime });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>Patent tax details (ពន្ធប៉ាតង់)</div>
        <div style={S.note}>
          Annual patent tax: <strong>1,200,000 ៛/year</strong> · Deadline: <strong>31 March</strong> each year ·
          Late penalty: <strong>10% surcharge + 1.5%/month interest</strong>.
          First-year patent tax is exempt when registering with GDT.
        </div>

        <div style={{ height: 16 }} />
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Tax year (ឆ្នាំ)</label>
            <input style={S.input} type="text" placeholder="e.g. 2023" value={year} onChange={e => setYear(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Filing status</label>
            <select style={S.select} value={onTime} onChange={e => setOnTime(e.target.value)}>
              <option value="ontime">On time (before 31 March)</option>
              <option value="late">Late — penalty applies</option>
            </select>
          </div>
        </div>

        {onTime === "late" && (
          <div style={S.field}>
            <label style={S.label}>Months overdue (ខែចំណាយយូរ)</label>
            <input style={S.input} type="number" placeholder="e.g. 11" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        )}
      </div>

      <button style={S.btn} onClick={calculate}>គណនា — Calculate Patent Tax</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>Base patent tax</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0B1F4E" }}>{fmt(PATENT)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Surcharge + Interest</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#c0392b" }}>{fmt(result.surcharge + result.interest)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Total due</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#1a7a4a" }}>{fmt(result.total)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Patent tax breakdown — {year || "year"}</div>
            <div style={S.dedRow}><span>Base patent tax (ពន្ធប៉ាតង់)</span><span style={S.dedVal}>{fmt(PATENT)}</span></div>
            <div style={S.dedRow}><span>Surcharge 10%</span><span style={result.onTime === "late" ? S.dedValRed : S.dedVal}>{fmt(result.surcharge)}</span></div>
            <div style={S.dedRow}><span>Interest 1.5% × {result.m} months</span><span style={result.onTime === "late" ? S.dedValRed : S.dedVal}>{fmt(result.interest)}</span></div>
            <div style={S.dedRowTotal}><span>Total</span><span style={S.dedVal}>{fmt(result.total)}</span></div>
            {result.onTime === "ontime" && (
              <div style={S.note}>Filed on time — no surcharge or interest applies.</div>
            )}
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — INCOME TAX AUDIT
// ══════════════════════════════════════════════════════════════
function IncomeTab() {
  const [declared,   setDeclared]   = useState("");
  const [auditAdj,   setAuditAdj]   = useState("");
  const [taxRate,    setTaxRate]    = useState("20");
  const [months,     setMonths]     = useState("");
  const [nonCompli,  setNonCompli]  = useState(false);
  const [result,     setResult]     = useState(null);

  function calculate() {
    const decl   = parseFloat(declared)  || 0;
    const adj    = parseFloat(auditAdj)  || 0;  // disallowed expenses added back
    const rate   = parseFloat(taxRate) / 100;
    const m      = parseInt(months) || 0;

    const auditedProfit  = decl + adj;
    const declaredTax    = decl * rate;
    const auditedTax     = auditedProfit * rate;
    const shortage       = Math.max(0, auditedTax - declaredTax);
    const pct            = auditedTax > 0 ? (shortage / auditedTax) * 100 : 0;

    const surchargeRate  = nonCompli ? 0.25 : pct > 10 ? 0.25 : 0.10;
    const surchargeLabel = nonCompli
      ? "Surcharge 25% (non-compliant records)"
      : pct > 10 ? "Surcharge 25% (major — shortage > 10%)"
      : "Surcharge 10% (minor — shortage ≤ 10%)";

    const surcharge = shortage * surchargeRate;
    const interest  = shortage * 0.015 * m;
    const totalExtra = shortage + surcharge + interest;

    setResult({ decl, adj, auditedProfit, declaredTax, auditedTax, shortage, pct,
                surcharge, surchargeLabel, interest, totalExtra, m, rate, nonCompli });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>Income & audit figures (ចំណូលនិងសវនកម្ម)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Declared profit (ចំណេញប្រកាស) (KHR)</label>
            <input style={S.input} type="number" placeholder="e.g. 100000000" value={declared} onChange={e => setDeclared(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Disallowed expenses found (KHR)</label>
            <input style={S.input} type="number" placeholder="e.g. 8000000" value={auditAdj} onChange={e => setAuditAdj(e.target.value)} />
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Tax rate (អត្រាពន្ធ)</label>
            <select style={S.select} value={taxRate} onChange={e => setTaxRate(e.target.value)}>
              <option value="20">20% — Standard corporate</option>
              <option value="30">30% — Oil / Gas / Minerals</option>
              <option value="5">5% — QIP preferential</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>Months overdue (ខែចំណាយយូរ)</label>
            <input style={S.input} type="number" placeholder="e.g. 22" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        </div>
        <div style={S.field}>
          <label style={{ ...S.label, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={nonCompli} onChange={e => setNonCompli(e.target.checked)}
              style={{ accentColor: "#0B1F4E", width: 15, height: 15 }} />
            Non-compliant records (force 25% surcharge regardless of shortage %)
          </label>
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនា — Calculate Income Tax Audit</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>Tax shortage (ពន្ធខ្វះ)</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#c0392b" }}>{fmt(result.shortage)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Surcharge + Interest</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#f97316" }}>{fmt(result.surcharge + result.interest)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>Total extra due</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0B1F4E" }}>{fmt(result.totalExtra)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Audit adjustment breakdown (លម្អិត)</div>
            <div style={S.dedRow}><span>Declared profit</span><span style={S.dedVal}>{fmt(result.decl)}</span></div>
            <div style={S.dedRow}><span>Disallowed expenses (add-back)</span><span style={S.dedVal}>+ {fmt(result.adj)}</span></div>
            <div style={S.dedRowTotal}><span>Audited profit</span><span style={S.dedVal}>{fmt(result.auditedProfit)}</span></div>
            <div style={{ height: 12 }} />
            <div style={S.dedRow}><span>Declared tax ({(result.rate * 100).toFixed(0)}%)</span><span style={S.dedVal}>{fmt(result.declaredTax)}</span></div>
            <div style={S.dedRow}><span>Audited tax ({(result.rate * 100).toFixed(0)}%)</span><span style={S.dedVal}>{fmt(result.auditedTax)}</span></div>
            <div style={S.dedRow}><span>Shortage ({result.pct.toFixed(1)}%)</span><span style={S.dedValRed}>{fmt(result.shortage)}</span></div>
            <div style={S.dedRow}><span>{result.surchargeLabel}</span><span style={S.dedValRed}>{fmt(result.surcharge)}</span></div>
            <div style={S.dedRow}><span>Interest — 1.5% × {result.m} months</span><span style={S.dedValRed}>{fmt(result.interest)}</span></div>
            <div style={S.dedRowTotal}><span>Additional amount to pay</span><span style={S.dedVal}>{fmt(result.totalExtra)}</span></div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — TAXPAYER CLASSIFICATION
// ══════════════════════════════════════════════════════════════
const TIERS = [
  {
    id: "small", label: "SMALL", kh: "អ្នកបង់ពន្ធតូច",
    revMin: 250_000_000, revMax: 700_000_000,
    empMin: 10, empMax: 50,
    color: "#1a7a4a", bg: "#f0fdf4",
    accounting: "Simplified accounting system (រណ្នាការប្រព័ន្ធសាមញ្ញ)",
    note: "Revenue 250M–700M ៛ · Employees 10–50",
  },
  {
    id: "medium", label: "MEDIUM", kh: "អ្នកបង់ពន្ធមធ្យម",
    revMin: 700_000_001, revMax: 4_000_000_000,
    empMin: 51, empMax: 100,
    color: "#0B1F4E", bg: "#eff6ff",
    accounting: "Standard accounting per National Accounting Council",
    note: "Revenue 700M–4,000M ៛ · Employees 51–100",
  },
  {
    id: "large", label: "LARGE", kh: "អ្នកបង់ពន្ធធំ",
    revMin: 4_000_000_001, revMax: Infinity,
    empMin: 101, empMax: Infinity,
    color: "#c0392b", bg: "#fef2f2",
    accounting: "Full IFRS/standard accounting required · Subsidiaries, MNCs, QIP entities",
    note: "Revenue > 4,000M ៛ · Employees > 100",
  },
];

function ClassifyTab() {
  const [revenue,  setRevenue]  = useState("");
  const [employees,setEmployees]= useState("");
  const [result,   setResult]   = useState(null);

  function classify() {
    const rev = parseFloat(revenue)  || 0;
    const emp = parseInt(employees)  || 0;

    const byRev = TIERS.find(t => rev >= t.revMin && rev <= t.revMax);
    const byEmp = TIERS.find(t => emp >= t.empMin && emp <= t.empMax);

    // If both match same tier, clear result; otherwise pick the higher tier
    let tier = null;
    if (byRev && byEmp && byRev.id === byEmp.id) {
      tier = byRev;
    } else if (byRev || byEmp) {
      // take higher tier
      const tiers = ["small","medium","large"];
      const ri = byRev ? tiers.indexOf(byRev.id) : -1;
      const ei = byEmp ? tiers.indexOf(byEmp.id) : -1;
      tier = ri >= ei ? (byRev || byEmp) : (byEmp || byRev);
    }
    setResult({ tier, rev, emp });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>Taxpayer tiers — Self-Assessment System (ប្រព័ន្ធសាមគ្គីប្រកាស)</div>
        <table style={S.tbl}>
          <thead>
            <tr>
              <th style={S.th}>Type</th>
              <th style={S.th}>Annual Revenue (KHR)</th>
              <th style={S.th}>Employees</th>
              <th style={S.th}>Accounting</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map(t => (
              <tr key={t.id}>
                <td style={{ ...S.td, fontWeight: 700, color: t.color }}>{t.label}</td>
                <td style={S.td}>{t.id === "large" ? "> 4,000M" : `${(t.revMin/1e6).toFixed(0)}M – ${(t.revMax/1e6).toFixed(0)}M`}</td>
                <td style={S.td}>{t.id === "large" ? "> 100" : `${t.empMin} – ${t.empMax}`}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#6b7280" }}>{t.id === "small" ? "Simplified" : t.id === "medium" ? "Standard (NAC)" : "IFRS / Standard"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ height: 20 }} />
        <div style={S.cardTitle}>Enter your figures</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Annual revenue (KHR)</label>
            <input style={S.input} type="number" placeholder="e.g. 500000000" value={revenue} onChange={e => setRevenue(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Number of employees (នាក់)</label>
            <input style={S.input} type="number" placeholder="e.g. 35" value={employees} onChange={e => setEmployees(e.target.value)} />
          </div>
        </div>
      </div>

      <button style={S.btn} onClick={classify}>ចាត់ប្រភេទ — Classify Taxpayer</button>

      {result && (
        <div style={S.card}>
          <div style={S.cardTitle}>Classification result (លទ្ធផល)</div>
          {result.tier ? (
            <>
              <div style={{
                background: result.tier.bg, border: `2px solid ${result.tier.color}`,
                borderRadius: 10, padding: 20, textAlign: "center", marginBottom: 16,
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: result.tier.color, marginBottom: 4 }}>
                  {result.tier.label} TAXPAYER
                </div>
                <div style={{ fontSize: 16, color: result.tier.color, marginBottom: 8 }}>{result.tier.kh}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{result.tier.note}</div>
              </div>
              <div style={S.dedRow}><span>Revenue entered</span><span style={S.dedVal}>{fmt(result.rev)}</span></div>
              <div style={S.dedRow}><span>Employees entered</span><span style={S.dedVal}>{result.emp}</span></div>
              <div style={S.dedRow}><span>Required accounting</span><span style={S.dedVal}>{result.tier.accounting.split("·")[0]}</span></div>
              <div style={S.note}>{result.tier.accounting}</div>
            </>
          ) : (
            <div style={S.noteWarn}>
              ⚠ Cannot classify — revenue and employees may not fall in the same tier, or no values entered.
              Check both fields and try again.
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════
export default function CambodiaTaxCalc() {
  const [tab, setTab] = useState("penalty");

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>🇰🇭 ពន្ធដារកម្ពុជា — Cambodia Tax Calculator</div>
          <div style={S.hSub}>TAX-01: Generality of Cambodian Taxation · ITC 2025–2026 · Dept. of Applied Mathematics & Statistics</div>
        </div>

        {/* TABS */}
        <div style={S.tabRow}>
          {TABS.map(t => (
            <button key={t.id}
              style={tab === t.id ? S.tabOn : S.tab}
              onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "penalty"  && <PenaltyTab  />}
        {tab === "patent"   && <PatentTab   />}
        {tab === "income"   && <IncomeTab   />}
        {tab === "classify" && <ClassifyTab />}

      </div>
    </div>
  );
}