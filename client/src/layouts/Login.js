import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { login } from "../actions/userActions";
import FormError from "../components/FormError";
import "./styles/form.css";

export default function Login({ containerVariants }) {
  // for pushing to different route
  const history = useHistory();

  // Yup validation for login info
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  // isSubmitting for disabling the form submit until a response has been recieved by clicking submit once
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Declaring dispatch for redux
  const dispatch = useDispatch();

  // Making Login State in redux
  const userLogin = useSelector((state) => state.userLogin);

  // Error and userinfo if returned by the userLogin state
  const { error, userInfo } = userLogin;

  // after successful login wait for 2 secs then redirect to home screen
  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [history, userInfo]);

  // The function when form is submitted
  const formSubmitHandler = ({ email, password }) => {
    setIsSubmitting(true); // Disables the form submit btn
    toast.promise(
      dispatch(login(email, password)), // Dispatches the email and username
      {
        loading: "Checking your credentials", //when logging in
        success: "Login Success! Redirecting...", //if login is success
        error: `${error || "Invalid Email or Password!"}`, //when login is failed
      },
      {
        style: {
          fontFamily: "Monospace",
          marginTop: "15px",
        },
      }
    );
    setIsSubmitting(false); //enable the form submit btn again
  };

  return (
    <>
      <Toaster />
      <motion.div
        className="main-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="container">
          <div className="form-container">
            <div className="form-title">Sign in</div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={formSubmitHandler}
              validationSchema={loginValidationSchema}
            >
              {({
                handleChange,
                errors,
                setFieldTouched,
                touched,
                handleSubmit,
              }) => {
                return (
                  <Form className="form">
                    <label htmlFor="email">email</label>
                    <br />
                    <input
                      type="text"
                      name="email"
                      onBlur={() => setFieldTouched("email")}
                      required
                      onChange={handleChange("email")}
                    />
                    <FormError error={errors.email} visible={touched.email} />
                    <br />

                    <label htmlFor="password">password</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      onBlur={() => setFieldTouched("password")}
                      required
                      onChange={handleChange("password")}
                    />
                    <FormError
                      error={errors.password}
                      visible={touched.password}
                    />
                    <br />
                    <div id="form-button">
                      <button
                        className="submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </motion.div>
    </>
  );
}
