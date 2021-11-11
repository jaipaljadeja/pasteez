import React, { useEffect, useState } from "react";
import PasteezCodeEditor from "../components/PasteezCodeEditor";
import { decodeURL } from "../utils/UrlUtils";
import { syntaxStyles, languages } from "../config/config";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import PasswordModal from "../components/PasswordModal";
import PasswordPromptModal from "../components/PasswordPromptModal";
let {
  titleExample,
  codeExample,
  syntaxStyleExample,
  langExample,
  defaultFrameBG,
} = require("../config/config").examples;

function Editor({ containerVariants }) {
  // Taking Query params from URL
  const url_string = window.location.href;
  const url = new URL(url_string);
  const paramTitle = url.searchParams.get("title");
  const paramLang = url.searchParams.get("lang");
  const paramStyle = url.searchParams.get("style");
  const encryptedCode = url.searchParams.get("code");
  const isProtected = url.searchParams.get("isProtected") || "false";
  let decryptedCode = undefined;

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  // Setting default values for the query params if they are present
  if (encryptedCode && isProtected === "false" && isProtected !== null) {
    decryptedCode = decodeURL(encryptedCode);
    codeExample = decryptedCode;
  }
  if (paramTitle) {
    titleExample = paramTitle;
  }
  if (paramLang) {
    langExample = paramLang;
  }
  if (paramStyle) {
    syntaxStyleExample = paramStyle;
  }

  // Setting state for the all the values
  const [data, setData] = useState({
    code: codeExample,
    lang: langExample,
    syntaxStyle: syntaxStyleExample,
    title: titleExample,
    framebg: defaultFrameBG,
    isProtected: isProtected,
    encryptedCode: encryptedCode,
  });

  useEffect(() => {
    if (encryptedCode && isProtected === "true" && isProtected !== null) {
      setShowPasswordPrompt(true);
    }
  }, [encryptedCode, isProtected]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState(null);

  return (
    <>
      <Modal showModal={showPasswordModal} setShowModal={setShowPasswordModal}>
        <PasswordModal
          setPassword={setPassword}
          setShowPasswordModal={setShowPasswordModal}
        />
      </Modal>
      <Modal
        showModal={showPasswordPrompt}
        setShowModal={setShowPasswordPrompt}
      >
        <PasswordPromptModal
          data={data}
          setData={setData}
          setShowPasswordPrompt={setShowPasswordPrompt}
        />
      </Modal>
      <Toaster />
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
          setShowPasswordModal={setShowPasswordModal}
          setPassword={setPassword}
          password={password}
        />
      </motion.div>
    </>
  );
}

export default Editor;
