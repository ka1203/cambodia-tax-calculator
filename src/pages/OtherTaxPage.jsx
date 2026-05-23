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
  beverage:     { label: "Non-alcohol Beverage (លភ្សជ្ជៈ)",    rate: 0.10 },
  cement:       { label: "Cement (សីម៉ងត៍)",                   rate: 0.05 },
  air_ticket:   { label: "Air Ticket Service (សំបុត្រយន្ត)",   rate: 0.10 },
  entertainment:{ label: "Entertainment Services (លំហែកម្សាន្ត)", rate: 0.10 },
  telecom:      { label: "Telecom Services (ទូរគមនាគមន៍)",     rate: 0.03 },
};

// ─── HELPERS ─────────────────────────────────────────────────
function n(v) { return parseFloat(v) || 0; }
function money(v) {
  const rounded = Math.round(v * 100) / 100;
  return "$" + rounded.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── SHARED STYLES (same palette/font as SalaryTaxPage) ──────
const S = {
  page:       { minHeight:"100vh", background:"#f5f7fb", padding:"32px 16px", fontFamily:"Arial, sans-serif" },
  wrap:       { maxWidth:720, margin:"0 auto" },
  backBtn:    { background:"white", border:"1px solid #d1d5db", padding:"8px 18px", borderRadius:8, fontSize:14, cursor:"pointer", color:"#374151", marginBottom:20, fontWeight:500 },
  header:     { background:"#0B1F4E", color:"white", borderRadius:12, padding:"22px 28px", marginBottom:24 },
  h1:         { fontSize:20, fontWeight:700, marginBottom:6 },
  hSub:       { fontSize:13, opacity:0.7 },
  tabRow:     { display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" },
  tab:        { padding:"8px 18px", borderRadius:20, border:"1px solid #d1d5db", fontSize:14, cursor:"pointer", background:"white", color:"#6b7280" },
  tabOn:      { padding:"8px 18px", borderRadius:20, border:"1px solid #0B1F4E", fontSize:14, cursor:"pointer", background:"#0B1F4E", color:"white" },
  card:       { background:"white", border:"1px solid #e5e7eb", borderRadius:12, padding:24, marginBottom:20 },
  cardTitle:  { fontSize:12, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:16 },
  row2:       { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  field:      { marginBottom:16 },
  label:      { display:"block", fontSize:13, color:"#6b7280", marginBottom:6 },
  input:      { width:"100%", padding:"9px 12px", fontSize:14, border:"1px solid #d1d5db", borderRadius:8, background:"white", color:"#1a1a1a", outline:"none" },
  select:     { width:"100%", padding:"9px 12px", fontSize:14, border:"1px solid #d1d5db", borderRadius:8, background:"white", color:"#1a1a1a" },
  btn:        { width:"100%", padding:12, fontSize:15, fontWeight:700, background:"#0B1F4E", color:"white", border:"none", borderRadius:10, cursor:"pointer", marginBottom:24 },
  metricGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 },
  metric:     { background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:10, padding:16, textAlign:"center" },
  mLabel:     { fontSize:12, color:"#6b7280", marginBottom:6 },
  mVal:       { fontSize:18, fontWeight:700, color:"#0B1F4E" },
  mValRed:    { fontSize:18, fontWeight:700, color:"#c0392b" },
  mValGreen:  { fontSize:18, fontWeight:700, color:"#1a7a4a" },
  barTrack:   { height:14, background:"#e5e7eb", borderRadius:7, overflow:"hidden", display:"flex", marginBottom:8 },
  barLabels:  { display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280" },
  dedRow:     { display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid #f3f4f6", fontSize:14 },
  dedTotal:   { display:"flex", justifyContent:"space-between", padding:"10px 8px", fontSize:14, fontWeight:700, background:"#f9fafb", borderRadius:6, marginTop:6 },
  dedVal:     { color:"#0B1F4E", fontWeight:600 },
  dedValRed:  { color:"#c0392b", fontWeight:700 },
  note:       { background:"#eff6ff", borderLeft:"4px solid #0B1F4E", borderRadius:6, padding:"12px 16px", fontSize:13, color:"#374151", marginTop:14 },
  infoBox:    { background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:8, padding:"14px 18px", marginBottom:20, fontSize:13, color:"#374151", lineHeight:1.7 },
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
            <label style={S.label}>Sale price (ថ្លៃលក់) — USD</label>
            <input style={S.input} type="number" placeholder="e.g. 10" value={totalPrice} onChange={e=>setTotalPrice(e.target.value)} />
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
        អត្រា: សុរា 35% · ស្រាបៀរ 30% · បារី 20% · លភ្សជ្ជៈ 10% · សីម៉ងត៍ 5% · Telecom 3% · Entertainment 10%<br/>
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

        <div style={S.cardTitle}>Sales Income (ចំណូលលក់)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Units sold (ចំនួនលក់)</label>
            <input style={S.input} type="number" placeholder="e.g. 5000" value={saleQty} onChange={e=>setSaleQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Unit price incl. taxes (ថ្លៃ/ឯកតា)</label>
            <input style={S.input} type="number" placeholder="e.g. 10" value={unitPrice} onChange={e=>setUnitPrice(e.target.value)} />
          </div>
        </div>

        <div style={S.cardTitle}>Gift / Credit Sales (អំណោយ / ជំពាក់)</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Gift qty (ចំនួនអំណោយ)</label>
            <input style={S.input} type="number" placeholder="0" value={giftQty} onChange={e=>setGiftQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Gift unit price (ថ្លៃ/ឯកតា)</label>
            <input style={S.input} type="number" placeholder="0" value={giftPrice} onChange={e=>setGiftPrice(e.target.value)} />
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Credit qty (ចំនួនជំពាក់)</label>
            <input style={S.input} type="number" placeholder="0" value={creditQty} onChange={e=>setCreditQty(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Credit unit price (ថ្លៃ/ឯកតា)</label>
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

        <div style={S.cardTitle}>Revenue (ចំណូល) — USD/month</div>
        <div style={S.field}>
          <label style={S.label}>Room revenue for accommodation (ចំណូលបន្ទប់)</label>
          <input style={S.input} type="number" placeholder="e.g. 1000" value={roomRev} onChange={e=>setRoomRev(e.target.value)} />
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>Conference / meeting room revenue (ចំណូលបន្ទប់ប្រជុំ)</label>
            <input style={S.input} type="number" placeholder="0" value={confRev} onChange={e=>setConfRev(e.target.value)} />
          </div>
          <div style={S.field}>
            <label style={S.label}>Restaurant revenue (ភោជនីយដ្ឋាន — NOT taxed)</label>
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
          <div style={S.h1}>🇰🇭 TAX-03 — Other Taxes Calculator</div>
          <div style={S.hSub}>
            Public Lighting Tax (PLT) · Special Tax (ST) · Accommodation Tax (AT)
            &nbsp;|&nbsp; ITC Economy for Engineer · 2025–2026
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