import {
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
  POSTS_UPDATE_FAIL,
  POSTS_CREATE_FAIL,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_DELETE_FAIL,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POSTS_REMOVEALL_SUCCESS,
} from "../constants/postsConstants";

import axios from "axios";

export const listPosts = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `https://pasteez-backend.jaipaljadeja.com/api/posts/user/${username}`
    );

    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: data,
    });
    return Promise.resolve(true);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POSTS_LIST_FAIL,
      payload: message,
    });
    return Promise.reject(error.response.data.message);
  }
};

export const createPostAction =
  (caption, encryptedCode, lang) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      // get the posts from current postList state
      const {
        postList: { posts },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `https://pasteez-backend.jaipaljadeja.com/api/posts/create`,
        { caption, encryptedCode, lang },
        config
      );
      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: data,
      });

      // add the new post to the current postList state
      dispatch({
        type: POSTS_LIST_SUCCESS,
        payload: [...posts, data],
      });

      return Promise.resolve(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_CREATE_FAIL,
        payload: message,
      });
      return Promise.reject(error.response.data.message);
    }
  };

export const deletePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // get the posts from current postList state
    const {
      postList: { posts },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    posts.splice(
      posts.findIndex((post) => post._id === id),
      1
    );

    const { data } = await axios.delete(
      `https://pasteez-backend.jaipaljadeja.com/api/posts/${id}`,
      config
    );
    dispatch({
      type: POSTS_DELETE_SUCCESS,
      payload: data,
    });
    // add the new post to the current postList state
    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: [...posts],
    });

    return Promise.resolve(true);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POSTS_DELETE_FAIL,
      payload: message,
    });

    return Promise.reject(error.response.data.message);
  }
};

export const updatePostAction =
  (id, caption, encryptedCode, lang) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const {
        postList: { posts },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `https://pasteez-backend.jaipaljadeja.com/api/posts/${id}`,
        { caption, encryptedCode, lang },
        config
      );

      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        payload: data,
      });

      const updatedPostList = posts.map((obj) => {
        if (obj._id === id) {
          console.log(obj);
          console.log(data);
          return data;
        } else {
          return obj;
        }
      });

      // update the post in the postList state
      dispatch({
        type: POSTS_LIST_SUCCESS,
        payload: updatedPostList,
      });

      return Promise.resolve(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });

      return Promise.reject(error.response.data.message);
    }
  };

export const removeStatePosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_REMOVEALL_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POSTS_DELETE_FAIL,
      payload: message,
    });
  }
};
