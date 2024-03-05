import React, { useEffect, useRef, useState, useMemo } from "react";
import Timer from "./Timer";

const TimerHome = () => {
  const [timerInterVal, setTimerInterval] = useState(0);
  const [timers, setTimers] = useState([]);
//   const ipRef = useRef()

  const onTextChange = (e) => {
    setTimerInterval(Number(e.target.value));
  };

  const handleAddTimer = () => {
    setTimers((prev) => [...prev, timerInterVal]);
    // setTimers((prev) => [...prev, ipRef.current.value]);
  };

  const memoisedTimers = useMemo(
    () =>
      timers?.map((timer, id) => (
        <Timer key={`${id - timer}`} miliseconds={timer} />
      )),
    [timers]
  );

  console.log({timers});

  return (
    <div>
      <input type="text" 
      onChange={onTextChange}
    // ref={ipRef}
       value={timerInterVal} 
       />
      <button onClick={handleAddTimer}>Create</button>
      {memoisedTimers}
      {/* {timers?.map((timer, id) => (
        <Timer key={id+timer} miliseconds={timer} />
      ))} */}
    </div>
  );
};

export default TimerHome;
