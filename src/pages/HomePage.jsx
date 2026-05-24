import { useState } from "react";

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "cambodiaTaxCalc", label: "Generality of Taxation" },
  { key: "salary", label: "Salary Tax" },
  { key: "vat", label: "VAT" },
  { key: "OtherTaxpage", label: "Other Tax" },
  { key: "lesson", label: "Lesson" },
];

const SERVICES = [
  {
    page: "salary",
    icon: "💼",
    title: "Salary Tax",
    titleKh: "ពន្ធលើប្រាក់បៀវត្ស",
    desc: "Calculate salary tax according to Cambodia tax regulations.",
  },
  {
    page: "vat",
    icon: "🧾",
    title: "VAT",
    titleKh: "អាករលើតម្លៃបន្ថែម",
    desc: "Calculate VAT on goods and services.",
  },
  {
    page: "OtherTaxpage",
    icon: "🏮",
    title: "Other Taxes",
    titleKh: "ពន្ធផ្សេងៗ",
    desc: "Accommodation tax, public lighting tax and more.",
  },
  {
    page: "cambodiaTaxCalc",
    icon: "📋",
    title: "Generality of Taxation",
    titleKh: "ពន្ធអំពីទូទៅ",
    desc: "Business registration and patent tax calculation.",
  },
];

export default function HomePage({ setPage }) {
  const [activeNav, setActiveNav] = useState("home");

  const go = (page) => {
    setActiveNav(page);
    setPage(page);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* NAVBAR */}
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
          <div
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "#2563EB",
            }}
          >
            Cambodia Tax
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  background:
                    activeNav === item.key ? "#2563EB" : "transparent",
                  color:
                    activeNav === item.key ? "#fff" : "#475569",
                  fontWeight: 600,
                  transition: ".2s",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)",
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
              }}
            >
              Cambodia Tax System 2026
            </div>

            <h1
              style={{
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Smart Tax
              <br />
              Calculator Platform
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#64748B",
                lineHeight: 1.8,
                maxWidth: 600,
                marginBottom: 30,
              }}
            >
              Easy and accurate Cambodia tax calculations for
              students, employees and businesses. Built according
              to Cambodia tax regulations and updated rules.
            </p>

            <div
              style={{
                display: "flex",
                gap: 15,
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Start Calculation
              </button>

              <button
                style={{
                  background: "#fff",
                  color: "#2563EB",
                  border: "1px solid #2563EB",
                  padding: "14px 28px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div>
            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: 30,
                boxShadow:
                  "0 20px 40px rgba(37,99,235,.12)",
              }}
            >
              <h3
                style={{
                  color: "#0F172A",
                  marginBottom: 20,
                }}
              >
                Platform Statistics
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <Stat value="4+" label="Tax Modules" />
                <Stat value="2026" label="Updated Rules" />
                <Stat value="100%" label="Accurate Formula" />
                <Stat value="Free" label="Student Access" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
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
            }}
          >
            Tax Calculators
          </h2>

          <p
            style={{
              color: "#64748B",
              maxWidth: 600,
              margin: "10px auto 0",
            }}
          >
            Choose a calculator below to begin your tax
            calculation.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
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
                boxShadow:
                  "0 4px 20px rgba(37,99,235,.06)",
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
                  marginBottom: 8,
                }}
              >
                {service.title}
              </h3>

              <div
                style={{
                  color: "#2563EB",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {service.titleKh}
              </div>

              <p
                style={{
                  color: "#64748B",
                  lineHeight: 1.7,
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

function Stat({ value, label }) {
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
          fontSize: 28,
          fontWeight: 800,
          color: "#2563EB",
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#64748B",
          marginTop: 5,
        }}
      >
        {label}
      </div>
    </div>
  );
}