import React, { useEffect } from 'react';
import styles from '../styles/Timer.module.css'

const Timer = ({isActive, seconds, setSeconds, stop, completed=false }) => {
  
  // useEffect is a modified version of the timer created by James Dietrich here:
  // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
  useEffect(() => {
    let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      }
      if (stop) {
        setSeconds(0);
      }
    return () => {
        clearInterval(interval);
    }
    }, [isActive, stop, completed, setSeconds]);
  
  return (
    <div className={styles.Timer}>
      {Math.floor(seconds / 60)}: 
      { (seconds % 60) < 10 ? `0${seconds % 60}` : (seconds % 60)}
    </div>
  )
}

export default Timer