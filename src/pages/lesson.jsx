import { useState } from "react";

const lessons = [
  {
    id: 0,
    icon: "🏛️",
    title: "Generality of Cambodian Taxation",
    sub: "TAX 01 · Overview",
    tag: "Foundational",
    tagColor: { bg: "#E6F1FB", text: "#0C447C" },
    sections: [
      {
        title: "History of GDT",
        items: [
          "1953: GDT established (previously called 'suay sar' or revenue duty)",
          "1975–1979: Tax system abolished under Khmer Rouge (collective ownership era)",
          "1980–1993: Industrial & Commercial Tax Dept under Ministry of Finance",
          "1993–2008: General Department of Taxation under Ministry of Economy & Finance",
          "2008–present: Upgraded to full General Department (current GDT structure)",
        ],
      },
      {
        title: "Definition of Tax",
        items: [
          "Tax (ពន្ធ) refers to tax and duties — both direct and indirect taxes",
          "Tax is the mandatory contribution of citizens to the national budget",
          "Citizens pay tax in exchange for public goods and services from the state",
          "Tax is a government tool to collect revenue for national budget expenditures",
        ],
      },
      {
        title: "Types of Tax",
        table: {
          cols: ["National Budget Taxes", "Sub-national Budget Taxes"],
          rows: [
            ["Tax on income", "Public lighting tax"],
            ["Tax on salary", "Tax on accommodation"],
            ["VAT (Value Added Tax)", "Vehicle transportation tax"],
            ["Special tax", "Patent tax"],
            ["Minimum tax", "Tax on land & buildings"],
            ["Withholding tax", "Tax on property transfer"],
            ["Tax on immovable property", "Tax on unused land / property"],
          ],
        },
      },
      {
        title: "Tax Regime (Self-Assessment)",
        items: [
          "Before 2016: 3 regimes — Real, Simplified, and Estimated",
          "From 2016 onward: Cambodia uses only the Real (Self-Assessment) regime",
          "Small taxpayers: annual turnover 250M–700M KHR, 10–50 staff",
          "Medium taxpayers: turnover 700M–4,000M KHR, 51–100 staff, or licensed companies",
          "Large taxpayers: turnover above 4,000M KHR, multinationals, or QIP holders",
        ],
      },
      {
        title: "Tax Declaration Deadlines",
        items: [
          "Monthly declaration: by the 20th of the following month",
          "Patent tax (annual): by 31 March of each year",
          "Income tax (annual): by 31 March of the following year",
          "Billboard/signage tax: by 31 March of each year",
        ],
      },
    ],
  },
  {
    id: 1,
    icon: "💰",
    title: "Tax on Salary",
    sub: "TAX 02 · TOS",
    tag: "Core Tax",
    tagColor: { bg: "#E1F5EE", text: "#085041" },
    sections: [
      {
        title: "Definition & Scope",
        items: [
          "TOS is a monthly tax on salary received from employment activities",
          "All salary income from employment is subject to TOS",
          "Collected via withholding by the employer when paying salary",
          "Employer = any institution or resident individual registered with GDT",
          "Employee = any individual receiving salary, including directors and elected officials",
        ],
      },
      {
        title: "What Counts as Salary",
        items: [
          "Wages, allowances, bonuses, overtime pay, extra pay, compensation",
          "Fringe benefits: goods, services, or cash given by employer for employment activities",
          "Fringe benefits are taxed at 20% of their market value (including all taxes)",
        ],
      },
      {
        title: "Non-Taxable Items",
        items: [
          "Actual expense reimbursements with invoices paid for business purposes",
          "Severance pay within limits set by Labor Law",
          "NSSF contributions as required by law",
          "Health/life insurance premiums paid uniformly to all workers",
          "Transportation allowance per Labor Law",
          "Pre-2019 seniority indemnity (for Khmer workers)",
          "From 2020 onward: salary up to 4,000,000 KHR/year exempted",
        ],
      },
      {
        title: "Resident vs Non-Resident",
        items: [
          "Resident: permanent home in Cambodia, or stays >182 days in 12 months",
          "Non-resident: flat 20% tax on Cambodia-source salary only",
          "Residents: taxed on Cambodia + foreign salary at progressive rates",
          "Non-residents: no dependent deductions allowed",
        ],
      },
      {
        title: "Dependent Deductions (Residents Only)",
        items: [
          "Non-working spouse: deduct 150,000 KHR/month",
          "Each dependent child (under 14, or student under 25): deduct 150,000 KHR/month",
        ],
      },
      {
        title: "TOS Rate Table",
        table: {
          cols: ["Monthly Salary (KHR)", "Rate", "Formula"],
          rows: [
            ["0 – 1,500,000", "0%", "0"],
            ["1,500,001 – 2,000,000", "5%", "Salary × 5% − 75,000"],
            ["2,000,001 – 8,500,000", "10%", "Salary × 10% − 175,000"],
            ["8,500,001 – 12,500,000", "15%", "Salary × 15% − 600,000"],
            ["Above 12,500,000", "20%", "Salary × 20% − 1,225,000"],
          ],
        },
      },
      {
        title: "Formula",
        formula:
          "TOS = Taxable Base × Rate − Offset\n\nTaxable Base = Gross Salary − Dependent Deductions",
      },
      {
        title: "Examples",
        items: [
          "Salary 2,500,000 (single) → TOS = 2,500,000 × 10% − 175,000 = 75,000 KHR",
          "Salary 2,500,000 (spouse + 3 kids) → Deduction 600,000 → Base 1,900,000 → TOS = 20,000 KHR",
          "Salary 12,600,000 (single) → TOS = 12,600,000 × 20% − 1,225,000 = 1,295,000 KHR",
        ],
      },
    ],
  },
  {
    id: 2,
    icon: "⚠️",
    title: "Tax Penalties & Violations",
    sub: "TAX 01 · Enforcement",
    tag: "Compliance",
    tagColor: { bg: "#FAEEDA", text: "#633806" },
    sections: [
      {
        title: "Minor Violation — Fine 2,000,000 KHR",
        items: [
          "No accounting records or invoices for business transactions",
          "Refusing GDT inspection of accounting records or documents",
          "Not registering with GDT",
          "Not notifying GDT about changes in registration information",
          "Creating or maintaining false records or documents",
          "Hiding or intentionally destroying accounting records",
          "Obstructing tax assessment or collection",
          "Failing to file tax declaration within 30 days after deadline",
        ],
      },
      {
        title: "Negligent Underpayment — 10% + 1.5%/month interest",
        items: [
          "Tax paid is less than GDT-assessed amount by ≤10%",
          "Failure to file declaration or pay tax by the prescribed deadline",
        ],
      },
      {
        title: "Serious Underpayment — 25% + 1.5%/month interest",
        items: [
          "Tax paid is less than GDT-assessed amount by more than 10%",
        ],
      },
      {
        title: "Unilateral Assessment — 40% + 1.5%/month interest",
        items: [
          "Taxpayer fails to cooperate during tax audit",
          "No proper accounting records maintained",
          "GDT has insufficient information for standard assessment",
        ],
      },
    ],
  },
  {
    id: 3,
    icon: "📋",
    title: "Tax Dispute Resolution",
    sub: "TAX 01 · Appeals",
    tag: "Legal Process",
    tagColor: { bg: "#FCEBEB", text: "#791F1F" },
    sections: [
      {
        title: "Filing a Complaint",
        items: [
          "Must be filed within 30 days of receiving GDT decision",
          "Subjects: tax assessment, re-assessment, collection, or other tax measures",
          "Grounds: new facts or information not included in original assessment",
        ],
      },
      {
        title: "Required Content",
        items: [
          "Date of decision being contested",
          "Taxpayer identification (VAT TIN and/or PIN)",
          "Address, phone number, and/or email",
          "Reference to the specific tax letter/decision contested",
          "Grounds and legal basis for the taxpayer's claim",
          "Signature of authorized representative",
        ],
      },
      {
        title: "Grounds for Rejection",
        items: [
          "Complaint filed after the 30-day deadline",
          "Complaint is incomplete — missing required content or information",
          "Missing supporting documents or evidence",
        ],
      },
      {
        title: "Resolution Timeline & Appeals",
        items: [
          "GDT must issue decision within 60 days of receiving the complaint",
          "If unsatisfied: appeal to Tax Arbitration Committee (TAC) within 30 days",
          "TAC acceptance suspends enforcement of GDT's original decision",
          "If unsatisfied with TAC: appeal to court within 30 days",
          "Court appeal does NOT suspend TAC decision (tax must be deposited first)",
        ],
      },
    ],
  },
  {
    id: 4,
    icon: "🧮",
    title: "Worked Examples & Exercises",
    sub: "TAX 01 + 02 · Practice",
    tag: "Exercises",
    tagColor: { bg: "#E6F1FB", text: "#0C447C" },
    sections: [
      {
        title: "Example 1 — MBR Cambodia (Patent Tax Penalty)",
        items: [
          "Registered Oct 12, 2022 · No business activity (zero revenue)",
          "Still obligated to file monthly & annual declarations (even if zero revenue)",
          "Patent tax/year: 1,200,000 KHR (2022 patent paid at registration)",
          "2023 patent overdue → Penalty (10%): 120,000 KHR",
          "Interest (1.5% × 11 months): 1,200,000 × 1.5% × 11 = 198,000 KHR",
          "2024 patent tax: 1,200,000 KHR",
          "Minor violation fine: 2,000,000 KHR",
        ],
      },
      {
        title: "Example 2 — MBR Phnom Penh (Income Tax Penalty)",
        items: [
          "Declared income tax 2021: 100,000,000 KHR",
          "Audit found non-deductible expenses → underpaid by 8,000,000 KHR",
          "Penalty (10%): 8,000,000 × 10% = 800,000 KHR",
          "Interest (1.5% × 22 months to Jan 2024): 8,000,000 × 1.5% × 22 = 2,640,000 KHR",
        ],
      },
      {
        title: "Example 3 — MBR Gold (Non-cooperation Penalty)",
        items: [
          "2020 audit: no proper accounting records, 250,000,000 KHR income tax unpaid",
          "Penalty (25% serious): 250,000,000 × 25% = 62,500,000 KHR",
          "Interest (1.5% × 34 months, Apr 2021 to Jan 2024): 250,000,000 × 1.5% × 34 = 127,500,000 KHR",
          "Minor violation fine: 2,000,000 KHR",
        ],
      },
      {
        title: "TOS Exercise 1 — Salary 1,900,000 KHR (includes 100,000 travel allowance)",
        items: [
          "Taxable salary = 1,900,000 − 100,000 = 1,800,000 KHR",
          "Case A (single): TOS = 1,800,000 × 5% − 75,000 = 15,000 KHR",
          "Case B (spouse + 3 kids): Deduction 600,000 → Base 1,200,000 → TOS = 0 KHR",
        ],
      },
      {
        title: "TOS Exercise 2 — Manager Salary 8,700,000 KHR",
        items: [
          "Case A (single): TOS = 8,700,000 × 10% − 175,000 = 695,000 KHR",
          "Case B (spouse + 3 kids): Deduction 600,000 → Base 8,100,000 → TOS = 8,100,000 × 10% − 175,000 = 635,000 KHR",
        ],
      },
    ],
  },
];

