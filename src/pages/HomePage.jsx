import { useState } from "react";

const LANGUAGES = {
  kh: {
    home: "ទំព័រដើម",
    general: "ពន្ធអំពីទូទៅ",
    salary: "ពន្ធលើប្រាក់បៀវត្ស",
    vat: "អាករលើតម្លៃបន្ថែម",
    other: "ពន្ធផ្សេងៗ",
    lesson: "មេរៀន",
    platform: "ប្រព័ន្ធពន្ធកម្ពុជា",
    badge: "ប្រព័ន្ធពន្ធកម្ពុជា ឆ្នាំ២០២៦",
    heroTitle1: "ប្រព័ន្ធគណនា",
    heroTitle2: "ពន្ធឆ្លាតវៃ",
    heroDesc:
      "គណនាពន្ធកម្ពុជាបានយ៉ាងងាយស្រួល និងត្រឹមត្រូវ សម្រាប់សិស្ស និយោជិត និងអាជីវកម្ម។ បង្កើតឡើងតាមបទប្បញ្ញត្តិពន្ធកម្ពុជា និងច្បាប់ថ្មីៗ។",
    start: "ចាប់ផ្ដើមគណនា",
    learn: "សិក្សាបន្ថែម",
    statTitle: "ស្ថិតិប្រព័ន្ធ",
    modules: "ម៉ូឌុលពន្ធ",
    updated: "ច្បាប់ថ្មី",
    formula: "រូបមន្តត្រឹមត្រូវ",
    access: "សម្រាប់សិស្ស",
    calculators: "កម្មវិធីគណនាពន្ធ",
    choose: "ជ្រើសរើសកម្មវិធីខាងក្រោម ដើម្បីចាប់ផ្ដើមគណនាពន្ធ។",
  },
};

