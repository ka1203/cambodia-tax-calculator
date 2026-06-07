import { useState } from "react";

function formatCurrency(n) {
  return Math.round(n).toLocaleString("en-US") + " ៛";
}

const FONT = "'Battambang', 'Khmer OS Battambang', 'Khmer OS Siemreap', sans-serif";

// ══════════════════════════════════════════════════════════════
// DEFINITIONS PER TAB
// ══════════════════════════════════════════════════════════════
const TAB_DEFS = {
  penalty: {
    label: "📖 និយមន័យ និងការពន្យល់ — ប្រព័ន្ធប្រាក់ពិន័យពន្ធដារ",
    items: [
      {
        term: "ប្រាក់ពិន័យ (Tax Penalty / Surcharge)",
        color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
        body: `ប្រាក់ពិន័យ (Surcharge) គឺជាទឹកប្រាក់បន្ថែមដែលត្រូវបង់ជូនរដ្ឋ ក្នុងករណីបង់ពន្ធខ្វះ ឬយឺតយ៉ាវ។
• កម្រិតស្រាល (10%): ប្រាក់ពន្ធខ្វះ ≤ 10% នៃប្រាក់ពន្ធសរុប
• កម្រិតធ្ងន់ (25%): ប្រាក់ពន្ធខ្វះ > 10% នៃប្រាក់ពន្ធសរុប
• ការវាយតម្លៃជាឯកតោភាគី (40%): ករណីមិនដាក់លិខិតប្រកាស
• ការរារាំង: ប្រាក់ពិន័យថេរ 2,000,000 ៛ មិនអាស្រ័យលើចំនួន`,
      },
      {
        term: "ការប្រាក់យឺតយ៉ាវ (Late Payment Interest)",
        color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
        body: `ការប្រាក់យឺតយ៉ាវ គឺការប្រាក់ 1.5% ក្នុងមួយខែ គណនាលើចំនួនប្រាក់ពន្ធដែលខ្វះខាត។
រូបមន្ត: ការប្រាក់ = ប្រាក់ពន្ធខ្វះ × 1.5% × ចំនួនខែ
ឧទាហរណ៍: ខ្វះ 1,000,000 ៛ × 1.5% × 12 ខែ = 180,000 ៛
• ការប្រាក់ + ប្រាក់ពិន័យ ត្រូវបង់ស្របគ្នា
• គណនាចាប់ពីថ្ងៃផុតកំណត់ ដល់ថ្ងៃបង់ពិតប្រាកដ`,
      },
      {
        term: "ប្រាក់ពន្ធខ្វះខាត (Tax Shortage)",
        color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
        body: `ប្រាក់ពន្ធខ្វះខាត = ប្រាក់ពន្ធដែលត្រូវបង់ − ប្រាក់ពន្ធដែលបានបង់រួច
• ប្រសិនបើ = 0 → គ្មានប្រាក់ពិន័យ
• ប្រសិនបើ > 0 → ត្រូវបង់ប្រាក់ពន្ធបន្ថែម + ពិន័យ + ការប្រាក់
% ខ្វះ = (ប្រាក់ពន្ធខ្វះ ÷ ប្រាក់ពន្ធសរុប) × 100
• ≤ 10% → កម្រិតស្រាល (10%)
• > 10%  → កម្រិតធ្ងន់ (25%)`,
      },
      {
        term: "ការរារាំងការអនុវត្ត (Obstruction)",
        color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
        body: `ករណីអ្នកជាប់ពន្ធ ឬបុគ្គលសម្ព័ន្ធ រារាំង ឬមិនសហការ
នឹងមន្ត្រីពន្ធដាររបស់ GDT ក្នុងអំឡុងពេលត្រួតពិនិត្យ/សវនកម្ម។
→ ប្រាក់ពិន័យថេរ 2,000,000 ៛
→ អនុវត្តមិនគិតពីចំនួនប្រាក់ពន្ធ
→ អាចស្ថិតក្នុងករណីព្រហ្មទណ្ឌផ្សេងទៀតផង`,
      },
    ],
  },
  patent: {
    label: "📖 និយមន័យ និងការពន្យល់ — ពន្ធប៉ាតង់",
    items: [
      {
        term: "ពន្ធប៉ាតង់ (Patent Tax / Business Registration Tax)",
        color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
        body: `ពន្ធប៉ាតង់ គឺជាពន្ធប្រចាំឆ្នាំដែលសហគ្រាសត្រូវបង់ ដើម្បីទទួលបាន/
ជំនួសសិទ្ធិប្រកបអាជីវកម្មស្របច្បាប់នៅក្នុងប្រទេសកម្ពុជា។
• ទឹកប្រាក់មូលដ្ឋាន: 1,200,000 ៛/ឆ្នាំ (សម្រាប់ SME)
• ថ្ងៃផុតកំណត់: ថ្ងៃ 31 ខែមីនា រៀងរាល់ឆ្នាំ
• ទណ្ឌកម្មយឺត: ប្រាក់ពិន័យ 10% + ការប្រាក់ 1.5%/ខែ
• ប្រភេទអាជីវកម្ម ផ្លាស់ប្តូរតម្លៃប៉ាតង់ (Tier A/B/C)`,
      },
      {
        term: "ទណ្ឌកម្មបង់យឺត — ពន្ធប៉ាតង់",
        color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
        body: `ករណីបង់ប៉ាតង់ក្រោយ ថ្ងៃ 31 ខែមីនា៖
① ប្រាក់ពិន័យ = 1,200,000 × 10% = 120,000 ៛
② ការប្រាក់ = 1,200,000 × 1.5% × ចំនួនខែ
③ សរុបត្រូវបង់ = 1,200,000 + ① + ②
ឧទាហរណ៍: យឺត 3 ខែ
  → 1,200,000 + 120,000 + (1,200,000 × 1.5% × 3)
  → = 1,200,000 + 120,000 + 54,000 = 1,374,000 ៛`,
      },
      {
        term: "ភាពខុសគ្នា ប៉ាតង់ vs CIT vs VAT",
        color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
        body: `ពន្ធប៉ាតង់: ថេរ 1,200,000 ៛/ឆ្នាំ → ទទួលស្គាល់ការប្រកបអាជីវកម្ម
CIT (ពន្ធលើប្រាក់ចំណូល): 20% × ចំណេញ → ជាពន្ធប្រចាំឆ្នាំ
VAT: 10% × ការផ្គត់ផ្គង់ → ប្រមូលប្រចាំខែ/ត្រីមាស

→ ប៉ាតង់ ≠ CIT — ប្រាក់ប៉ាតង់ជា Fixed Cost ថេរ
→ ប៉ាតង់ ≠ VAT — គ្មានប្រព័ន្ធ Input/Output
→ ប៉ាតង់ = "License Fee" ប្រចាំឆ្នាំ`,
      },
    ],
  },
  income: {
    label: "📖 និយមន័យ និងការពន្យល់ — ពន្ធលើប្រាក់ចំណូល (CIT)",
    items: [
      {
        term: "CIT — Corporate Income Tax (ពន្ធលើប្រាក់ចំណូល)",
        color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
        body: `CIT គឺជាពន្ធអនុវត្តលើចំណេញសុទ្ធ (Net Profit) របស់ក្រុមហ៊ុន/សហគ្រាស។
អត្រា CIT នៅកម្ពុជា:
• 20% → ក្រុមហ៊ុនទូទៅ (Standard Rate)
• 30% → វិស័យប្រេង ឧស្ម័ន ធនធានធម្មជាតិ
• 5%  → គម្រោងវិនិយោគ QIP (Qualified Investment Project)
រូបមន្ត: CIT = ចំណេញបន្ទាប់ ~ ÷ ពន្ធ × អត្រា CIT
ផុតកំណត់ប្រកាស: 3 ខែ ក្រោយបំពេញឆ្នាំហិរញ្ញវត្ថុ`,
      },
      {
        term: "សវនកម្មពន្ធ (Tax Audit)",
        color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
        body: `សវនកម្មពន្ធ គឺជាដំណើរការត្រួតពិនិត្យលើការដាក់ប្រកាសពន្ធរបស់
អ្នកជាប់ពន្ធ ដោយ GDT (General Department of Taxation)។
ប្រភេទ:
• Desk Audit → ត្រួតពិនិត្យឯកសារក្នុង Office GDT
• Field Audit → ចុះទៅពិនិត្យដល់ទីតាំងអ្នកជាប់ពន្ធ
• Comprehensive Audit → ពិនិត្យពន្ធទាំងមូល (VAT/CIT/WHT)
លទ្ធផលជាទូទៅ: ចំណាយខ្លះត្រូវបែរជាមិនអនុញ្ញាត → ចំណេញកើនឡើង → CIT បន្ថែម`,
      },
      {
        term: "ចំណាយដែលមិនត្រូវបានអនុញ្ញាត (Disallowed Expenses)",
        color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
        body: `ចំណាយមិនអនុញ្ញាត គឺចំណាយដែលត្រូវបែរ (Add-back) ចូលក្នុងចំណេញ
ដើម្បីបង្កើតមូលដ្ឋានពន្ធ (Tax Base) ធំជាងការប្រកាស។
ឧទាហរណ៍ជាទូទៅ:
• ចំណាយផ្ទាល់ខ្លួន (Personal Expenses) ដែលបញ្ចូលក្នុងក្រុមហ៊ុន
• ការអំណោយ/Donation ដែលលើសកម្រិត
• ការ Depreciation លើស ឬ Amortization មិនត្រឹមត្រូវ
• ការប្រាក់ (Interest) លើ Loan ពីភាគីពាក់ព័ន្ធ (Related Party) លើស
• ចំណាយមិនមានឯកសារ/Invoice ត្រឹមត្រូវ`,
      },
      {
        term: "ប្រព័ន្ធគណនេយ្យមិនអនុលោម (Non-Compliant Accounting)",
        color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5",
        body: `ករណីប្រព័ន្ធបញ្ជីគណនេយ្យ (Accounting Records) មិនអនុលោម
ស្តង់ដារនៃ CIFRS / CNICC ។
→ GDT អាចអនុវត្ត Estimated Assessment (ការវាយតម្លៃប៉ាន់ស្មាន)
→ ប្រាក់ពិន័យ: 25% ភ្លាមៗ (មិនពិចារណាតាម % ខ្វះ)
→ ហានិភ័យ: ប្រាក់ពន្ធ + ពិន័យ + ការប្រាក់ + ផ្នែកព្រហ្មទណ្ឌ
ការបង្ការ: រៀបចំ Invoice · Journal Entry · Trial Balance ត្រឹមត្រូវ`,
      },
    ],
  },
  classify: {
    label: "📖 និយមន័យ និងការពន្យល់ — ចំណាត់ថ្នាក់អ្នកជាប់ពន្ធ",
    items: [
      {
        term: "ប្រព័ន្ធ Self-Assessment (ស.ប.ស)",
        color: "#0B1F4E", bg: "#EFF6FF", border: "#BFDBFE",
        body: `ប្រព័ន្ធ Self-Assessment (ស្វ័យប្រកាស) គឺជាប្រព័ន្ធដែល
អ្នកជាប់ពន្ធ គណនា ប្រកាស និងបង់ពន្ធ ដោយខ្លួនឯង
ដោយមិនរង់ចាំ GDT គណនាជូន។
ប្រភេទអ្នកជាប់ពន្ធក្នុងប្រព័ន្ធ ស.ប.ស:
• Small: ចំណូល 250–700 លាន ៛ ឬ 10–50 បុគ្គលិក
• Medium: ចំណូល 700–4,000 លាន ៛ ឬ 51–100 បុគ្គលិក
• Large: ចំណូល > 4,000 លាន ៛ ឬ > 100 បុគ្គលិក`,
      },
      {
        term: "ចំណូលសរុប (Annual Revenue) សម្រាប់ចំណាត់ថ្នាក់",
        color: "#166534", bg: "#F0FDF4", border: "#BBF7D0",
        body: `ចំណូលសរុប = ចំនួនលក់ (Net Sales) ប្រចាំឆ្នាំ
មុនដក ចំណាយ ឬ VAT ចេញ — ប្រើចំណូល Gross Sales។
កម្រិតចំណាត់ថ្នាក់:
• ≥ 250 លាន ៛  → Small Taxpayer
• ≥ 700 លាន ៛  → Medium Taxpayer
• ≥ 4,000 លាន ៛ → Large Taxpayer
ចំណាំ: ប្រសិនបើចំណូល vs បុគ្គលិក ខុសថ្នាក់ →
ប្រើថ្នាក់ធំជាង (Higher Tier)`,
      },
      {
        term: "កាតព្វកិច្ចគណនេយ្យ (Accounting Obligation)",
        color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE",
        body: `Small Taxpayer:
  → ប្រព័ន្ធ Single-Entry ឬ Simplified Bookkeeping
  → ត្រូវរក្សា Sales Records + Expense Records
Medium Taxpayer:
  → ស្តង់ដារ CNICC (Cambodia National Institute)
  → ត្រូវមាន Full Double-Entry Bookkeeping
  → Balance Sheet + P&L Statement
Large Taxpayer:
  → CIFRS/IFRS Full Compliance
  → ត្រូវ Audit ដោយ Registered Auditor ប្រចាំឆ្នាំ
  → Financial Statements ជូន GDT + NBC`,
      },
      {
        term: "ហានិភ័យពន្ធ (Tax Risk) ពីការចំណាត់ថ្នាក់មិនត្រឹមត្រូវ",
        color: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
        body: `ករណីឡើងថ្នាក់ (Threshold Exceeded) ប៉ុន្តែមិនប្ដូរការ
រៀបចំ/ការប្រកាសតាមថ្នាក់ថ្មី:
• GDT អាច Re-classify ដោយស្វ័យប្រវត្តិ
• ប្រាក់ពន្ធ CIT/VAT/WHT អាចត្រូវវាយតម្លៃឡើងវិញ
• ការប្រាក់ + ពិន័យ 10–25% អាចអនុវត្ត
ការការពារ:
→ ត្រួតពិនិត្យ Revenue ប្រចាំឆ្នាំ
→ ពិគ្រោះជាមួយ Tax Advisor ករណីជិតដល់ Threshold`,
      },
    ],
  },
};

