import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NotFoundImg from "../../assets/Notfound.jpg";

export default function NotFound() {
  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div className="image w-75 m-auto py-5">
          <img src={NotFoundImg} alt="NotFoundImg" className="w-100" />
        </div>
      </div>
    </>
  );
}
