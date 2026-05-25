import { useState } from "react";

// ─── មុខងារជំនួយសម្រាប់ទម្រង់លេខ ──────────────────────────────
function formatCurrency(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
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
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
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

const TABS = [
  { id: "penalty",  label: "កម្មវិធីគណនាប្រាក់ពិន័យ" },
  { id: "patent",   label: "ពន្ធប៉ាតង់" },
  { id: "income",   label: "សវនកម្មពន្ធលើប្រាក់ចំណូល" },
  { id: "classify", label: "ចំណាត់ថ្នាក់អ្នកជាប់ពន្ធ" },
];

// ══════════════════════════════════════════════════════════════
// ផ្នែកទី ១ — គណនាប្រាក់ពិន័យពន្ធដារ
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
        fixedPenalty   = 2000000;
        surchargeLabel = "ប្រាក់ពិន័យកំណត់ថេរ — ការរារាំង (២,០០០,០០០ ៛)";
        violationLabel = "ការរារាំងការអនុវត្តបទបញ្ញត្តិពន្ធដារ";
        break;
      case "unilateral":
        surchargeRate  = 0.40;
        surchargeLabel = "ការតម្លើងប្រាក់ពន្ធ ៤០% — ការវាយតម្លៃជាឯកតោភាគី";
        violationLabel = "ការវាយតម្លៃជាឯកតោភាគី";
        break;
      case "major":
        surchargeRate  = 0.25;
        surchargeLabel = "ការតម្លើងប្រាក់ពន្ធ ២៥% — កម្រិតធ្ងន់ (ខ្វះខាតលើសពី ១០%)";
        violationLabel = "កម្រិតធ្ងន់";
        break;
      case "minor":
        surchargeRate  = 0.10;
        surchargeLabel = "ការតម្លើងប្រាក់ពន្ធ ១០% — កម្រិតស្រាល (ខ្វះខាតមិនលើសពី ១០%)";
        violationLabel = "កម្រិតស្រាល";
        break;
      default:
        surchargeLabel = "គ្មានការតម្លើងប្រាក់ពន្ធ (មិនមានប្រាក់ពន្ធខ្វះ)";
        violationLabel = "គ្មាន";
    }

    const surcharge = effective === "obstruction" ? fixedPenalty : shortage * surchargeRate;
    const interest  = shortage * 0.015 * m;
    const total     = shortage + surcharge + interest;
    setResult({ due, paid, shortage, pct, surcharge, surchargeLabel, interest, total, m, violationLabel, effective });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ទិន្នន័យប្រាក់ពន្ធ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ពន្ធត្រូវបង់សរុប (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 25000000" value={taxDue} onChange={e => setTaxDue(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ពន្ធបានបង់រួច (រៀល)</label>
            <input style={S.input} type="number" placeholder="0" value={taxPaid} onChange={e => setTaxPaid(e.target.value)} />
          </div>
        </div>

        <div style={S.cardTitle}>ប្រភេទនៃការល្មើស និង ចំនួនខែហួសកាលកំណត់</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទនៃការរំលោភបំពានច្បាប់ពន្ធដារ</label>
            <select style={S.select} value={vtype} onChange={e => setVtype(e.target.value)}>
              <option value="auto">ស្វែងរកស្វ័យប្រវត្តិតាម % នៃប្រាក់ពន្ធខ្វះ</option>
              <option value="minor">កម្រិតស្រាល — ១០% (ប្រាក់ពន្ធខ្វះខាត ≤ ១០%)</option>
              <option value="major">កម្រិតធ្ងន់ — ២៥% (ប្រាក់ពន្ធខ្វះខាត &gt; ១០%)</option>
              <option value="unilateral">ការវាយតម្លៃជាឯកតោភាគី — ៤០%</option>
              <option value="obstruction">ការរារាំងសមត្ថកិច្ច — កំណត់ថេរ ២,០០០,០០០ ៛</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនខែហួសកាលកំណត់បង់ប្រាក់</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 12" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        </div>
        <div style={S.note}>
          អត្រាការប្រាក់យឺតយ៉ាវ៖ <strong>១.៥% ក្នុងមួយខែ</strong> គណនាលើប្រាក់ពន្ធដែលខ្វះខាត។ ប្រាក់ពិន័យសម្រាប់ការរារាំង (មិនសហការ) គឺកំណត់ថេរ <strong>២,០០០,០០០ ៛</strong> ដោយមិនគិតពីទំហំទឹកប្រាក់ខ្វះឡើយ។
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាប្រាក់ពិន័យរួម</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ពន្ធខ្វះខាតជាក់ស្តែង</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#c0392b" }}>{formatCurrency(result.shortage)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់តម្លើងពន្ធ និងការប្រាក់រួម</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f97316" }}>{formatCurrency(result.surcharge + result.interest)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>សរុបទឹកប្រាក់ត្រូវបង់បន្ថែម</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1F4E" }}>{formatCurrency(result.total)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>ព័ត៌មានលម្អិតនៃការផាកពិន័យ</div>
            <div style={S.dedRow}><span>ប្រាក់ពន្ធត្រូវបង់សរុប</span><span style={S.dedVal}>{formatCurrency(result.due)}</span></div>
            <div style={S.dedRow}><span>ប្រាក់ពន្ធបានបង់រួច</span><span style={S.dedVal}>{formatCurrency(result.paid)}</span></div>
            <div style={S.dedRow}><span>ប្រាក់ពន្ធខ្វះខាត ({result.pct.toFixed(1)}%)</span><span style={S.dedValRed}>{formatCurrency(result.shortage)}</span></div>
            <div style={S.dedRow}><span>{result.surchargeLabel}</span><span style={S.dedValRed}>{formatCurrency(result.surcharge)}</span></div>
            <div style={S.dedRow}><span>ការប្រាក់យឺតយ៉ាវ — ១.៥% × {result.m} ខែ</span><span style={S.dedValRed}>{formatCurrency(result.interest)}</span></div>
            <div style={S.dedRowTotal}><span>សរុបទឹកប្រាក់ត្រូវបង់បន្ថែមរួម</span><span style={S.dedVal}>{formatCurrency(result.total)}</span></div>
            <div style={{ ...S.note, marginTop: 12 }}>
              ចំណាត់ថ្នាក់នៃការល្មើស៖ <strong>{result.violationLabel}</strong>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// ផ្នែកទី ២ — ពន្ធប៉ាតង់ប្រចាំឆ្នាំ
// ══════════════════════════════════════════════════════════════
function PatentTab() {
  const [year,    setYear]    = useState("");
  const [onTime,  setOnTime]  = useState("late");
  const [months,  setMonths]  = useState("");
  const [result,  setResult]  = useState(null);

  const PATENT_BASE = 1200000;

  function calculate() {
    const m         = parseInt(months) || 0;
    const surcharge = onTime === "late" ? PATENT_BASE * 0.10 : 0;
    const interest  = onTime === "late" ? PATENT_BASE * 0.015 * m : 0;
    const total     = PATENT_BASE + surcharge + interest;
    setResult({ m, surcharge, interest, total, onTime });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានពន្ធប៉ាតង់</div>
        <div style={S.note}>
          ប្រាក់ពន្ធប៉ាតង់មូលដ្ឋាន៖ <strong>១,២០០,០០០ ៛/ឆ្នាំ</strong> (សម្រាប់សហគ្រាសកម្រិតដំបូង) · កាលបរិច្ឆេទកំណត់បង់៖ <strong>ថ្ងៃទី ៣១ ខែមីនា</strong> រៀងរាល់ឆ្នាំ · 
          ទណ្ឌកម្មបង់យឺត៖ <strong>តម្លើងពន្ធ ១០% + ការប្រាក់ ១.៥% ក្នុងមួយខែ</strong>។
        </div>

        <div style={{ height: 16 }} />
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ឆ្នាំជាប់ពន្ធ</label>
            <input style={S.input} type="text" placeholder="ឧទាហរណ៍៖ 2026" value={year} onChange={e => setYear(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ស្ថានភាពនៃការប្រកាសពន្ធ</label>
            <select style={S.select} value={onTime} onChange={e => setOnTime(e.target.value)}>
              <option value="ontime">ទាន់ពេលវេលា (មុនថ្ងៃទី ៣១ មីនា)</option>
              <option value="late">យឺតយ៉ាវ — ត្រូវអនុវត្តទណ្ឌកម្មពិន័យ</option>
            </select>
          </div>
        </div>

        {onTime === "late" && (
          <div style={S.field}>
            <label style={S.label}>jumlah ខែហួសកាលកំណត់</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 5" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        )}
      </div>

      <button style={S.btn} onClick={calculate}>គណនាប្រាក់ពន្ធប៉ាតង់</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ពន្ធប៉ាតង់មូលដ្ឋាន</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1F4E" }}>{formatCurrency(PATENT_BASE)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ពិន័យ និងការប្រាក់យឺត</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#c0392b" }}>{formatCurrency(result.surcharge + result.interest)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>សរុបទឹកប្រាក់ត្រូវបង់</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a7a4a" }}>{formatCurrency(result.total)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>ព័ត៌មានលម្អិតពន្ធប៉ាតង់ — ឆ្នាំ {year || "...."}</div>
            <div style={S.dedRow}><span>ប្រាក់ពន្ធប៉ាតង់មូលដ្ឋាន</span><span style={S.dedVal}>{formatCurrency(PATENT_BASE)}</span></div>
            <div style={S.dedRow}><span>ប្រាក់តម្លើងពន្ធ ១០%</span><span style={result.onTime === "late" ? S.dedValRed : S.dedVal}>{formatCurrency(result.surcharge)}</span></div>
            <div style={S.dedRow}><span>ការប្រាក់យឺតយ៉ាវ ១.៥% × {result.m} ខែ</span><span style={result.onTime === "late" ? S.dedValRed : S.dedVal}>{formatCurrency(result.interest)}</span></div>
            <div style={S.dedRowTotal}><span>សរុបទឹកប្រាក់ត្រូវបង់រួម</span><span style={S.dedVal}>{formatCurrency(result.total)}</span></div>
            {result.onTime === "ontime" && (
              <div style={S.note}>បានប្រកាសទាន់ពេលវេលា — មិនមានការអនុវត្តប្រាក់តម្លើងពន្ធ ឬការប្រាក់យឺតយ៉ាវឡើយ។</div>
            )}
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// ផ្នែកទី ៣ — សវនកម្មពន្ធលើប្រាក់ចំណូល
// ══════════════════════════════════════════════════════════════
// ... (IncomeTab រក្សាទុកដដែល ដោយសារវាវែងពេកសម្រាប់បង្ហាញក្នុងប្រអប់ចម្លើយ)
function IncomeTab() {
  const [declared,   setDeclared]   = useState("");
  const [auditAdj,   setAuditAdj]   = useState("");
  const [taxRate,    setTaxRate]    = useState("20");
  const [months,     setMonths]     = useState("");
  const [nonCompli,  setNonCompli]  = useState(false);
  const [result,     setResult]     = useState(null);

  function calculate() {
    const decl   = parseFloat(declared)  || 0;
    const adj    = parseFloat(auditAdj)  || 0;
    const rate   = parseFloat(taxRate) / 100;
    const m      = parseInt(months) || 0;

    const auditedProfit  = decl + adj;
    const declaredTax    = decl * rate;
    const auditedTax     = auditedProfit * rate;
    const shortage       = Math.max(0, auditedTax - declaredTax);
    const pct            = auditedTax > 0 ? (shortage / auditedTax) * 100 : 0;

    const surchargeRate  = nonCompli ? 0.25 : pct > 10 ? 0.25 : 0.10;
    const surchargeLabel = nonCompli
      ? "ការតម្លើងប្រាក់ពន្ធ ២៥% (ប្រព័ន្ធកត់ត្រាគណនេយ្យមិនអនុលោមតាមច្បាប់)"
      : pct > 10 ? "ការតម្លើងប្រាក់ពន្ធ ២៥% (កម្រិតធ្ងន់ — ខ្វះខាត > ១០%)"
      : "ការតម្លើងប្រាក់ពន្ធ ១០% (កម្រិតស្រាល — ខ្វះខាត ≤ ១០%)";

    const surcharge = shortage * surchargeRate;
    const interest  = shortage * 0.015 * m;
    const totalExtra = shortage + surcharge + interest;

    setResult({ decl, adj, auditedProfit, declaredTax, auditedTax, shortage, pct,
                surcharge, surchargeLabel, interest, totalExtra, m, rate, nonCompli });
  }

  return (
    <>
      <div style={S.card}>
        <div style={S.cardTitle}>ទិន្នន័យចំណេញ និងការកែតម្រូវសវនកម្ម</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>លទ្ធផលចំណេញតាមការប្រកាសដំបូង (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 100000000" value={declared} onChange={e => setDeclared(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំណាយមិនត្រូវបានអនុញ្ញាត / រកឃើញបន្ថែមដោយសវនករ (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 15000000" value={auditAdj} onChange={e => setAuditAdj(e.target.value)} />
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>អត្រាពន្ធលើប្រាក់ចំណូល</label>
            <select style={S.select} value={taxRate} onChange={e => setTaxRate(e.target.value)}>
              <option value="20">២០% — អត្រាស្តង់ដារសម្រាប់ក្រុមហ៊ុនទូទៅ</option>
              <option value="30">៣០% — វិស័យរុករកប្រេង ឧស្ម័ន ឬធនធានធម្មជាតិ</option>
              <option value="5">៥% — អត្រាអនុគ្រោះសម្រាប់គម្រោងវិនិយោគមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនខែហួសកាលកំណត់នៃការបង់</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 10" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        </div>
        <div style={S.field}>
          <label style={{ ...S.label, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={nonCompli} onChange={e => setNonCompli(e.target.checked)}
              style={{ accentColor: "#0B1F4E", width: 15, height: 15 }} />
            ប្រព័ន្ធបញ្ជិកាគណនេយ្យមិនអនុលោមតាមច្បាប់ (អនុវត្តទណ្ឌកម្មតម្លើងពន្ធ ២៥% ភ្លាមៗ)
          </label>
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាលទ្ធផលសវនកម្ម</button>

      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់ពន្ធខ្វះខាតសរុប</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#c0392b" }}>{formatCurrency(result.shortage)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>ប្រាក់តម្លើងពន្ធ និងការប្រាក់</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f97316" }}>{formatCurrency(result.surcharge + result.interest)}</div>
            </div>
            <div style={S.metric}>
              <div style={S.mLabel}>សរុបទឹកប្រាក់ត្រូវបង់បន្ថែមចូលរដ្ឋ</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1F4E" }}>{formatCurrency(result.totalExtra)}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>របាយការណ៍លម្អិតនៃការកែតម្រូវសវនកម្ម</div>
            <div style={S.dedRow}><span>ប្រាក់ចំណេញតាមការប្រកាសដំបូង</span><span style={S.dedVal}>{formatCurrency(result.decl)}</span></div>
            <div style={S.dedRow}><span>បូកត្រឡប់ចំណាយដែលមិនត្រូវបានអនុញ្ញាត</span><span style={S.dedVal}>+ {formatCurrency(result.adj)}</span></div>
            <div style={S.dedRowTotal}><span>ប្រាក់ចំណេញពិតប្រាកដក្រោយសវនកម្ម</span><span style={S.dedVal}>{formatCurrency(result.auditedProfit)}</span></div>
            <div style={{ height: 12 }} />
            <div style={S.dedRow}><span>ប្រាក់ពន្ធតាមការប្រកាសដំបូង ({(result.rate * 100).toFixed(0)}%)</span><span style={S.dedVal}>{formatCurrency(result.declaredTax)}</span></div>
            <div style={S.dedRow}><span>ប្រាក់ពន្ធពិតប្រាកដក្រោយសវនកម្ម ({(result.rate * 100).toFixed(0)}%)</span><span style={S.dedVal}>{formatCurrency(result.auditedTax)}</span></div>
            <div style={S.dedRow}><span>ប្រាក់ពន្ធខ្វះខាតក្នុងរដ្ឋ ({result.pct.toFixed(1)}%)</span><span style={S.dedValRed}>{formatCurrency(result.shortage)}</span></div>
            <div style={S.dedRow}><span>{result.surchargeLabel}</span><span style={S.dedValRed}>{formatCurrency(result.surcharge)}</span></div>
            <div style={S.dedRow}><span>ការប្រាក់យឺតយ៉ាវ — ១.៥% × {result.m} ខែ</span><span style={S.dedValRed}>{formatCurrency(result.interest)}</span></div>
            <div style={S.dedRowTotal}><span>សរុបទឹកប្រាក់បន្ថែមរួមដែលត្រូវបង់បង្គ្រប់</span><span style={S.dedVal}>{formatCurrency(result.totalExtra)}</span></div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// ផ្នែកទី ៤ — ចំណាត់ថ្នាក់ប្រភេទអ្នកជាប់ពន្ធ
// ══════════════════════════════════════════════════════════════
// ... (ClassifyTab រក្សាទុកដដែល)
const TIERS = [
  {
    id: "small", label: "អ្នកជាប់ពន្ធតូច",
    revMin: 250000000, revMax: 700000000,
    empMin: 10, empMax: 50,
    color: "#1a7a4a", bg: "#f0fdf4",
    accounting: "ប្រព័ន្ធកត់ត្រាគណនេយ្យសាមញ្ញ",
    note: "ចំណូលប្រចាំឆ្នាំ ២៥០លាន ដល់ ៧០០លាន ៛ ឬ បុគ្គលិក ១០នាក់ ដល់ ៥០នាក់",
  },
  {
    id: "medium", label: "អ្នកជាប់ពន្ធមធ្យម",
    revMin: 700000001, revMax: 4000000000,
    empMin: 51, empMax: 100,
    color: "#0B1F4E", bg: "#eff6ff",
    accounting: "ស្តង់ដារគណនេយ្យស្របតាមក្រុមប្រឹក្សាជាតិគណនេយ្យ",
    note: "ចំណូលប្រចាំឆ្នាំ ៧០០លាន ដល់ ៤,០០០លាន ៛ ឬ បុគ្គលិក ៥១នាក់ ដល់ ១០០នាក់",
  },
  {
    id: "large", label: "អ្នកជាប់ពន្ធធំ",
    revMin: 4000000001, revMax: Infinity,
    empMin: 101, empMax: Infinity,
    color: "#c0392b", bg: "#fef2f2",
    accounting: "ប្រព័ន្ធស្តង់ដាររបាយការណ៍ហិរញ្ញវត្ថុពេញលេញ (ក្រុមហ៊ុនធំៗ ឬគម្រោងវិនិយោគ)",
    note: "ចំណូលប្រចាំឆ្នាំលើសពី ៤,០០0លាន ៛ ឬ បុគ្គលិកចាប់ពី ១០០នាក់ឡើងទៅ",
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

    let tier = null;
    if (byRev && byEmp && byRev.id === byEmp.id) {
      tier = byRev;
    } else if (byRev || byEmp) {
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
        <div style={S.cardTitle}>កម្រិតកំណត់ប្រភេទអ្នកជាប់ពន្ធ — ប្រព័ន្ធស្វ័យប្រកាស</div>
        <table style={S.tbl}>
          <thead>
            <tr>
              <th style={S.th}>ប្រភេទអ្នកបង់ពន្ធ</th>
              <th style={S.th}>ចំណូលប្រចាំឆ្នាំ (រៀល)</th>
              <th style={S.th}>ចំនួនបុគ្គលិក</th>
              <th style={S.th}>កាតព្វកិច្ចគណនេយ្យ</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map(t => (
              <tr key={t.id}>
                <td style={{ ...S.td, fontWeight: 700, color: t.color }}>{t.label}</td>
                <td style={S.td}>{t.id === "large" ? "លើសពី ៤,០០0 លាន" : `${(t.revMin/1000000).toFixed(0)}លាន ដល់ ${(t.revMax/1000000).toFixed(0)}លាន`}</td>
                <td style={S.td}>{t.id === "large" ? "លើសពី ១០០ នាក់" : `${t.empMin} ដល់ ${t.empMax} នាក់`}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#6b7280" }}>{t.accounting}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ height: 20 }} />
        <div style={S.cardTitle}>បញ្ចូលទិន្នន័យសហគ្រាស</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ទឹកប្រាក់ចំណូលសរុបប្រចាំឆ្នាំ (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 500000000" value={revenue} onChange={e => setRevenue(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនបុគ្គលិកបម្រើការងារសរុប (នាក់)</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 25" value={employees} onChange={e => setEmployees(e.target.value)} />
          </div>
        </div>
      </div>

      <button style={S.btn} onClick={classify}>ពិនិត្យប្រភេទអ្នកជាប់ពន្ធ</button>

      {result && (
        <div style={S.card}>
          <div style={S.cardTitle}>លទ្ធផលនៃការចាត់ថ្នាក់សហគ្រាស</div>
          {result.tier ? (
            <>
              <div style={{
                background: result.tier.bg, border: `2px solid ${result.tier.color}`,
                borderRadius: 10, padding: 20, textAlign: "center", marginBottom: 16,
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: result.tier.color, marginBottom: 4, fontFamily: FONT_SET }}>
                  សហគ្រាសរបស់អ្នកស្ថិតក្នុង៖ {result.tier.label}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{result.tier.note}</div>
              </div>
              <div style={S.dedRow}><span>ទិន្នន័យចំណូលដែលបានបញ្ចូល</span><span style={S.dedVal}>{formatCurrency(result.rev)}</span></div>
              <div style={S.dedRow}><span>ចំនួនបុគ្គលិកដែលបានបញ្ចូល</span><span style={S.dedVal}>{result.emp} នាក់</span></div>
              <div style={S.note}>កាតព្វកិច្ចច្បាប់៖ <strong>{result.tier.accounting}</strong></div>
            </>
          ) : (
            <div style={S.noteWarn}>
              ⚠ មិនអាចកំណត់ប្រភេទបានទេ សូមពិនិត្យមើលទិន្នន័យដែលបានបញ្ចូលឡើងវិញឱ្យបានត្រឹមត្រូវ។
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// កម្មវិធីចម្បង (Main Component)
// ══════════════════════════════════════════════════════════════
export default function CambodiaTaxCalc({ setPage }) {
  const [tab, setTab] = useState("penalty");

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        
        {/* បានកែសម្រួលត្រង់ S.backBar (ដែលមិនមានប្រកាស) មក S.backBtn វិញដើម្បីការពារកុំឱ្យ Error */}
        <div style={S.topBar}>
          <button style={S.backBtn} onClick={() => setPage("home")}>
            <span>⬅</span> ត្រឡប់ទៅទំព័រដើម
          </button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>ប្រព័ន្ធគណនាពន្ធដារទូទៅនៃកម្ពុជា</div>
          <div style={S.hSub}>កម្មវិធីគណនាប្រាក់ពិន័យ ពន្ធប៉ាតង់ និងប្រភេទអ្នកជាប់ពន្ធស្វ័យប្រកាស</div>
        </div>

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