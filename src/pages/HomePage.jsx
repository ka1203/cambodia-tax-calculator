import { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "ទំព័រដើម",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    id: "calculate",
    label: "គណនា",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/>
        <line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/>
      </svg>
    ),
  },
  {
    id: "about",
    label: "អំពីយើង",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="8.01"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
      </svg>
    ),
  },
];

const SERVICES = [
  { page: "salary",          emoji: "💼", title: "ពន្ធលើប្រាក់បៀវត្ស",            desc: "គណនាពន្ធលើប្រាក់បៀវត្សតាមច្បាប់ពន្ធ។",                       color: "#EFF6FF", accent: "#1D4ED8" },
  { page: "vat",             emoji: "🧾", title: "អាករលើតម្លៃបន្ថែម (VAT)",      desc: "គណនា VAT លើទំនិញ និងសេវាកម្ម ១០%។",                          color: "#F0FDF4", accent: "#10B981" },
  { page: "OtherTaxpage",    emoji: "🏮", title: "ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ", desc: "គណនាអត្រាប្រាក់រំដោះពន្ធ",                                    color: "#FFF7ED", accent: "#F97316" },
  { page: "cambodiaTaxCalc", emoji: "📋", title: "ពន្ធទូទៅ",                      desc: "ការចុះបញ្ជី និងគណនាពន្ធប៉ាតង់អាជីវកម្មនិងពន្ធផ្សេងៗ។",       color: "#F5F3FF", accent: "#7C3AED" },
  { page: "plt",             emoji: "📊", title: "ពន្ធអាករបំភ្លឺ (PLT)",          desc: "គណនាពន្ធអាករបំភ្លឺសាធារណៈ ៥%។",                              color: "#EFF6FF", accent: "#1D4ED8" },
  { page: "taxCalculator",   emoji: "🧮", title: "ពន្ធកាត់ទុក (WHT)",             desc: "គណនាពន្ធកាត់ទុកលើប្រាក់ និងសេវាកម្ម។",                       color: "#FFF1F2", accent: "#E11D48" },
  { page: "ST",              emoji: "💎", title: "ពន្ធអាករពិសេស (ST)",            desc: "គណនាពន្ធអាករពិសេសសម្រាប់ទំនិញ។",                             color: "#ECFDF5", accent: "#10B981" },
  { page: "AT",              emoji: "🏨", title: "ពន្ធស្នាក់នៅ (AT)",              desc: "គណនាពន្ធស្នាក់នៅ ២% លើការស្នាក់នៅ។",                         color: "#FFFBEB", accent: "#D97706" },
  { page: "Tax06IncomeTax",  emoji: "🧾", title: "ពន្ធលើប្រាក់ចំណូល",             desc: "គណនាវិសាលភាពពន្ធលើប្រាក់ចំណូល",                              color: "#FFF1F2", accent: "#E11D48" },
  { page: "land_dont_use",   emoji: "🌾", title: "ពន្ធលើដីធ្លីមិនបានប្រើប្រាស់",   desc: "គណនាពន្ធលើដីធ្លីមិនបានប្រើប្រាស់",                            color: "#F0FDF4", accent: "#10B981" },
  { page: "prothab_tax",     emoji: "🏭", title: "ពន្ធប្រថាប់ត្រា",                desc: "គណនាពន្ធដែលត្រូវបង់នៅពេលមានការទិញ-លក់ ដោះដូរ ឬធ្វើអំណោយ", color: "#F5F3FF", accent: "#7C3AED" },
  { page: "advertiment",     emoji: "📢", title: "ពន្ធលើការផ្សាយពាណិជ្ជកម្ម",      desc: "គណនាពន្ធលើការផ្សាយពាណិជ្ជកម្ម",                              color: "#FFFBEB", accent: "#D97706" },
  { page: "transport_tax",   emoji: "🚗", title: "ពន្ធលើមធ្យោបាយដឹកជញ្ជូន",       desc: "គណនាពន្ធលើយានយន្ត",                                          color: "#ECFDF5", accent: "#10B981" },
];

