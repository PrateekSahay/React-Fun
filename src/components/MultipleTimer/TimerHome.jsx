// import React, { useEffect, useState } from "react";

// const TimerHome = () => {
//   const [timerInterVal, setTimerInterval] = useState(0);
//   const [start, setStart] = useState(0);
//   const [end, setEnd] = useState(0);
//   const diff = end - start;

//   const onTextChange = (e) => {
//     setTimerInterval(e.target.value);
//   };

//   const handleAddTimer = () => {
//     const start = Date.now();
//     const end = Number(start) + Number(timerInterVal);
//     setStart(start);
//     setEnd(end);
//   };

//   useEffect(() => {
//     console.log("diff", diff);
//     setStart((prev) => prev + 1);
//   }, [diff]);

//   return (
//     <div>
//       <input type="text" onChange={onTextChange} value={timerInterVal} />
//       <button onClick={handleAddTimer}>Create</button>
//       {}
//     </div>
//   );
// };

// export default TimerHome;
