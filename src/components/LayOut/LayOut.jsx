/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
