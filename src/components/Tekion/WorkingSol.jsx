import { useEffect, useState } from "react";

const Timer = ({ value }) => {
  const [startTime, setStartTime] = useState(Date.now());
  const [timerValue, setTimerValue] = useState(value);
  const [flag, setFlag] = useState(true);
  const [isRunning, setIsRunning] = useState(true);

  const compute = (currentTime) => {
    const diff = currentTime - startTime;
    setStartTime(currentTime);
    setTimerValue(timerValue - diff);
    setFlag(!flag);
  };

  useEffect(() => {
    if (timerValue <= 0 || !isRunning) return;
    compute(Date.now());
  }, [timerValue, startTime, compute, flag, isRunning]);

  useEffect(() => {
    compute(Date.now());
  }, []);

  const handleButton = () => {
    setIsRunning(!isRunning);
    setStartTime(Date.now());
  };

  return (
    <div>
      {timerValue}
      <button onClick={handleButton}>{isRunning ? "Pause" : "Resume"}</button>
    </div>
  );
};

export default Timer;