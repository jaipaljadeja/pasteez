import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import { updateProfile } from "../actions/userActions";
import { generatePfpUrl } from "../utils/ImageUtils";

export default function ProfileUpdater({ setShowProfileUpdaterModal }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userUpdate = useSelector((state) => state.userUpdate);
  // const { loading, error } = userUpdate;

  const [name, setName] = useState(userInfo.name);
  const [about, setAbout] = useState(userInfo.about);
  const [profileIcon, setProfileIcon] = useState(
    generatePfpUrl(userInfo.username)
  );

  // const [imageURL, setImageURL] = React.useState("");

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

  // const uploadImage = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     setImageURL(URL.createObjectURL(img));
  //     console.log(imageURL);
  //     // this.setState({
  //     //   image: URL.createObjectURL(img),
  //     // });
  //   }
  // };

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
              src={profileIcon}
              alt="profile-pic"
              className="profile-header-pic"
              // onClick={uploadImage}
            />
          </div>
          {/* <input type="file" name="myImage" onChange={uploadImage} /> */}
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
            className="input-box name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            spellCheck="false"
            defaultValue={name}
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
            className="input-box name"
            spellCheck="false"
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            defaultValue={about}
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
          onClick={() => {
            dispatch(updateProfile({ name, about }));
            setShowProfileUpdaterModal(false);
            var bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.style.overflow = "unset";
            toast.success("Profile Updated!", {
              style: {
                fontFamily: "Monospace",
                marginTop: "15px",
              },
              iconTheme: {
                primary: "#33b4ff",
                secondary: "#FFFFFF",
              },
            });
          }}
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
