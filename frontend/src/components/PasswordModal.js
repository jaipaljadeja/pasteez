import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function PasswordModal({ setPassword, setShowPasswordModal }) {
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

  const [codePassword, setCodePassword] = useState(null);

  return (
    // <div className="delete-alert-container">
    <motion.div variants={backdropBlur} className="password-modal-container">
      <p style={{ fontWeight: "500", fontSize: "1.4em", marginBottom: "10px" }}>
        Set Password for Encryption
      </p>
      <input
        className="password-box"
        type="password"
        placeholder="password"
        spellCheck="false"
        autoComplete="off"
        onChange={(e) => {
          setCodePassword(e.target.value);
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
            if (codePassword !== "" && codePassword !== null) {
              setPassword(codePassword);
              toast.success("Code Encrypted!", {
                style: {
                  fontFamily: "Monospace",
                  marginTop: "15px",
                },
                iconTheme: {
                  primary: "#33b4ff",
                  secondary: "#FFFFFF",
                },
              });
              var unlockIcon = document.getElementById("unlockIcon");
              var lockIcon = document.getElementById("lockIcon");
              unlockIcon.style.display = "none";
              lockIcon.style.display = "block";
              setShowPasswordModal(false);
              var bodyElement = document.getElementsByTagName("BODY")[0];
              bodyElement.style.overflow = "unset";
            } else {
              toast.error("Password can't be empty!", {
                style: {
                  fontFamily: "Monospace",
                  marginTop: "15px",
                },
              });
            }
          }}
          className="btn delete yes"
        >
          <i className="far fa-lock" style={{ fontSize: "13px" }}></i> Encrypt
        </button>
        <button
          onClick={() => {
            setPassword(null);
            setShowPasswordModal(false);
            var bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.style.overflow = "unset";
          }}
          className="btn delete no"
          style={{ marginLeft: "0px", width: "13em" }}
        >
          <i className="far fa-times" style={{ fontSize: "13px" }}></i> No, Dont
          Encrypt!
        </button>
      </div>
    </motion.div>
    // </div>
  );
}