export default function HomePage({ setPage }) {
  const [activeNav, setActiveNav] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const go = (pageKey) => {
    const isSidebarTab = NAV_ITEMS.some((n) => n.id === pageKey);
    if (isSidebarTab) {
      setActiveNav(pageKey);
    } else {
      if (setPage) setPage(pageKey);
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && setSidebarOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div style={{ fontFamily:"'Battambang',serif", background:"#F0F4FF", minHeight:"100vh", display:"flex" }}>
      <GlobalStyles />

      {/* Hamburger */}
      <button className="hamburger-btn" onClick={() => setSidebarOpen(v => !v)} aria-label="menu">
        {sidebarOpen
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
        }
      </button>

      {sidebarOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.35)", zIndex:190, backdropFilter:"blur(2px)" }}
          onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar activeNav={activeNav} go={go} className="sidebar-desktop"
        style={{ position:"fixed", top:0, left:0, height:"100vh", width:220, zIndex:200 }} />

      {sidebarOpen && (
        <Sidebar activeNav={activeNav} go={go} className="sidebar-mobile"
          style={{ position:"fixed", top:0, left:0, height:"100vh", width:220, zIndex:210 }} />
      )}

      <main className="main-content" style={{ marginLeft:220, flex:1, minWidth:0, overflowX:"hidden" }}>
        {activeNav === "home"      && <HomeContent go={go} />}
        {activeNav === "calculate" && <ServicesGrid setPage={setPage} />}
        {activeNav === "about"     && <AboutContent />}
      </main>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ activeNav, go, className, style }) {
  return (
    <aside className={className} style={{
      ...style,
      background:"#fff",
      borderRight:"1px solid #E5E7EB",
      boxShadow:"2px 0 16px rgba(0,0,0,0.05)",
      display:"flex",
      flexDirection:"column",
    }}>
      {/* Logo area */}
      <div onClick={() => go("home")} style={{ padding:"28px 20px 24px", cursor:"pointer", borderBottom:"1px solid #F3F4F6", display:"flex", alignItems:"center", gap:12 }}>
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none" style={{ flexShrink:0 }}>
          <rect width="40" height="40" rx="11" fill="#1D4ED8"/>
          <path d="M20 6L32 13V27L20 34L8 27V13L20 6Z" fill="none" stroke="#93C5FD" strokeWidth="1.2"/>
          <path d="M20 10L28 14.5V24L20 28.5L12 24V14.5L20 10Z" fill="#3B82F6" opacity="0.7"/>
          <text x="20" y="23" textAnchor="middle" fontFamily="serif" fontWeight="700" fontSize="11" fill="#fff">ពន្ធ</text>
        </svg>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:"#1D4ED8", lineHeight:1.3 }}>ប្រព័ន្ធគណនាពន្ធឆ្លាតវៃ</div>
          <div style={{ fontSize:10, color:"#9CA3AF", marginTop:2 }}>Cambodia Tax System</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding:"16px 12px", flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#C4C9D4", letterSpacing:"0.1em", textTransform:"uppercase", paddingLeft:10, marginBottom:8 }}>
          ម៉ឺនុយ
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`snl${activeNav === item.id ? " snl-active" : ""}`}
            onClick={() => go(item.id)}
          >
            <span className="snl-icon">{item.icon}</span>
            <span style={{ flex:1 }}>{item.label}</span>
            {activeNav === item.id && <span className="snl-dot" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ margin:"0 12px 20px", background:"#F0F4FF", borderRadius:12, padding:"16px 14px", textAlign:"center" }}>
        <div style={{ fontSize:20, marginBottom:6 }}>🇰🇭</div>
        <div style={{ fontSize:11, color:"#1D4ED8", fontWeight:700, lineHeight:1.6 }}>ប្រព័ន្ធពន្ធ ២០២៦</div>
        <div style={{ fontSize:10, color:"#9CA3AF", marginTop:2 }}>ឥតគិតថ្លៃ · ត្រឹមត្រូវ · លឿន</div>
      </div>
    </aside>
  );
}

