import { useState } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────
const PLT_RATE   = 0.05;
const VAT_RATE   = 0.10;
const ACCOM_RATE = 0.02;

const SPECIAL_TAX_RATES = {
  liquor:       { label: "សុរា / ស្រាទំពាំងបាយជូរ",   rate: 0.35 },
  beer:         { label: "ស្រាបៀរ",                rate: 0.30 },
  cigarette:    { label: "បារី",                   rate: 0.20 },
  cigar:        { label: "សីហ្គា",                  rate: 0.25 },
  beverage:     { label: "ភេសជ្ជៈគ្មានជាតិអាកុល",     rate: 0.10 },
  cement:       { label: "ស៊ីម៉ងត៍",                rate: 0.05 },
  air_ticket:   { label: "សេវាសំបុត្រយន្តហោះ",        rate: 0.10 },
  entertainment:{ label: "សេវាកម្សាន្ត",             rate: 0.10 },
  telecom:      { label: "សេវាទូរគមនាគមន៍",          rate: 0.03 },
};

// ─── HELPERS ─────────────────────────────────────────────────
function n(v) { return parseFloat(v) || 0; }
function money(v) {
  const rounded = Math.round(v);
  return rounded.toLocaleString("en-US") + " ៛";
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "24px 16px",
    fontFamily: "'Kantumruy Pro', 'Inter', sans-serif",
  },

  // ───────────────── WRAPPER ─────────────────
  wrap: {
    width: "100%",
    maxWidth: 1280,
    margin: "0 auto",
    paddingLeft: 12,
    paddingRight: 12,
  },

  // ───────────────── HEADER ─────────────────
  header: {
    background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
    color: "#0F172A",
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
    color: "#1D4ED8",
  },

  hSub: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
  },

  // ───────────────── BACK BUTTON ─────────────────
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

  // ───────────────── INFO BOX ─────────────────
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

  // ───────────────── CARD ─────────────────
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

  // ───────────────── TABS ─────────────────
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

  // ───────────────── GRID ─────────────────
  row2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 18,
  },

  field: {
    marginBottom: 18,
  },

  // ───────────────── INPUTS ─────────────────
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

  // ───────────────── BUTTON ─────────────────
  btn: {
    width: "100%",
    padding: "16px",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#93C5FD,#60A5FA)",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(59,130,246,.12)",
    marginBottom: 24,
  },

  // ───────────────── METRICS ─────────────────
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

  // ───────────────── NOTE ─────────────────
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

  // ───────────────── BAR ─────────────────
  barTrack: {
    height: 14,
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10,
  },

  barLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#64748B",
  },

  // ───────────────── TABLE ─────────────────
  tbl: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#EFF6FF",
    color: "#1D4ED8",
    padding: "14px",
    textAlign: "left",
    fontWeight: 700,
    borderBottom: "1px solid #DBEAFE",
    fontSize: 13,
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #F1F5F9",
    fontSize: 13,
    color: "#334155",
  },

  tdActive: {
    padding: "14px",
    background: "#EFF6FF",
    color: "#1D4ED8",
    fontWeight: 700,
    borderBottom: "1px solid #BFDBFE",
    fontSize: 13,
  },

  // ───────────────── BREAKDOWN ─────────────────
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

  dedRowTotal: {
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
// PUBLIC LIGHTING TAX (PLT)
// ═══════════════════════════════════════════════════════════════
function PLTPage() {
  const [sellerType, setSellerType] = useState("first");
  const [priceType,  setPriceType]  = useState("incl");
  const [totalPrice, setTotalPrice] = useState("");
  const [result,       setResult]     = useState(null);

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
      const raw = priceType === "incl" ? (price / 1.10) / 1.05 : price;
      base = raw * 0.20;
      vat  = raw * VAT_RATE;
      plt  = base * PLT_RATE;
    }

    setResult({ price, base, vat, plt, sellerType, priceType });
  }

  const taxPct = result ? Math.min((result.plt / result.price) * 100, 100) : 0;

  return (
    <>
      {/* OVERVIEW */}
      <div style={S.infoBox}>
        <strong>តើអ្វីជាអាករបំភ្លឺសាធារណៈ?</strong> អាករនេះមានអត្រា <strong>5%</strong> អនុវត្តលើការផ្គត់ផ្គង់ ស្រា · ស្រាបៀរ · បារី · ថ្នាំជក់។ ប្រមូលដោយអ្នកលក់ និងត្រូវបង់ជូនរដ្ឋបាលពន្ធដារថ្នាក់ខេត្ត/ក្រុង។<br />
        <strong>អ្នកលក់លើកដំបូង៖</strong> មូលដ្ឋានគិតអាករ = តម្លៃលក់ ÷ 110% ÷ 105% &nbsp;·&nbsp;
        <strong>អ្នកលក់បន្ត៖</strong> មូលដ្ឋានគិតអាករ = (តម្លៃលក់ ÷ 110% ÷ 105%) × 20% &nbsp;·&nbsp; ប្រាក់អាករ = មូលដ្ឋានគិតអាករ × 5%
      </div>

      {/* SELLER TYPE */}
      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទអ្នកជាប់ពន្ធ</div>
        <div style={S.tabRow}>
          <button style={sellerType==="first"?S.tabOn:S.tab} onClick={()=>{setSellerType("first");setResult(null);}}>
            អ្នកលក់លើកដំបូង
          </button>
          <button style={sellerType==="subsequent"?S.tabOn:S.tab} onClick={()=>{setSellerType("subsequent");setResult(null);}}>
            អ្នកលក់បន្ត
          </button>
        </div>

        <div style={S.cardTitle}>ព័ត៌មានតម្លៃលក់</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>តើតម្លៃលក់រួមបញ្ចូលអាករហើយឬនៅ?</label>
            <select style={S.select} value={priceType} onChange={e=>setPriceType(e.target.value)}>
              <option value="incl">រួមបញ្ចូលរួចហើយ — តម្លៃរួមមានអាករលើតម្លៃបន្ថែម និងអាករបំភ្លឺសាធារណៈ</option>
              <option value="excl">មិនទាន់រួមបញ្ចូល — តម្លៃមិនទាន់គិតបញ្ចូលអាករ</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃលក់ — រៀល</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 40000" value={totalPrice} onChange={e=>setTotalPrice(e.target.value)} />
          </div>
        </div>

        {sellerType==="first"
          ? <div style={S.note}><strong>រូបមន្ត៖</strong> មូលដ្ឋានគិតអាករ = តម្លៃលក់ ÷ 110% ÷ 105% &nbsp;→&nbsp; អាករបំភ្លឺសាធារណៈ = មូលដ្ឋានគិតអាករ × 5%</div>
          : <div style={S.note}><strong>រូបមន្ត៖</strong> មូលដ្ឋានគិតអាករ = (តម្លៃលក់ ÷ 110% ÷ 105%) × 20% &nbsp;→&nbsp; អាករបំភ្លឺសាធារណៈ = មូលដ្ឋានគិតអាករ × 5%</div>
        }
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករបំភ្លឺសាធារណៈ</button>

      {result && (
        <>
          {/* METRICS */}
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>មូលដ្ឋានគិតអាករ</div><div style={S.mVal}>{money(result.base)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អាករបំភ្លឺសាធារណៈ — 5%</div><div style={S.mValRed}>{money(result.plt)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អាករលើតម្លៃបន្ថែម — 10%</div><div style={S.mVal}>{money(result.vat)}</div></div>
          </div>

          {/* BAR */}
          <div style={S.card}>
            <div style={S.cardTitle}>សមាមាត្រអាករបំភ្លឺសាធារណៈ ធៀបនឹងតម្លៃសរុប</div>
            <div style={S.barTrack}>
              <div style={{width:taxPct.toFixed(1)+"%", background:"#c0392b", height:"100%", transition:"width .4s"}} />
              <div style={{width:(100-taxPct).toFixed(1)+"%", background:"#1a7a4a", height:"100%", transition:"width .4s"}} />
            </div>
            <div style={S.barLabels}>
              <span>🔴 អាករបំភ្លឺសាធារណៈ: {taxPct.toFixed(1)}%</span>
              <span>🟢 តម្លៃក្រោយដកអាករ: {(100-taxPct).toFixed(1)}%</span>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={S.card}>
            <div style={S.cardTitle}>ព័ត៌មានលម្អិតនៃការគណនា</div>
            <div style={S.dedRow}><span>តម្លៃបញ្ចូលសរុប</span><span style={S.dedVal}>{money(result.price)}</span></div>
            <div style={S.dedRow}><span>មូលដ្ឋានគិតអាករ (ក្រោយដកអាករលើតម្លៃបន្ថែម និងអាករបំភ្លឺសាធារណៈ)</span><span style={S.dedVal}>{money(result.base)}</span></div>
            <div style={S.dedRow}><span>អាករលើតម្លៃបន្ថែម (10%)</span><span style={S.dedVal}>{money(result.vat)}</span></div>
            <div style={S.dedTotal}><span>អាករបំភ្លឺសាធារណៈត្រូវបង់ (5%)</span><span style={S.dedValRed}>{money(result.plt)}</span></div>
            <div style={S.note}>អាករបំភ្លឺសាធារណៈ ត្រូវប្រកាស និងបង់យ៉ាងយឺតបំផុតត្រឹម <strong>ថ្ងៃទី២០ នៃខែបន្ទាប់</strong> ជូនរដ្ឋបាលពន្ធដារខេត្ត/ក្រុង។</div>
          </div>
        </>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// SPECIAL TAX (ST)
// ═══════════════════════════════════════════════════════════════
function SpecialTaxPage() {
  const [goodsType,   setGoodsType]   = useState("beer");
  const [sourceType,  setSourceType]  = useState("local");
  const [priceIncl,   setPriceIncl]   = useState("yes");
  const [saleQty,     setSaleQty]     = useState("");
  const [unitPrice,   setUnitPrice]   = useState("");
  const [giftQty,     setGiftQty]     = useState("");
  const [giftPrice,   setGiftPrice]   = useState("");
  const [creditQty,   setCreditQty]   = useState("");
  const [creditPrice, setCreditPrice] = useState("");
  const [result,       setResult]      = useState(null);

  const rate      = SPECIAL_TAX_RATES[goodsType]?.rate || 0;
  const rateLabel = (rate * 100).toFixed(0) + "%";

  function calculate() {
    const saleTotal   = n(saleQty)   * n(unitPrice);
    const giftTotal   = n(giftQty)   * n(giftPrice);
    const creditTotal = n(creditQty) * n(creditPrice);
    const totalRev    = saleTotal + giftTotal + creditTotal;

    let base, tax;

    if (sourceType === "local") {
      base = priceIncl === "yes"
        ? 0.90 * (totalRev / 1.10 / (1 + rate))
        : 0.90 * totalRev;
      tax = base * rate;
    } else if (sourceType === "imported") {
      base = totalRev;
      tax  = base * rate;
    } else {
      // service
      base = priceIncl === "yes"
        ? totalRev / (1 + VAT_RATE + rate)
        : totalRev;
      tax = base * rate;
    }

    setResult({ totalRev, saleTotal, giftTotal, creditTotal, base, tax, rate, sourceType });
  }

  const taxPct = result && result.totalRev > 0
    ? Math.min((result.tax / result.totalRev) * 100, 100) : 0;

  return (
    <>
      {/* OVERVIEW */}
      <div style={S.infoBox}>
        <strong>តើអ្វីជាអាករពិសេស?</strong> អាករនេះអនុវត្តលើទំនិញ និងសេវាកម្មមួយចំនួន។<br/>
        អត្រាអាករ៖ សុរា 35% · ស្រាបៀរ 30% · បារី 20% · ភេសជ្ជៈ 10% · ស៊ីម៉ងត៍ 5% · ទូរគមនាគមន៍ 3% · សេវាកម្សាន្ត 10%<br/>
        <strong>ទំនិញផលិតក្នុងស្រុក៖</strong> មូលដ្ឋានគិតអាករ = 90% × (ចំណូលសរុប ÷ 110% ÷ (1 + អត្រាអាករ))
      </div>

      {/* GOODS / SOURCE */}
      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទទំនិញ ឬសេវាកម្ម</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ជ្រើសរើសទំនិញ ឬសេវាកម្ម</label>
            <select style={S.select} value={goodsType} onChange={e=>{setGoodsType(e.target.value);setResult(null);}}>
              {Object.entries(SPECIAL_TAX_RATES).map(([k,v])=>(
                <option key={k} value={k}>{v.label} — {(v.rate*100).toFixed(0)}%</option>
              ))}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ប្រភពផ្គត់ផ្គង់</label>
            <select style={S.select} value={sourceType} onChange={e=>{setSourceType(e.target.value);setResult(null);}}>
              <option value="local">ផលិតក្នុងស្រុក</option>
              <option value="imported">នាំចូល</option>
              <option value="service">សេវាកម្ម</option>
            </select>
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>តើតម្លៃលក់រួមបញ្ចូលអាករហើយឬនៅ?</label>
          <select style={S.select} value={priceIncl} onChange={e=>setPriceIncl(e.target.value)}>
            <option value="yes">រួមបញ្ចូលរួចហើយ — តម្លៃរួមមានអាករលើតម្លៃបន្ថែម និងអាករពិសេស</option>
            <option value="no">មិនទាន់រួមបញ្ចូល — តម្លៃមិនទាន់គិតបញ្ចូលអាករ</option>
          </select>
        </div>

        <div style={S.cardTitle}>ប្រាក់ចំណូលពីការលក់ — រៀល</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>បរិមាណលក់</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 5000" value={saleQty} onChange={e=>setSaleQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃឯកតារួមបញ្ចូលអាករ — រៀល</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 6000" value={unitPrice} onChange={e=>setUnitPrice(e.target.value)} />
          </div>
        </div>

        <div style={S.cardTitle}>ការផ្តល់ជាអំណោយ / ការលក់ជំពាក់ — រៀល</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>បរិមាណអំណោយ/សំណាក</label>
            <input style={S.input} type="number" placeholder="0" value={giftQty} onChange={e=>setGiftQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃឯកតានៃអំណោយ (តម្លៃទីផ្សារ) — រៀល</label>
            <input style={S.input} type="number" placeholder="0" value={giftPrice} onChange={e=>setGiftPrice(e.target.value)} />
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>បរិមាណលក់ជំពាក់</label>
            <input style={S.input} type="number" placeholder="0" value={creditQty} onChange={e=>setCreditQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>តម្លៃឯកតានៃការលក់ជំពាក់ — រៀល</label>
            <input style={S.input} type="number" placeholder="0" value={creditPrice} onChange={e=>setCreditPrice(e.target.value)} />
          </div>
        </div>

        <div style={S.note}>
          <strong>អត្រាអាករអនុវត្ត៖</strong> {rateLabel} លើ {SPECIAL_TAX_RATES[goodsType]?.label}
          {sourceType==="local" && <> &nbsp;|&nbsp; មូលដ្ឋានគិតអាករ = 90% × (តម្លៃលក់ ÷ 110% ÷ {((1+rate)*100).toFixed(0)}%)</>}
          {sourceType==="imported" && <> &nbsp;|&nbsp; មូលដ្ឋានគិតអាករ = តម្លៃគិតពន្ធគយរួមបញ្ចូលទាំងពន្ធនាំចូល</>}
          {sourceType==="service" && <> &nbsp;|&nbsp; មូលដ្ឋានគិតអាករ = ទឹកប្រាក់ក្នុងវិក្កយបត្រ ÷ (1 + 10% + {rateLabel})</>}
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករពិសេស</button>

      {result && (
        <>
          {/* METRICS */}
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ចំណូលសរុប</div><div style={S.mVal}>{money(result.totalRev)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>មូលដ្ឋានគិតអាករ</div><div style={S.mVal}>{money(result.base)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អាករពិសេសត្រូវបង់ ({(result.rate*100).toFixed(0)}%)</div><div style={S.mValRed}>{money(result.tax)}</div></div>
          </div>

          {/* BAR */}
          <div style={S.card}>
            <div style={S.cardTitle}>សមាមាត្រអាករពិសេស ធៀបនឹងប្រាក់ចំណូលសរុប</div>
            <div style={S.barTrack}>
              <div style={{width:taxPct.toFixed(1)+"%", background:"#c0392b", height:"100%", transition:"width .4s"}} />
              <div style={{width:(100-taxPct).toFixed(1)+"%", background:"#1a7a4a", height:"100%", transition:"width .4s"}} />
            </div>
            <div style={S.barLabels}>
              <span>🔴 អាករពិសេស: {taxPct.toFixed(1)}%</span>
              <span>🟢 ចំណូលសុទ្ធក្រោយដកពន្ធ: {(100-taxPct).toFixed(1)}%</span>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={S.card}>
            <div style={S.cardTitle}>ព័ត៌មានលម្អិតនៃការគណនា</div>
            <div style={S.dedRow}><span>ចំណូលពីការលក់ធម្មតា</span><span style={S.dedVal}>{money(result.saleTotal)}</span></div>
            {result.giftTotal > 0 && <div style={S.dedRow}><span>ចំណូលសន្មតពីអំណោយ (គិតតាមតម្លៃទីផ្សារ)</span><span style={S.dedVal}>+ {money(result.giftTotal)}</span></div>}
            {result.creditTotal > 0 && <div style={S.dedRow}><span>ចំណូលពីការលក់ជំពាក់</span><span style={S.dedVal}>+ {money(result.creditTotal)}</span></div>}
            <div style={S.dedRow}><span>ចំណូលជាប់ពន្ធសរុប</span><span style={S.dedVal}>{money(result.totalRev)}</span></div>
            <div style={S.dedRow}><span>មូលដ្ឋានគិតអាករ (ក្រោយអនុវត្តរូបមន្ត)</span><span style={S.dedVal}>{money(result.base)}</span></div>
            <div style={S.dedTotal}><span>ប្រាក់អាករពិសេសត្រូវបង់សរុប</span><span style={S.dedValRed}>{money(result.tax)}</span></div>
            <div style={S.note}>
              {result.sourceType==="local" && "ទំនិញក្នុងស្រុក៖ មូលដ្ឋានគិតអាករ = 90% × (ចំណូលសរុប ÷ 110% ÷ (1+អត្រាអាករ))"}
              {result.sourceType==="imported" && "ទំនិញនាំចូល៖ គិតលើតម្លៃគយបូករួមទាំងពន្ធនាំចូល"}
              {result.sourceType==="service" && "សេវាកម្ម៖ មូលដ្ឋានគិតអាករ = ទឹកប្រាក់វិក្កយបត្រ ÷ (1 + អត្រាអាករលើតម្លៃបន្ថែម + អត្រាអាករពិសេស)"}
              <br/>ត្រូវប្រកាស និងបង់យ៉ាងយឺតបំផុតត្រឹម <strong>ថ្ងៃទី២០ នៃខែបន្ទាប់</strong>។
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACCOMMODATION TAX (AT)
// ═══════════════════════════════════════════════════════════════
function AccomTaxPage() {
  const [priceType, setPriceType] = useState("excl");
  const [roomRev,   setRoomRev]   = useState("");
  const [confRev,   setConfRev]   = useState("");
  const [restRev,   setRestRev]   = useState("");
  const [result,       setResult]    = useState(null);

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
      // price includes VAT (10%) + accom tax (2%)
      base     = taxableRevenue / (1 + VAT_RATE + ACCOM_RATE);
      accomTax = base * ACCOM_RATE;
      vat      = base * VAT_RATE;
    }

    setResult({ room, conf, rest, taxableRevenue, base, accomTax, vat, totalTax: accomTax + vat });
  }

  const taxPct = result && result.base > 0
    ? Math.min((result.accomTax / result.base) * 100, 100) : 0;

  return (
    <>
      {/* OVERVIEW */}
      <div style={S.infoBox}>
        <strong>តើអ្វីជាអាករស្នាក់នៅ?</strong> អាករនេះមានអត្រា <strong>2%</strong> អនុវត្តលើសណ្ឋាគារ ឬផ្ទះសំណាក់ដែលជាប់ពន្ធ (រួមមាន សណ្ឋាគារ · អាផាតមិនសណ្ឋាគារ · បន្ទប់ឈុត · រីសត · ម៉ូតែល · ឡូដស៍ · បឹងហ្គាឡូ · ផ្ទះសំណាក់)។<br/>
        មូលដ្ឋានគិតអាករ = ចំណូលស្នាក់នៅ + ចំណូលជួលបន្ទប់ប្រជុំ (មិនគិតបញ្ចូលចំណូលភោជនីយដ្ឋានឡើយ) &nbsp;·&nbsp; ប្រាក់អាករ = មូលដ្ឋានគិតអាករ × 2%
      </div>

      {/* FORM */}
      <div style={S.card}>
        <div style={S.cardTitle}>ប្រភេទតម្លៃលក់</div>
        <div style={S.field}>
          <label style={S.label}>តើតម្លៃបន្ទប់រួមបញ្ចូលអាករហើយឬនៅ?</label>
          <select style={S.select} value={priceType} onChange={e=>{setPriceType(e.target.value);setResult(null);}}>
            <option value="excl">មិនទាន់រួមបញ្ចូល — តម្លៃមិនទាន់គិតបញ្ចូលអាករលើតម្លៃបន្ថែម និងអាករស្នាក់នៅ</option>
            <option value="incl">រួមបញ្ចូលរួចហើយ — តម្លៃបូករួមទាំងអាករលើតម្លៃបន្ថែម និងអាករស្នាក់នៅ 2% រួចរាល់</option>
          </select>
        </div>

        <div style={S.cardTitle}>ប្រាក់ចំណូលប្រចាំខែ — រៀល</div>
        <div style={S.field}>
          <label style={S.label}>ចំណូលពីសេវាស្នាក់នៅ/បន្ទប់ — រៀល</label>
          <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 25000000" value={roomRev} onChange={e=>setRoomRev(e.target.value)} />
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំណូលពីការជួលបន្ទប់ប្រជុំ/សន្និសីទ — រៀល</label>
            <input style={S.input} type="number" placeholder="0" value={confRev} onChange={e=>setConfRev(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំណូលពីភោជនីយដ្ឋាន/អាហារ (មិនជាប់អាករនេះទេ ✗) — រៀល</label>
            <input style={S.input} type="number" placeholder="0" value={restRev} onChange={e=>setRestRev(e.target.value)} />
          </div>
        </div>
        <div style={S.note}>
          អាករស្នាក់នៅ (2%) អនុវត្តតែលើ <strong>ចំណូលបន្ទប់ស្នាក់នៅ និងបន្ទប់ប្រជុំតែប៉ុណ្ណោះ</strong>។ ចំណូលពីសេវាម្ហូបអាហារ និងភេសជ្ជៈរបស់ភោជនីយដ្ឋាន ត្រូវ បាន<strong>ដកចេញ</strong>។<br/>
          រូបមន្ត៖ មូលដ្ឋានគិតអាករ = ចំណូលជាប់ពន្ធសរុប ÷ (1 + 10% + 2%) នៅពេលដែលតម្លៃលក់រួមបញ្ចូលអាករ។
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករស្នាក់នៅ</button>

      {result && (
        <>
          {/* METRICS */}
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>មូលដ្ឋានគិតអាករ</div><div style={S.mVal}>{money(result.base)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អាករស្នាក់នៅ — 2%</div><div style={S.mValRed}>{money(result.accomTax)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>អាករលើតម្លៃបន្ថែម — 10%</div><div style={S.mVal}>{money(result.vat)}</div></div>
          </div>

          {/* BAR */}
          <div style={S.card}>
            <div style={S.cardTitle}>សមាមាត្រអាករស្នាក់នៅ ធៀបនឹងប្រាក់ចំណូល</div>
            <div style={S.barTrack}>
              <div style={{width:taxPct.toFixed(1)+"%", background:"#c0392b", height:"100%", transition:"width .4s"}} />
              <div style={{width:(100-taxPct).toFixed(1)+"%", background:"#1a7a4a", height:"100%", transition:"width .4s"}} />
            </div>
            <div style={S.barLabels}>
              <span>🔴 អាករស្នាក់នៅ: {taxPct.toFixed(1)}%</span>
              <span>🟢 ចំណូលសុទ្ធក្រោយដកពន្ធ: {(100-taxPct).toFixed(1)}%</span>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={S.card}>
            <div style={S.cardTitle}>ព័ត៌មានលម្អិតនៃការគណនា</div>
            <div style={S.dedRow}><span>ចំណូលសេវាស្នាក់នៅ</span><span style={S.dedVal}>{money(result.room)}</span></div>
            {result.conf > 0 && <div style={S.dedRow}><span>ចំណូលជួលបន្ទប់ប្រជុំ</span><span style={S.dedVal}>+ {money(result.conf)}</span></div>}
            {result.rest > 0 && <div style={S.dedRow}><span>ចំណូលភោជនីយដ្ឋាន (មិនគិតបញ្ចូល ✗)</span><span style={{color:"#9ca3af", fontWeight:500}}>{money(result.rest)}</span></div>}
            <div style={S.dedRow}><span>មូលដ្ឋានគិតអាករសរុប</span><span style={S.dedVal}>{money(result.base)}</span></div>
            <div style={S.dedRow}><span>អាករលើតម្លៃបន្ថែម (10%)</span><span style={S.dedVal}>{money(result.vat)}</span></div>
            <div style={S.dedTotal}><span>ប្រាក់អាករស្នាក់នៅត្រូវបង់</span><span style={S.dedValRed}>{money(result.accomTax)}</span></div>
            <div style={S.note}>
              សរុបប្រាក់ពន្ធអាករត្រូវបង់ (អាករលើតម្លៃបន្ថែម + អាករស្នាក់នៅ)៖ <strong>{money(result.totalTax)}</strong><br/>
              ត្រូវប្រកាស និងបង់យ៉ាងយឺតបំផុតត្រឹម <strong>ថ្ងៃទី២០ នៃខែបន្ទាប់</strong>។
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export default function OtherTaxPage({ setPage }) {
  const [tab, setTab] = useState("plt");

  const TABS = [
    { key:"plt",     label:"អាករបំភ្លឺសាធារណៈ",   sub:"អត្រា 5%" },
    { key:"special", label:"អាករពិសេស",           sub:"លើទំនិញ និងសេវាកម្មមួយចំនួន" },
    { key:"accom",   label:"អាករស្នាក់នៅ",         sub:"អត្រា 2%" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK BUTTON */}
        <button style={S.backBtn} onClick={() => setPage && setPage("home")}>
          ← ត្រឡប់ទៅទំព័រដើម
        </button>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}>កម្មវិធីគណនាប្រាក់អាករផ្សេងៗ</div>
          <div style={S.hSub}>
            អាករបំភ្លឺសាធារណៈ (PLT) · អាករពិសេស (ST) · អាករស្នាក់នៅ (AT)
          </div>
        </div>

        {/* TAX TYPE TABS */}
        <div style={S.tabRow}>
          {TABS.map(t => (
            <button
              key={t.key}
              style={tab===t.key ? S.tabOn : S.tab}
              onClick={()=>{ setTab(t.key); }}
            >
              {t.label}
              <span style={{display:"block", fontSize:11, fontWeight:400, opacity:0.8}}>{t.sub}</span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {tab==="plt"     && <PLTPage />}
        {tab==="special" && <SpecialTaxPage />}
        {tab==="accom"   && <AccomTaxPage />}

      </div>
    </div>
  );
}