// ── DEFINITION ACCORDION ──────────────────────────────────────
function DefSection({ tabId }) {
  const [open, setOpen] = useState(false);
  const def = TAB_DEFS[tabId];
  if (!def) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16,
          padding: "14px 20px", cursor: "pointer", marginBottom: open ? 14 : 0,
          boxShadow: "0 2px 8px rgba(15,23,42,.04)", fontFamily: FONT,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{def.label}</span>
        <span style={{ fontSize: 18, color: "#64748B", transform: open ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform .2s" }}>▼</span>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {def.items.map((d, i) => (
            <div key={i} style={{
              borderRadius: 16, padding: "16px 18px",
              background: d.bg, border: `1px solid ${d.border}`,
              lineHeight: 1.7, fontFamily: FONT,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: d.color, marginBottom: 8, fontFamily: FONT }}>{d.term}</div>
              <div style={{ fontSize: 12.5, whiteSpace: "pre-line", color: d.color + "CC", fontFamily: FONT }}>{d.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── SHARED STYLES ─────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", padding: "24px 16px", fontFamily: FONT },
  wrap: { width: "100%", maxWidth: 1200, margin: "0 auto" },
  topBar: { display: "flex", justifyContent: "flex-start", marginBottom: 16 },
  backBtn: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", color: "#334155", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,.04)", fontFamily: FONT },
  header: { background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", borderRadius: 20, padding: "24px 30px", marginBottom: 24, boxShadow: "0 10px 25px rgba(37,99,235,.1)" },
  h1: { fontSize: 24, lineHeight: 1.35, fontWeight: 800, marginBottom: 8, fontFamily: FONT },
  hSub: { fontSize: 14, lineHeight: 1.7, opacity: 0.9, fontFamily: FONT },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 24 },
  infoCard: { background: "#FFFFFF", borderRadius: 16, padding: "16px 18px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,.04)" },
  infoCardInner: { display: "flex", alignItems: "flex-start", gap: 12 },
  infoCardDot: { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
  infoCardBody: { flex: 1 },
  infoCardTitle: { fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 4, fontFamily: FONT },
  infoCardValue: { fontSize: 15, fontWeight: 800, color: "#0B1F4E", fontFamily: FONT, lineHeight: 1.4 },
  infoCardNote: { fontSize: 11, color: "#64748B", marginTop: 3, fontFamily: FONT, lineHeight: 1.5 },
  card: { background: "#FFFFFF", borderRadius: 20, padding: 24, marginBottom: 20, border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,.04)" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 16, fontFamily: FONT },
  tabRow: { display: "flex", justifyContent: "flex-start", gap: 10, marginBottom: 24, flexWrap: "wrap" },
  tab: { padding: "12px 20px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#64748B", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: FONT },
  tabOn: { padding: "12px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#FFFFFF", cursor: "pointer", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 12px rgba(37,99,235,.2)", fontFamily: FONT },
  row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, fontFamily: FONT },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  select: { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1px solid #CBD5E1", borderRadius: 12, fontSize: 14, background: "#FFFFFF", outline: "none", fontFamily: FONT },
  btn: { width: "100%", padding: "14px", fontSize: 15, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(37,99,235,.15)", marginBottom: 24, fontFamily: FONT },
  note: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 14, color: "#1E40AF", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  noteWarn: { background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 14, color: "#991B1B", marginTop: 12, lineHeight: 1.6, fontSize: 13, fontFamily: FONT },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  metric: { background: "#FFFFFF", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,.03)" },
  mLabel: { fontSize: 12, color: "#64748B", marginBottom: 8, fontFamily: FONT },
  tbl: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#EFF6FF", color: "#1E40AF", padding: "12px", textAlign: "left", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #DBEAFE", fontFamily: FONT },
  td: { padding: "12px", fontSize: 13, lineHeight: 1.6, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 13, borderBottom: "1px solid #F1F5F9", fontFamily: FONT },
  dedRowTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#EFF6FF", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedRowTotalRed: { display: "flex", justifyContent: "space-between", marginTop: 10, padding: 14, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#991B1B", fontWeight: 700, fontSize: 14, fontFamily: FONT },
  dedVal: { color: "#2563EB", fontWeight: 700 },
  dedValRed: { color: "#DC2626", fontWeight: 700 },
};

// ── INFO CARDS ────────────────────────────────────────────────
const INFO_CARDS = [
  { icon: "⚖️", bg: "#EFF6FF", title: "ប្រាក់ពិន័យកម្រិតស្រាល", value: "10%",           note: "ប្រាក់ពន្ធខ្វះ ≤ 10% នៃប្រាក់ពន្ធសរុប" },
  { icon: "🔴", bg: "#FEF2F2", title: "ប្រាក់ពិន័យកម្រិតធ្ងន់",  value: "25%",           note: "ប្រាក់ពន្ធខ្វះ > 10% ឬ ប្រព័ន្ធគណនេយ្យមិនត្រឹម" },
  { icon: "🚫", bg: "#FFF7ED", title: "ការរារាំងសមត្ថកិច្ច",      value: "2,000,000 ៛",   note: "ប្រាក់ពិន័យថេរ មិនអាស្រ័យលើទំហំ" },
  { icon: "📅", bg: "#F0FDF4", title: "ការប្រាក់យឺតយ៉ាវ",         value: "1.5% / ខែ",    note: "លើប្រាក់ពន្ធខ្វះ × ចំនួនខែហួស" },
  { icon: "📋", bg: "#EFF6FF", title: "ពន្ធប៉ាតង់មូលដ្ឋាន",      value: "1,200,000 ៛",   note: "បង់មុន ថ្ងៃ 31 ខែមីនា" },
  { icon: "🏭", bg: "#F0FDF4", title: "សវនកម្មពន្ធ",                  value: "20% / 30% / 5%", note: "ស្តង់ដារ · រ៉ែ/ប្រេង · QIP" },
];

const TABS = [
  { id: "penalty",  label: "គណនាប្រាក់ពិន័យ" },
  { id: "patent",   label: "ពន្ធប៉ាតង់" },
  { id: "income",   label: "សវនកម្មពន្ធ CIT" },
  { id: "classify", label: "ចំណាត់ថ្នាក់អ្នកជាប់ពន្ធ" },
];

// ══════════════════════════════════════════════════════════════
// TAB 1 — PENALTY
// ══════════════════════════════════════════════════════════════
function PenaltyTab() {
  const [taxDue,  setTaxDue]  = useState("");
  const [taxPaid, setTaxPaid] = useState("");
  const [vtype,   setVtype]   = useState("auto");
  const [months,  setMonths]  = useState("");
  const [result,  setResult]  = useState(null);

  function calculate() {
    const due      = parseFloat(taxDue)  || 0;
    const paid     = parseFloat(taxPaid) || 0;
    const m        = parseInt(months)    || 0;
    const shortage = Math.max(0, due - paid);
    const pct      = due > 0 ? (shortage / due) * 100 : 0;
    let surchargeRate = 0, surchargeLabel = "", fixedPenalty = 0, violationLabel = "";
    const effective = vtype === "auto" ? (pct > 10 ? "major" : pct > 0 ? "minor" : "none") : vtype;
    switch (effective) {
      case "obstruction":  fixedPenalty = 2000000; surchargeLabel = "ប្រាក់ពិន័យថេរ — ការរារាំង (2,000,000 ៛)"; violationLabel = "ការរារាំងការអនុវត្ត"; break;
      case "unilateral":   surchargeRate = 0.40; surchargeLabel = "ការតម្លើងពន្ធ 40% — ឯកតោភាគី"; violationLabel = "ការវាយតម្លៃជាឯកតោភាគី"; break;
      case "major":        surchargeRate = 0.25; surchargeLabel = "ការតម្លើងពន្ធ 25% — កម្រិតធ្ងន់ (ខ្វះ > 10%)"; violationLabel = "កម្រិតធ្ងន់"; break;
      case "minor":        surchargeRate = 0.10; surchargeLabel = "ការតម្លើងពន្ធ 10% — កម្រិតស្រាល (ខ្វះ ≤ 10%)"; violationLabel = "កម្រិតស្រាល"; break;
      default:             surchargeLabel = "គ្មានការតម្លើងពន្ធ"; violationLabel = "គ្មាន";
    }
    const surcharge = effective === "obstruction" ? fixedPenalty : shortage * surchargeRate;
    const interest  = shortage * 0.015 * m;
    const total     = shortage + surcharge + interest;
    setResult({ due, paid, shortage, pct, surcharge, surchargeLabel, interest, total, m, violationLabel, effective });
  }

  return (
    <>
      <DefSection tabId="penalty" />
      <div style={S.card}>
        <div style={S.cardTitle}>ទិន្នន័យប្រាក់ពន្ធ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ពន្ធត្រូវបង់សរុប (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧ. 25000000" value={taxDue} onChange={e => { setTaxDue(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ប្រាក់ពន្ធបានបង់រួច (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧ. 0" value={taxPaid} onChange={e => { setTaxPaid(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.cardTitle}>ប្រភេទការល្មើស និងចំនួនខែហួស</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ប្រភេទការរំលោភបំពាន</label>
            <select style={S.select} value={vtype} onChange={e => { setVtype(e.target.value); setResult(null); }}>
              <option value="auto">ស្វ័យប្រវត្តិតាម % ប្រាក់ពន្ធខ្វះ</option>
              <option value="minor">កម្រិតស្រាល — 10% (ខ្វះ ≤ 10%)</option>
              <option value="major">កម្រិតធ្ងន់ — 25% (ខ្វះ &gt; 10%)</option>
              <option value="unilateral">ការវាយតម្លៃជាឯកតោភាគី — 40%</option>
              <option value="obstruction">ការរារាំងសមត្ថកិច្ច — 2,000,000 ៛</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនខែហួសកាលកំណត់</label>
            <input style={S.input} type="number" placeholder="ឧ. 12" value={months} onChange={e => { setMonths(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.note}>
          • ការប្រាក់យឺតយ៉ាវ៖ <strong>1.5%/ខែ</strong> លើប្រាក់ពន្ធខ្វះ<br />
          • ការរារាំង (មិនសហការ)៖ ប្រាក់ពិន័យថេរ <strong>2,000,000 ៛</strong>
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាប្រាក់ពិន័យរួម</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ប្រាក់ពន្ធខ្វះខាតជាក់ស្តែង</div><div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{formatCurrency(result.shortage)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ប្រាក់ពិន័យ + ការប្រាក់</div><div style={{ fontSize: 15, fontWeight: 700, color: "#f97316", fontFamily: FONT }}>{formatCurrency(result.surcharge + result.interest)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>សរុបត្រូវបង់បន្ថែម</div><div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{formatCurrency(result.total)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិតនៃការផាកពិន័យ</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>ទឹកប្រាក់ (រៀល)</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ប្រាក់ពន្ធត្រូវបង់សរុប</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(result.due)}</td></tr>
                <tr><td style={S.td}>ប្រាក់ពន្ធបានបង់រួច</td><td style={{ ...S.td, color: "#1a7a4a", fontWeight: 700 }}>{formatCurrency(result.paid)}</td></tr>
                <tr><td style={S.td}>ប្រាក់ពន្ធខ្វះខាត ({result.pct.toFixed(1)}%)</td><td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{formatCurrency(result.shortage)}</td></tr>
                <tr><td style={S.td}>{result.surchargeLabel}</td><td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{formatCurrency(result.surcharge)}</td></tr>
                <tr><td style={S.td}>ការប្រាក់យឺតយ៉ាវ — 1.5% × {result.m} ខែ</td><td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{formatCurrency(result.interest)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedRowTotalRed}><span>សរុបទឹកប្រាក់ត្រូវបង់បន្ថែមរួម</span><span>{formatCurrency(result.total)}</span></div>
            <div style={{ ...S.note, marginTop: 12 }}>ចំណាត់ថ្នាក់នៃការល្មើស៖ <strong>{result.violationLabel}</strong></div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — PATENT
// ══════════════════════════════════════════════════════════════
const PATENT_BASE = 1200000;
function PatentTab() {
  const [year,   setYear]   = useState("");
  const [onTime, setOnTime] = useState("late");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const m         = parseInt(months) || 0;
    const surcharge = onTime === "late" ? PATENT_BASE * 0.10 : 0;
    const interest  = onTime === "late" ? PATENT_BASE * 0.015 * m : 0;
    const total     = PATENT_BASE + surcharge + interest;
    setResult({ m, surcharge, interest, total, onTime });
  }

  return (
    <>
      <DefSection tabId="patent" />
      <div style={S.card}>
        <div style={S.cardTitle}>ព័ត៌មានពន្ធប៉ាតង់</div>
        <div style={S.note}>
          • ប្រាក់ពន្ធប៉ាតង់មូលដ្ឋាន៖ <strong>1,200,000 ៛/ឆ្នាំ</strong><br />
          • ថ្ងៃផុតកំណត់៖ <strong>ថ្ងៃ 31 ខែមីនា</strong> រៀងរាល់ឆ្នាំ<br />
          • ទណ្ឌកម្មបង់យឺត៖ <strong>ពិន័យ 10% + ការប្រាក់ 1.5%/ខែ</strong>
        </div>
        <div style={{ height: 16 }} />
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ឆ្នាំជាប់ពន្ធ</label>
            <input style={S.input} type="text" placeholder="ឧ. 2026" value={year} onChange={e => { setYear(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ស្ថានភាពការប្រកាស</label>
            <select style={S.select} value={onTime} onChange={e => { setOnTime(e.target.value); setResult(null); }}>
              <option value="ontime">ទាន់ពេលវេលា (មុន 31 មីនា)</option>
              <option value="late">យឺតយ៉ាវ — ត្រូវផាកពិន័យ</option>
            </select>
          </div>
        </div>
        {onTime === "late" && (
          <div style={S.field}>
            <label style={S.label}>ចំនួនខែហួសកាលកំណត់</label>
            <input style={S.input} type="number" placeholder="ឧ. 5" value={months} onChange={e => { setMonths(e.target.value); setResult(null); }} />
          </div>
        )}
      </div>
      <button style={S.btn} onClick={calculate}>គណនាប្រាក់ពន្ធប៉ាតង់</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ប្រាក់ពន្ធប៉ាតង់មូលដ្ឋាន</div><div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{formatCurrency(PATENT_BASE)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ប្រាក់ពិន័យ + ការប្រាក់</div><div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{formatCurrency(result.surcharge + result.interest)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>សរុបទឹកប្រាក់ត្រូវបង់</div><div style={{ fontSize: 15, fontWeight: 700, color: "#1a7a4a", fontFamily: FONT }}>{formatCurrency(result.total)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិតពន្ធប៉ាតង់ — ឆ្នាំ {year || "...."}</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>អត្រា</th><th style={S.th}>ទឹកប្រាក់ (រៀល)</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ប្រាក់ពន្ធប៉ាតង់មូលដ្ឋាន</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(PATENT_BASE)}</td></tr>
                <tr><td style={S.td}>ប្រាក់ពិន័យ</td><td style={S.td}>10%</td><td style={{ ...S.td, color: result.onTime === "late" ? "#DC2626" : "#1a7a4a", fontWeight: 700 }}>{formatCurrency(result.surcharge)}</td></tr>
                <tr><td style={S.td}>ការប្រាក់យឺតយ៉ាវ × {result.m} ខែ</td><td style={S.td}>1.5%/ខែ</td><td style={{ ...S.td, color: result.onTime === "late" ? "#DC2626" : "#1a7a4a", fontWeight: 700 }}>{formatCurrency(result.interest)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedRowTotalRed}><span>សរុបទឹកប្រាក់ត្រូវបង់រួម</span><span>{formatCurrency(result.total)}</span></div>
            {result.onTime === "ontime" && <div style={S.note}>បានប្រកាសទាន់ពេលវេលា — មិនមានប្រាក់ពិន័យ ឬការប្រាក់ឡើយ។</div>}
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — CIT AUDIT
// ══════════════════════════════════════════════════════════════
function IncomeTab() {
  const [declared,  setDeclared]  = useState("");
  const [auditAdj,  setAuditAdj]  = useState("");
  const [taxRate,   setTaxRate]   = useState("20");
  const [months,    setMonths]    = useState("");
  const [nonCompli, setNonCompli] = useState(false);
  const [result,    setResult]    = useState(null);

  function calculate() {
    const decl  = parseFloat(declared) || 0;
    const adj   = parseFloat(auditAdj) || 0;
    const rate  = parseFloat(taxRate) / 100;
    const m     = parseInt(months) || 0;
    const auditedProfit = decl + adj;
    const declaredTax   = decl * rate;
    const auditedTax    = auditedProfit * rate;
    const shortage      = Math.max(0, auditedTax - declaredTax);
    const pct           = auditedTax > 0 ? (shortage / auditedTax) * 100 : 0;
    const surchargeRate  = nonCompli ? 0.25 : pct > 10 ? 0.25 : 0.10;
    const surchargeLabel = nonCompli ? "ការតម្លើងពន្ធ 25% (ប្រព័ន្ធគណនេយ្យមិនអនុលោម)" : pct > 10 ? "ការតម្លើងពន្ធ 25% (កម្រិតធ្ងន់ — ខ្វះ > 10%)" : "ការតម្លើងពន្ធ 10% (កម្រិតស្រាល — ខ្វះ ≤ 10%)";
    const surcharge  = shortage * surchargeRate;
    const interest   = shortage * 0.015 * m;
    const totalExtra = shortage + surcharge + interest;
    setResult({ decl, adj, auditedProfit, declaredTax, auditedTax, shortage, pct, surcharge, surchargeLabel, interest, totalExtra, m, rate, nonCompli });
  }

  return (
    <>
      <DefSection tabId="income" />
      <div style={S.card}>
        <div style={S.cardTitle}>ទិន្នន័យចំណេញ និងការកែតម្រូវ</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំណេញតាមការប្រកាស (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧ. 100000000" value={declared} onChange={e => { setDeclared(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំណាយមិនអនុញ្ញាត / រកឃើញបន្ថែម (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧ. 15000000" value={auditAdj} onChange={e => { setAuditAdj(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>អត្រាពន្ធ CIT</label>
            <select style={S.select} value={taxRate} onChange={e => { setTaxRate(e.target.value); setResult(null); }}>
              <option value="20">20% — ក្រុមហ៊ុនទូទៅ</option>
              <option value="30">30% — វិស័យប្រេង / ធនធានធម្មជាតិ</option>
              <option value="5">5% — គម្រោងវិនិយោគ QIP</option>
            </select>
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនខែហួសកាលកំណត់</label>
            <input style={S.input} type="number" placeholder="ឧ. 10" value={months} onChange={e => { setMonths(e.target.value); setResult(null); }} />
          </div>
        </div>
        <div style={S.field}>
          <label style={{ ...S.label, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={nonCompli} onChange={e => { setNonCompli(e.target.checked); setResult(null); }} style={{ accentColor: "#0B1F4E", width: 15, height: 15 }} />
            ប្រព័ន្ធគណនេយ្យមិនអនុលោម → អនុវត្ត 25% ភ្លាមៗ
          </label>
        </div>
      </div>
      <button style={S.btn} onClick={calculate}>គណនាលទ្ធផលសវនកម្ម</button>
      {result && (
        <>
          <div style={S.metricGrid}>
            <div style={S.metric}><div style={S.mLabel}>ប្រាក់ពន្ធខ្វះខាតសរុប</div><div style={{ fontSize: 15, fontWeight: 700, color: "#c0392b", fontFamily: FONT }}>{formatCurrency(result.shortage)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>ប្រាក់ពិន័យ + ការប្រាក់</div><div style={{ fontSize: 15, fontWeight: 700, color: "#f97316", fontFamily: FONT }}>{formatCurrency(result.surcharge + result.interest)}</div></div>
            <div style={S.metric}><div style={S.mLabel}>សរុបត្រូវបង់បន្ថែមចូលរដ្ឋ</div><div style={{ fontSize: 15, fontWeight: 700, color: "#0B1F4E", fontFamily: FONT }}>{formatCurrency(result.totalExtra)}</div></div>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>តារាងលម្អិតនៃការកែតម្រូវ CIT</div>
            <table style={S.tbl}>
              <thead><tr><th style={S.th}>បរិយាយ</th><th style={S.th}>អត្រា</th><th style={S.th}>ទឹកប្រាក់ (រៀល)</th></tr></thead>
              <tbody>
                <tr><td style={S.td}>ចំណេញតាមការប្រកាស</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(result.decl)}</td></tr>
                <tr><td style={S.td}>+ ចំណាយដែលមិនអនុញ្ញាត</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(result.adj)}</td></tr>
                <tr><td style={{ ...S.td, fontWeight: 700 }}>ចំណេញពិតក្រោយសវនកម្ម</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(result.auditedProfit)}</td></tr>
                <tr><td style={S.td}>ពន្ធតាមការប្រកាស</td><td style={S.td}>{(result.rate*100).toFixed(0)}%</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(result.declaredTax)}</td></tr>
                <tr><td style={S.td}>ពន្ធពិតក្រោយសវនកម្ម</td><td style={S.td}>{(result.rate*100).toFixed(0)}%</td><td style={{ ...S.td, color: "#2563EB", fontWeight: 700 }}>{formatCurrency(result.auditedTax)}</td></tr>
                <tr><td style={S.td}>ប្រាក់ពន្ធខ្វះខាត ({result.pct.toFixed(1)}%)</td><td style={S.td}>—</td><td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{formatCurrency(result.shortage)}</td></tr>
                <tr><td style={S.td}>{result.surchargeLabel}</td><td style={S.td}>{result.nonCompli || result.pct > 10 ? "25%" : "10%"}</td><td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{formatCurrency(result.surcharge)}</td></tr>
                <tr><td style={S.td}>ការប្រាក់យឺតយ៉ាវ × {result.m} ខែ</td><td style={S.td}>1.5%/ខែ</td><td style={{ ...S.td, color: "#DC2626", fontWeight: 700 }}>{formatCurrency(result.interest)}</td></tr>
              </tbody>
            </table>
            <div style={S.dedRowTotalRed}><span>សរុបទឹកប្រាក់បន្ថែមត្រូវបង់</span><span>{formatCurrency(result.totalExtra)}</span></div>
            <div style={S.note}>
              <strong>រូបមន្ត CIT៖</strong><br />
              • ចំណេញក្រោយសវន = {formatCurrency(result.decl)} + {formatCurrency(result.adj)} = {formatCurrency(result.auditedProfit)}<br />
              • ពន្ធខ្វះ = {formatCurrency(result.auditedTax)} − {formatCurrency(result.declaredTax)} = {formatCurrency(result.shortage)}<br />
              • ពិន័យ = {formatCurrency(result.shortage)} × {result.nonCompli || result.pct > 10 ? "25%" : "10%"} = {formatCurrency(result.surcharge)}<br />
              • ការប្រាក់ = {formatCurrency(result.shortage)} × 1.5% × {result.m} ខែ = {formatCurrency(result.interest)}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — CLASSIFY
// ══════════════════════════════════════════════════════════════
const TIERS = [
  { id: "small",  label: "អ្នកជាប់ពន្ធតូច",   revMin: 250000000,  revMax: 700000000,  empMin: 10, empMax: 50,       color: "#1a7a4a", bg: "#f0fdf4", border: "#bbf7d0", accounting: "ប្រព័ន្ធកត់ត្រាគណនេយ្យសាមញ្ញ",        note: "ចំណូល 250លាន – 700លាន ៛ ឬ 10–50 នាក់" },
  { id: "medium", label: "អ្នកជាប់ពន្ធមធ្យម",  revMin: 700000001,  revMax: 4000000000, empMin: 51, empMax: 100,      color: "#0B1F4E", bg: "#eff6ff", border: "#bfdbfe", accounting: "ស្តង់ដារគណនេយ្យស្របតាមក្រុមប្រឹក្សាជាតិ", note: "ចំណូល 700លាន – 4,000លាន ៛ ឬ 51–100 នាក់" },
  { id: "large",  label: "អ្នកជាប់ពន្ធធំ",     revMin: 4000000001, revMax: Infinity,   empMin: 101, empMax: Infinity, color: "#c0392b", bg: "#fef2f2", border: "#fecaca", accounting: "ស្តង់ដាររបាយការណ៍ហិរញ្ញវត្ថុពេញលេញ",     note: "ចំណូលលើស 4,000លាន ៛ ឬ > 100 នាក់" },
];

function ClassifyTab() {
  const [revenue,   setRevenue]   = useState("");
  const [employees, setEmployees] = useState("");
  const [result,    setResult]    = useState(null);

  function classify() {
    const rev = parseFloat(revenue)  || 0;
    const emp = parseInt(employees)  || 0;
    const byRev = TIERS.find(t => rev >= t.revMin && rev <= t.revMax);
    const byEmp = TIERS.find(t => emp >= t.empMin && emp <= t.empMax);
    let tier = null;
    if (byRev && byEmp && byRev.id === byEmp.id) { tier = byRev; }
    else if (byRev || byEmp) {
      const order = ["small","medium","large"];
      const ri = byRev ? order.indexOf(byRev.id) : -1;
      const ei = byEmp ? order.indexOf(byEmp.id) : -1;
      tier = ri >= ei ? (byRev || byEmp) : (byEmp || byRev);
    }
    setResult({ tier, rev, emp });
  }

  return (
    <>
      <DefSection tabId="classify" />
      <div style={S.card}>
        <div style={S.cardTitle}>កម្រិតកំណត់ប្រភេទអ្នកជាប់ពន្ធ</div>
        <table style={S.tbl}>
          <thead><tr><th style={S.th}>ប្រភេទ</th><th style={S.th}>ចំណូលប្រចាំឆ្នាំ (រៀល)</th><th style={S.th}>ចំនួនបុគ្គលិក</th><th style={S.th}>កាតព្វកិច្ចគណនេយ្យ</th></tr></thead>
          <tbody>
            {TIERS.map(t => (
              <tr key={t.id}>
                <td style={{ ...S.td, fontWeight: 700, color: t.color }}>{t.label}</td>
                <td style={S.td}>{t.id === "large" ? "លើសពី 4,000 លាន" : `${(t.revMin/1000000).toFixed(0)}លាន – ${(t.revMax/1000000).toFixed(0)}លាន`}</td>
                <td style={S.td}>{t.id === "large" ? "លើស 100 នាក់" : `${t.empMin} – ${t.empMax} នាក់`}</td>
                <td style={{ ...S.td, fontSize: 12, color: "#6b7280" }}>{t.accounting}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ height: 20 }} />
        <div style={S.cardTitle}>បញ្ចូលទិន្នន័យសហគ្រាស</div>
        <div style={S.row2}>
          <div style={S.field}>
            <label style={S.label}>ចំណូលសរុបប្រចាំឆ្នាំ (រៀល)</label>
            <input style={S.input} type="number" placeholder="ឧ. 500000000" value={revenue} onChange={e => { setRevenue(e.target.value); setResult(null); }} />
          </div>
          <div style={S.field}>
            <label style={S.label}>ចំនួនបុគ្គលិកសរុប (នាក់)</label>
            <input style={S.input} type="number" placeholder="ឧ. 25" value={employees} onChange={e => { setEmployees(e.target.value); setResult(null); }} />
          </div>
        </div>
      </div>
      <button style={S.btn} onClick={classify}>ពិនិត្យប្រភេទអ្នកជាប់ពន្ធ</button>
      {result && (
        <div style={S.card}>
          <div style={S.cardTitle}>លទ្ធផលនៃការចាត់ថ្នាក់</div>
          {result.tier ? (
            <>
              <div style={{ background: result.tier.bg, border: `2px solid ${result.tier.color}`, borderRadius: 12, padding: 20, textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: result.tier.color, marginBottom: 4, fontFamily: FONT }}>{result.tier.label}</div>
                <div style={{ fontSize: 13, color: "#6b7280", fontFamily: FONT }}>{result.tier.note}</div>
              </div>
              <div style={S.dedRow}><span>ចំណូលដែលបានបញ្ចូល</span><span style={S.dedVal}>{formatCurrency(result.rev)}</span></div>
              <div style={S.dedRow}><span>ចំនួនបុគ្គលិក</span><span style={S.dedVal}>{result.emp} នាក់</span></div>
              <div style={S.note}>កាតព្វកិច្ច៖ <strong>{result.tier.accounting}</strong></div>
            </>
          ) : (
            <div style={S.noteWarn}>⚠ មិនអាចកំណត់ប្រភេទបានទេ — សូមពិនិត្យទិន្នន័យម្ដងទៀត។</div>
          )}
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function CambodiaTaxCalc({ setPage }) {
  const [tab, setTab] = useState("penalty");

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <div style={S.topBar}>
          <button style={S.backBtn} onClick={() => setPage("home")}>← ត្រឡប់ទៅទំព័រដើម</button>
        </div>

        <div style={S.header}>
          <div style={S.h1}>ពន្ធដារទូទៅ</div>
          <div style={S.hSub}>ប្រាក់ពិន័យ · ពន្ធប៉ាតង់ · សវនកម្ម  · ចំណាត់ថ្នាក់អ្នកជាប់ពន្ធ</div>
        </div>

        {/* INFO CARDS */}
        <div style={S.infoGrid}>
          {INFO_CARDS.map((c, i) => (
            <div key={i} style={S.infoCard}>
              <div style={S.infoCardInner}>
                <div style={{ ...S.infoCardDot, background: c.bg }}>{c.icon}</div>
                <div style={S.infoCardBody}>
                  <div style={S.infoCardTitle}>{c.title}</div>
                  <div style={S.infoCardValue}>{c.value}</div>
                  <div style={S.infoCardNote}>{c.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={S.tabRow}>
          {TABS.map(t => (
            <button key={t.id} style={tab === t.id ? S.tabOn : S.tab} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {tab === "penalty"  && <PenaltyTab  />}
        {tab === "patent"   && <PatentTab   />}
        {tab === "income"   && <IncomeTab   />}
        {tab === "classify" && <ClassifyTab />}

      </div>
    </div>
  );
}