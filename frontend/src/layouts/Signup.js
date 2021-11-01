import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./styles/form.css";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormError from "../components/FormError";

export default function Signup({ history }) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [userInfo, history]);

  const formSubmitHandler = ({ name, username, email, password }) => {
    setIsSubmitting(true);
    toast.promise(
      dispatch(register(name, username, email, password)),
      {
        loading: "Signing you up...",
        success: "Sign Up Success! Redirecting...",
        error: error || "User Already Exist",
      },
      {
        style: {
          fontFamily: "Monospace",
          marginTop: "10px",
        },
      }
    );
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="container">
          <div>
            <Toaster />
          </div>
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
                      type="text"
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
      </div>
    </>
  );
}