export default function HomePage({ setPage }) {
  const [activeNav, setActiveNav] = useState("home");
  const t = LANGUAGES.kh;

  // កំណត់ពុម្ពអក្សរ Khmer OS Battambong សម្រាប់គ្រប់ផ្នែកទាំងអស់
  const khmerFont = "'Khmer OS Battambong', sans-serif";

  const NAV_ITEMS = [
    { key: "home", label: t.home },
    { key: "cambodiaTaxCalc", label: t.general },
    { key: "salary", label: t.salary },
    { key: "vat", label: t.vat },
    { key: "OtherTaxpage", label: t.other },
    { key: "lesson", label: t.lesson },
  ];

  const SERVICES = [
    {
      page: "salary",
      icon: "💼",
      title: t.salary,
      desc: "គណនាពន្ធលើប្រាក់បៀវត្សតាមច្បាប់ពន្ធកម្ពុជា។",
    },
    {
      page: "vat",
      icon: "🧾",
      title: t.vat,
      desc: "គណនាអាករលើតម្លៃបន្ថែមលើទំនិញ និងសេវាកម្ម។",
    },
    {
      page: "OtherTaxpage",
      icon: "🏮",
      title: t.other,
      desc: "ពន្ធស្នាក់នៅ ពន្ធភ្លើងបំភ្លឺសាធារណៈ និងពន្ធផ្សេងៗ។",
    },
    {
      page: "cambodiaTaxCalc",
      icon: "📋",
      title: t.general,
      desc: "ការចុះបញ្ជីអាជីវកម្ម និងការគណនាពន្ធប៉ាតង់។",
    },
    {
      page: "plt",
      icon: "📊",
      title: "ពន្ធអាករបំភ្លឺសាធារណៈ (PLT)",
      desc: "កម្មវិធីគណនាពន្ធអាករបំភ្លឺសាធារណៈ 5%។",
    },
    {
      page: "taxCalculator",
      icon: "🧮",
      title: "ពន្ធកាត់ទុក (WHT)",
      desc: "កម្មវិធីគណនាពន្ធកាត់ទុកលើប្រាក់បៀវត្ស និងសេវាកម្ម។",
    },

    {
      page: "ST",
      icon: "💎",
      title: "ពន្ធអាករពិសេស (ST)",
      desc: "កម្មវិធីគណនាពន្ធផ្សេងៗ។",
    },

    {
      page: "AT",
      icon: "🏨",
      title: "ពន្ធស្នាក់នៅ (AT)",
      desc: "កម្មវិធីគណនាពន្ធស្នាក់នៅ។",
    }
  ];

  const go = (page) => {
    setActiveNav(page);
    setPage(page);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: khmerFont,
      }}
    >
      {/* របាររុករក (NAVBAR) */}
      <nav
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #E2E8F0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 10px rgba(0,0,0,.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ចុចលើឈ្មោះប្រព័ន្ធដើម្បីត្រឡប់ទៅទំព័រដើមវិញ */}
          <div
            onClick={() => go("home")}
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "#2563EB",
              cursor: "pointer",
              fontFamily: khmerFont,
            }}
          >
            {t.platform}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  background: activeNav === item.key ? "#2563EB" : "transparent",
                  color: activeNav === item.key ? "#fff" : "#475569",
                  fontWeight: 600,
                  transition: ".2s",
                  fontFamily: khmerFont,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ផ្នែកបង្ហាញសំខាន់ (HERO) */}
      <section
        style={{
          background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
          padding: "90px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                background: "#DBEAFE",
                color: "#2563EB",
                fontWeight: 700,
                marginBottom: 20,
                fontFamily: khmerFont,
              }}
            >
              {t.badge}
            </div>

            <h1
              style={{
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.3,
                marginBottom: 20,
                fontFamily: khmerFont,
              }}
            >
              {t.heroTitle1}
              <br />
              {t.heroTitle2}
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#64748B",
                lineHeight: 1.8,
                maxWidth: 600,
                marginBottom: 30,
                fontFamily: khmerFont,
              }}
            >
              {t.heroDesc}
            </p>

            <div
              style={{
                display: "flex",
                gap: 15,
                flexWrap: "wrap",
              }}
            >
              {/* ប៊ូតុង៖ ចុចដើម្បីអូសចុះក្រោមទៅកាន់ផ្នែកកម្មវិធីគណនា */}
              <button
                onClick={() => {
                  document.getElementById("calculators-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontFamily: khmerFont,
                }}
              >
                {t.start}
              </button>

              {/* ប៊ូតុង៖ ចុចដើម្បីទៅកាន់ទំព័រមេរៀន */}
              <button
                onClick={() => go("lesson")}
                style={{
                  background: "#fff",
                  color: "#2563EB",
                  border: "1px solid #2563EB",
                  padding: "14px 28px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontFamily: khmerFont,
                }}
              >
                {t.learn}
              </button>
            </div>
          </div>

          {/* កាតបង្ហាញស្ថិតិនៅខាងស្តាំ */}
          <div>
            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: 30,
                boxShadow: "0 20px 40px rgba(37,99,235,.12)",
              }}
            >
              <h3
                style={{
                  color: "#0F172A",
                  marginBottom: 20,
                  fontFamily: khmerFont,
                }}
              >
                {t.statTitle}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <Stat value="៤+" label={t.modules} fontStyle={khmerFont} />
                <Stat value="២០២៦" label={t.updated} fontStyle={khmerFont} />
                <Stat value="១០០%" label={t.formula} fontStyle={khmerFont} />
                <Stat value="ឥតគិតថ្លៃ" label={t.access} fontStyle={khmerFont} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ផ្នែកម៉ូឌុលកម្មវិធីគណនា (SERVICES) */}
      <section
        id="calculators-section"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <h2
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "#0F172A",
              fontFamily: khmerFont,
            }}
          >
            {t.calculators}
          </h2>

          <p
            style={{
              color: "#64748B",
              maxWidth: 600,
              margin: "10px auto 0",
              fontFamily: khmerFont,
            }}
          >
            {t.choose}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.page}
              onClick={() => go(service.page)}
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: 28,
                cursor: "pointer",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(37,99,235,.06)",
                transition: ".25s",
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 18,
                  background: "#EFF6FF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 34,
                  marginBottom: 20,
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  color: "#0F172A",
                  marginBottom: 12,
                  fontFamily: khmerFont,
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: "#64748B",
                  lineHeight: 1.7,
                  fontFamily: khmerFont,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label, fontStyle }) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: 18,
        padding: 20,
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "#2563EB",
          fontFamily: fontStyle,
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#64748B",
          marginTop: 5,
          fontFamily: fontStyle,
        }}
      >
        {label}
      </div>
    </div>
  );
}