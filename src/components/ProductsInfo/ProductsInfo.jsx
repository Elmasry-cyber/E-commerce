import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loader from "./../Loader/Loader";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userContext } from "../../../Context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { cartContext } from "../../../Context/CartContext";
import { wishListContext } from "../../../Context/WishListContext";

export default function ProductsInfo() {
  const [dataProduct, setDataProduct] = useState();
  const [arr, setArr] = useState();

  let { addToCArt, setCartNum, setCartId, cartNum } = useContext(cartContext);

  let { addToWishList, wishListSuccess, setWishListSuccess } =
    useContext(wishListContext);

  let { setUserLogin, userLogin } = useContext(userContext);
  // setUserLogin(localStorage.getItem("userToken"));
  // console.log(userLogin);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 10000,
    refetchInterval: 15000,
    retryDelay: 1000,
  });
  // console.log(data?.data.data[10].title.split(" ").splice(0, 2).join(" "));
  // console.log(data?.data.data);

  async function addItemToCart(productId) {
    let data = await addToCArt(productId);
    console.log(data);
    console.log(data?.response?.data.message);
    setCartNum(data?.data?.numOfCartItems);
    setCartId(data?.data?.data?._id);
    setCartNum(data?.data?.numOfCartItems);
    setUserLogin(localStorage.getItem("userToken"));
    // console.log(cartNum);

    if (data?.data?.status == "success") {
      toast.success(data?.data?.message);
    } else {
      toast.error(data?.response?.data?.message);
    }
  }

  async function addItemToWishList(productId) {
    let data = await addToWishList(productId);
    console.log(data);
    console.log(productId);

    let fa_heart = document.querySelectorAll(".fa-heart");
    // fa_heart.filter((el) => el == productId);
    // let fa_heart = document.querySelector("").getAttribute;
    // let fa_heartid =;
    // let filterIcon = Array.from(fa_heart).filter((el) => el.id == productId);
    // filterIcon.map((el) => el.classList.add("t-main"));

    let filterIcon = Array.from(fa_heart);
    setArr(filterIcon);
    console.log(filterIcon);
    console.log(arr);
    let filterarr = arr.filter((el) => el.id == productId);
    filterarr.map((el) => el.classList.replace("fa-bounce", "text-danger"));
    console.log(filterarr);

    // console.log(fa_heart);
    // console.log(
    //   Array.prototype.slice
    //     .call(fa_heart)
    //     .filter((el) => el.__reactProps$eu6re3ewc6o.id == productId)
    // );
    // console.log(fa_heartid);

    if (data?.data?.status == "success") {
      toast.success(data?.data?.message);
      // setWishListSuccess(data?.data?.status);
    } else {
      toast.error(data?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserLogin(localStorage.getItem("userToken"));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <Alert
        variant="danger"
        className=" vh-100 d-flex align-items-center justify-content-center"
      >
        {error.message}
      </Alert>
    );
  }

  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <div className="row row-gap-5 pt-5">
        <h1 className="t-main fw-bold pt-5">All Products :</h1>
        {data?.data.data.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <Card className="product overflow-hidden rounded-3 cursor-pointer">
              <Link
                to={`/productsdetails/${product.id}/${product.category.name}`}
                className=" text-decoration-none"
              >
                <Card.Img
                  variant="top"
                  src={product.imageCover}
                  className="w-100"
                />
                <Card.Body>
                  <Card.Text className="fw-bold t-main">
                    {product.category?.name}
                  </Card.Text>
                  <Card.Title className="t-black">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </Card.Title>
                  <div className="d-flex align-items-center justify-content-between text-secondary fw-semibold">
                    <p>{product.price} EGP</p>
                    <p>
                      {product.ratingsAverage}
                      <i className="fa-solid fa-star rating m-1"></i>
                    </p>
                  </div>
                </Card.Body>
              </Link>
              <div className="fs-1 px-4 ms-auto">
                <i
                  id={product.id}
                  className="fa-solid fa-heart fa-bounce "
                  onClick={() => addItemToWishList(product.id)}
                ></i>
              </div>
              <Button
                onClick={() => addItemToCart(product.id)}
                className="btn bg-main text-white w-75 mx-auto mb-3 py-2 rounded-3"
              >
                Add To Cart
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
