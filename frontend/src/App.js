import React from "react";
import "react-dropdown/style.css";
import "./App.css";
import Footer from "./layouts/Footer";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="main-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route path="*">
                <h1>Error! Such page doesnt exist.</h1>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
