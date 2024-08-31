import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductsInfo from "../ProductsInfo/ProductsInfo";

export default function Products() {
  const [first, setfirst] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <ProductsInfo />
    </>
  );
}
