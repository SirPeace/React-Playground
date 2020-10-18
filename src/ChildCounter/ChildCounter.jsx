import React from "react";
import { Counter2Click } from "../Playground/Playground";

export default (props) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "0 auto",
        width: 200,
        marginTop: 20,
        padding: 10,
      }}
    >
      <h3>Context counter</h3>
      <Counter2Click.Consumer>
        {(clicked) => (clicked ? <small>Displayed text</small> : null)}
      </Counter2Click.Consumer>
    </div>
  );
};
