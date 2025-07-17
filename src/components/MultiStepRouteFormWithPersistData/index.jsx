import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FormProvider>
      <App />
    </FormProvider>
  </BrowserRouter>
);

import { Routes, Route, Navigate } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Review from "./components/Review";

export default function App() {
  return (
    <main style={{ padding: "2rem" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/step-1" />} />
        <Route path="/step-1" element={<Step1 />} />
        <Route path="/step-2" element={<Step2 />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </main>
  );
}
