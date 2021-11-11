import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import Editor from "react-simple-code-editor";
import toast from "react-hot-toast";
import { languages } from "../config/config";
import { updatePostAction } from "../actions/postsActions";
import { generateEncryptedCode } from "../utils/UrlUtils";
import { motion } from "framer-motion";
const hljs = require("highlight.js");

export default function PostUpdater({
  setShowPostUpdaterModal,
  caption,
  lang,
  code,
  postId,
}) {
  // Declaring dispatch for redux
  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.postCreate);
  const { error } = postCreate;

  // This is required to use multiple CSS Files
  const [data, setData] = useState({
    caption: caption,
    lang: lang,
    code: code,
  });
  // When a user changes language from the editor
  const handleLangChange = (lang) => {
    setData({ ...data, lang: lang });
  };

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

  const handlePostSubmit = () => {
    if (data.caption === "" || data.code === "") {
      toast.error("Please fill all the fields", {
        style: {
          fontFamily: "Monospace",
          marginTop: "15px",
        },
      });
      return;
    }
    toast
      .promise(
        dispatch(
          updatePostAction(
            postId,
            data.caption,
            generateEncryptedCode(data.code),
            data.lang
          )
        ),
        {
          loading: "Updating...", //when posting
          success: "Post Updated!", //if post is success
          error: `${error || "Update failed!"}`, //when post is failed
        },
        {
          style: {
            fontFamily: "Monospace",
            marginTop: "15px",
          },
        }
      )
      .then(() => {
        setShowPostUpdaterModal(false);
        var bodyElement = document.getElementsByTagName("BODY")[0];
        bodyElement.style.overflow = "unset";
      });
  };

  return (
    <div className="post-editor" style={{ marginBottom: "5em" }}>
      <p
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          color: "white",
          opacity: "0.1",
        }}
      ></p>
      <motion.div
        variants={backdropBlur}
        className="pasteez-editor"
        style={{
          // background: "linear-gradient(90deg, #d0f4ff 0%, #2b8389 100%)",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.6) 2px 10px 50px",
          marginTop: "10px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="exportableFrame">
          <p
            style={{
              color: "white",
              fontSize: "1.5em",
              marginBottom: "18px",
              fontWeight: "500",
            }}
          >
            Update Your Post
          </p>
          <div className="editor-frame">
            <div className="frame-header">
              <div className="frame-header-buttons">
                <div className="frame-header-circle red-circle"></div>
                <div className="frame-header-circle yellow-circle"></div>
                <div className="frame-header-circle green-circle"></div>
              </div>
              <div className="frame-header-title"></div>
              <div className="frame-header-buttons" style={{ opacity: 0 }}>
                <div className="frame-header-circle"></div>
                <div className="frame-header-circle"></div>
                <div className="frame-header-circle"></div>
              </div>
            </div>
            <div className="frame-body">
              <Editor
                value={data.code}
                onValueChange={(code) => setData({ ...data, code: code })}
                highlight={(code) =>
                  hljs.highlight(code, {
                    language: data.lang,
                  }).value
                }
                placeholder="Enter your code here..."
                autoFocus={false}
                padding={20}
                textareaId="code-editor"
                className="code-editor-wrapper"
                style={{ lineHeight: 1.5, color: "white" }}
              />
            </div>
          </div>
          <div className="frame-footer">
            <div className="frame-footer-buttons">
              <div className="settings-btn">
                <Dropdown
                  controlClassName="btn"
                  options={languages}
                  onChange={(e) => {
                    const lang = e.value;
                    handleLangChange(lang);
                  }}
                  value={data.lang}
                  placeholder="Select a language"
                />
                <input
                  className="caption-box"
                  type="text"
                  placeholder="Enter your caption..."
                  spellCheck="false"
                  defaultValue={data.caption}
                  onChange={(e) => {
                    setData({ ...data, caption: e.target.value });
                  }}
                  style={{
                    borderRadius: "5px",
                    border: "none",
                    background: "rgba(0, 0, 0, 0.5)",
                    outline: "none",
                    color: "white",
                    padding: "0px 10px",
                    width: "24em",
                  }}
                />
              </div>
              <div className="features-btn">
                <button className="btn export-btn" onClick={handlePostSubmit}>
                  <i
                    style={{
                      marginRight: "10px",
                      fontSize: "10px",
                      marginTop: "2px",
                    }}
                    className="fas fa-plus"
                  ></i>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
