import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { userContext } from "../../../Context/UserContext";
import { cartContext } from "../../../Context/CartContext";
import Loader from "../Loader/Loader";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [isloading, setIsloading] = useState(false);

  let {
    getItems,
    removeItems,
    updateItems,
    cartId,
    setCartId,
    cartNum,
    removeAllItems,
    setCartNum,
  } = useContext(cartContext);

  async function getCartItem() {
    let data = await getItems();
    console.log(data?.data?.data?.products);
    setCartData(data?.data?.data?.products);
    setCartTotalPrice(data?.data?.data?.totalCartPrice);
    setCartId(data?.data?.data?._id);
    setCartNum(data?.data?.numOfCartItems);
    // setIsloading(true);
    // console.log(cartNum);
  }

  async function removeCartItem(productId) {
    let data = await removeItems(productId);
    console.log(data?.data.data.products);
    setCartData(data?.data.data.products);
    setCartTotalPrice(data?.data.data.totalCartPrice);
    setCartId(data?.data.data._id);
    setCartNum(data?.data.numOfCartItems);
    // console.log(cartNum);
  }

  async function removeAllCartItem() {
    let data = await removeAllItems();
    console.log(data);
    setCartData([]);
    setCartTotalPrice(0);
    // setCartId(data?.data.data._id);
    setCartNum(0);
    // console.log(cartNum);
  }

  async function updateCartItem(productId, count) {
    let data = await updateItems(productId, count);
    console.log(data);
    setCartData(data?.data.data.products);
    setCartTotalPrice(data?.data.data.totalCartPrice);
    setCartId(data?.data.data._id);
    setCartNum(data?.data.numOfCartItems);
    // console.log(cartNum);
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      {cartData !== null ? (
        <section className="min-vh-100">
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100 pt-5">
              <div className="col-12">
                <h3 className="fw-bold t-main mb-4">Shopping Cart</h3>
                <div className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    {/* Row */}

                    {cartData?.map((data) => (
                      <div
                        key={data._id}
                        className="row mb-3 pb-3 d-flex justify-content-between align-items-center text-center border-bottom border-2"
                      >
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={data.product.imageCover}
                            className="img-fluid rounded-3"
                            alt={data.product.title}
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3 mt-3">
                          <p className="lead fw-bold mb-2">
                            {data.product.title}
                          </p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center mt-3 fw-bold">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn px-2"
                            onClick={() =>
                              updateCartItem(data.product.id, data.count - 1)
                            }
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <span className="m-2">{data.count}</span>

                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn px-2"
                            onClick={() =>
                              updateCartItem(data.product.id, data.count + 1)
                            }
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mt-3">
                          <h5 className="mb-0 fw-bold">
                            Price : {data.price} EGP
                          </h5>
                        </div>
                        {/* <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mt-3">
                        <h5 className="mb-0 fw-bold">
                          Total : {`${data.price * data.count}`} EGP
                        </h5>
                      </div> */}
                        <div className="col-md-1 col-lg-1 col-xl-1 text-center mt-3">
                          <a href="#!" className="text-danger">
                            <i
                              className="fas fa-trash fa-lg"
                              onClick={() => removeCartItem(data.product.id)}
                            ></i>
                          </a>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex align-items-center justify-content-between">
                      <h1 className="fw-bold">
                        Total : <span className="t-main">{cartTotalPrice}</span>
                      </h1>
                      <Link
                        to="/checkout"
                        className={`btn btn-success ${
                          cartTotalPrice === 0 ? "disabled" : null
                        }`}
                      >
                        Check Out
                      </Link>
                    </div>
                    <div>
                      <Button
                        variant="outline-success"
                        className="btn w-100 fw-bold my-3"
                        onClick={removeAllCartItem}
                      >
                        Clear Your Cart
                      </Button>
                    </div>
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
