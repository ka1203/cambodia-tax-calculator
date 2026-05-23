import { useState, useEffect } from "react";

// ── Angkor Wat SVG silhouette (simplified towers) ─────────────
function AngkorSilhouette() {
  return (
    <svg viewBox="0 0 900 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width:"100%", opacity:0.08, position:"absolute", bottom:0, left:0, pointerEvents:"none" }}>
      {/* base ground */}
      <rect x="0" y="155" width="900" height="25" fill="white"/>
      {/* outer walls */}
      <rect x="20" y="130" width="860" height="25" fill="white"/>
      {/* left small tower */}
      <rect x="80" y="95" width="30" height="60" fill="white"/>
      <polygon points="80,95 95,60 110,95" fill="white"/>
      <polygon points="85,60 95,40 105,60" fill="white"/>
      {/* left mid tower */}
      <rect x="180" y="80" width="40" height="75" fill="white"/>
      <polygon points="178,80 200,42 222,80" fill="white"/>
      <polygon points="185,42 200,18 215,42" fill="white"/>
      {/* CENTER MAIN TOWER */}
      <rect x="370" y="50" width="80" height="105" fill="white"/>
      <polygon points="365,50 410,5 455,50" fill="white"/>
      <polygon points="378,5 410,0 442,5 410,0" fill="white"/>
      {/* right mid tower */}
      <rect x="580" y="80" width="40" height="75" fill="white"/>
      <polygon points="578,80 600,42 622,80" fill="white"/>
      <polygon points="585,42 600,18 615,42" fill="white"/>
      {/* right small tower */}
      <rect x="690" y="95" width="30" height="60" fill="white"/>
      <polygon points="690,95 705,60 720,95" fill="white"/>
      <polygon points="695,60 705,40 715,60" fill="white"/>
      {/* connecting walls */}
      <rect x="110" y="120" width="70" height="15" fill="white"/>
      <rect x="220" y="110" width="150" height="15" fill="white"/>
      <rect x="450" y="110" width="130" height="15" fill="white"/>
      <rect x="720" y="120" width="60" height="15" fill="white"/>
    </svg>
  );
}

// ── Cambodia GDT Logo SVG (stylised) ─────────────────────────
function GDTLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* outer circle */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#C8A400" strokeWidth="3"/>
      <circle cx="50" cy="50" r="42" fill="#0B1F4E"/>
      {/* inner gear/sun ring */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>{
        const r = 34, x = 50 + r*Math.cos(deg*Math.PI/180), y = 50 + r*Math.sin(deg*Math.PI/180);
        return <circle key={i} cx={x} cy={y} r="3" fill="#C8A400"/>;
      })}
      {/* Angkor tower simplified */}
      <rect x="44" y="30" width="12" height="30" fill="#C8A400"/>
      <polygon points="44,30 50,18 56,30" fill="#C8A400"/>
      <rect x="36" y="42" width="28" height="18" fill="#C8A400"/>
      {/* base */}
      <rect x="30" y="58" width="40" height="6" fill="#C8A400"/>
      {/* 'TAX' text ring placeholder dots */}
      <text x="50" y="82" textAnchor="middle" fill="#C8A400" fontSize="7" fontFamily="Georgia,serif" fontWeight="bold">TAXATION</text>
    </svg>
  );
}

// ── NAV ITEMS ──────────────────────────────────────────────────
const NAV_ITEMS = [
  { key:"home",        label:"ទំព័រដើម Home" },
  { key:"cambodiaTaxCalc", label:"​ពន្ធរបស់កម្ពុជា Cambodia Tax" },
  { key:"salary",      label:"ពន្ធបៀវត្ស Salary Tax" },
  { key:"vat",         label:"អាករ VAT" },
  { key:"OtherTaxpage",label:"ពន្ធផ្សេង Other Tax" },
  { key:"indirect",    label:"ពន្ធប្រយោល Indirect Tax" },
  { key:"prepayment",  label:"ប្រាក់ជាមុន Prepayment" },
];

