import { useState } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────
const PLT_RATE = 0.05;
const VAT_RATE = 0.10;

// ─── HELPERS ─────────────────────────────────────────────────
function n(v) {
  return parseFloat(v) || 0;
}

function money(v) {
  const rounded = Math.round(v);
  return rounded.toLocaleString("en-US") + " ៛";
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
    maxWidth: 1280,
    margin: "0 auto",
    paddingLeft: 12,
    paddingRight: 12,
  },

  header: {
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    borderRadius: 24,
    padding: "32px 36px",
    marginBottom: 24,
    border: "1px solid #BFDBFE",
    boxShadow: "0 4px 12px rgba(59,130,246,0.08)",
  },

  h1: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 10,
    color: "#FFFFFF",
  },

  hSub: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 1.6,
  },

  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    color: "#334155",
    border: "1px solid #DBEAFE",
    borderRadius: 14,
    padding: "10px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 18,
    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
  },

  infoBox: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: 18,
    padding: 22,
    marginBottom: 22,
    lineHeight: 1.8,
    color: "#334155",
    boxShadow: "0 2px 10px rgba(0,0,0,.03)",
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    marginBottom: 22,
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 16px rgba(15,23,42,.04)",
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#2563EB",
    letterSpacing: ".4px",
    marginBottom: 16,
    textTransform: "uppercase",
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
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    border: "1px solid #CBD5E1",
    borderRadius: 14,
    fontSize: 14,
    background: "#FFFFFF",
    outline: "none",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    border: "1px solid #CBD5E1",
    borderRadius: 14,
    fontSize: 14,
    background: "#FFFFFF",
    outline: "none",
  },

  btn: {
    width: "100%",
    padding: "16px",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(59,130,246,.12)",
    marginBottom: 24,
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 18,
    marginBottom: 22,
  },

  metric: {
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    textAlign: "center",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 10px rgba(0,0,0,.03)",
  },

  mLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 8,
  },

  mVal: {
    fontSize: 26,
    fontWeight: 800,
    color: "#2563EB",
  },

  mValRed: {
    fontSize: 26,
    fontWeight: 800,
    color: "#DC2626",
  },

  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 14,
    padding: 14,
    color: "#1E40AF",
    marginTop: 14,
    lineHeight: 1.7,
    fontSize: 13,
  },

  barTrack: {
    height: 14,
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10,
    display: "flex",
  },

  barLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#64748B",
  },

  dedRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #F1F5F9",
    fontSize: 14,
  },

  dedTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 14,
    background: "#EFF6FF",
    marginTop: 10,
    fontWeight: 700,
  },

  dedVal: {
    color: "#2563EB",
    fontWeight: 700,
  },

  dedValRed: {
    color: "#DC2626",
    fontWeight: 700,
  },

  tabRow: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
  },

  tab: {
    minWidth: 220,
    padding: "14px 18px",
    borderRadius: 16,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    color: "#64748B",
    cursor: "pointer",
    fontWeight: 600,
    transition: ".2s",
  },

  tabOn: {
    minWidth: 220,
    padding: "14px 18px",
    borderRadius: 16,
    border: "1px solid #BFDBFE",
    background: "linear-gradient(135deg,#BFDBFE,#93C5FD)",
    color: "#1D4ED8",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 4px 12px rgba(59,130,246,.10)",
  },
};

