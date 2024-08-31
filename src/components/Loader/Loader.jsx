import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Bars } from "react-loader-spinner";

export default function Loader() {
  const [first, setfirst] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <div className=" vh-100 d-flex align-items-center justify-content-center">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
