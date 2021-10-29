import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./styles/form.css";
import axios from "axios";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history]);

  let loginPromise = (e) => {
    return new Promise(async (resolve, reject) => {
      e.preventDefault();
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/users/login",
          {
            email,
            password,
          },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        resolve("Login Success");
      } catch (error) {
        reject(error.response.data.message);
      }
    });
  };

  const submitHandler = (e) => {
    toast.promise(
      loginPromise(e).then(
        setTimeout(() => {
          history.push("/");
          window.location.reload();
        }, 1500)
      ),
      {
        loading: "Checking your credentials",
        success: "Login Success! Redirecting...",
        error: "Email or Password is incorrect!",
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
