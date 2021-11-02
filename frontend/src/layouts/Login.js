import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import "./styles/form.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormError from "../components/FormError";

export default function Login({ history }) {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [history, userInfo]);

  const formSubmitHandler = ({ email, password }) => {
    setIsSubmitting(true);
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
          marginTop: "15px",
        },
      }
    );
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
      },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
      },
    },
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
