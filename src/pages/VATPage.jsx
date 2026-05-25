import { useState } from "react";

function fmt(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}

export default function VATPage({ setPage }) {
  const [vatType, setVatType] = useState("standard");
  const [sales, setSales] = useState("");
  const [purchases, setPurchases] = useState("");
  const [result, setResult] = useState(null);

  function calculateVAT() {
    const saleAmount = parseFloat(sales) || 0;
    const purchaseAmount = parseFloat(purchases) || 0;
    const rate = vatType === "export" ? 0 : 0.10;

    const outputVAT = saleAmount * rate;
    const inputVAT = purchaseAmount * 0.10;
    const vatPayable = outputVAT - inputVAT;

    const totalVAT =
      outputVAT + inputVAT > 0
        ? (outputVAT / (outputVAT + inputVAT)) * 100
        : 0;

    setResult({
      saleAmount,
      purchaseAmount,
      outputVAT,
      inputVAT,
      vatPayable,
      totalVAT,
      rate,
    });
  }
const FONT_SET = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Battambong', 'Inter', sans-serif";

 const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
    padding: "32px 20px", 
    fontFamily: "'Khmer OS Battambang', 'Inter', sans-serif",
    
  },

  wrap: {
    width: "100%",
    maxWidth: 1200, 
    margin: "0 auto",
    padding: "0 16px",
  },

  backBtn: {
    marginBottom: 24,
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    background: "#FFFFFF",
    color: "#475569",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    transition: ".2s",
    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
  },

  /* ===== HEADER (FIXED + SOFT BLUE) ===== */
  header: {
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    borderRadius: 24,
    padding: "28px 32px",
    marginBottom: 24,
    border: "1px solid #BFDBFE",
    boxShadow: "0 6px 20px rgba(59,130,246,.10)",
  },

  h1: {
    fontSize: 28,   // 🔥 bigger header text
    fontWeight: 800,
    marginBottom: 8,
    lineHeight: 1.3,
    color: "#FFFFFF",
    fontFamily: "'Khmer OS Battambang', 'Inter', sans-serif",
  },

  hSub: {
    fontSize: 15,
    fontWeight: 500,
    color: "#FFFFFF",
    lineHeight: 1.6,
    fontFamily: "'Khmer OS Battambang', 'Inter', sans-serif",
  },

  infoBox: {
    background: "#FFFFFF",
    border: "1px solid #DBEAFE",
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    lineHeight: 1.8,
    boxShadow: "0 4px 15px rgba(0,0,0,.04)",
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    border: "1px solid #E2E8F0",
    boxShadow: "0 6px 20px rgba(15,23,42,.06)",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1D4ED8",
    letterSpacing: "0.5px",
    marginBottom: 16,
  },

  statusCard: {
    textAlign: "center",
    padding: "40px 28px",
    borderRadius: 24,
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    boxShadow: "0 6px 20px rgba(15,23,42,.06)",
    marginBottom: 24,
  },

  statusLabel: {
    fontSize: 18,
    color: "#8E9AA8",
    fontWeight: 500,
    marginBottom: 12,
    display: "block",
  },

  statusTextRed: {
    fontSize: 44,
    fontWeight: 800,
    color: "#E52E2E",
  },

  statusTextGold: {
    fontSize: 44,
    fontWeight: 800,
    color: "#D97706",
  },

  tabRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 24,
  },

  tab: {
    padding: "12px 22px",
    borderRadius: 999,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    color: "#64748B",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  },

  tabOn: {
    padding: "12px 22px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg,#60A5FA,#3B82F6)",
    color: "#FFFFFF",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
    boxShadow: "0 6px 18px rgba(37,99,235,.25)",
  },

  row2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
    boxSizing: "border-box",
    padding: "14px 16px",
    border: "1px solid #CBD5E1",
    borderRadius: 14,
    fontSize: 15,
    background: "#FFFFFF",
    outline: "none",
  },

  btn: {
    width: "100%",
    padding: "16px",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#60A5FA,#3B82F6)",
    color: "#FFFFFF",
    boxShadow: "0 10px 25px rgba(37,99,235,.20)",
    marginBottom: 24,
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
    marginBottom: 24,
  },

  metric: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    textAlign: "center",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
  },

  mLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 8,
  },

  mValBlue: {
    fontSize: 26,
    fontWeight: 800,
    color: "#2563EB",
  },

  mValGreen: {
    fontSize: 26,
    fontWeight: 800,
    color: "#16A34A",
  },

  mValRed: {
    fontSize: 26,
    fontWeight: 800,
    color: "#DC2626",
  },

  mValGold: {
    fontSize: 26,
    fontWeight: 800,
    color: "#D97706",
  },

  barTrack: {
    height: 14,
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    display: "flex",
    marginBottom: 12,
    marginTop: 10,
  },

  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 14,
    padding: 16,
    color: "#1E40AF",
    marginTop: 16,
    lineHeight: 1.7,
  },

  dedRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F1F5F9",
    fontSize: 14,
  },

  dedRowTotalPayable: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 14,
    background: "#FEF2F2",
    border: "1px solid #FEE2E2",
    color: "#991B1B",
    marginTop: 14,
    fontWeight: 700,
  },

  dedRowTotalCredit: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 14,
    background: "#F0FDF4",
    border: "1px solid #DCFCE7",
    color: "#166534",
    marginTop: 14,
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
        
        {/* BACK TO DASHBOARD HOME */}
        <button onClick={() => setPage("home")} style={S.backBtn}>
          ← ត្រឡប់ទៅទំព័រដើម
        </button>

        {/* TOP COMPONENT HEADER */}
        <div style={S.header}>
          <h1 style={S.h1}>អាករលើតម្លៃបន្ថែម (អតប - VAT)</h1>
          <p style={S.hSub}>
            គណនាប្រាក់អាករលើធាតុចេញ ធាតុចូល និងស្ថានភាពតុល្យភាពពន្ធដារលម្អិតរបស់សហគ្រាស
          </p>
        </div>

        {/* EXPLANATORY CARD */}
        <div style={S.infoBox}>
          <strong>ច្បាប់ និងបទប្បញ្ញត្តិស្ដីពី អតប (VAT)៖</strong><br />
          • ការផ្គត់ផ្គង់ស្តង់ដារក្នុងស្រុក៖ អត្រាអាករគឺ <strong>10%</strong><br />
          • ការផ្គត់ផ្គង់នាំចេញទៅក្រៅប្រទេស៖ អត្រាអាករគឺ <strong>0%</strong><br />
          • រូបមន្តតុល្យភាព៖ <code>អាករត្រូវបង់ = អាករលើធាតុចេញ (Output) - អាករលើធាតុចូល (Input)</code>
        </div>

        {/* INTERACTIVE INPUT CONTROL COMPONENT */}
        <div style={S.card}>
          <div style={S.cardTitle}>បញ្ចូលទិន្នន័យប្រតិបត្តិការអាជីវកម្ម</div>
          
          <div style={S.tabRow}>
            <button
              style={vatType === "standard" ? S.tabOn : S.tab}
              onClick={() => { setVatType("standard"); setResult(null); }}
            >
              ការផ្គត់ផ្គង់ក្នុងស្រុក (Standard 10%)
            </button>
            <button
              style={vatType === "export" ? S.tabOn : S.tab}
              onClick={() => { setVatType("export"); setResult(null); }}
            >
              ការផ្គត់ផ្គង់នាំចេញ (Export 0%)
            </button>
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>មូលដ្ឋានទឹកប្រាក់ផ្នែកលក់ / ធាតុចេញ (Sales Revenue)</label>
              <input
                style={S.input}
                type="number"
                value={sales}
                onChange={(e) => { setSales(e.target.value); setResult(null); }}
                placeholder="ឧទាហរណ៍៖ 5000000"
              />
            </div>
            <div style={S.field}>
              <label style={S.label}>មូលដ្ឋានទឹកប្រាក់ផ្នែកទិញ / ធាតុចូល (Purchases Base)</label>
              <input
                style={S.input}
                type="number"
                value={purchases}
                onChange={(e) => { setPurchases(e.target.value); setResult(null); }}
                placeholder="ឧទាហរណ៍៖ 3000000"
              />
            </div>
          </div>
        </div>

        {/* CALCULATE CTB TRIGGER */}
        <button style={S.btn} onClick={calculateVAT}>
          គណនាប្រាក់អាករ VAT
        </button>

        {/* PROCESS AND PRESENT METRICS IF RESULT EXIST */}
        {result && (
          <>


            {/* QUICK METRICS ROW */}
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>អាករលើធាតុចេញ (Output VAT)</div>
                <div style={S.mValBlue}>{fmt(result.outputVAT)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>អាករលើធាតុចូល (Input VAT)</div>
                <div style={S.mValGreen}>{fmt(result.inputVAT)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ទឹកប្រាក់លទ្ធផលពន្ធដារ</div>
                {result.vatPayable >= 0 ? (
                  <div style={S.mValRed}>{fmt(result.vatPayable)}</div>
                ) : (
                  <div style={S.mValGold}>{fmt(Math.abs(result.vatPayable))}</div>
                )}
              </div>
            </div>

            {/* PROGRESS VISUAL RATIO DATA BAR CARD */}
            <div style={S.card}>
              <div style={S.cardTitle}>សមាមាត្រប្រៀបធៀបអាករលើធាតុចេញ</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#475569" }}>
                ទំងន់របស់ Output VAT ធៀបនឹងទំហំអាករសរុប
              </div>
              <div style={S.barTrack}>
                <div
                  style={{
                    width: result.totalVAT + "%",
                    background: "#2563EB",
                    height: "100%",
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600 }}>
                <span style={{ color: "#2563EB" }}>Output VAT (ធាតុចេញ)</span>
                <span style={{ color: "#334155" }}>{result.totalVAT.toFixed(1)}%</span>
              </div>
            </div>

            {/* ACCOUNTING COMPREHENSIVE BREAKDOWN CARD */}
            <div style={S.card}>
              <div style={S.cardTitle}>របាយការណ៍លម្អិតនៃការគណនា (VAT Calculation Breakdown)</div>
              
              <div style={S.dedRow}>
                <span>មូលដ្ឋានទឹកប្រាក់នៃការលក់ (Sales Revenue)</span>
                <span style={S.dedVal}>{fmt(result.saleAmount)}</span>
              </div>
              <div style={S.dedRow}>
                <span>អត្រាអាករលើធាតុចេញ (VAT Rate)</span>
                <span style={S.dedVal}>{(result.rate * 100).toFixed(0)}%</span>
              </div>
              <div style={S.dedRow}>
                <span>អាករលើធាតុចេញសរុប (Output VAT) [A]</span>
                <span style={{ color: "#2563EB", fontWeight: 700 }}>{fmt(result.outputVAT)}</span>
              </div>
              
              <div style={{ height: 12, borderBottom: "1px dashed #E2E8F0", marginBottom: 12 }} />

              <div style={S.dedRow}>
                <span>មូលដ្ឋានទឹកប្រាក់នៃការទិញ (Purchase Revenue)</span>
                <span style={S.dedVal}>{fmt(result.purchaseAmount)}</span>
              </div>
              <div style={S.dedRow}>
                <span>អត្រាអាករលើធាតុចូលទូទៅ</span>
                <span style={S.dedVal}>10%</span>
              </div>
              <div style={S.dedRow}>
                <span>អាករលើធាតុចូលដែលអាចកាត់កងបាន (Input VAT) [B]</span>
                <span style={{ color: "#16A34A", fontWeight: 700 }}>-{fmt(result.inputVAT)}</span>
              </div>

              {result.vatPayable >= 0 ? (
                <div style={S.dedRowTotalPayable}>
                  <span>ប្រាក់អាករ អតប ត្រូវបង់ជូនរដ្ឋសរុប (VAT Payable) [A - B]</span>
                  <span>{fmt(result.vatPayable)}</span>
                </div>
              ) : (
                <div style={S.dedRowTotalCredit}>
                  <span>ឥណទានអាករ អតប ត្រូវយោងទៅមុខខែក្រោយ (Tax Credit Forward) [B - A]</span>
                  <span>{fmt(Math.abs(result.vatPayable))}</span>
                </div>
              )}

              {/* TECHNICAL FORMULA CALCULATION NOTES */}
              <div style={S.note}>
                <strong>កំណត់សម្គាល់រូបមន្ត៖</strong><br />
                • Output VAT = {fmt(result.saleAmount)} × {(result.rate * 100).toFixed(0)}% = {fmt(result.outputVAT)}<br />
                • Input VAT = {fmt(result.purchaseAmount)} × 10% = {fmt(result.inputVAT)}<br />
                • តុល្យភាព = {fmt(result.outputVAT)} - {fmt(result.inputVAT)} = {fmt(result.vatPayable)}
                <br /><br />
                {result.vatPayable >= 0 ? (
                  <span>សហគ្រាសមានកាតព្វកិច្ចដាក់លិខិតប្រកាស និងបង់ប្រាក់ពន្ធចំនួន <strong>{fmt(result.vatPayable)}</strong> នេះយ៉ាងយឺតបំផុតត្រឹមថ្ងៃទី២០ នៃខែបន្ទាប់។</span>
                ) : (
                  <span>សហគ្រាសមិនមានប្រាក់ពន្ធត្រូវបង់បន្ថែមក្នុងខែនេះទេ ហើយអាចរក្សាទុកឥណទានចំនួន <strong>{fmt(Math.abs(result.vatPayable))}</strong> ទៅកាត់កងក្នុងខែបន្តបន្ទាប់ទៀតបាន។</span>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}