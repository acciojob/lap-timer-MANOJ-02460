import React, { useEffect, useState, useRef } from "react";
import './../styles/App.css';

const App = () => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);


  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;

      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10);
    }
  }


  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false)
    }

  }

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false)
    setTime(0);
    setLaps([]);
  }

  const handleLap = () => {
    setLaps([...laps, time])
  }





  const formatTime = (timeInMs) => {

    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const centiseconds = Math.floor((timeInMs % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().
      padStart(2, '0')}:${centiseconds.toString().padStart(2, "0")}`;
  }


  return (
    <div style={{ textAlign: "center", fontFamily: "monospace", padding: "20px" }}>
      <h1>React Lap Timer</h1>
      <div style={{ fontSize: '2rem', marginBottom: "20px" }}>{formatTime(time)}</div>
      {/* Do not remove the main div */}
      <div style={{marginBottom: "20px"}}> 
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      </div>

      <div>
        {laps.map((lapTime, index) => (
          <li key={index} style={{ padding: "5px 0", listStyleType:'none'}}>
            <strong>Lap {index + 1}:</strong> {formatTime(lapTime)}
          </li>
        ))}
      </div>
    </div>
  )
}

export default App
