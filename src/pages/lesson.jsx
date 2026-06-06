import { useState } from "react";

// ស្ទាយរួមដែលបានកែសម្រួល Font Family ឱ្យត្រូវស្តង់ដារ
const FONT_SET = "'Khmer OS Siemreap', 'Khmer OS Battambang', 'Khmer OS Battambong', 'Battambang', Inter, sans-serif";
const CARD_RADIUS = 20;
const CARD_PADDING = 24;

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
    borderRadius: CARD_RADIUS,
    padding: CARD_PADDING,
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

  field: {
    marginBottom: 16,
  },

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
    borderRadius: CARD_RADIUS,
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

  noteWarn: {
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    borderRadius: 12,
    padding: 14,
    color: "#991B1B",
    marginTop: 12,
    lineHeight: 1.6,
    fontSize: 13,
    fontFamily: FONT_SET,
  },

  tbl: {
    width: "100%",
    borderCollapse: "collapse",
  },

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

  tdActive: {
    padding: "12px",
    fontSize: 13,
    lineHeight: 1.6,
    borderBottom: "1px solid #DBEAFE",
    background: "#EFF6FF",
    color: "#1E40AF",
    fontWeight: 700,
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

  dedVal: {
    color: "#2563EB",
    fontWeight: 700,
  },

  dedValRed: {
    color: "#DC2626",
    fontWeight: 700,
  },
};
const lessons = [
  {
    id: 0,
    icon: "🏛️",
    title: "សេចក្តីផ្តើមទូទៅអំពីពន្ធដារ",
    sub: "មេរៀនទី ១ · ប្រព័ន្ធពន្ធដារកម្ពុជា",
    tag: "ចំណេះដឹងគ្រឹះ",
    tagColor: { bg: "#E0F2FE", text: "#0369A1" },
    sections: [
      {
        title: "ប្រវត្តិនៃអគ្គនាយកដ្ឋានពន្ធដារ (អពដ)",
        items: [
          "ឆ្នាំ ១៩៥៣៖ ត្រូវបានបង្កើតឡើងក្រោយទទួលបានឯករាជ្យ ដោយដើមឡើយហៅថា «សួយសារអាករ» ឬវិភាគទានចំណូលរដ្ឋ។",
          "ឆ្នាំ ១៩៧៥–១៩៧៩៖ ប្រព័ន្ធពន្ធដារ និងរូបិយវត្ថុត្រូវបានលុបបំបាត់ចោលទាំងស្រុងក្នុងរបបកម្ពុជាប្រជាធិបតេយ្យ (របបសមូហភាព)។",
          "ឆ្នាំ ១៩៨០–១៩៩៣៖ ដំណើរការឡើងវិញក្រោមឈ្មោះថា «នាយកដ្ឋានពន្ធដារឧស្សាហពាណិជ្ជ» ស្ថិតក្រោមការគ្រប់គ្រងរបស់ក្រសួងហិរញ្ញវត្ថុ។",
          "ឆ្នាំ ១៩៩៣–២០០៨៖ ប្តូរឈ្មោះមកជា «នាយកដ្ឋានពន្ធដារ» ស្ថិតក្រោមរចនាសម្ព័ន្ធផ្លូវការរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ។",
          "ឆ្នាំ ២០០៨–បច្ចុប្បន្ន៖ ត្រូវបានដំឡើងកម្រិតរចនាសម្ព័ន្ធទៅជា «អគ្គនាយកដ្ឋានពន្ធដារ» ដើម្បីបង្កើនប្រសិទ្ធភាពទំនើបកម្មនៃការប្រមូលចំណូលពន្ធ។",
        ],
      },
      {
        title: "និយមន័យ និងតួនាទីនៃពន្ធដារ",
        items: [
          "ពន្ធដារ គឺជាកាតព្វកិច្ចហិរញ្ញវត្ថុជាធរមានកំណត់ដោយច្បាប់ លើរូបវន្តបុគ្គល ឬនីតិបុគ្គល ដើម្បីបង់ចូលថវិកាជាតិដោយគ្មានការបង្វរមកវិញផ្ទាល់ឡើយ។",
          "ពន្ធដារត្រូវបានបែងចែកជាពីរប្រភេទធំៗគឺ៖ ពន្ធផ្ទាល់ (បង់ដោយផ្ទាល់ពីចំណូល/ប្រាក់ចំណេញ) និងពន្ធប្រយោល (ប្រមូលតាមរយៈការប្រើប្រាស់ទំនិញ/សេវា)។",
          "តួនាទីសេដ្ឋកិច្ច៖ ប្រើប្រាស់សម្រាប់ទ្រទ្រង់ការចំណាយសាធារណៈរបស់រដ្ឋ ដូចជាការកសាងហេដ្ឋារចនាសម្ព័ន្ធ វិស័យអប់រំ សុខាភិបាល និងការពារជាតិ។",
        ],
      },
      {
        title: "ការបែងចែកប្រភេទពន្ធនៅកម្ពុជា",
        table: {
          cols: ["ពន្ធថវិកាថ្នាក់ជាតិ (National Taxes)", "ពន្ធថវិការដ្ឋបាលថ្នាក់ក្រោមជាតិ (Local Taxes)"],
          rows: [
            ["ពន្ធលើប្រាក់ចំណូល (ពន្ធលើប្រាក់ចំណេញ)", "អាករសម្រាប់បំភ្លឺសាធារណៈ (PLT)"],
            ["ពន្ធលើប្រាក់បៀវត្ស (TOS)", "អាករលើការស្នាក់នៅ (ToA)"],
            ["អាករលើតម្លៃបន្ថែម (VAT)", "ពន្ធលើមធ្យោបាយដឹកជញ្ជូននិងយានជំនិះគ្រប់ប្រភេទ"],
            ["អាករពិសេសលើទំនិញនិងសេវាមួយចំនួន", "ពន្ធប៉ាតង់ (សម្រាប់ការបើកអាជីវកម្មប្រចាំឆ្នាំ)"],
            ["ពន្ធអប្បបរមា (Minimum Tax)", "ពន្ធលើអចលនទ្រព្យ / ពន្ធប្រថាប់ត្រា"],
            ["ពន្ធកាត់ទុក (Withholding Tax - WHT)", "ពន្ធលើដីធ្លីមិនបានប្រើប្រាស់"],
          ],
        },
      },
      {
        title: "របបពន្ធដារបច្ចុប្បន្ន (របបស្វ័យប្រកាស)",
        items: [
          "ចាប់តាំងពីឆ្នាំ ២០១៦ មក ប្រទេសកម្ពុជាបានលុបចោលរបបពន្ធប៉ាន់ស្មាន និងរបបសម្រួល ដោយប្រើប្រាស់តែ «របបស្វ័យប្រកាស» តែមួយគត់។",
          "អ្នកជាប់ពន្ធតូច៖ ផលរបរ (ចំណូល) ប្រចាំឆ្នាំចាប់ពី ២៥០ លាន ដល់ ៧០០ លានរៀល ឬមានបុគ្គលិកពី ១០ ដល់ ៥០ នាក់។",
          "អ្នកជាប់ពន្ធមធ្យម៖ ផលរបរប្រចាំឆ្នាំចាប់ពី ៧០០ លាន ដល់ ៤,០០០ លានរៀល ឬមានបុគ្គលិកពី ៥១ ដល់ ១០០ នាក់ ឬជានីតិបុគ្គលចុះបញ្ជី។",
          "អ្នកជាប់ពន្ធធំ៖ ផលរបរប្រចាំឆ្នាំលើសពី ៤,០០០ លានរៀល ឡើងទៅ បុគ្គលិកលើសពី ១០០ នាក់ ឬជាក្រុមហ៊ុនពហុជាតិសាសន៍ និងគម្រោង QIP។",
        ],
      },
      {
        title: "កាលបរិច្ឆេទកំណត់នៃការប្រកាសពន្ធ",
        items: [
          "ការប្រកាសពន្ធប្រចាំខែ៖ ត្រូវធ្វើឡើងយ៉ាងយូរបំផុតត្រឹមថ្ងៃទី ២០ នៃខែបន្ទាប់ (សម្រាប់ទម្រង់អេឡិចត្រូនិច e-Filing)។",
          "ពន្ធប៉ាតង់ (ប្រចាំឆ្នាំ)៖ ត្រូវប្រកាស និងបង់ប្រាក់ចាប់ពីថ្ងៃទី ០១ ខែមករា រហូតដល់ថ្ងៃទី ៣១ ខែមីនា នៃឆ្នាំនីមួយៗ។",
          "ពន្ធលើប្រាក់ចំណូលប្រចាំឆ្នាំ (ToI)៖ ត្រូវប្រកាសយ៉ាងយូរបំផុតត្រឹមថ្ងៃទី ៣១ ខែមីនា នៃឆ្នាំបន្ទាប់។",
          "ពន្ធលើផ្លូវ និងមធ្យោបាយដឹកជញ្ជូន៖ ត្រូវប្រកាសបង់ជាប្រចាំឆ្នាំ ចាប់ពីថ្ងៃទី ០១ ខែមិថុនា ដល់ថ្ងៃទី ៣០ ខែកញ្ញា។",
        ],
      },
    ],
  },
  {
    id: 1,
    icon: "💰",
    title: "ពន្ធលើប្រាក់បៀវត្ស",
    sub: "មេរៀនទី ២ · កាតព្វកិច្ចកាត់ទុកលើប្រាក់ឈ្នួល",
    tag: "ពន្ធស្នូល",
    tagColor: { bg: "#FFE4E6", text: "#9F1239" },
    sections: [
      {
        title: "គោលការណ៍ទូទៅ និងវិសាលភាពអនុវត្ត",
        items: [
          "ពន្ធលើប្រាក់បៀវត្ស (TOS) គឺជាពន្ធប្រចាំខែដែលកំណត់លើប្រាក់ចំណូលទទួលបានពីសកម្មភាពបំពេញការងាររបស់បុគ្គល។",
          "យន្តការកាត់ទុក៖ និយោជកមានកាតព្វកិច្ចកាត់ទុកពន្ធនេះជាមុន នៅពេលបើកប្រាក់បៀវត្សជូននិយោជិត រួចយកទៅប្រកាសបង់ជូនរដ្ឋ។",
          "វិសាលភាព៖ អនុវត្តលើរូបវន្តបុគ្គលទាំងអស់ដែលទទួលប្រាក់បៀវត្ស រួមទាំងប្រធានក្រុមហ៊ុន ឬអ្នកតំណាងដែលទទួលបានការតែងតាំង។",
        ],
      },
      {
        title: "មូលដ្ឋានគិតពន្ធ និងអត្ថប្រយោជន៍បន្ថែម (Fringe Benefits)",
        items: [
          "ប្រាក់បៀវត្សជាប់ពន្ធរួមមាន៖ ប្រាក់ឈ្នួលមូលដ្ឋាន ប្រាក់ម៉ោងបន្ថែម (Overtime) ប្រាក់រង្វាន់ (Bonus) ថ្លៃតំណែង និងប្រាក់ឧបត្ថម្ភផ្សេងៗ។",
          "អត្ថប្រយោជន៍បន្ថែម (Fringe Benefits)៖ រួមមានការផ្តល់កន្លែងស្នាក់នៅ ឡានជិះផ្ទាល់ខ្លួន ការបង់ថ្លៃសិក្សាជំនួស ឬការផ្តល់ប្រាក់កម្ចីការប្រាក់ទាប។",
          "អត្រាពន្ធលើអត្ថប្រយោជន៍បន្ថែម៖ ត្រូវកំណត់ជាប់ពន្ធក្នុងអត្រាថេរ ២០% នៃតម្លៃទីផ្សារសរុប ដោយគ្មានការកាត់កងបុគ្គលក្នុងបន្ទុកឡើយ។",
        ],
      },
      {
        title: "ការលើកលែងមិនជាប់ពន្ធ",
        items: [
          "ការទូទាត់សងការចំណាយក្នុងបេសកកម្មការងារ (មានវិក្កយបត្រត្រឹមត្រូវ និងប្រើប្រាស់សម្រាប់តែផលប្រយោជន៍អាជីវកម្ម)។",
          "ប្រាក់ថ្លៃបំណាច់ការងារ (Severance Pay) ក្នុងកម្រិតដែលកំណត់ដោយច្បាប់ស្តីពីការងារ។",
          "វិភាគទានសន្តិសុខសង្គម (Bf/NSSF) ដែលកំណត់ដោយច្បាប់ជាធរមាន។",
          "ប្រាក់ថ្លៃធ្វើដំណើរ (Transportation Allowance) និងការធានារ៉ាប់រងសុខភាពដែលផ្តល់ជូនកម្មករ/បុគ្គលិកស្មើៗគ្នាទូទាំងក្រុមហ៊ុន។",
        ],
      },
      {
        title: "និវាសនជន និងអនិវាសនជន (Resident vs Non-Resident)",
        items: [
          "និវាសនជន៖ បុគ្គលដែលមានលំនៅឋានជាគោលដើមនៅក្នុងប្រទេសកម្ពុជា ឬមានវត្តមាននៅក្នុងប្រទេសលើសពី ១៨២ ថ្ងៃ ក្នុងរយៈពេល ១២ ខែ។ ត្រូវជាប់ពន្ធតាមអត្រាកើនតាមថ្នាក់ពី ០% ដល់ ២០% លើប្រភពចំណូលទូទាំងពិភពលោក។",
          "អនិវាសនជន៖ បុគ្គលដែលមិនបំពេញលក្ខខណ្ឌខាងលើ។ ត្រូវជាប់ពន្ធក្នុងអត្រាថេរ ២០% តែម្តង លើប្រភពចំណូលនៅកម្ពុជា ដោយមិនទទួលបានការអនុគ្រោះកាត់បន្ថយស្ថានភាពគ្រួសារឡើយ។",
        ],
      },
      {
        title: "ការអនុគ្រោះបុគ្គលក្នុងបន្ទុក (សម្រាប់និវាសនជន)",
        items: [
          "សហព័ទ្ធ (ប្តី ឬប្រពន្ធដែលគ្មានការងារធ្វើ និងអាស្រ័យលើការចិញ្ចឹមរបស់អ្នកជាប់ពន្ធ)៖ ១៥០,០០០ រៀល / ខែ។",
          "កូនក្នុងបន្ទុក (អាយុក្រោម ១៤ ឆ្នាំ ឬជានិស្សិតរហូតដល់ ២៥ ឆ្នាំ ដែលកំពុងសិក្សាពេញម៉ោង)៖ ១៥០,០០០ រៀល / ម្នាក់ក្នុងមួយខែ។",
        ],
      },
      {
        title: "តារាងអត្រាពន្ធលើប្រាក់បៀវត្សប្រចាំខែ (គិតចាប់ពីឆ្នាំ ២០២៣ ឡើងទៅ)",
        table: {
          cols: ["ប្រាក់បៀវត្សជាប់ពន្ធប្រចាំខែ (រៀល)", "អត្រាពន្ធ", "រូបមន្តគណនារហ័ស"],
          rows: [
            ["០ – ១,៥០០,០០០", "០%", "ប្រាក់ពន្ធ = ០"],
            ["១,៥០០,០០១ – ២,០០០,០០០", "៥%", "(ប្រាក់បៀវត្សជាប់ពន្ធ × ៥%) − ៧៥,០០០"],
            ["២,០០០,០០១ – ៨,៥០០,០០០", "១០%", "(ប្រាក់បៀវត្សជាប់ពន្ធ × ១០%) − ១៧៥,០០០"],
            ["៨,៥០០,០០១ – ១២,៥០០,០០០", "១៥%", "(ប្រាក់បៀវត្សជាប់ពន្ធ × ១៥%) − ៦០០,០០០"],
            ["លើសពី ១២,៥០០,០០០ ឡើងទៅ", "២០%", "(ប្រាក់បៀវត្សជាប់ពន្ធ × ២០%) − ១,២២៥,០០០"],
          ],
        },
      },
      {
        title: "រូបមន្តនៃការគណនា",
        formula:
          "ការស្វែងរកមូលដ្ឋានជាប់ពន្ធ៖\nប្រាក់បៀវត្សជាប់ពន្ធ = ប្រាក់បៀវត្សសរុប − ប្រាក់លើកលែងពន្ធ − ការអនុគ្រោះបុគ្គលក្នុងបន្ទុក\n\nប្រាក់ពន្ធត្រូវបង់សរុប = (ប្រាក់បៀវត្សជាប់ពន្ធ × អត្រាពន្ធតាមថ្នាក់) − ចំនួនទឹកប្រាក់ត្រូវដកចេញ (Offset)",
      },
      {
        title: "លំហាត់គំរូអនុវត្ត",
        items: [
          "ឧទាហរណ៍ទី ១៖ បុគ្គលិកនៅលីវម្នាក់មានប្រាក់បៀវត្ស ២,៥០០,០០០ រៀល។ ប្រាក់ជាប់ពន្ធ ២,៥០០,០០០ រៀល (ថ្នាក់ ១០%)។ ប្រាក់ពន្ធ = (២,៥០០,០០០ × ១០%) − ១content៧៥,០០០ = ៧៥,០០០ រៀល។",
          "ឧទហរណ៍ទី ២៖ បុគ្គលិកម្នាក់ប្រាក់បៀវត្ស ២,៥០០,០០០ រៀល មានប្រពន្ធមេផ្ទះ និងកូន ៣ នាក់ក្នុងបន្ទុក។ ទទួលបានការអនុគ្រោះ៖ ៤ × ១៥០,០០០ = ៦០០,០០០ រៀល។ មូលដ្ឋានគិតពន្ធ = ២,៥០០,០០០ − ៦០០,០០០ = ១,៩០០,០០០ រៀល (ថ្នាក់ ៥%)។ ប្រាក់ពន្ធ = (១,៩០០,០០០ × ៥%) − ៧៥,០០០ = ២Base០,០០០ រៀល។",
        ],
      },
    ],
  },
  {
    id: 2,
    icon: "🛒",
    title: "អាករលើតម្លៃបន្ថែម (VAT) និង ប្រាក់រំដោះពន្ធ",
    sub: "មេរៀនទី ៣ · ពន្ធប្រយោល និងកាតព្វកិច្ចក្រុមហ៊ុន",
    tag: "ពន្ធសហគ្រាស",
    tagColor: { bg: "#CCFBF1", text: "#115E59" },
    sections: [
      {
        title: "គោលការណ៍គ្រឹះ និងយន្តការរបស់ VAT",
        items: [
          "អាករលើតម្លៃបន្ថែម (VAT) គឺជាពន្ធប្រយោលដែលប្រមូលបន្ថែមនៅលើការប្រើប្រាស់ទំនិញ ឬសេវាកម្ម នៅគ្រប់ដំណាក់កាលនៃចង្វាក់ចែកចាយ។",
          "បន្ទុកពន្ធ៖ សហគ្រាសអាជីវកម្មគ្រាន់តែជាអ្នកប្រមូលជំនួសរដ្ឋប៉ុណ្ណោះ ចំណែកឯអ្នករងបន្ទុកបង់ពន្ធពិតប្រាកដគឺ អ្នកប្រើប្រាស់ចុងក្រោយ។",
          "អត្រាស្តង់ដារនៅកម្ពុជា៖ ១០% សម្រាប់ការផ្គត់ផ្គង់ក្នុងស្រុក និង ០% សម្រាប់ការនាំចេញ (Export) ឬឧស្សាហកម្មគាំទ្រនាំចេញ។",
        ],
      },
      {
        title: "ពន្ធធាតុចូល និងពន្ធធាតុចេញ (Input vs Output VAT)",
        items: [
          "អាករធាតុចេញ (Output VAT)៖ ជាអាករ ១០% ដែលអាជីវកម្មប្រមូលពីអតិថិជននៅពេលលក់ទំនិញ ឬសេវាកម្មចេញ។",
          "អាករធាតុចូល (Input VAT)៖ ជាអាករ ១០% ដែលអាជីវកម្មបានបង់ទៅឱ្យអ្នកផ្គត់ផ្គង់នៅពេលទិញទំនិញ វត្ថុធាតុដើម ឬទ្រព្យសកម្មចូល។",
          "ការទូទាត់សងរដ្ឋ៖ ប្រសិនបើ Output VAT > Input VAT ក្រុមហ៊ុនត្រូវបង់ប្រាក់ខ្វះជូនរដ្ឋ។ ប្រសិនបើ Input VAT > Output VAT ទឹកប្រាក់ដែលលើសអាចរក្សាទុកកាត់កងខែក្រោយ (Credit Forward)។",
        ],
      },
      {
        title: "ប្រាក់រំដោះពន្ធលើប្រាក់ចំណូល (Prepayment of ToI)",
        items: [
          "ប្រាក់រំដោះពន្ធលើប្រាក់ចំណូល គឺជាកាតព្វកិច្ចបង់ពន្ធជាមុនប្រចាំខែ ក្នុងអត្រា ១% នៃផលរបរ (Turnover) សរុបរួមបញ្ចូលទាំងពន្ធដារដទៃទៀត (លើកលែងតែ VAT)។",
          "ទឹកប្រាក់ដែលបានបង់ប្រចាំខែនេះ នឹងត្រូវយកទៅកាត់កងជាមួយកាតព្វកិច្ចពន្ធលើប្រាក់ចំណូលប្រចាំឆ្នាំ (ToI) នៅចុងឆ្នាំ។",
        ],
      },
      {
        title: "រូបមន្ត និងការគណនា",
        formula:
          "រូបមន្តទូទាត់ VAT ប្រចាំខែ៖\nVAT ត្រូវបង់/កាត់កង = Output VAT − Input VAT\n\nរូបមន្តប្រាក់រំដោះពន្ធលើប្រាក់ចំណូលប្រចាំខែ៖\nប្រាក់រំដោះពន្ធ (១%) = ផលរបរលក់សរុបប្រចាំខែ (មិនគិត Output VAT) × ១%",
      },
    ],
  },
  {
    id: 3,
    icon: "⚠️",
    title: "ទោសទណ្ឌពន្ធដារ និងបទល្មើស",
    sub: "មេរៀនទី ៤ · ការអនុវត្តច្បាប់ និងការផាកពិន័យ",
    tag: "ការអនុលោមភាព",
    tagColor: { bg: "#FEF3C7", text: "#92400E" },
    sections: [
      {
        title: "បទល្មើសស្រាល ឬការរំលោភបំពានបទប្បញ្ញត្តិ — ពិន័យ ២,០០០,០០០ រៀល",
        items: [
          "មិនបានរក្សាទុកកំណត់ត្រាគណនេយ្យ ឬវិក្កយបត្រត្រឹមត្រូវតាមច្បាប់អាជីវកម្ម។",
          "បដិសេធមិនផ្តល់ឯកសារ ឬរារាំងមន្ត្រីពន្ធដារក្នុងការចុះធ្វើការត្រួតពិនិត្យ។",
          "មិនបានចុះបញ្ជីពន្ធដារជាមួយអគ្គនាយកដ្ឋានពន្ធដារក្នុងរយៈពេលកំណត់។",
          "មិនបានជូនដំណឹងអំពីការផ្លាស់ប្តូរព័ត៌មានក្រុមហ៊ុន (ដូចជា អាសយដ្ឋាន ម្ចាស់ភាគហ៊ុន ឬសកម្មភាពអាជីវកម្ម) ក្នុងរយៈពេល ២ អាទិត្យ។",
          "ការខកខានមិនបានដាក់លិខិតប្រកាសពន្ធក្នុងរយៈពេល ៣០ ថ្ងៃ ក្រោយកាលបរិច្ឆេទកំណត់។",
        ],
      },
      {
        title: "ការបង់ពន្ធតិចដោយអចេតនា (Negligent Underpayment)",
        items: [
          "កើតឡើងនៅពេលទឹកប្រាក់ដែលបានប្រកាសបង់ តិចជាងចំនួនទឹកប្រាក់ដែលរកឃើញដោយសវនកម្មពន្ធដារ ក្នុងកម្រិតមិនលើសពី ១០%។",
          "ទោសទណ្ឌ៖ ផាកពិន័យ ១០% នៃប្រាក់ពន្ធដែលខ្វះខាត បូករួមទាំងការគិតការប្រាក់យឺតយ៉ាវ ១.៥% ក្នុងមួយខែ។",
        ],
      },
      {
        title: "ការបង់ពន្ធតិចដោយចេតនា ឬធ្ងន់ធ្ងរ (Serious Underpayment)",
        items: [
          "កើតឡើងនៅពេលទឹកប្រាក់ដែលបានប្រកាសបង់ តិចជាងចំនួនទឹកប្រាក់ដែលរកឃើញដោយសវនកម្ម លើសពី ១០%។",
          "ទោសទណ្ឌ៖ ផាកពិន័យ ២៥% នៃប្រាក់ពន្ធដែលខ្វះខាត បូករួមទាំងការគិតការប្រាក់យឺតយ៉ាវ ១.៥% ក្នុងមួយខែ។",
        ],
      },
      {
        title: "ការវាយតម្លៃពន្ធឯកតោភាគី (Unilateral Assessment)",
        items: [
          "អនុវត្តក្នុងករណីដែលអ្នកជាប់ពន្ធមិនសហការជាមួយសវនករ មិនមានសៀវភៅបញ្ជីគណនេយ្យ ឬអពដមិនមានព័ត៌មានគ្រប់គ្រាន់ក្នុងការគិតពន្ធធម្មតា។",
          "ទោសទណ្ឌ៖ ផាកពិន័យជាអតិបរមា ៤០% នៃប្រាក់ពន្ធដែលបានវាយតម្លៃ បូករួមទាំងការគិតការប្រាក់យឺតយ៉ាវ ១.៥% ក្នុងមួយខែ។",
        ],
      },
    ],
  },
  {
    id: 4,
    icon: "📋",
    title: "ដោះស្រាយវិវាទពន្ធដារ",
    sub: "មេរៀនទី ៥ · នីតិវិធីតវ៉ា និងការប្តឹងឧទ្ធរណ៍",
    tag: "ដំណើរការច្បាប់",
    tagColor: { bg: "#F3E8FF", text: "#6B21A8" },
    sections: [
      {
        title: "ការដាក់ពាក្យបណ្តឹងតវ៉ា (Filing a Complaint)",
        items: [
          "ត្រូវតែដាក់ពាក្យបណ្តឹងតវ៉ាក្នុងរយៈពេលយ៉ាងយូរបំផុត ៣០ ថ្ងៃ គិតចាប់ពីថ្ងៃដែលបានទទួលលិខិតជូនដំណឹងស្តីពីការវាយតម្លៃពន្ធ (Notice of Tax Assessment)។",
          "កម្មវត្ថុនៃបណ្តឹង៖ តវ៉ាលើការកំណត់ពន្ធឡើងវិញរបស់សវនករ ឬវិធានការណ៍បង្ខំផ្សេងៗ។",
          "មូលដ្ឋានតវ៉ា៖ ត្រូវផ្អែកលើអង្គហេតុថ្មី ភស្តុតាង និងច្បាប់ពន្ធដារជាធរមានដែលសវនករអាចនឹងយល់ច្រឡំ។",
        ],
      },
      {
        title: "ខ្លឹមសារចាំបាច់នៃលិខិតតវ៉ា",
        items: [
          "កាលបរិច្ឆេទនៃលិខិតជូនដំណឹងស្តីពីការកំណត់ពន្ធដែលចង់តវ៉ា។",
          "ព័ត៌មានអត្តសញ្ញាណអ្នកជាប់ពន្ធ (លេខអត្តសញ្ញាណកម្មសារពើពន្ធ VAT TIN ឬ PIN)។",
          "អាសយដ្ឋាន លេខទូរស័ព្ទទំនាក់ទំនង និងអ៊ីមែលផ្លូវការ។",
          "មូលហេតុ និងសំអាងហេតុផ្លូវច្បាប់ច្បាស់លាស់ដែលបង្ហាញថាកាគណនារបស់សវនករមិនត្រឹមត្រូវ។",
          "ហត្ថលេខាផ្ទាល់របស់តំណាងស្របច្បាប់ ឬម្ចាស់សហគ្រាស។",
        ],
      },
      {
        title: "មូលហេតុដែលបណ្តឹងអាចត្រូវបដិសេធចោល (Rejection Grounds)",
        items: [
          "បណ្តឹងត្រូវបានដាក់ហួសកាលកំណត់ ៣០ ថ្ងៃ។",
          "ពាក្យបណ្តឹងមិនមានខ្លឹមសារគ្រប់គ្រាន់ ឬខ្វះព័ត៌មានសំខាន់ៗដែលច្បាប់តម្រូវ។",
          "មិនមានឯកសារភស្តុតាង ឬកំណត់ត្រាគណនេយ្យមកបង្ហាញគាំទ្រការអះអាងរបស់ខ្លួន។",
        ],
      },
      {
        title: "កាលវិភាគដោះស្រាយ និងការបន្តប្តឹងឧទ្ធរណ៍",
        items: [
          "អគ្គនាយកដ្ឋានពន្ធដារត្រូវចេញសេចក្តីសម្រេចលើបណ្តឹងតវ៉ាក្នុងរយៈពេល ៦០ ថ្ងៃ ក្រោយទទួលបានបណ្តឹង។",
          "ប្រសិនបើមិនសុខចិត្តនឹងសេចក្តីសម្រេច៖ អាចបន្តប្តឹងទៅ គណៈកម្មការអាជ្ញាកណ្តាលពន្ធដារ (TAC) ក្នុងរយៈពេល ៣០ ថ្ងៃបន្ទាប់។",
          "ការទទួលយកបណ្តឹងពី TAC នឹងធ្វើការព្យួរជាបណ្តោះអាសន្ននូវវិធានការបង្ខំទារពន្ធរបស់ អពដ។",
          "ប្រសិនបើនៅតែមិនសុខចិត្តនឹង TAC៖ អាចបន្តប្តឹងទៅតុលាការសេដ្ឋកិច្ច/រដ្ឋបាលក្នុងរយៈពេល ៣០ ថ្ងៃ ប៉ុន្តែមិនព្យួរវិធានការបង់ពន្ធឡើយ (ត្រូវកក់ប្រាក់ពន្ធទុកនៅធនាគារជាតិជាមុនសិន)។",
        ],
        table: {
          cols: ["ដំណាក់កាល", "ស្ថាប័នទទួលបន្ទុក", "កាលកំណត់ដាក់បណ្តឹង"],
          rows: [
            ["ថ្នាក់ទី ១", "អគ្គនាយកដ្ឋានពន្ធដារ (GDT)", "ក្នុងរយៈពេល ៣០ ថ្ងៃក្រោយទទួលដីកាពន្ធ"],
            ["ថ្នាក់ទី ២", "គណៈកម្មការអាជ្ញាកណ្តាលពន្ធដារ (TAC)", "ក្នុងរយៈពេល ៣០ ថ្ងៃក្រោយទទួលសេចក្តីសម្រេចទី ១"],
            ["ថ្នាក់ទី ៣", "សាលាដំបូង/តុលាការមានសមត្ថកិច្ច", "ក្នុងរយៈពេល ៣០ ថ្ងៃក្រោយទទួលសេចក្តីសម្រេចទី ២"],
          ],
        },
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
        padding: "3px 10px",
        borderRadius: 999,
        fontWeight: 700,
        background: color.bg,
        color: color.text,
        letterSpacing: 0,
        lineHeight: 1.5,
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
        minHeight: 196,
        background: active
          ? "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)"
          : "#FFFFFF",
        border: active ? "none" : "1px solid #E2E8F0",
        borderRadius: CARD_RADIUS,
        padding: CARD_PADDING,
        cursor: "pointer",
        boxShadow: active
          ? "0 10px 30px rgba(37,99,235,.3)"
          : "0 4px 20px rgba(15,23,42,.05)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 10 }}>{lesson.icon}</div>
      <Badge
        label={lesson.tag}
        color={
          active
            ? { bg: "rgba(255,255,255,0.2)", text: "#fff" }
            : lesson.tagColor
        }
      />
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          marginTop: 10,
          lineHeight: 1.55,
          color: active ? "#fff" : "#0F172A",
        }}
      >
        {lesson.title}
      </div>
      <div
        style={{
          fontSize: 13,
          marginTop: 6,
          lineHeight: 1.6,
          color: active ? "rgba(255,255,255,0.75)" : "#64748B",
        }}
      >
        {lesson.sub}
      </div>
    </div>
  );
}

