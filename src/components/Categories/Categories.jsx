import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loader from "../Loader/Loader";
import { Alert } from "react-bootstrap";

export default function Categories() {
  const [first, setfirst] = useState();
  const [category, setCategory] = useState([]);
  const [isError, setError] = useState();
  const [isloading, setIsloading] = useState(false);

  function getCategory() {
    setIsloading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        console.log(response?.data?.data);
        setCategory(response?.data?.data);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error?.message);
        setError(error?.message);
        setIsloading(false);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {isError ? (
        <Alert
          variant="danger"
          className="fw-bold fs-1 vh-100 d-flex align-items-center justify-content-center"
        >
          {isError}
          <i className="fa-solid fa-triangle-exclamation"></i>
        </Alert>
      ) : null}
      {isloading ? (
        <Loader />
      ) : (
        <div className="row row-gap-5 pt-5">
          <h1 className="t-main fw-bold pt-5">All Categories :</h1>
          {category.map((cat) => (
            <div key={cat._id} className="cat tran col-md-4 col-lg-3">
              <Card>
                <Card.Img variant="top" src={cat?.image} className="h-300" />
                <Card.Body>
                  <Card.Title className="text-center t-main fw-bold">
                    {cat?.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
