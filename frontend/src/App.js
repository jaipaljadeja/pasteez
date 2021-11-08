import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

import Footer from "./layouts/Footer";
import Editor from "./layouts/Editor";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";
import Navbar from "./layouts/Navbar";
import Profile from "./layouts/Profile";
import Modal from "./components/Modal";

import "react-dropdown/style.css";
import "./App.css";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { syntaxStyles } from "./config/config";

function App() {
  // To let Framer motion know when routes are changed
  const location = useLocation();

  // State for the modal
  const [showModal, setShowModal] = useState(false);

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
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/editor">
            <Editor containerVariants={containerVariants} />
          </Route>
          <Route exact path="/signup">
            <Signup containerVariants={containerVariants} />
          </Route>
          <Route exact path="/login">
            <Login containerVariants={containerVariants} />
          </Route>
          <Route exact path="/:username">
            <ThemeSwitcherProvider
              defaultTheme="agate"
              themeMap={syntaxStyles}
              insertionPoint={document.getElementById("inject-styles-here")}
            >
              <Profile
                containerVariants={containerVariants}
                setShowModal={setShowModal}
              />
            </ThemeSwitcherProvider>
          </Route>
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
