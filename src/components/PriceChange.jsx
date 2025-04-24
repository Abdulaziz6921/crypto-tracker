import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

function PriceChange({ value, formatter = (val) => val }) {
  const [prevValue, setPrevValue] = useState(value);
  const [trend, setTrend] = useState(null); // 'up', 'down', or null
  const timeoutRef = useRef(null);

  useEffect(() => {
    // If the value has changed, setting the trend
    if (value !== prevValue) {
      setTrend(value > prevValue ? "up" : "down");

      // Clearing previous timeout if exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Setting timeout to clear the trend
      timeoutRef.current = setTimeout(() => {
        setTrend(null);
      }, 1000);

      // Updating previous value
      setPrevValue(value);
    }

    // Cleaning up on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, prevValue]);

  return (
    <span
      className={classNames({
        "text-positive transition-colors duration-500": trend === "up",
        "text-negative transition-colors duration-500": trend === "down",
      })}
    >
      {formatter(value)}
    </span>
  );
}

export default PriceChange;
