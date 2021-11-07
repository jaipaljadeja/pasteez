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
} from "../constants/postsConstants";

import axios from "axios";

export const listPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/posts/user/${userInfo.username}`);

    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POSTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createPostAction =
  (caption, encryptedCode) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/posts/create`,
        { caption, encryptedCode },
        config
      );
      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_CREATE_FAIL,
        payload: message,
      });
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

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: POSTS_DELETE_SUCCESS,
      payload: data,
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

export const updatePostAction =
  (id, caption, encryptedCode) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/${id}`,
        { caption, encryptedCode },
        config
      );

      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
