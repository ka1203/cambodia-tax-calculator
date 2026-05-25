import { useState } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────
const VAT_RATE = 0.10;

const SPECIAL_TAX_RATES = {
  liquor:       { label: "សុរា / ស្រាទំពាំងបាយជូរ", rate: 0.35 },
  beer:         { label: "ស្រាបៀរ", rate: 0.30 },
  cigarette:    { label: "បារី", rate: 0.20 },
  cigar:        { label: "សីហ្គា", rate: 0.25 },
  beverage:     { label: "ភេសជ្ជៈគ្មានជាតិអាកុល", rate: 0.10 },
  cement:       { label: "ស៊ីម៉ងត៍", rate: 0.05 },
  air_ticket:   { label: "សេវាសំបុត្រយន្តហោះ", rate: 0.10 },
  entertainment:{ label: "សេវាកម្សាន្ត", rate: 0.10 },
  telecom:      { label: "សេវាទូរគមនាគមន៍", rate: 0.03 },
};

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
    color: "#2563EB",
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
};

// ═══════════════════════════════════════════════════════════════
// SPECIAL TAX (ST)
// ═══════════════════════════════════════════════════════════════
export default function SpecialTaxPage({ setPage }) {
  const [goodsType, setGoodsType] = useState("beer");
  const [sourceType, setSourceType] = useState("local");
  const [priceIncl, setPriceIncl] = useState("yes");

  const [saleQty, setSaleQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const [giftQty, setGiftQty] = useState("");
  const [giftPrice, setGiftPrice] = useState("");

  const [creditQty, setCreditQty] = useState("");
  const [creditPrice, setCreditPrice] = useState("");

  const [result, setResult] = useState(null);

  const rate = SPECIAL_TAX_RATES[goodsType]?.rate || 0;
  const rateLabel = (rate * 100).toFixed(0) + "%";

  function calculate() {
    const saleTotal = n(saleQty) * n(unitPrice);
    const giftTotal = n(giftQty) * n(giftPrice);
    const creditTotal = n(creditQty) * n(creditPrice);

    const totalRev = saleTotal + giftTotal + creditTotal;

    let base, tax;

    if (sourceType === "local") {
      base =
        priceIncl === "yes"
          ? 0.90 * (totalRev / 1.10 / (1 + rate))
          : 0.90 * totalRev;

      tax = base * rate;
    } else if (sourceType === "imported") {
      base = totalRev;
      tax = base * rate;
    } else {
      base =
        priceIncl === "yes"
          ? totalRev / (1 + VAT_RATE + rate)
          : totalRev;

      tax = base * rate;
    }

    setResult({
      totalRev,
      saleTotal,
      giftTotal,
      creditTotal,
      base,
      tax,
      rate,
      sourceType,
    });
  }

  const taxPct =
    result && result.totalRev > 0
      ? Math.min((result.tax / result.totalRev) * 100, 100)
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
            កម្មវិធីគណនាអាករពិសេស
          </div>

          <div style={S.hSub}>
            Special Tax (ST) · អាករលើទំនិញ និងសេវាកម្មមួយចំនួន
          </div>
        </div>

        {/* OVERVIEW */}
        <div style={S.infoBox}>
          <strong>តើអ្វីជាអាករពិសេស?</strong>
          {" "}
          អាករនេះអនុវត្តលើទំនិញ និងសេវាកម្មមួយចំនួន។
          <br />

          អត្រាអាករ៖
          {" "}
          សុរា 35% · ស្រាបៀរ 30% · បារី 20% ·
          ភេសជ្ជៈ 10% · ស៊ីម៉ងត៍ 5% ·
          ទូរគមនាគមន៍ 3% · សេវាកម្សាន្ត 10%
          <br />

          <strong>ទំនិញផលិតក្នុងស្រុក៖</strong>
          {" "}
          មូលដ្ឋានគិតអាករ =
          90% × (ចំណូលសរុប ÷ 110% ÷ (1 + អត្រាអាករ))
        </div>

        {/* FORM */}
        <div style={S.card}>

          <div style={S.cardTitle}>
            ប្រភេទទំនិញ ឬសេវាកម្ម
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>
                ជ្រើសរើសទំនិញ ឬសេវាកម្ម
              </label>

              <select
                style={S.select}
                value={goodsType}
                onChange={(e) => {
                  setGoodsType(e.target.value);
                  setResult(null);
                }}
              >
                {Object.entries(SPECIAL_TAX_RATES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label} — {(v.rate * 100).toFixed(0)}%
                  </option>
                ))}
              </select>
            </div>

            <div style={S.field}>
              <label style={S.label}>
                ប្រភពផ្គត់ផ្គង់
              </label>

              <select
                style={S.select}
                value={sourceType}
                onChange={(e) => {
                  setSourceType(e.target.value);
                  setResult(null);
                }}
              >
                <option value="local">
                  ផលិតក្នុងស្រុក
                </option>

                <option value="imported">
                  នាំចូល
                </option>

                <option value="service">
                  សេវាកម្ម
                </option>
              </select>
            </div>
          </div>

          <div style={S.field}>
            <label style={S.label}>
              តើតម្លៃលក់រួមបញ្ចូលអាករហើយឬនៅ?
            </label>

            <select
              style={S.select}
              value={priceIncl}
              onChange={(e) => setPriceIncl(e.target.value)}
            >
              <option value="yes">
                រួមបញ្ចូលរួចហើយ — តម្លៃរួមមានអាករលើតម្លៃបន្ថែម និងអាករពិសេស
              </option>

              <option value="no">
                មិនទាន់រួមបញ្ចូល — តម្លៃមិនទាន់គិតបញ្ចូលអាករ
              </option>
            </select>
          </div>

          <div style={S.cardTitle}>
            ប្រាក់ចំណូលពីការលក់ — រៀល
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>
                បរិមាណលក់
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="ឧទាហរណ៍៖ 5000"
                value={saleQty}
                onChange={(e) => setSaleQty(e.target.value)}
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>
                តម្លៃឯកតា — រៀល
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="ឧទាហរណ៍៖ 6000"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </div>
          </div>

          <div style={S.cardTitle}>
            ការផ្តល់ជាអំណោយ / ការលក់ជំពាក់
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>
                បរិមាណអំណោយ
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={giftQty}
                onChange={(e) => setGiftQty(e.target.value)}
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>
                តម្លៃអំណោយ — រៀល
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={giftPrice}
                onChange={(e) => setGiftPrice(e.target.value)}
              />
            </div>
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>
                បរិមាណលក់ជំពាក់
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={creditQty}
                onChange={(e) => setCreditQty(e.target.value)}
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>
                តម្លៃលក់ជំពាក់ — រៀល
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={creditPrice}
                onChange={(e) => setCreditPrice(e.target.value)}
              />
            </div>
          </div>

          <div style={S.note}>
            <strong>អត្រាអាករអនុវត្ត៖</strong>
            {" "}
            {rateLabel}
            {" "}
            លើ {SPECIAL_TAX_RATES[goodsType]?.label}
          </div>
        </div>

        <button style={S.btn} onClick={calculate}>
          គណនាអាករពិសេស
        </button>

        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>

              <div style={S.metric}>
                <div style={S.mLabel}>
                  ចំណូលសរុប
                </div>

                <div style={S.mVal}>
                  {money(result.totalRev)}
                </div>
              </div>

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
                  អាករពិសេសត្រូវបង់
                </div>

                <div style={S.mValRed}>
                  {money(result.tax)}
                </div>
              </div>
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>
                សមាមាត្រអាករពិសេស
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
                  🔴 អាករពិសេស:
                  {" "}
                  {taxPct.toFixed(1)}%
                </span>

                <span>
                  🟢 ចំណូលសុទ្ធ:
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
                <span>ចំណូលពីការលក់</span>
                <span style={S.dedVal}>
                  {money(result.saleTotal)}
                </span>
              </div>

              {result.giftTotal > 0 && (
                <div style={S.dedRow}>
                  <span>ចំណូលពីអំណោយ</span>
                  <span style={S.dedVal}>
                    + {money(result.giftTotal)}
                  </span>
                </div>
              )}

              {result.creditTotal > 0 && (
                <div style={S.dedRow}>
                  <span>ចំណូលពីការលក់ជំពាក់</span>
                  <span style={S.dedVal}>
                    + {money(result.creditTotal)}
                  </span>
                </div>
              )}

              <div style={S.dedRow}>
                <span>ចំណូលសរុប</span>
                <span style={S.dedVal}>
                  {money(result.totalRev)}
                </span>
              </div>

              <div style={S.dedRow}>
                <span>មូលដ្ឋានគិតអាករ</span>
                <span style={S.dedVal}>
                  {money(result.base)}
                </span>
              </div>

              <div style={S.dedTotal}>
                <span>អាករពិសេសត្រូវបង់</span>
                <span style={S.dedValRed}>
                  {money(result.tax)}
                </span>
              </div>

              <div style={S.note}>
                ត្រូវប្រកាស និងបង់យ៉ាងយឺតបំផុត
                ត្រឹម <strong>ថ្ងៃទី២០ នៃខែបន្ទាប់</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}