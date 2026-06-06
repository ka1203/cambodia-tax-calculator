import { useState } from "react";

function fmt(n) {
  return Math.round(Math.abs(n)).toLocaleString("en-US") + " ៛";
}
function fmtUSD(n) {
  return "$ " + Math.abs(n).toFixed(2);
}

const FONT_SET = "'Khmer OS Siemreap', 'Khmer OS Battambang', 'Khmer OS Battambong', 'Battambang', Inter, sans-serif";

const RATES_REF = [
  { type: "សេវាកម្ម / Services",           recipient: "និវាសនជន",     rate: "15%", rateColor: "#1E40AF", rateBg: "#DBEAFE", condition: "ទូទៅ" },
  { type: "សួយសារ / Royalties",             recipient: "និវាសនជន",     rate: "15%", rateColor: "#1E40AF", rateBg: "#DBEAFE", condition: "ថ្លៃ IP, អាជ្ញាប័ណ្ណ" },
  { type: "ការប្រាក់ → Fixed/Term",          recipient: "និវាសនជន",     rate: "6%",  rateColor: "#854D0E", rateBg: "#FEF9C3", condition: "Term/Fixed Deposit" },
  { type: "ការប្រាក់ → Current",             recipient: "និវាសនជន",     rate: "4%",  rateColor: "#991B1B", rateBg: "#FEE2E2", condition: "Demand/Current Account" },
  { type: "ថ្លៃជួល / Rent",                 recipient: "និវាសនជន",     rate: "10%", rateColor: "#166534", rateBg: "#DCFCE7", condition: "អចលន/ចលនទ្រព្យ" },
  { type: "ស.ស. ការប្រាក់ / សួយសារ",        recipient: "ស.ស. → ស.ស.",   rate: "15%", rateColor: "#1E40AF", rateBg: "#DBEAFE", condition: "Self-assessed entities" },
  { type: "ស.ស. ថ្លៃជួល",                  recipient: "ស.ស. → ស.ស.",   rate: "10%", rateColor: "#166534", rateBg: "#DCFCE7", condition: "Self-assessed entities" },
  { type: "ចំណូលប្រភពកម្ពុជា (NR)",         recipient: "អនិវាសនជន",    rate: "14%", rateColor: "#6D28D9", rateBg: "#EDE9FE", condition: "សេវាកម្ម, ភាគលាភ, ការប្រាក់, សួយសារ" },
  { type: "Insurance reinsurance",          recipient: "អនិវាសនជន",    rate: "14%", rateColor: "#6D28D9", rateBg: "#EDE9FE", condition: "ហានិភ័យក្នុងកម្ពុជា" },
  { type: "អង្គការសាសនា / សប្បុរស",         recipient: "ណាមួយ",        rate: "0%",  rateColor: "#475569", rateBg: "#F1F5F9", condition: "Non-profit registered" },
  { type: "ទូទាត់ → ធនាគារ (ស.ស.)",         recipient: "ធនាគារ",        rate: "0%",  rateColor: "#475569", rateBg: "#F1F5F9", condition: "ច្បាប់ជំនួស" },
];

