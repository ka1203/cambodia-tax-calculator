import { useState } from "react";

import HomePage from "./pages/HomePage";
import SalaryTaxPage from "./pages/SalaryTaxPage";
import VATPage from "./pages/VATPage";
import PrepaymentTaxPage from "./pages/PrepaymentTaxPage";
import OtherTaxPage from "./pages/OtherTaxPage";
import IndirectTaxPage from "./pages/IndirectTaxPage";
import CambodiaTaxCalc from "./pages/tax calculator";

function App() {

  const [page, setPage] = useState("home");

  return (
    <div>

      {page === "home" && (
        <HomePage setPage={setPage} />
      )}
        {page === "cambodiaTaxCalc" && (
        <CambodiaTaxCalc setPage={setPage} />
      )}

      {page === "salary" && (
        <SalaryTaxPage setPage={setPage} />
      )}

      {page === "vat" && (
        <VATPage setPage={setPage} />
      )}

      
      {page === "prepayment" && (
        <PrepaymentTaxPage setPage={setPage} />
      )}

      {page === "OtherTaxpage" && (
        <OtherTaxPage setPage={setPage} />
      )}

      {page === "indirect" && (
        <IndirectTaxPage setPage={setPage} />
      )}

    </div>
  );
}

export default App;