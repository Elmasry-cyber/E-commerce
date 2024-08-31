import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { wishListContext } from "../../../Context/WishListContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { cartContext } from "../../../Context/CartContext";
import { userContext } from "../../../Context/UserContext";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishListData, setWishListData] = useState();
  const [wishListImpty, setWishListImpty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let { getWishList, removeWishList } = useContext(wishListContext);
  let { addToCArt, setCartNum, setCartId } = useContext(cartContext);
  let { setUserLogin } = useContext(userContext);

  async function getWishListLitems() {
    let data = await getWishList();
    console.log(data);
    if (data?.data?.data.length === 0) {
      setWishListImpty("Impty");
    } else {
      setWishListImpty(null);
    }
    setWishListData(data?.data.data);
    setUserLogin(localStorage.getItem("userToken"));
  }
  async function removeWishListItem(productId) {
    let data = await removeWishList(productId);
    console.log(data);
    // console.log(wishListData);
    // let dataarr = data?.data?.data;
    // let filterWishList = dataarr.filter((pro) => pro !== productId);
    // console.log(dataarr);
    // console.log(filterWishList);
    setIsLoading(true);
    setUserLogin(localStorage.getItem("userToken"));

    window.location.reload();
    // arr.push(wishListData.filter((pro) => data?.data?.data == pro.id));
    // console.log(arr);

    // setWishListData(data?.data.data);
  }

  async function addItemToCart(productId) {
    let data = await addToCArt(productId);
    console.log(data);
    console.log(data?.response?.data.message);
    setCartNum(data?.data?.numOfCartItems);
    setCartId(data?.data?.data?._id);
    setCartNum(data?.data?.numOfCartItems);
    setUserLogin(localStorage.getItem("userToken"));
    // console.log(cartNum);
  }

  useEffect(() => {
    getWishListLitems();
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : null}
      {wishListData !== null ? (
        <section className="min-vh-100">
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100 pt-5">
              <div className="col-12">
                <h3 className="fw-bold t-main mb-4">My Wish List :</h3>
                <div className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    {wishListImpty ? (
                      <p className="text-center fw-bold fs-4 bg-danger text-white p-5">
                        {wishListImpty}
                      </p>
                    ) : null}

                    {/* Row */}

                    {wishListData?.map((data) => (
                      <div
                        key={data?.id}
                        className="row mb-3 pb-3 d-flex justify-content-between align-items-center text-center border-bottom border-2"
                      >
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={data?.imageCover}
                            className="img-fluid rounded-3"
                            alt={data?.title}
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3 mt-3">
                          <p className="lead fw-bold mb-2">{data?.title}</p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mt-3">
                          <h5 className="mb-0 fw-bold">
                            Price : {data?.price} EGP
                          </h5>
                        </div>
                        {/* <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mt-3">
                        <h5 className="mb-0 fw-bold">
                          Total : {`${data.price * data.count}`} EGP
                        </h5>
                      </div> */}
                        <Button
                          onClick={() => addItemToCart(data?.id)}
                          className="btn bg-main text-white rounded-3 w-auto mt-3"
                        >
                          Add To Cart
                        </Button>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-center mt-3">
                          <a href="#!" className="text-danger">
                            <i
                              className="fas fa-trash fa-lg"
                              onClick={() => removeWishListItem(data?.id)}
                            ></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
