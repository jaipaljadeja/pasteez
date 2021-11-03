import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import ArrowButton from "../components/ArrowButton";

export default function Home() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 2 },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="main-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="home-container">
        <Typewriter
          options={{
            strings: [
              "< Create, Paste & Share >",
              "AES256 & BASE64 Encryption",
              "Beautiful and Aesthetic Design",
              "Different Themes and Styles",
              "Syntax Highlighting",
              "20+ Languages Support",
              "Export Beautiful Code Images",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
          }}
        />
      </div>
      <motion.div
        className="arrow-button"
        whileHover={{ scale: 1.25 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <ArrowButton />
      </motion.div>
    </motion.div>
  );
}
