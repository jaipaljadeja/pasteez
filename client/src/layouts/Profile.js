import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postsActions";
import Editor from "react-simple-code-editor";
import { decodeURL } from "../utils/UrlUtils";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import PostEditor from "../components/PostEditor";
import DeletePostAlert from "../components/DeletePostAlert";
import PostUpdater from "../components/PostUpdater";
import ProfileUpdater from "../components/ProfileUpdater";
const hljs = require("highlight.js");

export default function Profile() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { posts, error } = postList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [paramsUser, setParamsUser] = useState({
    name: "",
    profileIcon:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    username: "",
    about: "",
  });

  const [userExist, setUserExist] = useState(false);
  const [isProfileUser, setIsProfileUser] = useState(false);

  // State for the Post modal
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPostUpdaterModal, setShowPostUpdaterModal] = useState(false);
  const [showProfileUpdaterModal, setShowProfileUpdaterModal] = useState(false);

  const [deletePostId, setDeletePostId] = useState("");

  const { username } = useParams();

  const sortPosts = (a, b) => {
    var date1 = a.props.date;
    var date2 = b.props.date;
    var dateString1 =
      date1.slice(5, 7) +
      "/" +
      date1.slice(8, 10) +
      "/" +
      date1.slice(0, 4) +
      " " +
      date1.slice(11, 19) +
      " UTC";

    var dateString2 =
      date2.slice(5, 7) +
      "/" +
      date2.slice(8, 10) +
      "/" +
      date2.slice(0, 4) +
      " " +
      date2.slice(11, 19) +
      " UTC";

    return new Date(dateString2) - new Date(dateString1);
    // return b - a;
  };

  useEffect(() => {
    const checkIfProfileUser = () => {
      if (userInfo !== null) {
        if (userInfo.username === username) {
          setIsProfileUser(true);
        } else {
          setIsProfileUser(false);
        }
      }
    };
    const fetchParamsUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${username}`);
        setUserExist(true);
        setParamsUser(data);
      } catch (error) {
        setUserExist(false);
      }
    };
    checkIfProfileUser();
    fetchParamsUser();
    dispatch(listPosts(username));
  }, [username, dispatch, userInfo]);

  const containerVariants = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        delay: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
      },
    },
  };

  const [postData, setPostData] = useState({
    caption: "",
    lang: "javascript",
    code: "",
    id: "",
  });

  return (
    <>
      <Modal showModal={showPostModal} setShowModal={setShowPostModal}>
        <PostEditor setShowPostModal={setShowPostModal} />
      </Modal>
      <Modal
        showModal={showPostUpdaterModal}
        setShowModal={setShowPostUpdaterModal}
      >
        <PostUpdater
          setShowPostUpdaterModal={setShowPostUpdaterModal}
          caption={postData.caption}
          lang={postData.lang}
          code={postData.code}
          postId={postData.id}
        />
      </Modal>
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <DeletePostAlert
          postId={deletePostId}
          setShowDeleteModal={setShowDeleteModal}
        />
      </Modal>
      <Modal
        showModal={showProfileUpdaterModal}
        setShowModal={setShowProfileUpdaterModal}
      >
        <ProfileUpdater
          setShowProfileUpdaterModal={setShowProfileUpdaterModal}
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
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={paramsUser?.profileIcon}
              alt="profile-pic"
              className="profile-header-pic"
            />
          </div>
          <div className="profile-header-upper">
            <div className="contents-left" />
            <div className="contents-right">
              <ul>
                <li>
                  {userExist === true ? paramsUser?.name : "User doesn't exist"}
                </li>
                <li>@{username}</li>
              </ul>
              {isProfileUser && (
                <div
                  className="btn edit-btn"
                  title={"edit profile"}
                  onClick={() => {
                    var bodyElement = document.getElementsByTagName("BODY")[0];
                    bodyElement.style.overflow = "hidden";
                    setShowProfileUpdaterModal(true);
                  }}
                >
                  <i className="fas fa-pencil" />
                </div>
              )}
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
              {isProfileUser && (
                <button
                  onClick={() => {
                    var bodyElement = document.getElementsByTagName("BODY")[0];
                    bodyElement.style.overflow = "hidden";
                    setShowPostModal(true);
                  }}
                  className="btn create-post-btn"
                >
                  <i className="fas fa-plus"></i> Create Post
                </button>
              )}
            </div>
            <div className="posts-section">
              {error !== null ? (
                posts?.length !== 0 ? (
                  posts
                    ?.map((post) => (
                      <Post
                        key={post._id}
                        postId={post._id}
                        caption={post.caption}
                        encryptedCode={post.encryptedCode}
                        username={post.username}
                        userState={isProfileUser}
                        setShowPostUpdaterModal={setShowPostUpdaterModal}
                        deleteAlertModalState={setShowDeleteModal}
                        setDeletePostId={setDeletePostId}
                        decryptedCode={decodeURL(post.encryptedCode)}
                        setPostData={setPostData}
                        lang={post.lang}
                        date={post.createdAt}
                        paramsUser={paramsUser}
                      />
                    ))
                    .sort(sortPosts)
                ) : (
                  <p className="no-posts">Wow, such empty!</p>
                )
              ) : (
                <p className="no-posts">Please try again!!</p>
              )}
            </div>
          </div>
          <div className="profile-posts-list"></div>
        </div>
      </motion.div>
    </>
  );
}

function Post(props) {
  const [formatDate, setFormatDate] = useState();
  const [time, setTime] = useState();
  const [meridiem, setMeridiem] = useState();

  const postDeleteHandler = (postId) => {
    var bodyElement = document.getElementsByTagName("BODY")[0];
    bodyElement.style.overflow = "hidden";
    props.setDeletePostId(postId);
    props.deleteAlertModalState(true);
  };

  useEffect(() => {
    const dayOfWeek = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };

    const monthOfYear = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    var dateString =
      props.date.slice(5, 7) +
      "/" +
      props.date.slice(8, 10) +
      "/" +
      props.date.slice(0, 4) +
      " " +
      props.date.slice(11, 19) +
      " UTC";

    var date = new Date(dateString);

    let hour = date.getHours() % 12;
    if (hour === 0) {
      hour = 12;
    }
    const hours = hour.toString().length === 1 ? "0".concat(hour) : hour;
    const minutes =
      date.getMinutes().toString().length === 1
        ? "0".concat(date.getMinutes())
        : date.getMinutes();
    const Time = `${hours}:${minutes}`;
    const Meridiem = date.getHours() >= 12 ? "PM" : "AM";
    const displayDate = `${dayOfWeek[date.getDay()]}, ${
      date.getDate().toString().length === 1
        ? "0".concat(date.getDate())
        : date.getDate()
    } ${monthOfYear[date.getMonth()]} ${date.getFullYear()}`;

    setTime(Time);
    setMeridiem(Meridiem);
    setFormatDate(displayDate);
  }, [props.date]);

  const codeCopyHandler = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Code Copied", {
      style: {
        fontFamily: "Monospace",
        marginTop: "15px",
      },
      iconTheme: {
        primary: "#33b4ff",
        secondary: "#FFFFFF",
      },
    });
  };
  return (
    <>
      <div className="post-container">
        {props.userState ? (
          <div className="button-container">
            <div
              className="btn post-edit-btn trash"
              title={"delete post"}
              onClick={() => postDeleteHandler(props.postId)}
            >
              <i className="fas fa-trash" />
            </div>
            <div
              className="btn post-edit-btn edit"
              title={"edit post"}
              onClick={() => {
                var bodyElement = document.getElementsByTagName("BODY")[0];
                bodyElement.style.overflow = "hidden";
                props.setPostData({
                  caption: props.caption,
                  lang: props.lang,
                  code: props.decryptedCode,
                  id: props.postId,
                });
                props.setShowPostUpdaterModal(true);
              }}
            >
              <i className="fas fa-pencil" />
            </div>
            <div
              className="btn post-edit-btn clipboard"
              title={"copy code"}
              onClick={() => codeCopyHandler(props.decryptedCode)}
            >
              <i className="fas fa-clipboard" />
            </div>
          </div>
        ) : (
          <div className="button-container">
            <div
              className="btn post-edit-btn clipboard"
              title={"copy code"}
              onClick={() => codeCopyHandler(props.decryptedCode)}
            >
              <i className="fas fa-clipboard" />
            </div>
          </div>
        )}
        <div className="post-container-top">
          <div className="data-container">
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
        <p className="date">
          {time} {meridiem} | {formatDate}
        </p>
      </div>
    </>
  );
}
