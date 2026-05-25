import { useState } from "react";

import HomePage from "./pages/HomePage";
import SalaryTaxPage from "./pages/SalaryTaxPage";
import VATPage from "./pages/VATPage";
import OtherTaxPage from "./pages/OtherTaxPage";
import CambodiaTaxCalc from "./pages/tax calculator";
import LessonCard from "./pages/lesson";
import TaxCalculator from "./pages/Tax_05";

function App() {
  const [page, setPage] = useState("home");

  // 🌍 GLOBAL LANGUAGE (IMPORTANT)
  const [lang, setLang] = useState("kh");

  return (
    <div>
      {page === "home" && (
        <HomePage
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "cambodiaTaxCalc" && (
        <CambodiaTaxCalc
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

    

      {page === "salary" && (
        <SalaryTaxPage
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "vat" && (
        <VATPage
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "OtherTaxpage" && (
        <OtherTaxPage
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "lesson" && (
        <LessonCard
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "taxCalculator" && (
        <TaxCalculator
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}
    </div>
  );
}

export default App;