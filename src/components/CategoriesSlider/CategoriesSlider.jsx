import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
  };

  function getCategory() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        console.log(response?.data?.data);
        setCategory(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message);
        setError(error?.message);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="pt-5 d-lg-block d-none">
        <Slider {...settings}>
          {category.map((cat) => (
            <div key={cat?._id}>
              <img
                src={cat?.image}
                alt={cat?.name}
                className="h-200 w-100 object-fit-cover"
              />
              <h6 className="t-main text-center my-2">{cat?.name}</h6>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
