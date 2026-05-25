import { useState } from "react";

import HomePage from "./pages/HomePage";
import SalaryTaxPage from "./pages/SalaryTaxPage";
import VATPage from "./pages/VATPage";
import OtherTaxPage from "./pages/OtherTaxPage";
import CambodiaTaxCalc from "./pages/tax calculator";
import LessonCard from "./pages/lesson";
import TaxCalculator from "./pages/Tax_05";
import PLTCalculator from "./pages/PLT";
import SpecialTaxPage from "./pages/ST";
import AccomTaxPage from "./pages/AT";

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

      {page === "plt" && (
        <PLTCalculator
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "ST" && (
        <SpecialTaxPage
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}

      {page === "AT" && (
        <AccomTaxPage
          setPage={setPage}
          lang={lang}
          setLang={setLang}
        />
      )}
    </div>
  );
}

export default App;