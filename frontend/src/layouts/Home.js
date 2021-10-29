import React, { useState, useEffect } from "react";
import PasteezCodeEditor from "../components/PasteezCodeEditor";
import { decodeURL } from "../utils/UrlUtils";
import { syntaxStyles, languages } from "../config/config";
import axios from "axios";
let { titleExample, codeExample, syntaxStyleExample, langExample } =
  require("../config/config").examples;

function Home({ history }) {
  // Taking Query params from URL
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history]);

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
    <PasteezCodeEditor
      languages={languages}
      syntaxStyles={syntaxStyles}
      data={data}
      setData={setData}
    />
  );
}

export default Home;