// ── SERVICE CARDS DATA ────────────────────────────────────────
const SERVICES = [
  {
    page:"salary", icon:"💼", color:"#1565C0", bg:"#E3F2FD", border:"#90CAF9",
    title:"Salary Tax", titleKh:"ពន្ធលើប្រាក់បៀវត្ស",
    desc:"Progressive tax 0–20% for residents, flat 20% for non-residents.",
    tag:"TAX-02",
  },
  {
    page:"vat", icon:"🧾", color:"#2E7D32", bg:"#E8F5E9", border:"#A5D6A7",
    title:"VAT", titleKh:"អាករលើតម្លៃបន្ថែម",
    desc:"Value Added Tax 10% on taxable goods and services.",
    tag:"TAX-04",
  },
  {
    page:"OtherTaxpage", icon:"🏮", color:"#E65100", bg:"#FFF3E0", border:"#FFCC80",
    title:"Other Taxes", titleKh:"ពន្ធផ្សេងៗ",
    desc:"Public Lighting 5% · Special Tax · Accommodation Tax 2%.",
    tag:"TAX-03",
  },
  {
    page:"indirect", icon:"📦", color:"#6A1B9A", bg:"#F3E5F5", border:"#CE93D8",
    title:"Indirect Tax", titleKh:"ពន្ធប្រយោល",
    desc:"Indirect tax calculator for goods and services.",
    tag:"TAX-05",
  },
  {
    page:"prepayment", icon:"💰", color:"#00695C", bg:"#E0F2F1", border:"#80CBC4",
    title:"Prepayment Tax", titleKh:"ពន្ធប្រាក់ជាមុន",
    desc:"Monthly prepayment of profit tax obligations.",
    tag:"TAX-06",
  },
  {
    page:"cambodiaTaxCalc", icon:"📋", color:"#4E342E", bg:"#EFEBE9", border:"#BCAAA4",
    title:"Cambodia Tax Calculator", titleKh:"ការគណនា​ពន្ធរបស់កម្ពុជា",
    desc:"Annual patent / business registration tax.",
    tag:"TAX-01",
  },
];

