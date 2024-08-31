import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Footer() {
  const [first, setfirst] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <h1 className="text-white p-5 text-center bg-black mb-0">
        <span className="t-main">&hearts;</span> Footer
        <span className="t-main"> &hearts;</span>
      </h1>
    </>
  );
}