// ── Home — full viewport, no scroll ──────────────────────────────────────────
function HomeContent({ go }) {
  return (
    <div style={{
      height:"100vh", overflow:"hidden",
      background:"linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 55%,#E0F2FE 100%)",
      position:"relative", display:"flex", alignItems:"center",
    }}>
      <div className="hblob" style={{ width:420, height:420, background:"#BFDBFE", top:-120, right:-60 }} />
      <div className="hblob" style={{ width:280, height:280, background:"#BAE6FD", bottom:-80, left:-60 }} />

      <div style={{
        width:"100%", maxWidth:1000, margin:"0 auto",
        padding:"0 56px",
        display:"grid", gridTemplateColumns:"1fr auto",
        gap:48, alignItems:"center", position:"relative", zIndex:2,
      }}>
        {/* Left text */}
        <div className="slide-left">
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#DBEAFE", color:"#1D4ED8", padding:"6px 16px", borderRadius:999, fontSize:12, fontWeight:700, marginBottom:22 }}>
            <span>🇰🇭</span> ប្រព័ន្ធពន្ធកម្ពុជា ឆ្នាំ២០២៦
          </div>

          {/* Heading */}
          <h1 style={{ fontSize:"clamp(26px,3.2vw,46px)", fontWeight:700, color:"#0F172A", lineHeight:1.4, marginBottom:16 }}>
            ប្រព័ន្ធគណនា<br/>
            <span style={{ color:"#1D4ED8" }}>ពន្ធឆ្លាតវៃ</span>
          </h1>

          {/* Description */}
          <p style={{ fontSize:14, color:"#4B5563", lineHeight:2, maxWidth:420, marginBottom:30 }}>
            គណនាពន្ធកម្ពុជាបានយ៉ាងងាយស្រួល និងត្រឹមត្រូវ
            សម្រាប់សិស្ស និយោជិត និងអាជីវកម្ម។
          </p>

          {/* CTA */}
          <button className="btn-p" onClick={() => go("calculate")}>
            ចាប់ផ្ដើមគណនា 
          </button>

          
          {/* Stats */}
          <div style={{ display:"flex", gap:0, marginTop:36, borderTop:"1px solid #DBEAFE", paddingTop:24 }}>
            {[
              { num:"១៣", label:"ប្រភេទពន្ធ" },
              { num:"១០០%", label:"ត្រឹមត្រូវ" },
              { num:"២០២៦", label:"ច្បាប់ថ្មី" },
              { num:"ឥតគិតថ្លៃ", label:"ប្រើប្រាស់" },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex:1, textAlign:"center",
                borderRight: i < 3 ? "1px solid #DBEAFE" : "none",
                padding:"0 8px",
              }}>
                <div style={{ fontSize:18, fontWeight:700, color:"#1D4ED8" }}>{s.num}</div>
                <div style={{ fontSize:11, color:"#6B7280", marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right illustration */}
        <div className="slide-right float-anim" style={{ flexShrink:0 }}>
          <div style={{ position:"relative", width:280, height:280 }}>
            <svg className="spin-ring" style={{ position:"absolute", top:0, left:0 }} width="280" height="280" viewBox="0 0 280 280">
              <circle cx="140" cy="140" r="126" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="12 8" opacity="0.6"/>
            </svg>
            <div style={{
              position:"absolute", top:24, left:24, width:232, height:232,
              borderRadius:"50%",
              background:"#fff",
              boxShadow:"0 16px 48px rgba(37,99,235,0.18)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
                <polygon points="100,12 178,56 178,144 100,188 22,144 22,56" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="3"/>
                <polygon points="100,28 163,63 163,137 100,172 37,137 37,63" fill="#DBEAFE"/>
                <rect x="65" y="55" width="70" height="88" rx="8" fill="#1D4ED8"/>
                <rect x="72" y="63" width="56" height="22" rx="4" fill="#E0F2FE"/>
                <text x="100" y="79" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="13" fill="#1D4ED8">TAX</text>
                <rect x="72" y="93" width="14" height="10" rx="2" fill="#3B82F6"/>
                <rect x="90" y="93" width="14" height="10" rx="2" fill="#3B82F6"/>
                <rect x="108" y="93" width="14" height="10" rx="2" fill="#60A5FA"/>
                <rect x="72" y="108" width="14" height="10" rx="2" fill="#3B82F6"/>
                <rect x="90" y="108" width="14" height="10" rx="2" fill="#3B82F6"/>
                <rect x="108" y="108" width="14" height="10" rx="2" fill="#10B981"/>
                <rect x="72" y="123" width="32" height="10" rx="2" fill="#6366F1"/>
                <rect x="108" y="123" width="14" height="10" rx="2" fill="#3B82F6"/>
                <ellipse cx="148" cy="128" rx="16" ry="6" fill="#FCD34D"/>
                <rect x="132" y="113" width="32" height="15" rx="2" fill="#F59E0B"/>
                <ellipse cx="148" cy="113" rx="16" ry="6" fill="#FCD34D"/>
                <rect x="132" y="100" width="32" height="13" rx="2" fill="#F59E0B"/>
                <ellipse cx="148" cy="100" rx="16" ry="6" fill="#FDE68A"/>
                <polyline points="40,150 55,130 70,140 85,115" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <polygon points="85,105 92,120 78,120" fill="#10B981"/>
              </svg>
            </div>
            <div style={{ position:"absolute", top:4, right:-8, background:"#fff", borderRadius:10, padding:"6px 11px", boxShadow:"0 4px 14px rgba(0,0,0,0.1)", fontSize:11, color:"#1D4ED8", fontWeight:700, whiteSpace:"nowrap" }}>💰 VAT ១០%</div>
            <div style={{ position:"absolute", bottom:14, left:-8, background:"#fff", borderRadius:10, padding:"6px 11px", boxShadow:"0 4px 14px rgba(0,0,0,0.1)", fontSize:11, color:"#10B981", fontWeight:700, whiteSpace:"nowrap" }}>✅ ត្រឹមត្រូវ ១០០%</div>
            <div style={{ position:"absolute", top:"38%", right:-18, background:"#1D4ED8", color:"#fff", borderRadius:10, padding:"6px 11px", boxShadow:"0 4px 14px rgba(29,78,216,0.3)", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>📋 ម៉ូឌុល ១៣+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Services grid ─────────────────────────────────────────────────────────────
function ServicesGrid({ setPage }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight:"100vh", background:"#F0F4FF", padding:"44px 40px 64px" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{ display:"inline-block", background:"#DBEAFE", color:"#1D4ED8", padding:"5px 18px", borderRadius:999, fontSize:12, fontWeight:700, marginBottom:10 }}>
          កម្មវិធីគណនាពន្ធ
        </div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#0F172A", marginBottom:8 }}>ជ្រើសរើសប្រភេទពន្ធ</h2>
        <p style={{ color:"#6B7280", fontSize:13, lineHeight:1.9 }}>
          ជ្រើសរើសកម្មវិធីខាងក្រោម ដើម្បីចាប់ផ្ដើមគណនាពន្ធ
        </p>
      </div>

      <div style={{ maxWidth:1040, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:16 }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.page}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setPage && setPage(s.page)}
            style={{
              background:"#fff",
              borderRadius:16,
              padding:"20px 18px",
              border: hovered === i ? `1.5px solid ${s.accent}` : "1.5px solid #E5E7EB",
              boxShadow: hovered === i ? `0 10px 28px rgba(37,99,235,0.12)` : "0 2px 12px rgba(37,99,235,0.05)",
              cursor:"pointer",
              transform: hovered === i ? "translateY(-4px)" : "none",
              transition:"all 0.2s ease",
            }}
          >
            <div style={{
              width:48, height:48, borderRadius:13, background:s.color,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, marginBottom:12,
              transition:"transform 0.25s",
              transform: hovered === i ? "scale(1.12) rotate(-4deg)" : "none",
            }}>
              {s.emoji}
            </div>
            <h3 style={{ color:"#0F172A", fontSize:13, marginBottom:6, fontWeight:700, lineHeight:1.5 }}>{s.title}</h3>
            <p style={{ color:"#9CA3AF", fontSize:11, lineHeight:1.8 }}>{s.desc}</p>
            <div style={{ marginTop:12, display:"flex", alignItems:"center", color:s.accent, fontSize:12, fontWeight:700, gap:3 }}>
              គណនា <span style={{ fontSize:15 }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutContent() {
  const features = [
    { icon:"🎓", title:"ការអប់រំ",            desc:"ប្រព័ន្ធនេះបង្កើតឡើងដើម្បីជួយសិស្សសាលា និងអ្នកសិក្សាស្វែងយល់ពីប្រព័ន្ធពន្ធ។" },
    { icon:"⚖️", title:"ច្បាប់ ២០២៦",         desc:"ការគណនាទាំងអស់ ផ្អែកលើបទប្បញ្ញត្តិពន្ធ និងច្បាប់ថ្មីបំផុតឆ្នាំ ២០២៦។" },
    { icon:"🔒", title:"សុវត្ថិភាព",           desc:"ទិន្នន័យរបស់អ្នកមិនត្រូវបានរក្សាទុក ឬចែករំលែកទៅកន្លែងណាឡើយ។" },
    { icon:"📱", title:"ប្រើបានគ្រប់ឧបករណ៍", desc:"ប្រព័ន្ធនេះអាចប្រើបានជាមួយទូរស័ព្ទ ថេប្លេត និងកុំព្យូទ័ររបស់អ្នក។" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#F0F4FF" }}>
      {/* Top banner */}
      <div style={{ background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", padding:"48px 52px 44px", borderBottom:"1px solid #E0EAFF" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#DBEAFE", color:"#1D4ED8", padding:"6px 16px", borderRadius:999, fontSize:12, fontWeight:700, marginBottom:18 }}>
            ℹ️ អំពីយើង
          </div>
          <h1 style={{ fontSize:30, fontWeight:700, color:"#0F172A", marginBottom:14, lineHeight:1.4 }}>ប្រព័ន្ធពន្ធកម្ពុជា</h1>
          <p style={{ color:"#4B5563", fontSize:14, lineHeight:2 }}>
            ប្រព័ន្ធគណនាពន្ធកម្ពុជា ២០២៦ គឺជាឧបករណ៍ ឥតគិតថ្លៃ
            បង្កើតឡើងដើម្បីជួយប្រជាពលរដ្ឋកម្ពុជា គណនា
            និងស្វែងយល់ពីការបង់ពន្ធ។
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ maxWidth:680, margin:"0 auto", padding:"40px 52px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background:"#fff", borderRadius:16, padding:"24px 20px",
              border:"1.5px solid #E5E7EB",
              boxShadow:"0 2px 12px rgba(37,99,235,0.05)",
            }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
              <h3 style={{ color:"#0F172A", fontSize:14, marginBottom:8, fontWeight:700 }}>{f.title}</h3>
              <p style={{ color:"#6B7280", fontSize:12, lineHeight:1.9 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div style={{ background:"linear-gradient(135deg,#1D4ED8,#1e40af)", borderRadius:16, padding:"28px 32px", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:10 }}>🇰🇭</div>
          <p style={{ color:"#BFDBFE", fontSize:13, lineHeight:2 }}>
            ប្រព័ន្ធបង្កើតឡើងដើម្បីជំរុញការអប់រំពន្ធ និងភាពស្វ័យប្រវត្ត<br/>
            សម្រាប់ប្រជាពលរដ្ឋ និងអ្នកប្រកបអាជីវកម្មកម្ពុជា
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Global styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap');
      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

      @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes slideInL { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
      @keyframes slideInR { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
      @keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.3)} 50%{box-shadow:0 0 0 10px rgba(37,99,235,0)} }
      @keyframes sideIn   { from{transform:translateX(-100%)} to{transform:translateX(0)} }

      .slide-left  { animation: slideInL .65s .08s ease both; }
      .slide-right { animation: slideInR .65s .16s ease both; }
      .float-anim  { animation: floatY 4s ease-in-out infinite; }
      .spin-ring   { animation: spinSlow 18s linear infinite; transform-origin:center; }

      /* Sidebar nav button */
      .snl {
        display:flex; align-items:center; gap:10px;
        width:100%; padding:10px 14px; border-radius:10px;
        border:none; background:transparent; cursor:pointer;
        font-family:'Battambang',serif; font-size:13px; font-weight:700;
        color:#6B7280; text-align:left;
        transition:background .15s, color .15s, transform .15s;
      }
      .snl:hover { background:#F0F4FF; color:#1D4ED8; transform:translateX(2px); }
      .snl-active {
        background:#EEF2FF !important; color:#1D4ED8 !important;
        border-left:3px solid #1D4ED8;
        padding-left:11px;
      }
      .snl-active:hover { transform:none; }
      .snl-icon { display:flex; align-items:center; opacity:.7; }
      .snl-active .snl-icon { opacity:1; }
      .snl-dot { width:6px; height:6px; background:#1D4ED8; border-radius:50%; margin-left:auto; flex-shrink:0; }

      /* CTA button */
      .btn-p {
        background:#1D4ED8; color:#fff; border:none;
        padding:12px 28px; border-radius:50px; cursor:pointer;
        font-family:'Battambang',serif; font-weight:700; font-size:14px;
        animation:pulse 2.5s ease-in-out infinite;
        transition:background .2s, transform .15s;
      }
      .btn-p:hover { background:#1e40af; transform:scale(1.03); animation:none; }

      /* Blobs */
      .hblob { position:absolute; border-radius:50%; filter:blur(64px); opacity:.3; pointer-events:none; }

      /* Hamburger */
      .hamburger-btn {
        display:none; position:fixed; top:14px; left:14px; z-index:300;
        background:#1D4ED8; border:none; border-radius:10px;
        width:42px; height:42px; cursor:pointer;
        align-items:center; justify-content:center;
        box-shadow:0 4px 12px rgba(29,78,216,.4);
      }

      .sidebar-mobile { animation: sideIn .25s ease; }

      @media (max-width:768px) {
        .hamburger-btn   { display:flex; }
        .sidebar-desktop { display:none !important; }
        .main-content    { margin-left:0 !important; }
      }
    `}</style>
  );
}