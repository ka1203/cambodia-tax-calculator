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
import IncomeTaxCalculator from "./pages/Tax06IncomeTax";
import LandDontUsePage from "./pages/land_dont use";
import ProthabtraTaxPage from "./pages/prothab_tax";
import AdvertisementTaxPage from "./pages/advertiment";
import TransportTaxPage from "./pages/transport_tax";


function PageFrame({ name, children }) {
  return (
    <div key={name} className="page-transition">
      {children}
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("kh");
  const pageProps = { setPage, lang, setLang };

  return (
    <div className="app-shell">
      {page === "home" && (
        <PageFrame name={page}>
          <HomePage {...pageProps} />
        </PageFrame>
      )}

      {page === "cambodiaTaxCalc" && (
        <PageFrame name={page}>
          <CambodiaTaxCalc {...pageProps} />
        </PageFrame>
      )}

      {page === "salary" && (
        <PageFrame name={page}>
          <SalaryTaxPage {...pageProps} />
        </PageFrame>
      )}

      {page === "vat" && (
        <PageFrame name={page}>
          <VATPage {...pageProps} />
        </PageFrame>
      )}

      {page === "OtherTaxpage" && (
        <PageFrame name={page}>
          <OtherTaxPage {...pageProps} />
        </PageFrame>
      )}

      {page === "lesson" && (
        <PageFrame name={page}>
          <LessonCard {...pageProps} />
        </PageFrame>
      )}

      {page === "taxCalculator" && (
        <PageFrame name={page}>
          <TaxCalculator {...pageProps} />
        </PageFrame>
      )}

      {page === "plt" && (
        <PageFrame name={page}>
          <PLTCalculator {...pageProps} />
        </PageFrame>
      )}

      {page === "ST" && (
        <PageFrame name={page}>
          <SpecialTaxPage {...pageProps} />
        </PageFrame>
      )}

      {page === "AT" && (
        <PageFrame name={page}>
          <AccomTaxPage {...pageProps} />
        </PageFrame>
      )}

      {page === "land_dont_use" && (
        <PageFrame name={page}>
          <LandDontUsePage {...pageProps} />
        </PageFrame>
      )}      

{page === "Tax06IncomeTax" && (
  <PageFrame name={page}>
    <IncomeTaxCalculator />
  </PageFrame>
)}

{page === "prothab_tax" && (
        <PageFrame name={page}>
          <ProthabtraTaxPage {...pageProps} />
        </PageFrame>
      )}

{page === "advertiment" && (
        <PageFrame name={page}>
          <AdvertisementTaxPage {...pageProps} />
        </PageFrame>
      )}

{page==="transport_tax" && (
  <PageFrame name={page}>
    <TransportTaxPage {...pageProps} />
  </PageFrame>
)}

    </div>
  );
}

export default App;
