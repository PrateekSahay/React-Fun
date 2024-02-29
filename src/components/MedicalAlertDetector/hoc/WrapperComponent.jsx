import { useEffect, useState, useContext } from "react";
import { AlertContext } from "../MedicalAlertDetectorHome";

const WrapperComponent = (Component, type) => {
  return function (props) {
    const [isOutOfRange, setIsOutOfRange] = useState(false);
    const alertData = useContext(AlertContext);
    const alertDataForComponent = alertData[type];
    console.log("alertDataForComponent", alertDataForComponent);

    useEffect(() => {
      const { currentValue } = props;
      if (
        currentValue < alertDataForComponent.minValue ||
        currentValue > alertDataForComponent.maxValue
      ) {
        setIsOutOfRange(true);
      }
    }, []);

    return (
      <div>
        <Component {...props} isOutOfRange={isOutOfRange} />
      </div>
    );
  };
};

export default WrapperComponent;
