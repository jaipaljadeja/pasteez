import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../actions/postsActions';
import Editor from 'react-simple-code-editor';
import { decodeURL } from '../utils/UrlUtils';
import { useParams, useHistory } from 'react-router-dom';
import './styles/agate.css';
import axios from 'axios';
const hljs = require('highlight.js');

export default function Profile() {
  // const history = useHistory();

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { posts, error } = postList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [paramsUser, setParamsUser] = useState({
    name: '',
    profileIcon:
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    username: '',
    about: '',
  });

  const [userExist, setUserExist] = useState(false);
  const [isProfileUser, setIsProfileUser] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    const checkIfProfileUser = () => {
      if (userInfo.username === username) setIsProfileUser(true);
      else setIsProfileUser(false);
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
  }, [username, dispatch]);

  const containerVariants = {
    hidden: {
      x: '100vw',
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        delay: 0.5,
      },
    },
    exit: {
      x: '-100vw',
      transition: {
        ease: 'easeInOut',
      },
    },
  };

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
          <div className="contents-left" />
          <div className="contents-right">
            <ul>
              <li>
                {userExist === true ? paramsUser?.name : "User doesn't exist"}
              </li>
              <li>@{username}</li>
            </ul>
            {isProfileUser && (
              <div className="btn edit-btn">
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
          <h2>Posts</h2>
          {error !== null ? (
            posts?.length !== 0 ? (
              posts?.map((post) => (
                <Post
                  key={post._id}
                  caption={post.caption}
                  encryptedCode={post.encryptedCode}
                  username={post.username}
                  userState={isProfileUser}
                  decryptedCode={decodeURL(post.encryptedCode)}
                  lang={post.lang}
                  paramsUser={paramsUser}
                />
              ))
            ) : (
              <p className="no-posts">Wow, such empty!</p>
            )
          ) : (
            <p className="no-posts">Please try again!!</p>
          )}
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
        {props.userState && (
          <div className="button-container">
            <div className="btn post-edit-btn trash">
              <i className="fas fa-trash" />
            </div>
            <div className="btn post-edit-btn">
              <i className="fas fa-pencil" />
            </div>
            <div className="btn post-edit-btn">
              <i className="fas fa-clipboard" />
            </div>
          </div>
        )}
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