function Badge({ label, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 20,
        fontWeight: 500,
        background: color.bg,
        color: color.text,
      }}
    >
      {label}
    </span>
  );
}

function LessonCard({ lesson, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? "#E6F1FB" : "#fff",
        border: active ? "1.5px solid #185FA5" : "0.5px solid rgba(0,0,0,0.15)",
        borderRadius: 12,
        padding: "1rem 1.1rem",
        cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 8 }}>{lesson.icon}</div>
      <Badge label={lesson.tag} color={lesson.tagClass || lesson.tagColor} />
      <div style={{ fontSize: 13, fontWeight: 500, marginTop: 6, lineHeight: 1.4 }}>
        {lesson.title}
      </div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{lesson.sub}</div>
    </div>
  );
}

function SectionBlock({ section }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        {section.title}
      </div>

      {section.items &&
        section.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 4,
              color: "#1a1a1a",
            }}
          >
            <span style={{ color: "#aaa", flexShrink: 0 }}>—</span>
            <span>{item}</span>
          </div>
        ))}

      {section.table && (
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr>
                {section.table.cols.map((col, i) => (
                  <th
                    key={i}
                    style={{
                      background: "#f5f5f3",
                      fontWeight: 500,
                      padding: "7px 10px",
                      textAlign: "left",
                      border: "0.5px solid rgba(0,0,0,0.12)",
                      color: "#555",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "7px 10px",
                        border: "0.5px solid rgba(0,0,0,0.12)",
                        background: i % 2 === 1 ? "#fafafa" : "#fff",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.formula && (
        <div
          style={{
            background: "#f5f5f3",
            borderLeft: "3px solid #185FA5",
            borderRadius: "0 8px 8px 0",
            padding: "10px 14px",
            fontSize: 13,
            fontFamily: "monospace",
            marginTop: 8,
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {section.formula}
        </div>
      )}
    </div>
  );
}

export default function TaxLessons() {
  const [active, setActive] = useState(null);

  const handleCard = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  const activelesson = lessons.find((l) => l.id === active);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 780, margin: "0 auto", padding: "1.5rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, margin: 0 }}>
          Cambodia Taxation — Course Lessons
        </h1>
        <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
          Department of Applied Mathematics and Statistics, ITC · Academic year 2025–2026
        </p>
      </div>

      {/* Card Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 10,
          marginBottom: "1.5rem",
        }}
      >
        {lessons.map((l) => (
          <LessonCard
            key={l.id}
            lesson={l}
            active={active === l.id}
            onClick={() => handleCard(l.id)}
          />
        ))}
      </div>

      {/* Detail Panel */}
      {activelesson && (
        <div
          style={{
            background: "#fff",
            border: "0.5px solid rgba(0,0,0,0.15)",
            borderRadius: 12,
            padding: "1.25rem 1.5rem",
          }}
        >
          {/* Detail Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1rem",
              paddingBottom: "0.75rem",
              borderBottom: "0.5px solid rgba(0,0,0,0.12)",
            }}
          >
            <span style={{ fontSize: 28 }}>{activelesson.icon}</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{activelesson.title}</div>
              <Badge
                label={`${activelesson.tag} · ${activelesson.sub}`}
                color={activelesson.tagColor}
              />
            </div>
          </div>

          {/* Sections */}
          {activelesson.sections.map((s, i) => (
            <SectionBlock key={i} section={s} />
          ))}
        </div>
      )}
    </div>
  );
}