import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

// function to authenticate user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://pasteez-backend.jaipaljadeja.com/api/users/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // console.log(data);
    // Save userinfo to localstorage
    localStorage.setItem("userInfo", JSON.stringify(data));
    return Promise.resolve(true);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
  }
};

// function to logout
export const logout = () => async (dispatch) => {
  // Remove userinfo from localstorage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

// function to register user
export const register =
  (name, username, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://pasteez-backend.jaipaljadeja.com/api/users/signup",
        {
          name,
          username,
          email,
          password,
        },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      // Save userinfo to localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      console.log(error.response.data.message);
      return Promise.reject(error.response.data.message);
    }
  };

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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
      "https://pasteez-backend.jaipaljadeja.com/api/users/profile",
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    return Promise.resolve(true);
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return Promise.reject(error.response.data.message);
  }
};
