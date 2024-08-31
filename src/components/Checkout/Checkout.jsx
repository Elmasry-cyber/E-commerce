import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { cartContext } from "../../../Context/CartContext";
import { useFormik } from "formik";
import Loader from "../Loader/Loader";

export default function Checkout() {
  let { checkOut, isErrorPayment, isLoading } = useContext(cartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: payNow,
  });

  async function payNow(values) {
    console.log(values);
    return await checkOut(values);
  }

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pt-5">
          <div className="row pt-5">
            <h1 className="t-main fw-bold mb-5">Check Out :</h1>
            <form onSubmit={formik.handleSubmit} className="col-10 mx-auto">
              {isErrorPayment ? (
                <Alert variant="danger">{isErrorPayment}</Alert>
              ) : null}
              <FloatingLabel controlId="floatingDetails" label="Details">
                <Form.Control
                  type="text"
                  placeholder="Details"
                  className="mb-4"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="details"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPhone" label="Phone">
                <Form.Control
                  type="tel"
                  placeholder="Phone"
                  className="mb-4"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingCity" label="City">
                <Form.Control
                  type="text"
                  placeholder="City"
                  className="mb-4"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="city"
                />
              </FloatingLabel>
              <Button
                variant="outline-success"
                className={`btn w-100 fw-bold my-3`}
                onClick={formik.handleSubmit}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Pay Now
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