function SectionBlock({ section }) {
  return (
    <div style={{ marginBottom: "1.8rem" }}>
      <div style={S.cardTitle}>{section.title}</div>

      {section.items &&
        section.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              fontSize: 14,
              lineHeight: 1.8,
              marginBottom: 8,
              color: "#334155",
            }}
          >
            <span style={{ color: "#2563EB", flexShrink: 0, fontWeight: 700 }}>
              —
            </span>
            <span>{item}</span>
          </div>
        ))}

      {section.table && (
        <div style={{ overflowX: "auto", marginTop: 12 }}>
          <table style={S.tbl}>
            <thead>
              <tr>
                {section.table.cols.map((col, i) => (
                  <th key={i} style={S.th}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={i % 2 === 1 ? S.tdActive : S.td}>
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
        <div style={S.note}>
          <pre
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 13,
              whiteSpace: "pre-line",
              color: "#1E40AF",
              lineHeight: 1.6,
            }}
          >
            {section.formula}
          </pre>
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
    <div style={S.page}>
      <div style={S.wrap}>

        {/* Header */}
        <div style={S.header}>
          <h1 style={S.h1}>ប្រព័ន្ធពន្ធដារកម្ពុជា — មេរៀនសង្ខេប</h1>
          <p style={S.hSub}>
            ដេប៉ាតឺម៉ង់គណិតវិទ្យាអនុវត្ត និងស្ថិតិ (ITC) · ឆ្នាំសិក្សា ២០២៥–២០២៦
          </p>
        </div>

        {/* Card Grid */}
        <div style={S.row2}>
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
          <div style={{ ...S.card, marginTop: 24 }}>
            {/* Detail Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: "1.25rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
              borderRadius: 16,
                  background: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {activelesson.icon}
              </div>
              <div>
                <div
                  style={{
                  fontSize: 18,
                  lineHeight: 1.45,
                    fontWeight: 800,
                    color: "#0F172A",
                    marginBottom: 6,
                  }}
                >
                  {activelesson.title}
                </div>
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
    </div>
  );
}
