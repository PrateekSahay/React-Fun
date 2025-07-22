import Child from "./Child";
import { useCallback, useState } from "react";

const Parent = () => {
  const [childData, setChildData] = useState("");
  const [buttonCount, setButtonCount] = useState(0);

  //   console.log("+++ buttonCount", buttonCount);

  const updateChild = useCallback((data) => {
    setChildData(data);
  }, []);

  //
  const onClickBtn = () => {
    setButtonCount((prev) => prev + 1);
  };

  return (
    <div>
      <span>Parent</span>
      <button onClick={() => onClickBtn()}>Child data fetch</button>
      <Child updateChild={updateChild} buttonCount={buttonCount} />
      <label>{childData}</label>
    </div>
  );
};

export default Parent;

const Child = ({ updateChild, buttonCount }) => {
  const data = "Click detected";
  //   console.log("+++ buttonCount1", buttonCount);
  useEffect(() => {
    if (buttonCount > 0) {
      updateChild(data);
    }
  });
  return <div>Child</div>;
};


