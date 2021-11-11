import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction } from "../actions/postsActions";
import { motion } from "framer-motion";

export default function DeletePostAlert({ postId, setShowDeleteModal }) {
  const dispatch = useDispatch();

  const postDelete = useSelector((state) => state.postDelete);
  const { error } = postDelete;

  const backdropBlur = {
    visible: {
      backdropFilter: "blur(5px)",
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
    hidden: { backdropFilter: "blur(0px)" },
  };

  return (
    // <div className="delete-alert-container">
    <motion.div variants={backdropBlur} className="delete-alert-container">
      <p style={{ fontWeight: "500", fontSize: "1.4em", marginBottom: "1em" }}>
        Are you sure you want to delete this post?
      </p>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            toast
              .promise(
                dispatch(deletePostAction(postId)),
                {
                  loading: "Deleting...", //when posting
                  success: "Post Deleted", //if post is success
                  error: `${error || "Failed to delete!"}`, //when post is failed
                },
                {
                  style: {
                    fontFamily: "Monospace",
                    marginTop: "15px",
                  },
                }
              )
              .then(() => {
                setShowDeleteModal(false);
                var bodyElement = document.getElementsByTagName("BODY")[0];
                bodyElement.style.overflow = "unset";
              });
          }}
          className="btn delete yes"
        >
          YES
        </button>
        <button
          onClick={() => {
            setShowDeleteModal(false);
            var bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.style.overflow = "unset";
          }}
          className="btn delete no"
        >
          NO
        </button>
      </div>
    </motion.div>
    // </div>
  );
}
