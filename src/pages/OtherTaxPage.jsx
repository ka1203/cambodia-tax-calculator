import { useState } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────
const PLT_RATE   = 0.05;
const VAT_RATE   = 0.10;
const ACCOM_RATE = 0.02;

const SPECIAL_TAX_RATES = {
  liquor:       { label: "Liquor / Wine (សុរា)",               rate: 0.35 },
  beer:         { label: "Beer (ស្រាបៀរ)",                     rate: 0.30 },
  cigarette:    { label: "Cigarette (បារី)",                   rate: 0.20 },
  cigar:        { label: "Cigar (សីហ្គា)",                     rate: 0.25 },
  beverage:     { label: "Non-alcohol Beverage (ភេសជ្ជៈ)",     rate: 0.10 },
  cement:       { label: "Cement (ស៊ីម៉ងត៍)",                   rate: 0.05 },
  air_ticket:   { label: "Air Ticket Service (សំបុត្រយន្តហោះ)", rate: 0.10 },
  entertainment:{ label: "Entertainment Services (លំហែកម្សាន្ត)", rate: 0.10 },
  telecom:      { label: "Telecom Services (ទូរគមនាគមន៍)",     rate: 0.03 },
};

// ─── HELPERS ─────────────────────────────────────────────────
function n(v) { return parseFloat(v) || 0; }
function money(v) {
  // Riel typically does not use fractional cents/decimals in daily accounting
  const rounded = Math.round(v);
  return rounded.toLocaleString("en-US") + " ៛";
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
  },

  wrap: {
    width: "100%",
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 24px",
  },

  header: {
    background:
      "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    borderRadius: 32,
    padding: "50px 60px",
    marginBottom: 32,
    boxShadow: "0 20px 40px rgba(37,99,235,.15)",
  },

  h1: {
    fontSize: 36,
    fontWeight: 800,
    marginBottom: 12,
  },

  hSub: {
    fontSize: 16,
    opacity: 0.9,
  },

  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 14,
    padding: "12px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 24,
    boxShadow: "0 8px 20px rgba(37,99,235,.25)",
  },

  infoBox: {
    background: "#FFFFFF",
    border: "1px solid #DBEAFE",
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    lineHeight: 1.8,
    boxShadow: "0 4px 15px rgba(0,0,0,.04)",
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 28,
    padding: 36,
    marginBottom: 28,
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 30px rgba(15,23,42,.06)",
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
    justifyContent: "center",
    gap: 16,
    marginBottom: 30,
    flexWrap: "wrap",
  },

  tab: {
    minWidth: 260,
    padding: "18px 24px",
    borderRadius: 18,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    color: "#64748B",
    cursor: "pointer",
    fontWeight: 600,
    transition: ".2s",
  },

  tabOn: {
    minWidth: 260,
    padding: "18px 24px",
    borderRadius: 18,
    border: "none",
    background:
      "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow:
      "0 10px 20px rgba(37,99,235,.25)",
  },

  row2: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: 20,
  },

  field: {
    marginBottom: 20,
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
    boxSizing: "border-box",
    padding: "16px 18px",
    border: "1px solid #CBD5E1",
    borderRadius: 16,
    fontSize: 16,
    background: "#FFFFFF",
    outline: "none",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 18px",
    border: "1px solid #CBD5E1",
    borderRadius: 16,
    fontSize: 16,
    background: "#FFFFFF",
    outline: "none",
  },

  btn: {
    width: "100%",
    padding: "18px",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 18,
    border: "none",
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
    color: "#FFFFFF",
    boxShadow:
      "0 10px 25px rgba(37,99,235,.25)",
    marginBottom: 30,
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: 20,
    marginBottom: 24,
  },

  metric: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    textAlign: "center",
    border: "1px solid #E2E8F0",
    boxShadow: "0 6px 20px rgba(0,0,0,.05)",
  },

  mLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 10,
  },

  mVal: {
    fontSize: 30,
    fontWeight: 800,
    color: "#2563EB",
  },

  mValRed: {
    fontSize: 30,
    fontWeight: 800,
    color: "#DC2626",
  },

  note: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 14,
    padding: 16,
    color: "#1E40AF",
    marginTop: 16,
    lineHeight: 1.7,
  },

  barTrack: {
    height: 16,
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
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
    marginTop: 10,
    padding: 16,
    borderRadius: 14,
    background: "#EFF6FF",
    fontWeight: 700,
  },

  dedTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 16,
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
  const [result,     setResult]     = useState(null);

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
        <strong>អ្វីជាអាករបំភ្លឺសាធារណៈ?</strong> អាករ <strong>5%</strong> អនុវត្តលើ ស្រា · ស្រាបៀរ · ជ័រ · ថ្នាំជក់។
        ប្រមូលដោយអ្នកលក់ & បង់ជូនថ្នាក់ខេត្ត/ក្រុង។<br />
        <strong>First seller:</strong> Base = price ÷ 110% ÷ 105% &nbsp;·&nbsp;
        <strong>Subsequent seller:</strong> Base = (price ÷ 110% ÷ 105%) × 20% &nbsp;·&nbsp; PLT = Base × 5%
      </div>

      {/* SELLER TYPE */}
      <div style={S.card}>
        <div style={S.cardTitle}>Taxpayer type (ប្រភេទអ្នកលក់)</div>
        <div style={S.tabRow}>
          <button style={sellerType==="first"?S.tabOn:S.tab} onClick={()=>{setSellerType("first");setResult(null);}}>
            First Seller — អ្នកលក់លើកដំបូង
          </button>
          <button style={sellerType==="subsequent"?S.tabOn:S.tab} onClick={()=>{setSellerType("subsequent");setResult(null);}}>
            Subsequent Seller — អ្នកលក់បន្ត
          </button>
        </div>

        <div style={S.cardTitle}>Price Input (ព័ត៌មានតម្លៃ)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Price includes all taxes? (តម្លៃរួម​អាករ?)</label>
            <select style={S.select} value={priceType} onChange={e=>setPriceType(e.target.value)}>
              <option value="incl">Yes — price includes VAT + PLT (រួម)</option>
              <option value="excl">No — price excludes taxes (មិនរួម)</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>Sale price (ថ្លៃលក់) — KHR</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 40000" value={totalPrice} onChange={e=>setTotalPrice(e.target.value)} />
          </div>
        </div>

        {sellerType==="first"
          ? <div style={S.note}><strong>Formula:</strong> Base = price ÷ 110% ÷ 105% &nbsp;→&nbsp; PLT = Base × 5%</div>
          : <div style={S.note}><strong>Formula:</strong> Base = (price ÷ 110% ÷ 105%) × 20% &nbsp;→&nbsp; PLT = Base × 5%</div>
        }
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករ — Calculate PLT</button>

      {result && (
        <>
          {/* METRICS */}
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>Tax Base (មូលដ្ឋានគិតអាករ)</div><div style={S.mVal}>{money(result.base)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>PLT — 5%</div><div style={S.mValRed}>{money(result.plt)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>VAT — 10%</div><div style={S.mVal}>{money(result.vat)}</div></div>
          </div>

          {/* BAR */}
          <div style={S.card}>
            <div style={S.cardTitle}>PLT vs Price</div>
            <div style={S.barTrack}>
              <div style={{width:taxPct.toFixed(1)+"%", background:"#c0392b", height:"100%", transition:"width .4s"}} />
              <div style={{width:(100-taxPct).toFixed(1)+"%", background:"#1a7a4a", height:"100%", transition:"width .4s"}} />
            </div>
            <div style={S.barLabels}>
              <span>🔴 PLT: {taxPct.toFixed(1)}%</span>
              <span>🟢 After-tax: {(100-taxPct).toFixed(1)}%</span>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={S.card}>
            <div style={S.cardTitle}>Deduction Breakdown (ការគណនាមូលដ្ឋានគិតអាករ)</div>
            <div style={S.dedRow}><span>Input price</span><span style={S.dedVal}>{money(result.price)}</span></div>
            <div style={S.dedRow}><span>Tax base (after removing VAT + PLT)</span><span style={S.dedVal}>{money(result.base)}</span></div>
            <div style={S.dedRow}><span>VAT (10%)</span><span style={S.dedVal}>{money(result.vat)}</span></div>
            <div style={S.dedTotal}><span>Public Lighting Tax — PLT (5%)</span><span style={S.dedValRed}>{money(result.plt)}</span></div>
            <div style={S.note}>PLT is paid by the <strong>20th of the following month</strong> to the provincial/municipal tax authority.</div>
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
  const [result,      setResult]      = useState(null);

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
        <strong>អ្វីជាអាករពិសេស?</strong> អាករពិសេស អនុវត្តលើ ទំនិញ & សេវាមួយចំនួន។<br/>
        អត្រា: សុរា 35% · ស្រាបៀរ 30% · បារី 20% · ភេសជ្ជៈ 10% · ស៊ីម៉ងត៍ 5% · Telecom 3% · Entertainment 10%<br/>
        <strong>Local goods:</strong> Base = 90% × (revenue ÷ 110% ÷ (1 + rate)) 
      </div>

      {/* GOODS / SOURCE */}
      <div style={S.card}>
        <div style={S.cardTitle}>Goods / Service type (ប្រភេទទំនិញ/សេវា)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Select goods or service</label>
            <select style={S.select} value={goodsType} onChange={e=>{setGoodsType(e.target.value);setResult(null);}}>
              {Object.entries(SPECIAL_TAX_RATES).map(([k,v])=>(
                <option key={k} value={k}>{v.label} — {(v.rate*100).toFixed(0)}%</option>
              ))}
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>Source type (ប្រភព)</label>
            <select style={S.select} value={sourceType} onChange={e=>{setSourceType(e.target.value);setResult(null);}}>
              <option value="local">Locally produced (ផលិតក្នុងស្រុក)</option>
              <option value="imported">Imported (នាំចូល)</option>
              <option value="service">Services (សេវា)</option>
            </select>
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Price includes all taxes? (តម្លៃរួមអាករ?)</label>
          <select style={S.select} value={priceIncl} onChange={e=>setPriceIncl(e.target.value)}>
            <option value="yes">Yes — price includes VAT + Special Tax (រួម)</option>
            <option value="no">No — price excludes taxes (មិនរួម)</option>
          </select>
        </div>

        <div style={S.cardTitle}>Sales Income (ចំណូលលក់) — KHR</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Units sold (ចំនួនលក់)</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 5000" value={saleQty} onChange={e=>setSaleQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Unit price incl. taxes (ថ្លៃ/ឯកតា) — KHR</label>
            <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 6000" value={unitPrice} onChange={e=>setUnitPrice(e.target.value)} />
          </div>
        </div>

        <div style={S.cardTitle}>Gift / Credit Sales (អំណោយ / ជំពាក់) — KHR</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Gift qty (ចំនួនអំណោយ)</label>
            <input style={S.input} type="number" placeholder="0" value={giftQty} onChange={e=>setGiftQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Gift unit price (ថ្លៃ/ឯកតា) — KHR</label>
            <input style={S.input} type="number" placeholder="0" value={giftPrice} onChange={e=>setGiftPrice(e.target.value)} />
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Credit qty (ចំនួនជំពាក់)</label>
            <input style={S.input} type="number" placeholder="0" value={creditQty} onChange={e=>setCreditQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Credit unit price (ថ្លៃ/ឯកតា) — KHR</label>
            <input style={S.input} type="number" placeholder="0" value={creditPrice} onChange={e=>setCreditPrice(e.target.value)} />
          </div>
        </div>

        <div style={S.note}>
          <strong>Rate applied:</strong> {rateLabel} on {SPECIAL_TAX_RATES[goodsType]?.label}
          {sourceType==="local" && <> &nbsp;|&nbsp; Base = 90% × (price ÷ 110% ÷ {((1+rate)*100).toFixed(0)}%)</>}
          {sourceType==="imported" && <> &nbsp;|&nbsp; Base = customs value including import duty</>}
          {sourceType==="service" && <> &nbsp;|&nbsp; Base = invoice amount ÷ (1 + 10% + {rateLabel})</>}
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករ — Calculate Special Tax</button>

      {result && (
        <>
          {/* METRICS */}
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>Total Revenue (ចំណូលសរុប)</div><div style={S.mVal}>{money(result.totalRev)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>Tax Base (មូលដ្ឋានគិតអាករ)</div><div style={S.mVal}>{money(result.base)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>Special Tax ({(result.rate*100).toFixed(0)}%)</div><div style={S.mValRed}>{money(result.tax)}</div></div>
          </div>

          {/* BAR */}
          <div style={S.card}>
            <div style={S.cardTitle}>Special Tax vs Revenue</div>
            <div style={S.barTrack}>
              <div style={{width:taxPct.toFixed(1)+"%", background:"#c0392b", height:"100%", transition:"width .4s"}} />
              <div style={{width:(100-taxPct).toFixed(1)+"%", background:"#1a7a4a", height:"100%", transition:"width .4s"}} />
            </div>
            <div style={S.barLabels}>
              <span>🔴 Special Tax: {taxPct.toFixed(1)}%</span>
              <span>🟢 Net revenue: {(100-taxPct).toFixed(1)}%</span>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={S.card}>
            <div style={S.cardTitle}>Deduction Breakdown (ការគណនាមូលដ្ឋានគិតអាករ)</div>
            <div style={S.dedRow}><span>Sales revenue</span><span style={S.dedVal}>{money(result.saleTotal)}</span></div>
            {result.giftTotal > 0 && <div style={S.dedRow}><span>Gift revenue (taxable at market price)</span><span style={S.dedVal}>+ {money(result.giftTotal)}</span></div>}
            {result.creditTotal > 0 && <div style={S.dedRow}><span>Credit sales revenue</span><span style={S.dedVal}>+ {money(result.creditTotal)}</span></div>}
            <div style={S.dedRow}><span>Total taxable revenue</span><span style={S.dedVal}>{money(result.totalRev)}</span></div>
            <div style={S.dedRow}><span>Tax base (after formula)</span><span style={S.dedVal}>{money(result.base)}</span></div>
            <div style={S.dedTotal}><span>Special Tax Due</span><span style={S.dedValRed}>{money(result.tax)}</span></div>
            <div style={S.note}>
              {result.sourceType==="local" && "Local goods: Base = 90% × (total revenue ÷ 110% ÷ (1+rate))"}
              {result.sourceType==="imported" && "Imported goods: Base = customs value including import duty"}
              {result.sourceType==="service" && "Services: Base = invoice ÷ (1 + VAT rate + special tax rate)"}
              <br/>Pay by the <strong>20th of the following month</strong>.
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
        <strong>អ្វីជាអាករស្នាក់នៅ?</strong> អាករ <strong>2%</strong> អនុវត្តលើ <strong>សណ្ឋាគារដែលជាប់ពន្ធ</strong>
        (Hotel · Apartment Hotel · Suite · Resort · Motel · Lodge · Bungalow · Guest House).<br/>
        Base = ចំណូលបន្ទប់ + ចំណូលបន្ទប់ប្រជុំ (ភោជនីយដ្ឋានដកចេញ) &nbsp;·&nbsp; Tax = Base × 2%
      </div>

      {/* FORM */}
      <div style={S.card}>
        <div style={S.cardTitle}>Price Type (ប្រភេទតម្លៃ)</div>
        <div style={S.field}>
          <label style={S.label}>Does the room price include taxes? (តម្លៃបន្ទប់រួមអាករ?)</label>
          <select style={S.select} value={priceType} onChange={e=>{setPriceType(e.target.value);setResult(null);}}>
            <option value="excl">No — price excludes all taxes (មិនរួម VAT & អាករស្នាក់នៅ)</option>
            <option value="incl">Yes — price includes VAT + Accommodation Tax (រួម)</option>
          </select>
        </div>

        <div style={S.cardTitle}>Revenue (ចំណូល) — KHR/month</div>
        <div style={S.field}>
          <label style={S.label}>Room revenue for accommodation (ចំណូលបន្ទប់) — KHR</label>
          <input style={S.input} type="number" placeholder="ឧទាហរណ៍៖ 25000000" value={roomRev} onChange={e=>setRoomRev(e.target.value)} />
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Conference / meeting room revenue — KHR</label>
            <input style={S.input} type="number" placeholder="0" value={confRev} onChange={e=>setConfRev(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Restaurant revenue (ភោជនីយដ្ឋាន — NOT taxed) — KHR</label>
            <input style={S.input} type="number" placeholder="0" value={restRev} onChange={e=>setRestRev(e.target.value)} />
          </div>
        </div>
        <div style={S.note}>
          Accommodation Tax (2%) applies to <strong>room + conference room revenue only</strong>.
          Restaurant revenue is <strong>excluded</strong>.<br/>
          Formula: Base = revenue ÷ (1 + 10% + 2%) when price is inclusive.
        </div>
      </div>

      <button style={S.btn} onClick={calculate}>គណនាអាករ — Calculate Accommodation Tax</button>

      {result && (
        <>
          {/* METRICS */}
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>Tax Base (មូលដ្ឋានគិតអាករ)</div><div style={S.mVal}>{money(result.base)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>Accommodation Tax (2%)</div><div style={S.mValRed}>{money(result.accomTax)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>VAT (10%)</div><div style={S.mVal}>{money(result.vat)}</div></div>
          </div>

          {/* BAR */}
          <div style={S.card}>
            <div style={S.cardTitle}>Accommodation Tax vs Revenue</div>
            <div style={S.barTrack}>
              <div style={{width:taxPct.toFixed(1)+"%", background:"#c0392b", height:"100%", transition:"width .4s"}} />
              <div style={{width:(100-taxPct).toFixed(1)+"%", background:"#1a7a4a", height:"100%", transition:"width .4s"}} />
            </div>
            <div style={S.barLabels}>
              <span>🔴 Accommodation Tax: {taxPct.toFixed(1)}%</span>
              <span>🟢 Net: {(100-taxPct).toFixed(1)}%</span>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={S.card}>
            <div style={S.cardTitle}>Deduction Breakdown (ការគណនាមូលដ្ឋានគិតអាករ)</div>
            <div style={S.dedRow}><span>Room revenue (ចំណូលបន្ទប់)</span><span style={S.dedVal}>{money(result.room)}</span></div>
            {result.conf > 0 && <div style={S.dedRow}><span>Conference room revenue</span><span style={S.dedVal}>+ {money(result.conf)}</span></div>}
            {result.rest > 0 && <div style={S.dedRow}><span>Restaurant revenue (excluded ✗)</span><span style={{color:"#9ca3af", fontWeight:500}}>{money(result.rest)}</span></div>}
            <div style={S.dedRow}><span>Taxable base</span><span style={S.dedVal}>{money(result.base)}</span></div>
            <div style={S.dedRow}><span>VAT (10%)</span><span style={S.dedVal}>{money(result.vat)}</span></div>
            <div style={S.dedTotal}><span>Accommodation Tax Due (2%)</span><span style={S.dedValRed}>{money(result.accomTax)}</span></div>
            <div style={S.note}>
              Total taxes payable (VAT + Accommodation Tax): <strong>{money(result.totalTax)}</strong><br/>
              Pay by the <strong>20th of the following month</strong>.
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
    { key:"plt",     label:"អាករបំភ្លឺ (PLT)",   sub:"Public Lighting · 5%" },
    { key:"special", label:"អាករពិសេស (ST)",      sub:"Special Tax on Goods & Services" },
    { key:"accom",   label:"អាករស្នាក់នៅ (AT)",   sub:"Accommodation Tax · 2%" },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* BACK BUTTON */}
        <button style={S.backBtn} onClick={() => setPage && setPage("home")}>
          ← Back Home
        </button>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.h1}> Other Taxes Calculator</div>
          <div style={S.hSub}>
            Public Lighting Tax (PLT) · Special Tax (ST) · Accommodation Tax (AT)
            &nbsp;|&nbsp;អាករបំភ្លឺ · អាករពិសេស · អាករស្នាក់នៅ
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