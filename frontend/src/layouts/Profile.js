import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Profile({ containerVariants }) {
  const [allPosts, setAllPosts] = useState([]);

  const posts = [
    {
      id: 1,
      caption: "Today i am sharing a python code to generate a fibonacci series using recursion. I have tried my best to keep it as efficent as possible!",
      encryptedCode:""
    },
    {
      id: 2,
      caption: "Today i am sharing a python code to generate a fibonacci series using recursion. I have tried my best to keep it as efficent as possible!",
      encryptedCode:""
    }
  ]

  useEffect(() => {
    setAllPosts(posts)
  }, [])

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
            src={'https://i.imgur.com/MVN67Dv.jpg'}
            alt="profile-pic"
            className="profile-header-pic"
          />
        </div>
        <div className="profile-header-upper">
          <div className="contents-left"></div>
          <div className="contents-right">
            <ul>
              <li>Bhavya Gosai</li>
              <li>@bbSempai</li>
            </ul>
          </div>
        </div>
        <div className="profile-header-lower">
          <div className="contents-left" />
          <div className="contents-right">
            <p>
              Enthusiastic and hard-working sophmore impassionately studying
              Computer Science and have a deep inquisitiveness for coding. Love
              making highly attractive user interfaces including efficiently
              working websites/applications and other artwork. Spending my major
              time sheltering in music, reading books, gathering knowledge and
              trying to contribute towards open source, no matter tech/non-tech,
              I aspire to be the best version of myself and make a positive
              impact on the world. Apart from coding, I also love researching
              about space and astronomy. I am a professional Swimmer, Badminton
              player and love playing Football too.
            </p>
          </div>
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-posts">
          <h2>Posts</h2>
          {allPosts.length !== 0 ? (
                allPosts.map((post) => (
                  <Post
                    id={post.id}
                    caption={post.caption}
                    encryptedCode={post.encryptedCode}
                  />
                ))
          ) : (
              <div>
                Wow, such empty!
              </div>
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
        <div className="small-profile-image-container">
          <img
            src={'https://i.imgur.com/MVN67Dv.jpg'}
            alt="profile-pic"
            className="small-profile-header-pic"
          />
        </div>
        <ul>
          <li>
            <ul>
              <li>Bhavya Gosai</li>
              <li>@bbSempai</li>
            </ul>
          </li>
          <li>
            <p>
              {props.caption}
            </p>
          </li>
        </ul>
      </div>
      <div className="post-container-main"></div>
    </div>
  );
}
