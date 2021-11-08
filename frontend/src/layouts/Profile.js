import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postsActions";
import Editor from "react-simple-code-editor";
import { decodeURL } from "../utils/UrlUtils";
import { useParams } from "react-router-dom";
import axios from "axios";
const hljs = require("highlight.js");

export default function Profile({ containerVariants, setShowModal }) {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { posts, error, loading } = postList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [paramsUser, setParamsUser] = useState({
    name: "",
    profileIcon:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    username: "",
    about: "",
  });
  const { username } = useParams();

  useEffect(() => {
    const fetchParamsUser = async () => {
      const { data } = await axios.get(`/api/users/${username}`);
      setParamsUser(data);
    };
    fetchParamsUser();
    dispatch(listPosts(username));
  }, [username, dispatch]);

  return (
    <motion.div
      className="main-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={paramsUser?.profileIcon}
            alt="profile-pic"
            className="profile-header-pic"
          />
        </div>
        <div className="profile-header-upper">
          <div className="contents-left"></div>
          <div className="contents-right">
            <ul>
              <li>{paramsUser?.name}</li>
              <li>@{paramsUser?.username}</li>
            </ul>
          </div>
        </div>
        <div className="profile-header-lower">
          <div className="contents-left" />
          <div className="contents-right">
            <p>{paramsUser?.about}</p>
          </div>
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-posts">
          <div className="posts-header">
            <h2>Posts</h2>
            <button
              onClick={() => {
                var bodyElement = document.getElementsByTagName("BODY")[0];
                bodyElement.style.overflow = "hidden";
                setShowModal(true);
              }}
              className="btn create-post-btn"
            >
              <i className="fas fa-plus"></i> Create Post
            </button>
          </div>
          <div className="posts-section">
            {posts?.length !== 0 ? (
              posts?.map((post) => (
                <Post
                  key={post._id}
                  caption={post.caption}
                  encryptedCode={post.encryptedCode}
                  username={post.username}
                  decryptedCode={decodeURL(post.encryptedCode)}
                  lang={post.lang}
                  paramsUser={paramsUser}
                />
              ))
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>
        <div className="profile-posts-list"></div>
      </div>
    </motion.div>
  );
}

function Post(props) {
  return (
    <div className="post-container">
      <div className="post-container-top">
        <div className="small-profile-image-container">
          <img
            src={props.paramsUser.profileIcon}
            alt="profile-pic"
            className="small-profile-header-pic"
          />
        </div>
        <ul>
          <li>
            <ul>
              <li>{props.paramsUser.name}</li>
              <li>@{props.username}</li>
            </ul>
          </li>
          <li>
            <p>{props.caption}</p>
          </li>
        </ul>
      </div>
      <div className="post-container-main">
        <Editor
          value={props.decryptedCode}
          highlight={(code) =>
            hljs.highlight(code, {
              language: props.lang,
            }).value
          }
          autoFocus={false}
          padding={20}
          disabled={true}
          textareaId="post-code-viewer"
          className="post-code-wrapper"
          style={{ lineHeight: 1.5 }}
        />
      </div>
    </div>
  );
}
