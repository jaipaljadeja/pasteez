import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import PostEditor from "./PostEditor";
import { Toaster } from "react-hot-toast";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ showModal, setShowModal, children }) => {
  useEffect(() => {
    if (showModal) {
      document
        .getElementsByClassName("modal-backdrop")[0]
        .addEventListener("click", (e) => {
          if (e.target.className !== "modal-backdrop") {
          } else {
            setShowModal(false);
            var bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.style.overflow = "unset";
          }
        });
    }
  }, [showModal, setShowModal]);
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <>
          <motion.div
            className="modal-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Toaster />
            <motion.div className="post-modal">
              {/* <PostEditor /> */}
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
