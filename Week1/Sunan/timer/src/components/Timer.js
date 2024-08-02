import { useState, useEffect } from 'react';
import {FaStopCircle, FaPlusCircle, FaPauseCircle, FaPlayCircle} from 'react-icons/fa';

function Timer({inputTime}) {
  
    const [time, setTime] = useState(inputTime);
    const [start, setStart] = useState(false);
    const [records, setRecords] = useState([]);
    useEffect(() => {
      let interval;
  
      if (start) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime - 10);
        }, 10);
      } else if (!start && time !== 0) {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [start, time]);
  
    const handleStart = () => {
      setStart(true);
    };
    
    const handleRecord = () => {
      const newRecord = `0${Math.floor((time / 60000) % 60)}`.slice(-2) + " : " +
                        `0${Math.floor((time / 1000) % 60)}`.slice(-2) + " : " +
                        `0${Math.floor((time / 10) % 100)}`.slice(-2);
      setRecords([...records, newRecord]); 
    };
    const handleStop = () => {
      setStart(false);
    };
    
    const handleReset = () => {
      setTime(0);
      setStart(false);
      setRecords([]);
    };
    return (
      <div className='container'>
        <div className='item'>
          <div><h1>타이머</h1></div>
        <time>
          {`0${Math.floor((time / 60000) % 60)}`.slice(-2)} :
          {`0${Math.floor((time / 1000) % 60)}`.slice(-2)} :
          {`0${Math.floor((time / 10) % 100)}`.slice(-2)}
        </time>
        <div className="button-container">
          <button onClick={handleStart}><FaPlayCircle className='icon'/></button>
          <button onClick={handleRecord}><FaPlusCircle className='icon'/></button>
          <button onClick={handleStop}><FaPauseCircle className='icon'/></button>
          <button onClick={handleReset}><FaStopCircle className='icon'/></button>
        </div>
      </div>
      <div><hr className="line"></hr></div>
      <div className='records'>
          <h2>기록</h2>
          <ul>
            {records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
        </div>
      </div>
      
    );
  }
  export default Timer;