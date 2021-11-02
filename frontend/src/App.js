import React from "react";
import "react-dropdown/style.css";
import "./App.css";
import Footer from "./layouts/Footer";
import Editor from "./layouts/Editor";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import { AnimatePresence } from "framer-motion";

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
          <Route path="*">
            <h1>Error! Such page doesnt exist.</h1>
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
