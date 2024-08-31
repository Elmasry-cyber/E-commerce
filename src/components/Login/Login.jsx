import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Alert } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../../Context/UserContext";

export default function Login() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  let { setUserLogin } = useContext(userContext);

  let navigate = useNavigate();

  async function loginForm(values) {
    console.log(values);
    setIsloading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((ref) => {
        console.log(ref);
        setSuccess(ref?.data.message);
        setError(null);
        localStorage.setItem("userToken", ref?.data.token);
        setUserLogin(localStorage.setItem("userToken", ref?.data.token));
        setIsloading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response.data.message);
        setSuccess(null);
        setIsloading(false);
      });
  }
  let loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Min Length 8 Char")
      .matches(/^[a-zA-Z]\w{3,}$/)
      .required("Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginForm,
    validationSchema: loginSchema,
  });

  useEffect(() => {}, []);

  return (
    <>
      <div className=" vh-100 d-flex align-items-center justify-content-center">
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto py-5">
          <h1 className="t-main mb-5 pt-5">Login Now</h1>

          {error ? (
            <Alert variant="danger" className="my-3 fw-bold">
              {error}
            </Alert>
          ) : null}
          {success ? (
            <Alert variant="success" className="my-3 fw-bold">
              {success}
            </Alert>
          ) : null}

          <FloatingLabel
            controlId="floatingemail"
            label="Email address"
            className="mb-4"
          >
            <Form.Control
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              placeholder="name@example.com"
              name="email"
            />

            {/* Handel Errors */}
            {formik.touched.email && formik.errors.email ? (
              <Alert variant="danger" className="my-3">
                {formik.errors.email}
              </Alert>
            ) : null}
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-4"
          >
            <Form.Control
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              placeholder="Password"
              name="password"
            />

            {/* Handel Errors */}
            {formik.touched.password && formik.errors.password ? (
              <Alert variant="danger" className="my-3">
                {formik.errors.password}
              </Alert>
            ) : null}
          </FloatingLabel>

          {isloading ? (
            <Button variant="primary" type="submit">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </Button>
          ) : (
            <div className="d-flex align-items-center justify-content-between">
              <Button variant="primary" type="submit">
                Submit
              </Button>{" "}
              <p className="mb-0 fw-semibold">
                Haven't An Account
                <Link to="/register" className="t-main fw-bold mx-2">
                  Register Now
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
