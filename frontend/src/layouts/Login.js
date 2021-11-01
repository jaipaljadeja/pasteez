import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./styles/form.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        history.push("/");
      }, 1500);
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    toast.promise(
      dispatch(login(email, password)),
      {
        loading: "Checking your credentials",
        success: "Login Success! Redirecting...",
        error: `${error || "Invalid Email or Password!"}`,
      },
      {
        style: {
          fontFamily: "Monospace",
          marginTop: "10px",
        },
      }
    );
  };

  return (
    <div className="container">
      <div>
        <Toaster />
      </div>
      <div className="form-container">
        <div className="form-title">Sign in</div>
        <form className="form" onSubmit={submitHandler}>
          <label htmlFor="email">email</label>
          <br />
          <input
            type="text"
            name="email"
            pattern="[^ @]*@[^ @]*"
            defaultValue={email}
            onInvalid={(e) => {
              e.target.setCustomValidity("Enter a valid Email Address");
            }}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">password</label>
          <br />
          <input
            type="password"
            name="password"
            defaultValue={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <div id="form-button">
            <button className="submit-btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
