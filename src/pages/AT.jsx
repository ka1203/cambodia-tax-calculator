import { useState } from "react";

const VAT_RATE   = 0.10;
const ACCOM_RATE = 0.02;

function n(v)     { return parseFloat(v) || 0; }
function money(v) { return Math.round(v).toLocaleString("en-US") + " ៛"; }

const FONT_SET = "'Khmer OS Siemreap', 'Khmer OS Battambang', 'Khmer OS Battambong', 'Battambang', Inter, sans-serif";

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
    padding: "24px 16px",
    fontFamily: FONT_SET,
  },
  wrap: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    color: "#334155",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: ".2s",
    boxShadow: "0 2px 5px rgba(0,0,0,.04)",
    fontFamily: FONT_SET,
  },
  header: {
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    borderRadius: 20,
    padding: "24px 30px",
    marginBottom: 24,
    boxShadow: "0 10px 25px rgba(37,99,235,.1)",
  },
  h1: {
    fontSize: 24,
    lineHeight: 1.35,
    fontWeight: 800,
    marginBottom: 8,
    fontFamily: FONT_SET,
  },
  hSub: {
    fontSize: 14,
    lineHeight: 1.7,
    opacity: 0.9,
    fontFamily: FONT_SET,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 20px rgba(15,23,42,.04)",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#2563EB",
    letterSpacing: 0,
    lineHeight: 1.5,
    marginBottom: 16,
    fontFamily: FONT_SET,
  },
  tabRow: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  tab: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    background: "#FFFFFF",
    color: "#64748B",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: ".2s",
    fontFamily: FONT_SET,
  },
  tabOn: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: "0 4px 12px rgba(37,99,235,.2)",
    fontFamily: FONT_SET,
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 16,
  },
  field: { marginBottom: 16 },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
    marginBottom: 6,
    fontFamily: FONT_SET,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    fontSize: 14,
    background: "#FFFFFF",
    outline: "none",
    fontFamily: FONT_SET,
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    fontSize: 14,
    background: "#FFFFFF",
    outline: "none",
    fontFamily: FONT_SET,
  },
  btn: {
    width: "100%",
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(37,99,235,.15)",
    marginBottom: 24,
    fontFamily: FONT_SET,
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16,
    marginBottom: 20,
  },
  metric: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    textAlign: "center",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 12px rgba(0,0,0,.03)",
  },
  mLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 8,
    fontFamily: FONT_SET,
  },
  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 12,
    padding: 14,
    color: "#1E40AF",
    marginTop: 12,
    lineHeight: 1.6,
    fontSize: 13,
    fontFamily: FONT_SET,
  },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: {
    background: "#EFF6FF",
    color: "#1E40AF",
    padding: "12px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: 13,
    borderBottom: "1px solid #DBEAFE",
    fontFamily: FONT_SET,
  },
  td: {
    padding: "12px",
    fontSize: 13,
    lineHeight: 1.6,
    borderBottom: "1px solid #F1F5F9",
    fontFamily: FONT_SET,
  },
  tdHighlight: {
    padding: "12px",
    fontSize: 13,
    lineHeight: 1.6,
    borderBottom: "1px solid #DBEAFE",
    background: "#EFF6FF",
    color: "#1E40AF",
    fontWeight: 700,
    fontFamily: FONT_SET,
  },
  barTrack: {
    height: 16,
    borderRadius: 999,
    overflow: "hidden",
    display: "flex",
    background: "#E2E8F0",
  },
  barLabels: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
    color: "#475569",
    fontSize: 13,
    lineHeight: 1.6,
    flexWrap: "wrap",
    fontFamily: FONT_SET,
  },
  dedRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    fontSize: 13,
    borderBottom: "1px solid #F1F5F9",
    fontFamily: FONT_SET,
  },
  dedRowTotal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    background: "#EFF6FF",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: FONT_SET,
  },
  dedRowTotalRed: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    background: "#FEF2F2",
    border: "1px solid #FEE2E2",
    color: "#991B1B",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: FONT_SET,
  },
  dedVal:    { color: "#2563EB", fontWeight: 700 },
  dedValRed: { color: "#DC2626", fontWeight: 700 },
  dedValGrey:{ color: "#9CA3AF", fontWeight: 500 },
};