// ── STAT COUNTER ──────────────────────────────────────────────
function StatCounter({ end, suffix, label }) {
  const [count, setCount] = useState(0);
  useEffect(()=>{
    let start = 0;
    const step = Math.ceil(end / 60);
    const t = setInterval(()=>{
      start += step;
      if (start >= end) { setCount(end); clearInterval(t); }
      else setCount(start);
    }, 25);
    return ()=>clearInterval(t);
  }, [end]);
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:32, fontWeight:800, color:"#C8A400", fontFamily:"Georgia,serif" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:4 }}>{label}</div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function HomePage({ setPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  function go(key) {
    setActiveNav(key);
    setMobileMenuOpen(false);
    setPage(key);
  }

  return (
    <div style={{ fontFamily:"'Georgia', 'Times New Roman', serif", background:"#F4F6FA", minHeight:"100vh" }}>

      {/* ── GOV TOP BANNER ── */}
      <div style={{ background:"#8B0000", color:"white", fontSize:12, padding:"4px 0", textAlign:"center", letterSpacing:"0.08em" }}>
        ព្រះរាជាណាចក្រកម្ពុជា — KINGDOM OF CAMBODIA &nbsp;·&nbsp; Nation Religion King — ជាតិ សាសនា ព្រះមហាក្សត្រ
      </div>

      {/* ── TOP INFO BAR ── */}
      <div style={{ background:"#0B1F4E", color:"white", padding:"8px 0", borderBottom:"2px solid #C8A400" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <GDTLogo size={42}/>
            <div>
              <div style={{ fontSize:15, fontWeight:700, letterSpacing:"0.03em" }}>អគ្គនាយកដ្ឋានពន្ធដារ</div>
              <div style={{ fontSize:12, opacity:0.75 }}>General Department of Taxation — Ministry of Economy and Finance</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:20, fontSize:12, opacity:0.8, alignItems:"center" }}>
            <span>📞 1277</span>
            <span>🌐 www.tax.gov.kh</span>
            <span style={{ background:"#C8A400", color:"#0B1F4E", padding:"3px 10px", borderRadius:4, fontWeight:700, fontSize:11 }}>
              Academic Tool — ITC 2025–2026
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav style={{ background:"#162A63", boxShadow:"0 2px 12px rgba(0,0,0,0.3)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", height:52 }}>
          {NAV_ITEMS.map(item=>(
            <button key={item.key}
              onClick={()=>go(item.key)}
              style={{
                background: activeNav===item.key ? "#C8A400" : "transparent",
                color: activeNav===item.key ? "#0B1F4E" : "rgba(255,255,255,0.85)",
                border:"none", cursor:"pointer", padding:"6px 16px", borderRadius:6,
                fontSize:13, fontWeight: activeNav===item.key ? 700 : 400,
                fontFamily:"Georgia,serif", transition:"all .2s", marginRight:2,
                whiteSpace:"nowrap",
              }}
            >{item.label}</button>
          ))}
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <div style={{
        background:"linear-gradient(135deg, #0B1F4E 0%, #162A63 55%, #1a3a7a 100%)",
        position:"relative", overflow:"hidden", padding:"64px 24px 80px",
      }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"rgba(200,164,0,0.06)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-60, left:-60, width:300, height:300, borderRadius:"50%", background:"rgba(200,164,0,0.06)", pointerEvents:"none" }}/>
        {/* gold border top */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg, transparent, #C8A400, transparent)" }}/>

        <AngkorSilhouette />

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", flexWrap:"wrap" }}>

            {/* LEFT */}
            <div>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(200,164,0,0.15)", border:"1px solid rgba(200,164,0,0.4)",
                padding:"6px 16px", borderRadius:20, marginBottom:20,
              }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#C8A400", display:"inline-block" }}/>
                <span style={{ color:"#C8A400", fontSize:13, fontWeight:600, letterSpacing:"0.06em" }}>
                  CAMBODIA TAX EDUCATION PORTAL
                </span>
              </div>

              <h1 style={{ color:"white", fontSize:"clamp(28px,4vw,52px)", fontWeight:800, lineHeight:1.15, margin:"0 0 8px" }}>
                វិបផតសាលពន្ធដារ
              </h1>
              <h2 style={{ color:"#C8A400", fontSize:"clamp(20px,3vw,38px)", fontWeight:700, lineHeight:1.2, margin:"0 0 20px" }}>
                Cambodia Tax Portal
              </h2>
              <p style={{ color:"rgba(255,255,255,0.75)", fontSize:16, lineHeight:1.8, maxWidth:540, margin:"0 0 32px" }}>
                ប្រព័ន្ធការគណនាពន្ធសម្រាប់ការសិក្សាជំនាញវិស្វករ — Economy for Engineers, ITC · Academic Year 2025–2026.
                Built on Cambodia's official tax law (GDT) and Sub-decree 48 (2024).
              </p>

              {/* CTA BUTTONS */}
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {[
                  { page:"salary", label:"💼 Salary Tax", bg:"#C8A400", color:"#0B1F4E" },
                  { page:"vat",    label:"🧾 VAT",         bg:"white",   color:"#0B1F4E" },
                  { page:"OtherTaxpage", label:"🏮 Other Tax", bg:"transparent", color:"white", border:"1px solid rgba(255,255,255,0.4)" },
                ].map(b=>(
                  <button key={b.page} onClick={()=>go(b.page)} style={{
                    background:b.bg, color:b.color, border:b.border||"none",
                    padding:"12px 24px", borderRadius:10, fontWeight:700, fontSize:14,
                    cursor:"pointer", fontFamily:"Georgia,serif", transition:"transform .15s, box-shadow .15s",
                    boxShadow:"0 4px 14px rgba(0,0,0,0.25)",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.35)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,0.25)"; }}
                  >{b.label}</button>
                ))}
              </div>
            </div>

            {/* RIGHT — ANNOUNCEMENT CARD */}
            <div style={{ minWidth:280, maxWidth:320 }}>
              <div style={{
                background:"rgba(255,255,255,0.06)", border:"1px solid rgba(200,164,0,0.25)",
                backdropFilter:"blur(10px)", borderRadius:16, overflow:"hidden",
              }}>
                <div style={{ background:"rgba(200,164,0,0.15)", padding:"14px 20px", borderBottom:"1px solid rgba(200,164,0,0.2)", display:"flex", alignItems:"center", gap:10 }}>
                  <GDTLogo size={32}/>
                  <div>
                    <div style={{ color:"#C8A400", fontSize:11, fontWeight:700, letterSpacing:"0.06em" }}>OFFICIAL NOTICE</div>
                    <div style={{ color:"white", fontSize:13, fontWeight:600 }}>GDT Announcement</div>
                  </div>
                </div>
                <div style={{ padding:"16px 20px" }}>
                  <div style={{ color:"rgba(255,255,255,0.9)", fontSize:13, lineHeight:1.7, marginBottom:14 }}>
                    📢 Please submit salary tax declarations before the <strong style={{color:"#C8A400"}}>20th of each month</strong>.
                    Late submission incurs penalties per the Law on Taxation 1997.
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["TAX-02","TAX-03","VAT","PLT","AT"].map(tag=>(
                      <span key={tag} style={{ background:"rgba(200,164,0,0.2)", border:"1px solid rgba(200,164,0,0.3)", color:"#C8A400", fontSize:11, padding:"2px 8px", borderRadius:4, fontWeight:700 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* STATS ROW */}
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1,
            background:"rgba(200,164,0,0.2)", borderRadius:12, marginTop:48,
            overflow:"hidden", border:"1px solid rgba(200,164,0,0.2)",
          }}>
            {[
              { end:6,    suffix:"",  label:"Tax Modules" },
              { end:2024, suffix:"",  label:"Sub-decree Year" },
              { end:20,   suffix:"%", label:"Max Tax Rate" },
              { end:100,  suffix:"%", label:"Based on GDT Law" },
            ].map((s,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.04)", padding:"20px 16px" }}>
                <StatCounter {...s}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICE CARDS ── */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-block", background:"#E8ECF5", color:"#0B1F4E", padding:"5px 18px", borderRadius:20, fontSize:12, fontWeight:700, letterSpacing:"0.06em", marginBottom:12 }}>
            TAX CALCULATORS
          </div>
          <h2 style={{ fontSize:32, fontWeight:800, color:"#0B1F4E", margin:"0 0 10px", fontFamily:"Georgia,serif" }}>
            ប្រព័ន្ធគណនាពន្ធ
          </h2>
          <p style={{ fontSize:15, color:"#6b7280", maxWidth:520, margin:"0 auto" }}>
            Select a tax module below to calculate your tax obligations based on Cambodia tax law.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {SERVICES.map(svc=>(
            <div key={svc.page}
              onClick={()=>go(svc.page)}
              style={{
                background:"white", borderRadius:16, border:`1.5px solid ${svc.border}`,
                padding:24, cursor:"pointer", transition:"all .2s", position:"relative", overflow:"hidden",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 32px ${svc.border}80`; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
            >
              {/* top accent bar */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:svc.color }}/>
              {/* tag */}
              <div style={{ position:"absolute", top:14, right:14, background:svc.bg, color:svc.color, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:4, border:`1px solid ${svc.border}` }}>
                {svc.tag}
              </div>

              <div style={{ width:56, height:56, borderRadius:14, background:svc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:16 }}>
                {svc.icon}
              </div>
              <div style={{ fontSize:18, fontWeight:700, color:"#0B1F4E", marginBottom:2 }}>{svc.title}</div>
              <div style={{ fontSize:13, color:svc.color, fontWeight:600, marginBottom:8 }}>{svc.titleKh}</div>
              <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>{svc.desc}</div>
              <div style={{ marginTop:16, display:"flex", alignItems:"center", gap:6, color:svc.color, fontSize:13, fontWeight:700 }}>
                Open Calculator <span style={{ fontSize:16 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background:"#0B1F4E", padding:"56px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg, transparent, #C8A400, transparent)" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <h2 style={{ color:"white", fontSize:28, fontWeight:800, margin:"0 0 8px" }}>How It Works</h2>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:14 }}>Three simple steps to calculate your tax</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              { step:"01", icon:"📂", title:"Select Tax Type", desc:"Choose the tax module that matches your transaction — salary, VAT, PLT, special tax or accommodation." },
              { step:"02", icon:"✏️", title:"Enter Your Data", desc:"Input your income, allowances, deductions, or revenue figures. All fields clearly labeled in Khmer & English." },
              { step:"03", icon:"📊", title:"Get Instant Results", desc:"View detailed breakdown: tax base, rate applied, formula, and final tax amount — with a visual bar chart." },
            ].map((s,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(200,164,0,0.2)", borderRadius:14, padding:28, textAlign:"center" }}>
                <div style={{ color:"#C8A400", fontSize:36, fontWeight:800, fontFamily:"Georgia,serif", opacity:0.4, marginBottom:8 }}>{s.step}</div>
                <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
                <div style={{ color:"white", fontSize:16, fontWeight:700, marginBottom:8 }}>{s.title}</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, lineHeight:1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#08152E", color:"rgba(255,255,255,0.6)", fontSize:12, padding:"24px", textAlign:"center", borderTop:"2px solid #C8A400" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <GDTLogo size={28}/>
            <span>General Department of Taxation · Ministry of Economy and Finance · Kingdom of Cambodia</span>
          </div>
          <div style={{ display:"flex", gap:16 }}>
            <span>ITC · Economy for Engineers</span>
            <span style={{ color:"#C8A400" }}>Academic Year 2025–2026</span>
            <span>Lecturer: Mr. TOUCH Sopheak</span>
          </div>
        </div>
      </footer>

    </div>
  );
}