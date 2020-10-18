import React, { useState } from "react";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import About from "./About/About";
import Playground from "./Playground/Playground";

function App() {
  const [auth, setAuth] = useState(false);

  const handleAuthClick = () => {
    setAuth(!auth);
    if (auth) alert("You're logged out!");
    else alert("You're logged in!");
  };

  const WelcomePage = (
    <div>
      <h1>Welcome to the React workshop!</h1>
      <p>
        <i>
          No limits here, only your crazy imagination. You're free to practice
          any skill here!
        </i>
      </p>
      <div style={{ width: "50%", margin: "50px auto 0 auto" }}>
        <h2>Want to access playground?</h2>
        <div>
          <button
            style={{ width: "100%", cursor: "pointer" }}
            onClick={handleAuthClick}
          >
            {auth ? "Log out" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );

  const NotFoundPage = (
    <div className="not-found">
      <div className="container">
        <h1>404</h1>
        <div>
          <p>Seems like you've lost here...</p>
          <Link to="/" className="back-link">
            Take me back!
          </Link>
        </div>
      </div>
    </div>
  );

  const NotAuthenticatedPage = (
    <div className="not-found">
      <div className="container">
        <h1>502</h1>
        <div>
          <p>You're not authenticated!</p>
          <Link to="/" className="back-link">
            Let me log in!
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route path="/" exact render={() => WelcomePage} />
        <Route path="/about" component={About} />
        {auth ? (
          <Route path="/playground/:cardID" component={Playground} />
        ) : null}
        {auth ? (
          <Route path="/playground" component={Playground} />
        ) : (
          <Route path="/playground" render={() => NotAuthenticatedPage} />
        )}
        <Route render={() => NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
