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
      background: "#f5f7fb",
      padding: "32px 16px",
      fontFamily: "Arial, sans-serif",
    },

    wrap: {
      maxWidth: 900,
      margin: "0 auto",
    },

    header: {
      background: "#0B1F4E",
      color: "white",
      borderRadius: 12,
      padding: "24px 30px",
      marginBottom: 20,
    },

    card: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: 24,
      marginBottom: 20,
    },

    label: {
      display: "block",
      marginBottom: 6,
      color: "#6b7280",
      fontSize: 13,
    },

    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      fontSize: 14,
      marginBottom: 16,
    },

    btn: {
      width: "100%",
      padding: 12,
      border: "none",
      borderRadius: 10,
      background: "#0B1F4E",
      color: "white",
      fontWeight: 700,
      cursor: "pointer",
    },

    tabRow: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
    },

    tab: {
      padding: "8px 18px",
      borderRadius: 20,
      border: "1px solid #d1d5db",
      background: "white",
      cursor: "pointer",
    },

    tabOn: {
      padding: "8px 18px",
      borderRadius: 20,
      border: "1px solid #0B1F4E",
      background: "#0B1F4E",
      color: "white",
      cursor: "pointer",
    },

    metricGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 20,
    },

    metric: {
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: 16,
      textAlign: "center",
    },

    barTrack: {
      height: 14,
      background: "#e5e7eb",
      borderRadius: 7,
      overflow: "hidden",
      marginBottom: 8,
    },

    note: {
      background: "#eff6ff",
      borderLeft: "4px solid #0B1F4E",
      padding: "12px 16px",
      borderRadius: 6,
      marginTop: 10,
      color: "#374151",
      fontSize: 13,
    },

    row: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #f3f4f6",
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
            🇰🇭 VAT Calculator
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