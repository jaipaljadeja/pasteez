import React, { useState } from "react";
import PasteezCodeEditor from "../components/PasteezCodeEditor";
import { decodeURL } from "../utils/UrlUtils";
import { syntaxStyles, languages } from "../config/config";
import { motion } from "framer-motion";
let { titleExample, codeExample, syntaxStyleExample, langExample } =
  require("../config/config").examples;

function Editor({ containerVariants }) {
  // Taking Query params from URL
  const url_string = window.location.href;
  const url = new URL(url_string);
  const paramTitle = url.searchParams.get("title");
  const paramLang = url.searchParams.get("lang");
  const paramStyle = url.searchParams.get("style");
  const encryptedCode = url.searchParams.get("code");
  const decryptedCode = decodeURL(encryptedCode);

  // Setting default values for the query params if they are present
  if (paramTitle) {
    titleExample = paramTitle;
  }
  if (paramLang) {
    langExample = paramLang;
  }
  if (paramStyle) {
    syntaxStyleExample = paramStyle;
  }
  if (encryptedCode) {
    codeExample = decryptedCode;
  }

  // Setting state for the all the values
  const [data, setData] = useState({
    code: codeExample,
    lang: langExample,
    syntaxStyle: syntaxStyleExample,
    title: titleExample,
  });

  return (
    <motion.div
      className="main-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PasteezCodeEditor
        languages={languages}
        syntaxStyles={syntaxStyles}
        data={data}
        setData={setData}
      />
    </motion.div>
  );
}

export default Editor;
