import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  const [first, setfirst] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
