import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

export default (props) => {
  return (
    <nav className="Navigation">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{
            pathname: "/playground",
            search: "test",
            hash: "surprise",
          }}
          activeClassName="playground-link"
        >
          Playground
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" activeClassName="about-link">
          About this
        </NavLink>
      </li>
    </nav>
  );
};
