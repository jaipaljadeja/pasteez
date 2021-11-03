import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

import "react-dropdown/style.css";
import "./App.css";

import Footer from "./layouts/Footer";
import Editor from "./layouts/Editor";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import Navbar from "./layouts/Navbar";
import profile from "./layouts/profile";

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/" component={Home} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={profile} />
          <Route path="*">
            <div className="main-container">
              <h1 style={{ textAlign: "center", color: "white" }}>
                Oops! Are you lost babygirl?
              </h1>
            </div>
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
