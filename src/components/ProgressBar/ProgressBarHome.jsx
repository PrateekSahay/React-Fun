import React, { useEffect, useRef, useState } from "react";
import ProgressBar from './ProgressBar';

const interval = 1*1000;
const totalMs = 10*1000;
const totalCycles = totalMs/interval;
const progressMade = (interval/totalMs)*100;

const ProgressBarHome = () => {    

    const [progress, setProgress] = useState(0);
    const timerRef = useRef();
    const cyclesCompleted = useRef(0);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            cyclesCompleted.current += 1;
            setProgress((prev) => prev + progressMade);
            if (cyclesCompleted.current === totalCycles) {
                clearInterval(timerRef.current);
            }
        }, interval)

        return () => {
            console.log("return called");
            clearInterval(timerRef.current)
        }
    }, [])

    console.log("timerRef.current", timerRef.current);

    console.log("progress", progress);

    return (
        <>
            <ProgressBar progress={progress} />
        </>
    )
}

export default ProgressBarHome;