import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import image_1 from "../../assets/image (1).jpg";
import image_2 from "../../assets/image (2).jpg";
import image_3 from "../../assets/image (3).jpg";
import image_4 from "../../assets/image (4).jpg";
import image_5 from "../../assets/image (5).jpg";

export default function MainSlider() {
  const [first, setfirst] = useState();

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="row mb-5 pt-5">
        <div className="col-sm-12 col-md-8 pt-5">
          <Slider {...settings}>
            <img
              src={image_1}
              alt=""
              className="w-100 h-400 object-fit-contain"
            />
            <img
              src={image_4}
              alt=""
              className="w-100 h-400 object-fit-contain"
            />
            <img
              src={image_5}
              alt=""
              className="w-100 h-400 object-fit-contain"
            />
          </Slider>
        </div>
        <div className="col-sm-12 col-md-4 pt-5">
          <img
            src={image_2}
            alt=""
            className="w-100 h-200 object-fit-contain"
          />
          <img
            src={image_3}
            alt=""
            className="w-100 h-200 object-fit-contain"
          />
        </div>
      </div>
      {/* <div className="d-flex mb-20">
        <div className=" w-75">
          <Slider {...settings}>
            <img src={image_1} alt="" className="h-400 w-100" />
            <img src={image_2} alt="" className="h-400 w-100" />
            <img src={image_3} alt="" className="h-400 w-100" />
          </Slider>
        </div>
        <div className="w-25">
          <img src={image_4} className="h-200 w-100" alt="" />
          <img src={image_5} className="h-200 w-100" alt="" />
        </div>
      </div> */}
    </>
  );
}
