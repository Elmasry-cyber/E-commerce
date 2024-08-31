import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductsInfo from "../ProductsInfo/ProductsInfo";
import MainSlider from "./../MainSlider/MainSlider";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";

export default function Home() {
  const [first, setfirst] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <ProductsInfo />
    </>
  );
}