export default function AccomTaxPage({ setPage }) {
  const [priceType, setPriceType] = useState("excl");
  const [roomRev,   setRoomRev]   = useState("");
  const [confRev,   setConfRev]   = useState("");
  const [restRev,   setRestRev]   = useState("");
  const [result,    setResult]    = useState(null);

  function calculate() {
    const room = n(roomRev);
    const conf = n(confRev);
    const rest = n(restRev);
    const taxableRevenue = room + conf;

    let base, accomTax, vat;
    if (priceType === "excl") {
      base     = taxableRevenue;
      accomTax = base * ACCOM_RATE;
      vat      = base * VAT_RATE;
    } else {
      base     = taxableRevenue / (1 + VAT_RATE + ACCOM_RATE);
      accomTax = base * ACCOM_RATE;
      vat      = base * VAT_RATE;
    }

    setResult({ room, conf, rest, taxableRevenue, base, accomTax, vat, totalTax: accomTax + vat });
  }

  const taxPct = result && result.base > 0
    ? Math.min((result.accomTax / result.base) * 100, 100)
    : 0;

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK */}
        <div style={S.topBar}>
          <button style={S.backBtn} onClick={() => setPage && setPage("home")}>
            ← ត្រឡប់ទៅទំព័រដើម
          </button>
        </div>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>អាករស្នាក់នៅ (AT) — កម្មវិធីគណនាពន្ធ</div>
          <div style={S.hSub}>កម្ពុជា · Accommodation Tax · អត្រា ២% | VAT ១០%</div>
        </div>

        {/* INPUT CARD */}
        <div style={S.card}>
          <div style={S.cardTitle}>ប្រភេទតម្លៃលក់</div>
          <div style={S.tabRow}>
            <button
              style={priceType === "excl" ? S.tabOn : S.tab}
              onClick={() => { setPriceType("excl"); setResult(null); }}
            >
              មិនទាន់រួមបញ្ចូលអាករ
            </button>
            <button
              style={priceType === "incl" ? S.tabOn : S.tab}
              onClick={() => { setPriceType("incl"); setResult(null); }}
            >
              រួមបញ្ចូល VAT និង AT រួចហើយ
            </button>
          </div>

          <div style={S.cardTitle}>ប្រាក់ចំណូល (រៀល/ខែ)</div>

          <div style={S.field}>
            <label style={S.label}>ចំណូលពីបន្ទប់ស្នាក់នៅ</label>
            <input
              style={S.input}
              type="number"
              placeholder="ឧទាហរណ៍៖ 25000000"
              value={roomRev}
              onChange={e => { setRoomRev(e.target.value); setResult(null); }}
            />
          </div>

          <div style={S.row2}>
            <div style={S.field}>
              <label style={S.label}>ចំណូលពីបន្ទប់ប្រជុំ</label>
              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={confRev}
                onChange={e => { setConfRev(e.target.value); setResult(null); }}
              />
            </div>
            <div style={S.field}>
              <label style={S.label}>ចំណូលភោជនីយដ្ឋាន (មិនជាប់ AT)</label>
              <input
                style={S.input}
                type="number"
                placeholder="0"
                value={restRev}
                onChange={e => { setRestRev(e.target.value); setResult(null); }}
              />
            </div>
          </div>

          <div style={S.note}>
            • អាករស្នាក់នៅ ២% អនុវត្តតែលើ <strong>ចំណូលបន្ទប់ស្នាក់នៅ + បន្ទប់ប្រជុំ</strong> ប៉ុណ្ណោះ<br />
            • ចំណូលភោជនីយដ្ឋាន — <strong>មិនជាប់ AT</strong> (ប៉ុន្តែជាប់ VAT ១០%)<br />
            • រូបមន្ត៖ <strong>AT = មូលដ្ឋានគិត × ២%</strong>
          </div>
        </div>

        <button style={S.btn} onClick={calculate}>គណនាអាករស្នាក់នៅ</button>

        {result && (
          <>
            {/* METRICS */}
            <div style={S.metricGrid}>
              <div style={S.metric}>
                <div style={S.mLabel}>មូលដ្ឋានគិតអាករ</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0B1F4E" }}>{money(result.base)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>អាករស្នាក់នៅ — ២%</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#c0392b" }}>{money(result.accomTax)}</div>
              </div>
              <div style={S.metric}>
                <div style={S.mLabel}>អាករ VAT — ១០%</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a7a4a" }}>{money(result.vat)}</div>
              </div>
            </div>

            {/* BAR */}
            <div style={S.card}>
              <div style={S.cardTitle}>ប្រៀបធៀបអាករស្នាក់នៅ និងចំណូលសុទ្ធ</div>
              <div style={S.barTrack}>
                <div style={{ width: taxPct.toFixed(1) + "%", background: "#c0392b", height: "100%", transition: "width .4s" }} />
                <div style={{ width: (100 - taxPct).toFixed(1) + "%", background: "#1a7a4a", height: "100%", transition: "width .4s" }} />
              </div>
              <div style={S.barLabels}>
                <span>🔴 អាករស្នាក់នៅ៖ {taxPct.toFixed(1)}%</span>
                <span>🟢 ចំណូលសុទ្ធ៖ {(100 - taxPct).toFixed(1)}%</span>
              </div>
            </div>

            {/* BREAKDOWN TABLE */}
            <div style={S.card}>
              <div style={S.cardTitle}>តារាងលម្អិតនៃការគណនា</div>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <th style={S.th}>បរិយាយ</th>
                    <th style={S.th}>អត្រា</th>
                    <th style={S.th}>មូលដ្ឋាន (រៀល)</th>
                    <th style={S.th}>ទឹកប្រាក់ំពន្ធ (រៀល)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={S.td}>ចំណូលបន្ទប់ស្នាក់នៅ</td>
                    <td style={S.td}>—</td>
                    <td style={S.td}>{money(result.room)}</td>
                    <td style={S.td}>—</td>
                  </tr>
                  {result.conf > 0 && (
                    <tr>
                      <td style={S.td}>ចំណូលបន្ទប់ប្រជុំ</td>
                      <td style={S.td}>—</td>
                      <td style={S.td}>{money(result.conf)}</td>
                      <td style={S.td}>—</td>
                    </tr>
                  )}
                  {result.rest > 0 && (
                    <tr>
                      <td style={{ ...S.td, color: "#9CA3AF" }}>ចំណូលភោជនីយដ្ឋាន (មិនជាប់ AT)</td>
                      <td style={{ ...S.td, color: "#9CA3AF" }}>—</td>
                      <td style={{ ...S.td, color: "#9CA3AF" }}>{money(result.rest)}</td>
                      <td style={{ ...S.td, color: "#9CA3AF" }}>—</td>
                    </tr>
                  )}
                  <tr>
                    <td style={S.tdHighlight}>មូលដ្ឋានគិតអាករ (Room + Conf)</td>
                    <td style={S.tdHighlight}>—</td>
                    <td style={S.tdHighlight}>{money(result.base)}</td>
                    <td style={S.tdHighlight}>—</td>
                  </tr>
                  <tr>
                    <td style={S.td}>អាករ VAT</td>
                    <td style={S.td}>១០%</td>
                    <td style={S.td}>{money(result.base)}</td>
                    <td style={{ ...S.td, color: "#1a7a4a", fontWeight: 700 }}>{money(result.vat)}</td>
                  </tr>
                  <tr>
                    <td style={S.td}>អាករស្នាក់នៅ (AT)</td>
                    <td style={S.td}>២%</td>
                    <td style={S.td}>{money(result.base)}</td>
                    <td style={{ ...S.td, color: "#c0392b", fontWeight: 700 }}>{money(result.accomTax)}</td>
                  </tr>
                </tbody>
              </table>

              <div style={S.dedRowTotalRed}>
                <span>អាករសរុបត្រូវបង់ (AT + VAT)</span>
                <span>{money(result.totalTax)}</span>
              </div>

              <div style={S.note}>
                <strong>រូបមន្តគណនា៖</strong><br />
                • មូលដ្ឋានគិត = {money(result.room)}{result.conf > 0 ? ` + ${money(result.conf)}` : ""} = {money(result.base)}<br />
                • AT &nbsp;&nbsp;&nbsp;= {money(result.base)} × ២% = {money(result.accomTax)}<br />
                • VAT &nbsp;= {money(result.base)} × ១០% = {money(result.vat)}<br />
                • អាករសរុប = {money(result.accomTax)} + {money(result.vat)} = <strong>{money(result.totalTax)}</strong><br /><br />
                ត្រូវដាក់លិខិតប្រកាស និងបង់ប្រាក់ <strong>យ៉ាងយឺតបំផុតថ្ងៃទី ២០ នៃខែបន្ទាប់</strong>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}