import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Footer from "./layouts/Footer";
import Editor from "./layouts/Editor";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import Navbar from "./layouts/Navbar";

import "react-dropdown/style.css";
import "./App.css";

function App() {
  // To let Framer motion know when routes are changed
  const location = useLocation();

  // Routes Animation Variant
  const containerVariants = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
      },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/editor">
            <Editor containerVariants={containerVariants} />
          </Route>
          <Route exact path="/signup" component={Signup}>
            <Signup containerVariants={containerVariants} />
          </Route>
          <Route exact path="/login">
            <Login containerVariants={containerVariants} />
          </Route>
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
