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

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POSTS_LIST_REQUEST:
      return { loading: true };
    case POSTS_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POSTS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_CREATE_REQUEST:
      return { loading: true };
    case POSTS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_DELETE_REQUEST:
      return { loading: true };
    case POSTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_UPDATE_REQUEST:
      return { loading: true };
    case POSTS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
