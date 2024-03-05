import { memo, useEffect, useMemo, useState } from "react";

const Timer = ({ miliseconds }) => {
    const initialStartTime = Date.now();
  const [startTime, setStartTime] = useState(initialStartTime);
  const endTime = initialStartTime + Number(miliseconds);
//   console.log("endTime", endTime);
  const diff = endTime - startTime;
//   console.log({ startTime, endTime, diff });
const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // console.log("useEffect");
    if (!isPaused) {
    if (startTime !== endTime) setStartTime((prev) => prev + 1);
    }

    return () => {
        console.log("called");
    }
  }, [startTime, isPaused]);

  const onPause = () => {
    setIsPaused(prev => !prev);
  }

  return (
    <div>
      <p>{diff}</p>
      <button onClick={onPause}>Pause/Resume</button>
    </div>
  );
};

export default memo(Timer);
