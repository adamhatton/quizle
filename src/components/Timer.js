import React, { useEffect } from 'react'

const Timer = ({isActive, seconds, setSeconds }) => {
  
  useEffect(() => {
    let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    return () => clearInterval(interval);
    }, [isActive]);
  
  return (
    <div>
      {Math.floor(seconds / 60)}: 
      { (seconds % 60) < 10 ? `0${seconds % 60}` : (seconds % 60)}
    </div>
  )
}

export default Timer