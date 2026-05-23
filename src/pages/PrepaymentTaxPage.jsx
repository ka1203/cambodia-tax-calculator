import { useState } from "react";

function fmt(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}

export default function PrepaymentTaxPage({ setPage }) {

  const [turnover, setTurnover] = useState("");
  const [vatIncluded, setVatIncluded] = useState(true);
  const [result, setResult] = useState(null);

  function calculate() {

    const amount = parseFloat(turnover) || 0;

    let taxBase = amount;

    if (vatIncluded) {
      taxBase = amount / 1.1;
    }

    const prepaymentTax = taxBase * 0.01;

    setResult({
      turnover: amount,
      taxBase,
      prepaymentTax,
      taxPct:
        taxBase > 0
          ? (prepaymentTax / taxBase) * 100
          : 0,
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
      maxWidth: 800,
      margin: "0 auto",
    },

    header: {
      background: "#0B1F4E",
      color: "white",
      borderRadius: 12,
      padding: "22px 28px",
      marginBottom: 24,
    },

    h1: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 6,
    },

    hSub: {
      fontSize: 13,
      opacity: 0.7,
    },

    card: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: 24,
      marginBottom: 20,
    },

    cardTitle: {
      fontSize: 12,
      fontWeight: 600,
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: 16,
    },

    field: {
      marginBottom: 16,
    },

    label: {
      display: "block",
      fontSize: 13,
      color: "#6b7280",
      marginBottom: 6,
    },

    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      fontSize: 14,
    },

    btn: {
      width: "100%",
      padding: 12,
      fontSize: 15,
      fontWeight: 700,
      background: "#0B1F4E",
      color: "white",
      border: "none",
      borderRadius: 10,
      cursor: "pointer",
      marginBottom: 20,
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

    mLabel: {
      fontSize: 12,
      color: "#6b7280",
      marginBottom: 6,
    },

    note: {
      background: "#eff6ff",
      borderLeft: "4px solid #0B1F4E",
      borderRadius: 6,
      padding: "12px 16px",
      fontSize: 13,
      color: "#374151",
      marginTop: 12,
    },

    dedRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #f3f4f6",
      fontSize: 14,
    },

    dedRowTotal: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background: "#f9fafb",
      borderRadius: 6,
      marginTop: 6,
      fontWeight: 700,
    },

    dedVal: {
      color: "#0B1F4E",
      fontWeight: 600,
    },

    barTrack: {
      height: 14,
      background: "#e5e7eb",
      borderRadius: 7,
      overflow: "hidden",
      marginBottom: 8,
    },

    barLabels: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      color: "#6b7280",
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
      cursor: "pointer",
      background: "white",
      color: "#6b7280",
    },

    tabOn: {
      padding: "8px 18px",
      borderRadius: 20,
      border: "1px solid #0B1F4E",
      cursor: "pointer",
      background: "#0B1F4E",
      color: "white",
    },

  };

  return (
    <div style={S.page}>

      <div style={S.wrap}>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>
            🇰🇭 ប្រាក់រំដោះពន្ធលើប្រាក់ចំណូល
          </div>

          <div style={S.hSub}>
            Cambodia Prepayment Tax Calculator (1%)
          </div>
        </div>

        {/* HOME BUTTON */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setPage("home")}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ← Back Home
          </button>
        </div>

        {/* INPUT CARD */}
        <div style={S.card}>

          <div style={S.cardTitle}>
            Monthly Turnover Information
          </div>

          <div style={S.tabRow}>

            <button
              style={
                vatIncluded
                  ? S.tabOn
                  : S.tab
              }
              onClick={() =>
                setVatIncluded(true)
              }
            >
              VAT Included
            </button>

            <button
              style={
                !vatIncluded
                  ? S.tabOn
                  : S.tab
              }
              onClick={() =>
                setVatIncluded(false)
              }
            >
              VAT Excluded
            </button>

          </div>

          <div style={S.field}>

            <label style={S.label}>
              Monthly Turnover (KHR)
            </label>

            <input
              style={S.input}
              type="number"
              value={turnover}
              placeholder="e.g. 11,000,000"
              onChange={(e) =>
                setTurnover(e.target.value)
              }
            />

          </div>

        </div>

        <button
          style={S.btn}
          onClick={calculate}
        >
          Calculate Prepayment Tax
        </button>

        {result && (
          <>
            {/* RESULT CARDS */}
            <div style={S.metricGrid}>

              <div style={S.metric}>
                <div style={S.mLabel}>
                  Turnover
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0B1F4E",
                  }}
                >
                  {fmt(result.turnover)}
                </div>
              </div>

              <div style={S.metric}>
                <div style={S.mLabel}>
                  Tax Base
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0B1F4E",
                  }}
                >
                  {fmt(result.taxBase)}
                </div>
              </div>

              <div style={S.metric}>
                <div style={S.mLabel}>
                  Prepayment Tax
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#c0392b",
                  }}
                >
                  {fmt(result.prepaymentTax)}
                </div>
              </div>

            </div>

            {/* TAX BAR */}
            <div style={S.card}>

              <div style={S.cardTitle}>
                Tax Percentage
              </div>

              <div style={S.barTrack}>
                <div
                  style={{
                    width:
                      result.taxPct + "%",
                    height: "100%",
                    background:
                      "#c0392b",
                  }}
                />
              </div>

              <div style={S.barLabels}>
                <span>
                  Tax: {result.taxPct.toFixed(2)}%
                </span>

                <span>
                  Net: {(100 - result.taxPct).toFixed(2)}%
                </span>
              </div>

            </div>

            {/* BREAKDOWN */}
            <div style={S.card}>

              <div style={S.cardTitle}>
                Calculation Breakdown
              </div>

              <div style={S.dedRow}>
                <span>
                  Monthly Turnover
                </span>

                <span style={S.dedVal}>
                  {fmt(result.turnover)}
                </span>
              </div>

              <div style={S.dedRow}>
                <span>
                  Tax Base
                </span>

                <span style={S.dedVal}>
                  {fmt(result.taxBase)}
                </span>
              </div>

              <div style={S.dedRowTotal}>
                <span>
                  Prepayment Tax (1%)
                </span>

                <span style={S.dedVal}>
                  {fmt(result.prepaymentTax)}
                </span>
              </div>

            </div>

            {/* FORMULA */}
            <div style={S.card}>

              <div style={S.note}>
                Tax Base = Turnover ÷ 1.1
                <br />
                (when turnover includes VAT)
                <br /><br />
                Prepayment Tax = Tax Base × 1%
              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}