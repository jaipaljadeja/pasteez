import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import PostEditor from "./PostEditor";
import { Toaster } from "react-hot-toast";

const backdrop = {
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
    },
  },
  hidden: { opacity: 0 },
};

const backdropBlur = {
  visible: {
    backdropFilter: "blur(2.5px)",
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
  hidden: { backdropFilter: "blur(0px)" },
};
const Modal = ({
  showModal,
  setShowModal,
  children,
  closeModalUponLoosingFocus,
}) => {
  useEffect(() => {
    if (showModal) {
      document
        .getElementsByClassName("modal-bg-blur")[0]
        .addEventListener("click", (e) => {
          if (e.target.className !== "modal-bg-blur") {
          } else {
            if (closeModalUponLoosingFocus) {
              setShowModal(false);
              var bodyElement = document.getElementsByTagName("BODY")[0];
              bodyElement.style.overflow = "unset";
            }
          }
        });
    }
  }, [showModal, setShowModal, closeModalUponLoosingFocus]);
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
            <motion.div className="modal-bg-blur" variants={backdropBlur} />
            <motion.div className="post-modal" variants={backdrop}>
              {/* <PostEditor /> */}
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.defaultProps = {
  closeModalUponLoosingFocus: true,
};

export default Modal;
