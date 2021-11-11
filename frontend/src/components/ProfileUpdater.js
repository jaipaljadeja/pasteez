import React from "react";
import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePostAction } from "../actions/postsActions";
import { motion } from "framer-motion";

export default function ProfileUpdater({
  setShowProfileUpdaterModal,
  userInfo,
}) {
  //   const dispatch = useDispatch();

  //   const postDelete = useSelector((state) => state.postDelete);
  //   const { error } = postDelete;

  const backdropBlur = {
    visible: {
      backdropFilter: "blur(15px)",
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
    hidden: { backdropFilter: "blur(0px)" },
  };

  return (
    <motion.div variants={backdropBlur} className="edit-profile-container">
      <p
        style={{
          fontWeight: "500",
          fontSize: "1.4em",
          marginBottom: "1em",
          alignSelf: "flex-start",
        }}
      >
        Edit your Profile
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "5em" }}>
          <div className="profile-image-container modal">
            <img
              src={userInfo.profileIcon}
              alt="profile-pic"
              className="profile-header-pic"
            />
          </div>
          {/* <p
            style={{
              marginTop: "1em",
              fontSize: "0.8em",
              fontWeight: "300",
              textAlign: "center",
            }}
          >
            Profile Picture
          </p> */}
        </div>
        <div>
          <p className="label">Name</p>
          <input
            type="text"
            class="input-box name"
            spellCheck={false}
            defaultValue={userInfo.name}
            style={{
              borderRadius: "5px",
              border: "none",
              background: "rgba(0, 0, 0, 0.5)",
              outline: "none",
              color: "white",
              padding: "0px 10px",
              width: "24em",
              height: "2.2em",
              marginTop: "0.5em",
            }}
          />
          <p style={{ marginTop: "1em" }} className="label">
            About
          </p>
          <textarea
            type="text"
            class="input-box name"
            spellCheck={false}
            defaultValue={userInfo.about}
            style={{
              borderRadius: "5px",
              border: "none",
              background: "rgba(0, 0, 0, 0.5)",
              outline: "none",
              color: "white",
              padding: "10px 10px",
              width: "24em",
              height: "2.2em",
              marginTop: "0.5em",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "2em" }}>
        <button
          //   onClick={() => {
          //     toast
          //       .promise(
          //         dispatch(deletePostAction(postId)),
          //         {
          //           loading: "Deleting...", //when posting
          //           success: "Post Deleted", //if post is success
          //           error: `${error || "Failed to delete!"}`, //when post is failed
          //         },
          //         {
          //           style: {
          //             fontFamily: "Monospace",
          //             marginTop: "15px",
          //           },
          //         }
          //       )
          //       .then(() => {
          //         setShowDeleteModal(false);
          //         var bodyElement = document.getElementsByTagName("BODY")[0];
          //         bodyElement.style.overflow = "unset";
          //       });
          //   }}
          className="btn update"
        >
          <i
            className="fas fa-pencil"
            style={{ fontSize: "12px", marginRight: "1em" }}
          />
          Update
        </button>
        <button
          onClick={() => {
            setShowProfileUpdaterModal(false);
            var bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.style.overflow = "unset";
          }}
          className="btn delete no"
        >
          <i
            className="far fa-times"
            style={{ fontSize: "13px", marginRight: "1em" }}
          />
          Exit
        </button>
      </div>
    </motion.div>
  );
}
