import { useState, useEffect } from "react";

export default function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 600; // ms
    const steps = 30;
    const step = value / steps;
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.round(start));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}
