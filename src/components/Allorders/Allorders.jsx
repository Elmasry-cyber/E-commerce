import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Allorders() {
  const [first, setfirst] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <div className=" vh-100 d-flex align-items-center justify-content-center">
        <h1 className="t-main">Congratulations &hearts;🥳</h1>
      </div>
    </>
  );
}
