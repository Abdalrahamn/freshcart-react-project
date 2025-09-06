/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function LayOut() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow ">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
