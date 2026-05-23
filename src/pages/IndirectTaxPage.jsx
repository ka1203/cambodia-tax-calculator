import { useState } from "react";

const SPECIAL_TAX_TYPES = [
  { label: "Beer (ស្រាបៀរ)", rate: 30, type: "goods" },
  { label: "Wine / Alcohol (សុរាគ្រប់ប្រភេទ)", rate: 35, type: "goods" },
  { label: "Cigarettes (បារីគ្រប់ប្រភេទ)", rate: 20, type: "goods" },
  { label: "Cigars (បារីស៊ីហ្គា)", rate: 25, type: "goods" },
  { label: "Non-alcoholic Drinks (ភេសជ្ជៈគ្មានជាតិសុរា)", rate: 10, type: "goods" },
  { label: "Cement (ស៊ីម៉ងត៍)", rate: 5, type: "goods" },
  { label: "Entertainment Services (សេវាលំហែកំសាន្ត)", rate: 10, type: "service" },
  { label: "Air Transport (សេវាដឹកជញ្ជូនតាមផ្លូវអាកាស)", rate: 10, type: "service" },
  { label: "Telecom Services (សេវាទូរគមនាគមន៍)", rate: 3, type: "service" },
];

export default function IndirectTaxPage({ setPage }) {
  const [taxType, setTaxType] = useState("plt");
  const [amount, setAmount] = useState("");
  const [specialIndex, setSpecialIndex] = useState(0);
  const [result, setResult] = useState(null);

  function fmt(n) {
    return Math.round(n).toLocaleString("en-US") + " ៛";
  }

  function calculate() {
    const totalBill = parseFloat(amount) || 0;

    let base = 0;
    let tax = 0;
    let rate = 0;
    let formula = "";

    if (taxType === "plt") {
      rate = 5;

      base = (totalBill / 1.10) / 1.05;
      tax = base * 0.05;

      formula =
        "Base = (Total Bill ÷ 110%) ÷ 105% , Tax = Base × 5%";
    }

    if (taxType === "accommodation") {
      rate = 2;

      base = (totalBill / 1.10) / 1.02;
      tax = base * 0.02;

      formula =
        "Base = (Total Bill ÷ 110%) ÷ 102% , Tax = Base × 2%";
    }

    if (taxType === "special") {
      const item =
        SPECIAL_TAX_TYPES[specialIndex];

      rate = item.rate;

      if (item.type === "goods") {
        base =
          0.9 *
          (
            totalBill /
            1.10 /
            (1 + rate / 100)
          );
      } else {
        base =
          totalBill /
          1.10 /
          (1 + rate / 100);
      }

      tax = base * (rate / 100);

      formula =
        item.type === "goods"
          ? "Base = 0.90 × (Total Bill ÷110% ÷(100%+Rate))"
          : "Base = Total Bill ÷110% ÷(100%+Rate)";
    }

    setResult({
      totalBill,
      base,
      tax,
      rate,
      formula,
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
      background: "#06371F",
      color: "white",
      borderRadius: 12,
      padding: 24,
      marginBottom: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: 700,
    },

    sub: {
      opacity: 0.8,
      marginTop: 6,
    },

    card: {
      background: "white",
      borderRadius: 12,
      border: "1px solid #e5e7eb",
      padding: 20,
      marginBottom: 20,
    },

    input: {
      width: "100%",
      padding: 12,
      borderRadius: 8,
      border: "1px solid #d1d5db",
      marginBottom: 15,
      boxSizing: "border-box",
    },

    btn: {
      background: "#06371F",
      color: "white",
      border: "none",
      borderRadius: 8,
      padding: 12,
      width: "100%",
      cursor: "pointer",
      fontWeight: 700,
    },

    tabRow: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
      flexWrap: "wrap",
    },

    tab: {
      padding: "10px 16px",
      borderRadius: 8,
      border: "1px solid #d1d5db",
      cursor: "pointer",
      background: "white",
    },

    tabActive: {
      padding: "10px 16px",
      borderRadius: 8,
      border: "1px solid #06371F",
      cursor: "pointer",
      background: "#06371F",
      color: "white",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginTop: 20,
    },

    metric: {
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: 16,
      textAlign: "center",
    },

    note: {
      background: "#ecfdf5",
      borderLeft: "4px solid #06371F",
      padding: 14,
      borderRadius: 6,
      marginTop: 20,
    },
  };

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <button
          onClick={() => setPage("home")}
          style={{
            marginBottom: 15,
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            cursor: "pointer",
          }}
        >
          ← Back Home
        </button>

        <div style={S.header}>
          <div style={S.title}>
            🇰🇭 Cambodia Indirect Tax Calculator
          </div>

          <div style={S.sub}>
            អាករសម្រាប់បំភ្លឺសាធារណៈ •
            អាករពិសេស •
            អាករស្នាក់នៅ
          </div>
        </div>

        <div style={S.card}>

          <div style={S.tabRow}>

            <button
              style={
                taxType === "plt"
                  ? S.tabActive
                  : S.tab
              }
              onClick={() =>
                setTaxType("plt")
              }
            >
              PLT
            </button>

            <button
              style={
                taxType === "special"
                  ? S.tabActive
                  : S.tab
              }
              onClick={() =>
                setTaxType("special")
              }
            >
              Special Tax
            </button>

            <button
              style={
                taxType ===
                "accommodation"
                  ? S.tabActive
                  : S.tab
              }
              onClick={() =>
                setTaxType(
                  "accommodation"
                )
              }
            >
              Accommodation
            </button>

          </div>

          {taxType === "special" && (
            <select
              style={S.input}
              value={specialIndex}
              onChange={(e) =>
                setSpecialIndex(
                  Number(
                    e.target.value
                  )
                )
              }
            >
              {SPECIAL_TAX_TYPES.map(
                (item, index) => (
                  <option
                    key={index}
                    value={index}
                  >
                    {item.label}
                  </option>
                )
              )}
            </select>
          )}

          <input
            style={S.input}
            type="number"
            value={amount}
            placeholder="Total Invoice Amount (KHR)"
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button
            style={S.btn}
            onClick={calculate}
          >
            គណនា / Calculate
          </button>

        </div>

        {result && (
          <>
            <div style={S.grid}>

              <div style={S.metric}>
                <div>
                  មូលដ្ឋានគិតអាករ
                </div>

                <h3>
                  {fmt(result.base)}
                </h3>
              </div>

              <div style={S.metric}>
                <div>
                  ប្រាក់អាករត្រូវបង់
                </div>

                <h3
                  style={{
                    color:
                      "#c0392b",
                  }}
                >
                  {fmt(result.tax)}
                </h3>
              </div>

              <div style={S.metric}>
                <div>
                  Total Invoice
                </div>

                <h3>
                  {fmt(
                    result.totalBill
                  )}
                </h3>
              </div>

            </div>

            <div style={S.note}>

              <strong>
                Formula:
              </strong>

              <br />

              {result.formula}

              <br />
              <br />

              សូមប្រកាស និងបង់អាករ
              មុនថ្ងៃទី 20
              នៃខែបន្ទាប់។

            </div>
          </>
        )}

      </div>
    </div>
  );
}