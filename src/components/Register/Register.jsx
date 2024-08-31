import Button from "react-bootstrap/Button";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/UserContext";

export default function Register() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  let { userLogin, setUserLogin } = useContext(userContext);

  let navigate = useNavigate();

  async function signupForm(values) {
    console.log(values);
    setIsloading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((ref) => {
        console.log(ref);
        setSuccess(ref?.data.message);
        setError(null);
        localStorage.setItem("userToken", ref?.data.token);
        setUserLogin(ref?.data.token);
        setIsloading(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response.data.message);
        setSuccess(null);
        setIsloading(false);
      });
    // console.log(formData);
  }
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min Length 3 Char")
      .max(25, "Max Length 25 Char")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Min Length 8 Char")
      .matches(/^[a-zA-Z]\w{3,}$/)
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: signupForm,
    validationSchema,
  });

  useEffect(() => {}, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-75 mx-auto py-5">
        <h1 className="t-main mb-5 pt-5">Register Now</h1>

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

        <FloatingLabel controlId="floatingName" label="Name" className="mb-4">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            placeholder="Name"
            name="name"
          />

          {/* Handel Errors */}
          {formik.touched.name && formik.errors.name ? (
            <Alert variant="danger" className="my-3">
              {formik.errors.name}
            </Alert>
          ) : null}
        </FloatingLabel>
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
        <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-4">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            placeholder="Phone"
            name="phone"
          />

          {/* Handel Errors */}
          {formik.touched.phone && formik.errors.phone ? (
            <Alert variant="danger" className="my-3">
              {formik.errors.phone}
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
        <FloatingLabel
          controlId="floatingRePassword"
          label="RePassword"
          className="mb-4"
        >
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            placeholder="Re-Password"
            name="rePassword"
          />

          {/* Handel Errors */}
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <Alert variant="danger" className="my-3">
              {formik.errors.rePassword}
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
            </Button>
            <p className="mb-0 fw-semibold">
              Have An Account
              <Link to="/login" className="t-main fw-bold mx-2">
                Login Now
              </Link>
            </p>
          </div>
        )}
      </form>
    </>
  );
}
