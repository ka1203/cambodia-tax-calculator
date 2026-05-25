import { useState } from "react";

// ─── មុខងារជំនួយ ─────────────────────────────────────────────────────────────
function fmt(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}

const TAX_TYPES = [
  { id: "service",        kh: "សេវាកម្ម / សួយសារ / ការប្រាក់ (15%)", rate: 0.15 },
  { id: "rental",         kh: "ជួលអចលន/ចលនទ្រព្យ (10%)",            rate: 0.10 },
  { id: "salary_cc",      kh: "ថ្លៃឈ្នួល រវាង ស.ប.ក (10%)",          rate: 0.10 },
  { id: "bank_fixed",     kh: "ការប្រាក់ធនាគារ (កាលកំណត់ - 6%)",    rate: 0.06 },
  { id: "bank_nonfixed",  kh: "ការប្រាក់ធនាគារ (គ្មានកាលកំណត់ - 4%)", rate: 0.04 },
  { id: "nonresident",    kh: "អនិវាសនជន (14%)",                    rate: 0.14 },
];

// ─── រចនាបទ (Styles) ────────────────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "#F8FAFC", padding: "32px 20px", fontFamily: "'Khmer OS Battambang', sans-serif" },
  wrap: { width: "100%", maxWidth: 900, margin: "0 auto" },
  backBtn: { marginBottom: 24, padding: "12px 18px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#475569", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, transition: ".2s", boxShadow: "0 2px 8px rgba(0,0,0,.04)" },
  header: { background: "linear-gradient(135deg,#F0F9FF 0%,#DBEAFE 50%,#BFDBFE 100%)", color: "#1E3A8A", borderRadius: 24, padding: "28px 32px", marginBottom: 24, border: "1px solid #BFDBFE", boxShadow: "0 6px 20px rgba(59,130,246,.10)" },
  h1: { fontSize: 28, fontWeight: 800, marginBottom: 8, color: "#1D4ED8" },
  card: { background: "#FFFFFF", borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #E2E8F0", boxShadow: "0 6px 20px rgba(15,23,42,.06)" },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#1D4ED8", letterSpacing: "0.5px", marginBottom: 16 },
  tabRow: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 },
  tab: { padding: "12px 22px", borderRadius: 999, border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#64748B", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  tabOn: { padding: "12px 22px", borderRadius: 999, border: "none", background: "linear-gradient(135deg,#60A5FA,#3B82F6)", color: "#FFFFFF", fontWeight: 700, cursor: "pointer", fontSize: 14, boxShadow: "0 6px 18px rgba(37,99,235,.25)" },
  input: { width: "100%", boxSizing: "border-box", padding: "14px 16px", border: "1px solid #CBD5E1", borderRadius: 14, fontSize: 15, marginBottom: 20 },
  btn: { width: "100%", padding: "16px", fontSize: 16, fontWeight: 700, borderRadius: 16, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#60A5FA,#3B82F6)", color: "#FFFFFF", boxShadow: "0 10px 25px rgba(37,99,235,.20)" },
  metric: { background: "#F8FAFC", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0" },
  mLabel: { fontSize: 13, color: "#64748B", marginBottom: 8 },
  dedRow: { display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #F1F5F9", fontSize: 15 }
};

export default function TaxCalculator({ setPage }) {
  const [amount, setAmount] = useState("");
  const [typeId, setTypeId] = useState("service");
  const [result, setResult] = useState(null);

  const rule = TAX_TYPES.find(r => r.id === typeId);

  function calculate() {
    const amt = parseFloat(amount) || 0;
    const tax = amt * rule.rate;
    setResult({ gross: amt, tax, net: amt - tax, rate: rule.rate });
  }

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        
        {/* ប៊ូតុងត្រឡប់ទៅទំព័រដើម */}
        <button onClick={() => setPage("home")} style={S.backBtn}>
          ← ត្រឡប់ទៅទំព័រដើម
        </button>

        <div style={S.header}>
          <h1 style={S.h1}>កម្មវិធីគណនាពន្ធកាត់ទុក (WHT)</h1>
          <p>គណនាទឹកប្រាក់កាត់ទុក និងទឹកប្រាក់ទូទាត់សុទ្ធយ៉ាងរហ័ស</p>
        </div>

        <div style={S.card}>
          <div style={S.cardTitle}>១. ជ្រើសរើសប្រភេទពន្ធ</div>
          <div style={S.tabRow}>
            {TAX_TYPES.map(r => (
              <button key={r.id} style={typeId === r.id ? S.tabOn : S.tab} onClick={() => { setTypeId(r.id); setResult(null); }}>{r.kh}</button>
            ))}
          </div>
          <div style={S.cardTitle}>២. បញ្ចូលទឹកប្រាក់ដើម</div>
          <input style={S.input} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="ឧទាហរណ៍៖ 1000000" />
          <button style={S.btn} onClick={calculate}>គណនាពន្ធកាត់ទុក</button>
        </div>

        {result && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginBottom: 24 }}>
              <div style={S.metric}>
                <div style={S.mLabel}>ទឹកប្រាក់សរុប</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1D4ED8" }}>{fmt(result.gross)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ពន្ធកាត់ទុក (WHT)</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#DC2626" }}>{fmt(result.tax)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>ទឹកប្រាក់ទូទាត់</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#059669" }}>{fmt(result.net)}</div>
              </div>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>ព័ត៌មានលម្អិតនៃការគណនា</div>
              <div style={S.dedRow}><span>ប្រភេទពន្ធ:</span> <strong>{rule.kh}</strong></div>
              <div style={S.dedRow}><span>អត្រាពន្ធ:</span> <strong>{(result.rate * 100).toFixed(0)}%</strong></div>
              <div style={S.dedRow}><span>ទឹកប្រាក់ពន្ធត្រូវកាត់កង:</span> <strong style={{ color: "#DC2626" }}>{fmt(result.tax)}</strong></div>
            </div>

            <div style={{ marginTop: 16, padding: 16, background: "#EFF6FF", borderRadius: 12, fontSize: 14, color: "#1E40AF" }}>
                <strong>កំណត់សម្គាល់៖</strong> សហគ្រាសមានកាតព្វកិច្ចកាត់ទុកប្រាក់ពន្ធនេះ ដើម្បីបង់ជូនរដ្ឋបាលសារពើពន្ធ។
              </div>
          </>
        )}
      </div>
    </div>
  );
}