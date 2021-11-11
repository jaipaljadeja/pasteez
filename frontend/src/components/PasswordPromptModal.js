import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { decodeURL } from "../utils/UrlUtils";

export default function PasswordPromptModal({
  data,
  setData,
  setShowPasswordPrompt,
}) {
  const backdropBlur = {
    visible: {
      backdropFilter: "blur(6px)",
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
    hidden: { backdropFilter: "blur(0px)" },
  };

  const [password, setPassword] = useState(null);

  return (
    // <div className="delete-alert-container">
    <motion.div variants={backdropBlur} className="password-modal-container">
      <p style={{ fontWeight: "500", fontSize: "1.4em", marginBottom: "10px" }}>
        Enter password to decrypt the code!
      </p>
      <input
        className="password-box"
        type="password"
        placeholder="password"
        spellCheck="false"
        autoComplete="off"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{
          borderRadius: "5px",
          border: "none",
          background: "rgba(0, 0, 0, 0.5)",
          outline: "none",
          color: "white",
          padding: "0px 10px",
          width: "34em",
          height: "3.2em",
          letterSpacing: "2px",
        }}
      />
      <div style={{ display: "flex", marginTop: "10px" }}>
        <button
          onClick={() => {
            let isPassCorrect = undefined;
            function isPassCorrectHandler(value) {
              isPassCorrect = value;
            }
            const decryptedCode = decodeURL(
              data.encryptedCode,
              password,
              isPassCorrectHandler
            );
            if (isPassCorrect === false) {
              toast.error("Wrong Password", {
                style: {
                  fontFamily: "Monospace",
                  marginTop: "15px",
                },
              });
            } else if (isPassCorrect === true) {
              setData({ ...data, code: decryptedCode });
              toast.success("Code Decrypted!", {
                style: {
                  fontFamily: "Monospace",
                  marginTop: "15px",
                },
                iconTheme: {
                  primary: "#33b4ff",
                  secondary: "#FFFFFF",
                },
              });
              var bodyElement = document.getElementsByTagName("BODY")[0];
              bodyElement.style.overflow = "unset";
              setShowPasswordPrompt(false);
            }
          }}
          className="btn delete yes"
        >
          <i className="far fa-unlock" style={{ fontSize: "13px" }}></i> Decrypt
        </button>
        <button
          onClick={() => {
            setPassword(null);
            var bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.style.overflow = "unset";
            setShowPasswordPrompt(false);
          }}
          className="btn delete no"
          style={{ marginLeft: "0px", width: "10em" }}
        >
          <i className="far fa-times" style={{ fontSize: "13px" }}></i> Close
        </button>
      </div>
    </motion.div>
    // </div>
  );
}
