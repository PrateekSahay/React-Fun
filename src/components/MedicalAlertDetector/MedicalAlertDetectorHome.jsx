import "./styles.css";
import React from "react";
import Sugar from "./components/Sugar.jsx";
import BP from "./components/BP.jsx";
import Oxygen from "./components/Oxygen.jsx";
import WrapperComponent from "./hoc/WrapperComponent.jsx";
import { createContext } from "react";
import { alertData } from "./static/constants.js";

export const AlertContext = createContext();

export default function MedicalAlertDetectorHome() {
  const NewOxygen = WrapperComponent(Oxygen, "oxygen");

  return (
    <AlertContext.Provider value={alertData}>
      <div className="App">
        {/* <BP />
      <Sugar /> */}
        <NewOxygen currentValue={80} />
        {/* <Oxygen currentValue={50} minValue={25} maxValue={70} /> */}
      </div>
    </AlertContext.Provider>
  );
}
