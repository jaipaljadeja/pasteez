import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./styles/form.css";

export default function Signup({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  let signupPromise = (e) => {
    return new Promise(async (resolve, reject) => {
      setIsSubmitting(true);
      try {
        confirm.setCustomValidity("");
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/users/",
          {
            name,
            username,
            email,
            password,
          },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        resolve("success");
      } catch (error) {
        reject(error.response.data.message);
        setIsSubmitting(false);
      }
    });
  };
  const confirm = document.querySelector("input[name=password-confirm]");
  const submitHandler = (e) => {
    console.log("Form Submit Clicked");
    e.preventDefault();
    if (password !== confirmPassword) {
      confirm.setCustomValidity("Passwords do not match");
      confirm.reportValidity();
    } else if (
      (password === confirmPassword) !== "" &&
      email !== "" &&
      name !== "" &&
      username !== ""
    ) {
      toast.promise(
        signupPromise(e).then((status) => {
          if (status === "success") {
            setTimeout(() => {
              history.push("/");
              window.location.reload();
            }, 1500);
          }
        }),
        {
          loading: "Signing you up...",
          success: "Sign Up Success! Redirecting...",
          error: "Error Occured, try again!",
        },
        {
          style: {
            fontFamily: "Monospace",
            marginTop: "10px",
          },
        }
      );
    }
  };

  return (
    <div className="container">
      <div>
        <Toaster />
      </div>
      <div className="form-container">
        <div className="form-title">Sign up</div>
        <form className="form">
          <label htmlFor="name">name</label>
          <br />
          <input
            type="text"
            name="name"
            required
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="username">username</label>
          <br />
          <input
            type="text"
            name="username"
            defaultValue={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">email</label>
          <br />
          <input
            type="text"
            name="email"
            pattern="[^ @]*@[^ @]*"
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

          <label htmlFor="password-confirm">confirm password</label>
          <br />
          <input
            type="text"
            name="password-confirm"
            defaultValue={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <div id="form-button">
            <button
              className="submit-btn"
              type="submit"
              onClick={submitHandler}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
