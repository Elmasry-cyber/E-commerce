import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import { cartContext } from "../../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function ProductsDetails() {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState([]);
  const [isError, setError] = useState();
  const [isloading, setIsloading] = useState(false);

  let { addToCArt, setCartNum, setCartId, cartNum } = useContext(cartContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  let { id, cat } = useParams();
  console.log(id);
  console.log(cat);

  async function getProductDetails(id) {
    setIsloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((ref) => {
        console.log(ref?.data.data);
        setData(ref?.data.data);
        setIsloading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err?.message);
        setIsloading(false);
        setError(err?.message);
      });
  }
  async function getProductsCate(cat) {
    setIsloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((ref) => {
        console.log(ref);
        let allProducts = ref?.data.data;
        let filteredProducts = allProducts.filter(
          (filterProduct) => filterProduct.category.name === cat
        );
        console.log(allProducts);
        console.log(filteredProducts);
        setFilterData(filteredProducts);
        setIsloading(false);
        setError(null);

        // setData(ref?.data.data);
      })
      .catch((err) => {
        console.log(err?.message);
        setIsloading(false);
        setError(err?.message);
      });
  }

  async function addItemToCart(productId) {
    let data = await addToCArt(productId);
    console.log(data);
    setCartNum(data?.data.numOfCartItems);
    setCartId(data?.data.data._id);
    setCartNum(data?.data.numOfCartItems);
    // console.log(cartNum);

    if (data?.data?.status == "success") {
      toast.success(data?.data?.message);
    } else {
      toast.error("This didn't work.");
    }
  }

  useEffect(() => {
    getProductDetails(id);
    getProductsCate(cat);
  }, [id, cat]);

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

      <Toaster position="top-left" reverseOrder={false} />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="row gap-5 pt-5">
            <div className="col-md-4 pt-5">
              <Slider {...settings}>
                {data?.images.map((img) => (
                  <img
                    key={data?.id}
                    src={img}
                    alt={data?.title}
                    className="w-100"
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-7 d-flex align-items-center pt-5">
              <div>
                <h2 className="fw-bold t-main">{data?.title}</h2>
                <p className=" text-secondary my-4">{data?.description}</p>
                <div className="d-flex align-items-center justify-content-between text-secondary fw-semibold">
                  <p>{data?.price} EGP</p>
                  <p>
                    {data?.ratingsAverage}
                    <i className="fa-solid fa-star rating m-1"></i>
                  </p>
                </div>
                <Button
                  onClick={() => addItemToCart(data?.id)}
                  className="btn bg-main text-white w-100 py-2 rounded-3"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="row row-gap-5 mt-5">
            <h1 className="t-main fw-bold">All Similar Products :</h1>
            {filterData.map((product) => (
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
      )}
    </>
  );
}
