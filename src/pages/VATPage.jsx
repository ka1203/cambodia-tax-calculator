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

 const S = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
  },

  wrap: {
    maxWidth: 1100,
    margin: "0 auto",
  },

  header: {
    background:
      "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "white",
    borderRadius: 28,
    padding: "36px",
    marginBottom: 28,
    boxShadow: "0 20px 40px rgba(37,99,235,.18)",
  },

  h1: {
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: 10,
  },

  hSub: {
    fontSize: 15,
    opacity: 0.9,
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
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
  },

  tabOn: {
    padding: "12px 22px",
    borderRadius: 999,
    border: "none",
    background: "#2563EB",
    color: "#FFFFFF",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(37,99,235,.25)",
  },

  row2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
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
    borderRadius: 14,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    fontSize: 15,
    outline: "none",
  },

  select: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    fontSize: 15,
  },

  btn: {
    width: "100%",
    padding: "16px",
    borderRadius: 16,
    border: "none",
    background:
      "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "white",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 28,
    boxShadow: "0 10px 25px rgba(37,99,235,.2)",
  },

  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 14,
    padding: "16px",
    color: "#1E40AF",
    marginTop: 14,
    lineHeight: 1.7,
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
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
    marginBottom: 8,
  },

  barTrack: {
    height: 16,
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    display: "flex",
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
    overflow: "hidden",
    borderRadius: 14,
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
    background: "#EFF6FF",
    padding: "16px",
    borderRadius: 14,
    marginTop: 10,
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

        {/* BACK */}
        <button
          onClick={() => setPage("home")}
          style={{
            marginBottom: 20,
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #ddd",
            cursor: "pointer",
            background: "white",
          }}
        >
          ← Back Home
        </button>

        {/* HEADER */}
        <div style={S.header}>
          <h1 style={{ margin: 0 }}>
           Value Added Tax (VAT)
អាករលើតម្លៃបន្ថែម
          </h1>

          <p style={{ opacity: 0.8 }}>
            Cambodia Value Added Tax (VAT)
          </p>
        </div>

        {/* INPUT */}
        <div style={S.card}>

          <div style={S.tabRow}>

            <button
              style={
                vatType === "standard"
                  ? S.tabOn
                  : S.tab
              }
              onClick={() =>
                setVatType("standard")
              }
            >
              Standard VAT (10%)
            </button>

            <button
              style={
                vatType === "export"
                  ? S.tabOn
                  : S.tab
              }
              onClick={() =>
                setVatType("export")
              }
            >
              Export VAT (0%)
            </button>

          </div>

          <label style={S.label}>
            Sales Revenue (Output)
          </label>

          <input
            style={S.input}
            type="number"
            value={sales}
            onChange={(e) =>
              setSales(e.target.value)
            }
            placeholder="Enter sales amount"
          />

          <label style={S.label}>
            Purchases (Input)
          </label>

          <input
            style={S.input}
            type="number"
            value={purchases}
            onChange={(e) =>
              setPurchases(e.target.value)
            }
            placeholder="Enter purchase amount"
          />

          <button
            style={S.btn}
            onClick={calculateVAT}
          >
            Calculate VAT
          </button>

        </div>

        {result && (
          <>

            {/* RESULT CARDS */}
            <div style={S.metricGrid}>

              <div style={S.metric}>
                <div>Output VAT</div>

                <h3>
                  {fmt(result.outputVAT)}
                </h3>
              </div>

              <div style={S.metric}>
                <div>Input VAT</div>

                <h3>
                  {fmt(result.inputVAT)}
                </h3>
              </div>

              <div style={S.metric}>
                <div>VAT Payable</div>

                <h3>
                  {fmt(result.vatPayable)}
                </h3>
              </div>

            </div>

            {/* BAR */}
            <div style={S.card}>

              <h3>
                Output VAT vs Input VAT
              </h3>

              <div style={S.barTrack}>
                <div
                  style={{
                    width:
                      result.totalVAT +
                      "%",
                    background:
                      "#0B1F4E",
                    height: "100%",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>
                  Output VAT
                </span>

                <span>
                  {result.totalVAT.toFixed(
                    1
                  )}
                  %
                </span>
              </div>

            </div>

            {/* BREAKDOWN */}
            <div style={S.card}>

              <h3>
                VAT Calculation Breakdown
              </h3>

              <div style={S.row}>
                <span>
                  Sales Revenue
                </span>

                <strong>
                  {fmt(
                    result.saleAmount
                  )}
                </strong>
              </div>

              <div style={S.row}>
                <span>
                  Output VAT (
                  {result.rate * 100}%)
                </span>

                <strong>
                  {fmt(
                    result.outputVAT
                  )}
                </strong>
              </div>

              <div style={S.row}>
                <span>
                  Purchase Revenue
                </span>

                <strong>
                  {fmt(
                    result.purchaseAmount
                  )}
                </strong>
              </div>

              <div style={S.row}>
                <span>
                  Input VAT (10%)
                </span>

                <strong>
                  {fmt(
                    result.inputVAT
                  )}
                </strong>
              </div>

              <div style={S.row}>
                <span>
                  VAT Payable
                </span>

                <strong>
                  {fmt(
                    result.vatPayable
                  )}
                </strong>
              </div>

              <div style={S.note}>
                Formula:

                <br />
                Output VAT =
                Sales × VAT Rate

                <br />
                Input VAT =
                Purchases × 10%

                <br />
                VAT Payable =
                Output VAT − Input VAT
              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}