// ═══════════════════════════════════════════════════════════════
// PUBLIC LIGHTING TAX (PLT)
// ═══════════════════════════════════════════════════════════════
export default function OtherTaxPage({ setPage }) {
  const [sellerType, setSellerType] = useState("first");
  const [priceType, setPriceType] = useState("incl");
  const [totalPrice, setTotalPrice] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const price = n(totalPrice);

    let base, plt, vat;

    if (sellerType === "first") {
      if (priceType === "incl") {
        base = (price / 1.10) / 1.05;
      } else {
        base = price;
      }

      vat = base * VAT_RATE;
      plt = base * PLT_RATE;
    } else {
      const raw =
        priceType === "incl"
          ? (price / 1.10) / 1.05
          : price;

      base = raw * 0.20;
      vat = raw * VAT_RATE;
      plt = base * PLT_RATE;
    }

    setResult({
      price,
      base,
      vat,
      plt,
      sellerType,
      priceType,
    });
  }

  const taxPct = result
    ? Math.min((result.plt / result.price) * 100, 100)
    : 0;

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK BUTTON */}
        <button
          style={S.backBtn}
          onClick={() => setPage && setPage("home")}
        >
          ← ត្រឡប់ទៅទំព័រដើម
        </button>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>
            កម្មវិធីគណនាអាករបំភ្លឺសាធារណៈ
          </div>

          <div style={S.hSub}>
            Public Lighting Tax (PLT) · អត្រា 5%
          </div>
        </div>

        {/* OVERVIEW */}
        <div style={S.infoBox}>
          <strong>តើអ្វីជាអាករបំភ្លឺសាធារណៈ?</strong>
          {" "}
          អាករនេះមានអត្រា <strong>5%</strong> អនុវត្តលើការផ្គត់ផ្គង់
          ស្រា · ស្រាបៀរ · បារី · ថ្នាំជក់។
          ប្រមូលដោយអ្នកលក់ និងត្រូវបង់ជូនរដ្ឋបាលពន្ធដារ។
          <br />

          <strong>អ្នកលក់លើកដំបូង៖</strong>
          {" "}
          មូលដ្ឋានគិតអាករ = តម្លៃលក់ ÷ 110% ÷ 105%
          {" · "}

          <strong>អ្នកលក់បន្ត៖</strong>
          {" "}
          មូលដ្ឋានគិតអាករ =
          (តម្លៃលក់ ÷ 110% ÷ 105%) × 20%
        </div>

        {/* FORM */}
        <div style={S.card}>

          <div style={S.cardTitle}>
            ប្រភេទអ្នកជាប់ពន្ធ
          </div>

          <div style={S.tabRow}>
            <button
              style={sellerType === "first" ? S.tabOn : S.tab}
              onClick={() => {
                setSellerType("first");
                setResult(null);
              }}
            >
              អ្នកលក់លើកដំបូង
            </button>

            <button
              style={sellerType === "subsequent" ? S.tabOn : S.tab}
              onClick={() => {
                setSellerType("subsequent");
                setResult(null);
              }}
            >
              អ្នកលក់បន្ត
            </button>
          </div>

          <div style={S.cardTitle}>
            ព័ត៌មានតម្លៃលក់
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>
                តើតម្លៃលក់រួមបញ្ចូលអាករហើយឬនៅ?
              </label>

              <select
                style={S.select}
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
              >
                <option value="incl">
                  រួមបញ្ចូលរួចហើយ — តម្លៃរួមមានអាករលើតម្លៃបន្ថែម និងអាករបំភ្លឺសាធារណៈ
                </option>

                <option value="excl">
                  មិនទាន់រួមបញ្ចូល — តម្លៃមិនទាន់គិតបញ្ចូលអាករ
                </option>
              </select>
            </div>

            <div style={S.field}>
              <label style={S.label}>
                តម្លៃលក់ — រៀល
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="ឧទាហរណ៍៖ 40000"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
          </div>

          {sellerType === "first" ? (
            <div style={S.note}>
              <strong>រូបមន្ត៖</strong>
              {" "}
              មូលដ្ឋានគិតអាករ = តម្លៃលក់ ÷ 110% ÷ 105%
              {" → "}
              អាករបំភ្លឺសាធារណៈ =
              មូលដ្ឋានគិតអាករ × 5%
            </div>
          ) : (
            <div style={S.note}>
              <strong>រូបមន្ត៖</strong>
              {" "}
              មូលដ្ឋានគិតអាករ =
              (តម្លៃលក់ ÷ 110% ÷ 105%) × 20%
              {" → "}
              អាករបំភ្លឺសាធារណៈ =
              មូលដ្ឋានគិតអាករ × 5%
            </div>
          )}
        </div>

        <button style={S.btn} onClick={calculate}>
          គណនាអាករបំភ្លឺសាធារណៈ
        </button>

        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>
                  មូលដ្ឋានគិតអាករ
                </div>

                <div style={S.mVal}>
                  {money(result.base)}
                </div>
              </div>

              <div style={S.metric}>
                <div style={S.mLabel}>
                  អាករបំភ្លឺសាធារណៈ — 5%
                </div>

                <div style={S.mValRed}>
                  {money(result.plt)}
                </div>
              </div>

              <div style={S.metric}>
                <div style={S.mLabel}>
                  អាករលើតម្លៃបន្ថែម — 10%
                </div>

                <div style={S.mVal}>
                  {money(result.vat)}
                </div>
              </div>
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>
                សមាមាត្រអាករបំភ្លឺសាធារណៈ
              </div>

              <div style={S.barTrack}>
                <div
                  style={{
                    width: taxPct.toFixed(1) + "%",
                    background: "#c0392b",
                    height: "100%",
                    transition: "width .4s",
                  }}
                />

                <div
                  style={{
                    width: (100 - taxPct).toFixed(1) + "%",
                    background: "#1a7a4a",
                    height: "100%",
                    transition: "width .4s",
                  }}
                />
              </div>

              <div style={S.barLabels}>
                <span>
                  🔴 អាករបំភ្លឺសាធារណៈ:
                  {" "}
                  {taxPct.toFixed(1)}%
                </span>

                <span>
                  🟢 តម្លៃក្រោយដកអាករ:
                  {" "}
                  {(100 - taxPct).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* BREAKDOWN */}
            <div style={S.card}>
              <div style={S.cardTitle}>
                ព័ត៌មានលម្អិតនៃការគណនា
              </div>

              <div style={S.dedRow}>
                <span>តម្លៃបញ្ចូលសរុប</span>
                <span style={S.dedVal}>
                  {money(result.price)}
                </span>
              </div>

              <div style={S.dedRow}>
                <span>
                  មូលដ្ឋានគិតអាករ
                </span>

                <span style={S.dedVal}>
                  {money(result.base)}
                </span>
              </div>

              <div style={S.dedRow}>
                <span>
                  អាករលើតម្លៃបន្ថែម (10%)
                </span>

                <span style={S.dedVal}>
                  {money(result.vat)}
                </span>
              </div>

              <div style={S.dedTotal}>
                <span>
                  អាករបំភ្លឺសាធារណៈត្រូវបង់ (5%)
                </span>

                <span style={S.dedValRed}>
                  {money(result.plt)}
                </span>
              </div>

              <div style={S.note}>
                អាករបំភ្លឺសាធារណៈ
                ត្រូវប្រកាស និងបង់យ៉ាងយឺតបំផុតត្រឹម
                <strong> ថ្ងៃទី២០ នៃខែបន្ទាប់</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}