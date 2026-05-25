import { useState } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────
const VAT_RATE = 0.10;
const ACCOM_RATE = 0.02;

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
    
    color: "#FFFFF",
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
// ACCOMMODATION TAX (AT)
// ═══════════════════════════════════════════════════════════════
export default function AccomTaxPage({ setPage }) {
  const [priceType, setPriceType] = useState("excl");

  const [roomRev, setRoomRev] = useState("");
  const [confRev, setConfRev] = useState("");
  const [restRev, setRestRev] = useState("");

  const [result, setResult] = useState(null);

  function calculate() {
    const room = n(roomRev);
    const conf = n(confRev);
    const rest = n(restRev);

    const taxableRevenue = room + conf;

    let base, accomTax, vat;

    if (priceType === "excl") {
      base = taxableRevenue;
      accomTax = base * ACCOM_RATE;
      vat = base * VAT_RATE;
    } else {
      base = taxableRevenue / (1 + VAT_RATE + ACCOM_RATE);
      accomTax = base * ACCOM_RATE;
      vat = base * VAT_RATE;
    }

    setResult({
      room,
      conf,
      rest,
      taxableRevenue,
      base,
      accomTax,
      vat,
      totalTax: accomTax + vat,
    });
  }

  const taxPct =
    result && result.base > 0
      ? Math.min((result.accomTax / result.base) * 100, 100)
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
            កម្មវិធីគណនាអាករស្នាក់នៅ
          </div>

          <div style={S.hSub}>
            Accommodation Tax (AT) · អត្រា 2%
          </div>
        </div>

        {/* OVERVIEW */}
        <div style={S.infoBox}>
          <strong>តើអ្វីជាអាករស្នាក់នៅ?</strong>
          {" "}
          អាករនេះមានអត្រា <strong>2%</strong>
          អនុវត្តលើសណ្ឋាគារ ផ្ទះសំណាក់
          និងសេវាស្នាក់នៅផ្សេងៗ។
          <br />

          មូលដ្ឋានគិតអាករ =
          ចំណូលស្នាក់នៅ + ចំណូលបន្ទប់ប្រជុំ
          <br />

          ប្រាក់អាករ =
          មូលដ្ឋានគិតអាករ × 2%
        </div>

        {/* FORM */}
        <div style={S.card}>

          <div style={S.cardTitle}>
            ប្រភេទតម្លៃលក់
          </div>

          <div style={S.field}>
            <label style={S.label}>
              តើតម្លៃរួមបញ្ចូលអាករហើយឬនៅ?
            </label>

            <select
              style={S.select}
              value={priceType}
              onChange={(e) => {
                setPriceType(e.target.value);
                setResult(null);
              }}
            >
              <option value="excl">
                មិនទាន់រួមបញ្ចូលអាករ
              </option>

              <option value="incl">
                រួមបញ្ចូល VAT និង អាករស្នាក់នៅ
              </option>
            </select>
          </div>

          <div style={S.cardTitle}>
            ប្រាក់ចំណូល — រៀល
          </div>

          <div style={S.field}>
            <label style={S.label}>
              ចំណូលពីបន្ទប់ស្នាក់នៅ
            </label>

            <input
              style={S.input}
              type="number"
              placeholder="ឧទាហរណ៍៖ 25000000"
              value={roomRev}
              onChange={(e) => setRoomRev(e.target.value)}
            />
          </div>

          <div style={S.row2}>

            <div style={S.field}>
              <label style={S.label}>
                ចំណូលពីបន្ទប់ប្រជុំ
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={confRev}
                onChange={(e) => setConfRev(e.target.value)}
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>
                ចំណូលភោជនីយដ្ឋាន (មិនគិត)
              </label>

              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={restRev}
                onChange={(e) => setRestRev(e.target.value)}
              />
            </div>

          </div>

          <div style={S.note}>
            អាករស្នាក់នៅ (2%)
            អនុវត្តតែលើចំណូលបន្ទប់ស្នាក់នៅ
            និងបន្ទប់ប្រជុំប៉ុណ្ណោះ។
          </div>
        </div>

        <button style={S.btn} onClick={calculate}>
          គណនាអាករស្នាក់នៅ
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
                  អាករស្នាក់នៅ — 2%
                </div>

                <div style={S.mValRed}>
                  {money(result.accomTax)}
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
                សមាមាត្រអាករស្នាក់នៅ
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
                  🔴 អាករស្នាក់នៅ:
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
                <span>ចំណូលបន្ទប់ស្នាក់នៅ</span>

                <span style={S.dedVal}>
                  {money(result.room)}
                </span>
              </div>

              {result.conf > 0 && (
                <div style={S.dedRow}>
                  <span>ចំណូលបន្ទប់ប្រជុំ</span>

                  <span style={S.dedVal}>
                    + {money(result.conf)}
                  </span>
                </div>
              )}

              {result.rest > 0 && (
                <div style={S.dedRow}>
                  <span>ចំណូលភោជនីយដ្ឋាន</span>

                  <span style={{ color: "#9ca3af", fontWeight: 500 }}>
                    {money(result.rest)}
                  </span>
                </div>
              )}

              <div style={S.dedRow}>
                <span>មូលដ្ឋានគិតអាករ</span>

                <span style={S.dedVal}>
                  {money(result.base)}
                </span>
              </div>

              <div style={S.dedRow}>
                <span>VAT 10%</span>

                <span style={S.dedVal}>
                  {money(result.vat)}
                </span>
              </div>

              <div style={S.dedTotal}>
                <span>អាករស្នាក់នៅត្រូវបង់</span>

                <span style={S.dedValRed}>
                  {money(result.accomTax)}
                </span>
              </div>

              <div style={S.note}>
                សរុបពន្ធត្រូវបង់:
                {" "}
                <strong>
                  {money(result.totalTax)}
                </strong>
                <br />

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