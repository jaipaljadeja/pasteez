import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { register } from "../actions/userActions";
import FormError from "../components/FormError";
import "./styles/form.css";

export default function Signup({ containerVariants }) {
  // for pushing to different route
  const history = useHistory();

  // Yup validation for login info
  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .label("Password"),
  });

  // isSubmitting for disabling the form submit until a response has been recieved by clicking submit once
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Declaring dispatch for redux
  const dispatch = useDispatch();
  // Making Register State in redux
  const userRegister = useSelector((state) => state.userRegister);

  // Error and userinfo if returned by the userRegister state
  const { error, userInfo } = userRegister;

  // after successful signup wait for 2 secs then redirect to home screen
  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [userInfo, history]);

  // The function when form is submitted
  const formSubmitHandler = ({ name, username, email, password }) => {
    setIsSubmitting(true); // Disables the form submit btn
    toast.promise(
      dispatch(register(name, username, email, password)), // Dispatches the userinfo
      {
        loading: "Signing you up...", //when signing up
        success: "Sign Up Success! Redirecting...", //if signup is success
        error: error || "User Already Exist", //if signup fails
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
            <div className="form-title">Sign up</div>
            <Formik
              initialValues={{
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={formSubmitHandler}
              validationSchema={signupValidationSchema}
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
                    <label htmlFor="name">name</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      required
                      onBlur={() => setFieldTouched("name")}
                      onChange={handleChange("name")}
                    />
                    <FormError error={errors.name} visible={touched.name} />
                    <br />

                    <label htmlFor="username">username</label>
                    <br />
                    <input
                      type="text"
                      name="username"
                      onBlur={() => setFieldTouched("username")}
                      required
                      onChange={handleChange("username")}
                    />
                    <FormError
                      error={errors.username}
                      visible={touched.username}
                    />
                    <br />

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

                    <label htmlFor="confirmPassword">confirm password</label>
                    <br />
                    <input
                      type="password"
                      name="confirmPassword"
                      onBlur={() => setFieldTouched("confirmPassword")}
                      required
                      onChange={handleChange("confirmPassword")}
                    />
                    <FormError
                      error={errors.confirmPassword}
                      visible={touched.confirmPassword}
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