export default function WithholdingTaxPage({ setPage }) {
  const [tab, setTab] = useState("services");

  // services
  const [sAmount, setSAmount] = useState("");
  const [sCcy,    setSCcy]    = useState("KHR");
  const [sRecip,  setSRecip]  = useState("resident");

  // rent
  const [rAmount, setRAmount] = useState("");
  const [rMonths, setRMonths] = useState("1");
  const [rType,   setRType]   = useState("private");

  // interest
  const [iAmount, setIAmount] = useState("");
  const [iType,   setIType]   = useState("0.06");

  // nonresident
  const [nrAmount, setNrAmount] = useState("");
  const [nrType,   setNrType]   = useState("0.14");

  const [result, setResult] = useState(null);

  function switchTab(t) {
    setTab(t);
    setResult(null);
  }

  function calculate() {
    let amount = 0, tax = 0, net = 0, rate = 0;
    let exempt = false, ccy = "KHR";
    let label = "", noteLines = [], breakRows = [];

    if (tab === "services") {
      amount = parseFloat(sAmount) || 0;
      ccy    = sCcy;
      if (sRecip === "selfassess") {
        exempt = true; rate = 0; tax = 0; net = amount;
        label  = "សេវាកម្ម ស.ស. — លើកលែងពន្ធ";
        noteLines = [
          "សេវាកម្មដែលមានវិក្កយបត្រ អតប ស្ថានភាព ស.ស. (Self-assessed) លើកលែងពន្ធកាត់ទុក",
          "យោងតាម មាត្រា ៧.ក ប្រកាស ១០៥៩ ក.ស.ហ.វ — ក្នុងករណីទូទាត់ ស.ស. → ស.ស. សេវាកម្មមិនជាប់ WHT ទេ",
        ];
      } else {
        rate = 0.15; tax = amount * rate; net = amount - tax;
        label = "សេវាកម្ម / Services";
        noteLines = [
          `រូបមន្ត: ${fmtAmt(amount, ccy)} × 15% = ${fmtAmt(tax, ccy)}`,
          `ប្រាក់ទទួលបានសុទ្ធ = ${fmtAmt(amount, ccy)} − ${fmtAmt(tax, ccy)} = ${fmtAmt(net, ccy)}`,
          "យោងតាម ប្រកាស ១០៥៩ ក.ស.ហ.វ (ខែធ្នូ ២០០៣)",
        ];
      }
      breakRows = [
        ["ទឹកប្រាក់ទូទាត់សរុប",          "—",   fmtAmt(amount, ccy)],
        ["ពន្ធកាត់ទុក (WHT)",              "15%", exempt ? "លើកលែង" : fmtAmt(tax, ccy)],
        ["ប្រាក់ទទួលបាន (អ្នកទទួល)",     exempt ? "100%" : "85%", fmtAmt(net, ccy)],
      ];
    }

    if (tab === "rent") {
      const base = parseFloat(rAmount) || 0;
      const months = parseInt(rMonths) || 1;
      amount = base * months; ccy = "KHR";
      if (rType !== "private") {
        exempt = true; rate = 0; tax = 0; net = amount;
        label = "ថ្លៃជួល (លើកលែង)";
        noteLines = [
          rType === "gov"
            ? "ការជួលពីរដ្ឋ ឬ ស្ថាប័នរដ្ឋ ដែលបញ្ជាក់ដោយ MoEF លើកលែងពន្ធ WHT"
            : "ក្រុមហ៊ុន Finance Lease ដែលមានអាជ្ញាប័ណ្ណ (ច្បាប់) លើកលែងពន្ធ WHT",
        ];
      } else {
        rate = 0.10; tax = amount * rate; net = amount - tax;
        label = "ថ្លៃជួល / Rent";
        noteLines = [
          `ថ្លៃខែ: ${fmt(base)} × ${months} ខែ = ${fmt(amount)}`,
          `រូបមន្ត WHT: ${fmt(amount)} × 10% = ${fmt(tax)}`,
          `ប្រាក់ទទួលបាន: ${fmt(amount)} − ${fmt(tax)} = ${fmt(net)}`,
          "យោងតាម ប្រកាស ១៨២០ ក.ស.ហ.វ (ខែធ្នូ ២០១៥)",
        ];
      }
      breakRows = [
        [`ថ្លៃជួល (${months} ខែ × ${fmt(base)})`, `${months} ខែ`, fmt(amount)],
        ["ពន្ធកាត់ទុក (WHT)",                        "10%",          exempt ? "លើកលែង" : fmt(tax)],
        ["ប្រាក់ទទួលបាន (អ្នកជួល)",                exempt ? "100%" : "90%", fmt(net)],
      ];
    }

    if (tab === "interest") {
      amount = parseFloat(iAmount) || 0; ccy = "KHR";
      rate   = parseFloat(iType) || 0.06;
      tax    = amount * rate; net = amount - tax;
      const rPct = Math.round(rate * 100);
      label = `ការប្រាក់ (${rPct}%)`;
      noteLines = [
        `រូបមន្ត: ${fmt(amount)} × ${rPct}% = ${fmt(tax)}`,
        `ការប្រាក់ទទួលបានសុទ្ធ: ${fmt(amount)} − ${fmt(tax)} = ${fmt(net)}`,
        rPct === 6
          ? "គណនីមានកាលកំណត់ (Fixed/Term Deposit) — ប្រកាស ១០៥៩"
          : rPct === 4
          ? "គណនីឥតកាលកំណត់ (Current/Demand) — ប្រកាស ១០៥៩"
          : "ការប្រាក់ ស.ស. (Self-assessed) — 15% ប្រកាស ១០៥៩",
      ];
      breakRows = [
        ["ការប្រាក់សរុប",               "—",       fmt(amount)],
        ["ពន្ធកាត់ទុក (WHT)",            `${rPct}%`, fmt(tax)],
        ["ការប្រាក់ទទួលបាន",            `${100 - rPct}%`, fmt(net)],
      ];
    }

    if (tab === "nonresident") {
      amount = parseFloat(nrAmount) || 0; ccy = "KHR";
      rate   = parseFloat(nrType) || 0.14;
      tax    = amount * rate; net = amount - tax;
      label  = "អនិវាសនជន (14%)";
      noteLines = [
        `រូបមន្ត (ចំណូលប្រភពកម្ពុជា): ${fmt(amount)} × 14% = ${fmt(tax)}`,
        "យោងតាម មាត្រា ៣៣ ច្បាប់ស្តីពីសារពើពន្ធ — ចំណូលដែលបង់ទៅអនិវាសនជន ជាប់ 14% WHT",
        "ប្រកាស ១០៥៩ ក.ស.ហ.វ — ក្រុមហ៊ុនអ្នកជួល ឬ ក្រុមហ៊ុន ស.ស. ត្រូវកាត់ទុក និងបង់ MGD",
      ];
      breakRows = [
        ["ចំណូលប្រភពកម្ពុជា",          "—",   fmt(amount)],
        ["ពន្ធកាត់ទុក (WHT)",            "14%", fmt(tax)],
        ["ប្រាក់ទទួលបាន (អនិវាសនជន)", "86%", fmt(net)],
      ];
    }

    if (amount <= 0) { alert("សូមបញ្ចូលទឹកប្រាក់!"); return; }

    const taxPct = exempt || amount === 0 ? 0 : Math.min((tax / amount) * 100, 100);
    setResult({ amount, tax, net, rate, exempt, ccy, label, noteLines, breakRows, taxPct });
  }

  function fmtAmt(n, ccy) {
    return ccy === "USD" ? fmtUSD(n) : fmt(n);
  }

  // ─── STYLES (identical pattern to SalaryTaxPage / VATPage) ───────────────
  const S = {
    page: { minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", padding: "24px 16px", fontFamily: FONT_SET },
    wrap: { width: "100%", maxWidth: 1200, margin: "0 auto" },
    backBtn: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, color: "#334155", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,.04)", fontFamily: FONT_SET, marginBottom: 16 },
    header: { background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", borderRadius: 20, padding: "24px 30px", marginBottom: 24, boxShadow: "0 10px 25px rgba(37,99,235,.1)" },
    h1: { fontSize: 24, lineHeight: 1.35, fontWeight: 800, marginBottom: 8, fontFamily: FONT_SET },
    hSub: { fontSize: 14, lineHeight: 1.7, opacity: 0.9, fontFamily: FONT_SET },
    card: { background: "#FFFFFF", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,.04)" },
    cardTitle: { fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 16, lineHeight: 1.5, fontFamily: FONT_SET },
    tabRow: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 },
    tab: { padding: "10px 18px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#64748B", cursor: "pointer", fontWeight: 600, fontSize: 13, transition: ".2s", fontFamily: FONT_SET },
    tabOn: { padding: "10px 18px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#FFFFFF", cursor: "pointer", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 12px rgba(37,99,235,.2)", fontFamily: FONT_SET },
    row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 },
    field: { marginBottom: 16 },
    label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT_SET },
    input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT_SET },
    select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT_SET },
    btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT_SET },
    metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
    metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
    mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT_SET },
    note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.7, fontSize: 13, fontFamily: FONT_SET },
    noteOk: { background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: 12, padding: 14, color: "#166534", lineHeight: 1.7, fontSize: 13, fontFamily: FONT_SET },
    barTrack: { height: 16, borderRadius: 999, overflow: "hidden", display: "flex", background: "#E2E8F0" },
    barLabels: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 10, color: "#475569", fontSize: 13, flexWrap: "wrap", fontFamily: FONT_SET },
    tbl: { width: "100%", borderCollapse: "collapse" },
    th: { background: "#EFF6FF", color: "#1E40AF", padding: "11px 12px", textAlign: "left", fontWeight: 700, fontSize: 12, borderBottom: "1px solid #DBEAFE", fontFamily: FONT_SET },
    td: { padding: "11px 12px", fontSize: 12, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT_SET, color: "#334155" },
    sumPay: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT_SET },
    sumZero: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#F0FDF4", border: "1px solid #DCFCE7", color: "#166534", fontWeight: 700, fontSize: 14, fontFamily: FONT_SET },
    infoBox: { borderRadius: 12, padding: 14, lineHeight: 1.7, fontSize: 13, fontFamily: FONT_SET, marginBottom: 12 },
  };

  const TABS = [
    { key: "services",    label: "សេវាកម្ម / Services (15%)" },
    { key: "rent",        label: "ថ្លៃជួល / Rent (10%)" },
    { key: "interest",    label: "ការប្រាក់ (6% / 4%)" },
    { key: "nonresident", label: "អនិវាសនជន (14%)" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK */}
        <button onClick={() => setPage("home")} style={S.backBtn}>← ត្រឡប់ទៅទំព័រដើម</button>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>ពន្ធកាត់ទុក (Withholding Tax) — កម្មវិធីគណនា</div>
          <div style={S.hSub}>កម្ពុជា · ប្រកាស ១០៥៩/២០០៣ · ៥៩៩/២០០៩ · ១៨២០/២០១៥ · TAX-05</div>
        </div>

        {/* TABS + FORM */}
        <div style={S.card}>
          <div style={S.cardTitle}>ប្រភេទប្រតិបត្តិការ</div>
          <div style={S.tabRow}>
            {TABS.map(t => (
              <button key={t.key} style={tab === t.key ? S.tabOn : S.tab} onClick={() => switchTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── SERVICES ── */}
          {tab === "services" && (
            <>
              <div style={{ ...S.infoBox, background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E40AF" }}>
                <strong>អត្រា 15%</strong> អនុវត្តលើ:<br />
                ✓ សេវាកម្ម (Services) — ការគ្រប់គ្រង, ប្រឹក្សាយោបល់, IT, ជួសជុល<br />
                ✓ សួយសារ (Royalties) — ថ្លៃអាជ្ញាប័ណ្ណ, កម្មសិទ្ធិបញ្ញា<br />
                ✓ ការប្រាក់ (ក្រៅធនាគារ) — ស.ស. ស្វ័យប្រកាស ១៥%<br />
                ✗ លើកលែង: សេវាកម្ម ស.ស. → ស.ស. ដែលមានវិក្កយបត្រ អតប ត្រឹមត្រូវ
              </div>
              <div style={S.cardTitle}>ទិន្នន័យប្រតិបត្តិការ</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ទឹកប្រាក់ទូទាត់</label>
                  <input style={S.input} type="number" placeholder="ឧ. 2000000" value={sAmount} onChange={e => setSAmount(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>រូបិយប័ណ្ណ</label>
                  <select style={S.select} value={sCcy} onChange={e => setSCcy(e.target.value)}>
                    <option value="KHR">រៀល (KHR)</option>
                    <option value="USD">ដុល្លារ (USD)</option>
                  </select>
                </div>
              </div>
              <div style={S.field}>
                <label style={S.label}>ប្រភេទអ្នកទទួល</label>
                <select style={S.select} value={sRecip} onChange={e => setSRecip(e.target.value)}>
                  <option value="resident">និវាសនជន — WHT 15%</option>
                  <option value="selfassess">ស.ស. ស្វ័យប្រកាស (មានវិក្កយបត្រ អតប) — លើកលែង</option>
                </select>
              </div>
            </>
          )}

          {/* ── RENT ── */}
          {tab === "rent" && (
            <>
              <div style={{ ...S.infoBox, background: "#F0FDF4", border: "1px solid #DCFCE7", color: "#166534" }}>
                <strong>អត្រា 10%</strong> អនុវត្តលើ:<br />
                ✓ ថ្លៃជួល អចលនទ្រព្យ (ដី, អាគារ, ឃ្លាំង)<br />
                ✓ ថ្លៃជួល ចលនទ្រព្យ (ឡាន, យន្ត, ឧបករណ៍)<br />
                ✓ ស.ស. → ស.ស. WHT 10% (ការប្រាក់, សួយសារ ១៥%, ថ្លៃជួល ១០%)<br />
                ✗ លើកលែង: ជួលពីរដ្ឋ ឬ ក្រុមហ៊ុន Finance Lease ដែលមានអាជ្ញាប័ណ្ណ
              </div>
              <div style={S.cardTitle}>ទិន្នន័យប្រតិបត្តិការ</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ថ្លៃជួល (រៀល/ខែ)</label>
                  <input style={S.input} type="number" placeholder="ឧ. 1000000" value={rAmount} onChange={e => setRAmount(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ចំនួនខែ</label>
                  <input style={S.input} type="number" placeholder="1" min="1" value={rMonths} onChange={e => setRMonths(e.target.value)} />
                </div>
              </div>
              <div style={S.field}>
                <label style={S.label}>ប្រភេទអ្នកជួល</label>
                <select style={S.select} value={rType} onChange={e => setRType(e.target.value)}>
                  <option value="private">រូបវន្តបុគ្គល / ក្រុមហ៊ុន — WHT 10%</option>
                  <option value="gov">រដ្ឋ / ស្ថាប័នរដ្ឋ (បញ្ជាក់ MoEF) — លើកលែង</option>
                  <option value="leasecompany">ក្រុមហ៊ុន Finance Lease (ច្បាប់) — លើកលែង</option>
                </select>
              </div>
            </>
          )}

          {/* ── INTEREST ── */}
          {tab === "interest" && (
            <>
              <div style={{ ...S.infoBox, background: "#FFFBEB", border: "1px solid #FDE68A", color: "#854D0E" }}>
                <strong>ការប្រាក់ពីធនាគារ → អ្នកជាប់ពន្ធ:</strong><br />
                ✓ <strong>6%</strong> — Fixed/Term Deposit (គណនីមានកាលកំណត់)<br />
                ✓ <strong>4%</strong> — Current/Demand Account (គណនីឥតកាលកំណត់)<br />
                ✓ <strong>15%</strong> — ការប្រាក់ ស.ស. ស្វ័យប្រកាស (Self-assessed)<br />
                ✗ លើកលែង: ការប្រាក់ ស.ស. → ស.ស. ដែលជាប់ WHT 15% ខាងលើ
              </div>
              <div style={S.cardTitle}>ទិន្នន័យប្រតិបត្តិការ</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ចំនួនការប្រាក់ (រៀល)</label>
                  <input style={S.input} type="number" placeholder="ឧ. 500000" value={iAmount} onChange={e => setIAmount(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ប្រភេទគណនី</label>
                  <select style={S.select} value={iType} onChange={e => setIType(e.target.value)}>
                    <option value="0.06">Fixed / Term Deposit — 6%</option>
                    <option value="0.04">Current / Demand Account — 4%</option>
                    <option value="0.15">ការប្រាក់ ស.ស. (Self-assessed) — 15%</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── NON-RESIDENT ── */}
          {tab === "nonresident" && (
            <>
              <div style={{ ...S.infoBox, background: "#F5F3FF", border: "1px solid #DDD6FE", color: "#5B21B6" }}>
                <strong>អត្រា 14%</strong> — ចំណូលប្រភពកម្ពុជា (Cambodian-source income) ទៅ<strong>អនិវាសនជន</strong>:<br />
                ✓ ចំណូលពីសេវាកម្ម ដែលផ្តល់ក្នុងកម្ពុជា<br />
                ✓ ភាគលាភ (Dividends) ពីក្រុមហ៊ុន និវាសនជន<br />
                ✓ ការប្រាក់ / សួយសារ / Royalties<br />
                ✓ Insurance reinsurance premium (ហានិភ័យក្នុងកម្ពុជា)<br />
                ✓ ចំណូលពីអចលនទ្រព្យ / ចំណូលរកបានក្នុងកម្ពុជា<br />
                → យោង: មាត្រា ៣៣ ច.ស.ព. | ប្រកាស ១០៥៩
              </div>
              <div style={S.cardTitle}>ទិន្នន័យប្រតិបត្តិការ</div>
              <div style={S.row2}>
                <div style={S.field}>
                  <label style={S.label}>ទឹកប្រាក់ទូទាត់ (រៀល)</label>
                  <input style={S.input} type="number" placeholder="ឧ. 5000000" value={nrAmount} onChange={e => setNrAmount(e.target.value)} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>ប្រភេទចំណូល</label>
                  <select style={S.select} value={nrType} onChange={e => setNrType(e.target.value)}>
                    <option value="0.14">សេវាកម្ម / ភាគលាភ / ការប្រាក់ / សួយសារ — 14%</option>
                    <option value="0.14">ចំណូលអចលនទ្រព្យ — 14%</option>
                    <option value="0.14">Insurance Reinsurance — 14%</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        <button style={S.btn} onClick={calculate}>គណនាពន្ធកាត់ទុក</button>

        {/* ── RESULTS ── */}
        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>
              {[
                { label: "មូលដ្ឋានគិតពន្ធ",         val: result.ccy === "USD" ? fmtUSD(result.amount) : fmt(result.amount), color: "#0B1F4E" },
                { label: "ពន្ធកាត់ទុក (WHT)",         val: result.exempt ? "—" : (result.ccy === "USD" ? fmtUSD(result.tax) : fmt(result.tax)), color: "#c0392b" },
                { label: "ប្រាក់ទទួលបានសុទ្ធ",        val: result.ccy === "USD" ? fmtUSD(result.net) : fmt(result.net), color: "#1a7a4a" },
                { label: "អត្រាពន្ធ (WHT Rate)",      val: result.exempt ? "0% (លើកលែង)" : `${Math.round(result.rate * 100)}%`, color: "#2563EB" },
              ].map((m, i) => (
                <div key={i} style={S.metric}>
                  <div style={S.mLabel}>{m.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: m.color }}>{m.val}</div>
                </div>
              ))}
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>ប្រៀបធៀបពន្ធ និងប្រាក់ទទួលបាន</div>
              <div style={S.barTrack}>
                <div style={{ width: result.taxPct.toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width .4s" }} />
                <div style={{ width: (100 - result.taxPct).toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width .4s" }} />
              </div>
              <div style={S.barLabels}>
                <span>ពន្ធ WHT: {result.taxPct.toFixed(1)}%</span>
                <span>ប្រាក់ទទួលបាន: {(100 - result.taxPct).toFixed(1)}%</span>
              </div>
            </div>

            {/* BREAKDOWN */}
            <div style={S.card}>
              <div style={S.cardTitle}>តារាងលម្អិតនៃការគណនា</div>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <th style={S.th}>បរិយាយ</th>
                    <th style={S.th}>អត្រា</th>
                    <th style={S.th}>ទឹកប្រាក់</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakRows.map((r, i) => (
                    <tr key={i}>
                      <td style={S.td}>{r[0]}</td>
                      <td style={S.td}>{r[1]}</td>
                      <td style={{ ...S.td, fontWeight: 700, color: "#2563EB" }}>{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {result.exempt ? (
                <div style={S.sumZero}>
                  <span>WHT = ០ (លើកលែងពន្ធ)</span>
                  <span>0 ៛</span>
                </div>
              ) : (
                <div style={S.sumPay}>
                  <span>ពន្ធ WHT ត្រូវកាត់ទុក និងបង់ → ក្រសួងសេដ្ឋកិច្ច</span>
                  <span>{result.ccy === "USD" ? fmtUSD(result.tax) : fmt(result.tax)}</span>
                </div>
              )}

              <div style={S.note}>
                {result.noteLines.map((l, i) => <div key={i}>{l}</div>)}
              </div>
            </div>
          </>
        )}

        {/* REFERENCE TABLE — always visible */}
        <div style={S.card}>
          <div style={S.cardTitle}>តារាងអត្រាពន្ធកាត់ទុករបស់កម្ពុជា (ឯកសារយោង TAX-05)</div>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.th}>ប្រភេទប្រតិបត្តិការ</th>
                <th style={S.th}>អ្នកទទួល</th>
                <th style={S.th}>អត្រា</th>
                <th style={S.th}>លក្ខខណ្ឌ</th>
              </tr>
            </thead>
            <tbody>
              {RATES_REF.map((r, i) => (
                <tr key={i}>
                  <td style={S.td}>{r.type}</td>
                  <td style={S.td}>{r.recipient}</td>
                  <td style={S.td}>
                    <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: r.rateBg, color: r.rateColor }}>
                      {r.rate}
                    </span>
                  </td>
                  <td style={S.td}>{r.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={S.note}>
            <strong>ច្បាប់យោង:</strong> ប្រកាស ១០៥៩ ក.ស.ហ.វ (ខែធ្នូ ២០០៣) · ប្រកាស ៥៩៩ (ខែកក្កដា ២០០៩) · ប្រកាស ១៨២០ (ខែធ្នូ ២០១៥) · ប្រកាស ១៧០៤ (ខែធ្នូ ២០១៥) · ប្រកាស ៥១៨ (ខែឧសភា ២០១៧)
          </div>
        </div>

      </div>
    </div>
  );
}