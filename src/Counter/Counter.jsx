import React, { useState, useEffect } from "react";
import ChildCounter from "../ChildCounter/ChildCounter";

export default function Counter(props) {
  const [counter, setCounter] = useState(0);
  const [counterColor, setCounterColor] = useState("gold");

  const checkColor = () => {
    if (counter > 0) setCounterColor("lightgreen");
    else if (counter < 0) setCounterColor("crimson");
    else setCounterColor("gold");
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  useEffect(() => checkColor());

  return (
    <React.Fragment>
      <h2>Counter</h2>
      <p>
        Count: <b style={{ color: counterColor }}>{counter}</b>
      </p>
      <button style={{ marginRight: 5 }} onClick={decrement}>
        Decrease
      </button>
      <button onClick={increment}>Increase</button>
      <ChildCounter />
    </React.Fragment>
  );
}
