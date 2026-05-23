import { useState } from "react";

import HomePage from "./pages/HomePage";
import SalaryTaxPage from "./pages/SalaryTaxPage";
import VATPage from "./pages/VATPage";

import OtherTaxPage from "./pages/OtherTaxPage";

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

      
      {page === "OtherTaxpage" && (
        <OtherTaxPage setPage={setPage} />
      )}

    </div>
  );
}

export default App;