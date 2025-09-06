/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../../contexts/counterContext.jsx";
import { TokenContext } from "../../contexts/tokenContext.jsx";

export default function NavBar() {
  const { counter, setCounter } = useContext(CounterContext);
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 :bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-4">
          {/* i need to prevent the active to be in logo , how i can do that ?? */}
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} width={"200px"} alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap "></span>
          </Link>
          {token ? (
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white :bg-gray-800 md::bg-gray-900 :border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent  md:p-0  "
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  md:p-0"
                  >
                    Products
                    <span className="text-white bg-gray-500 rounded-sm px-2 ms-2">
                      {counter}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  md:p-0"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  md:p-0"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  md:p-0"
                  >
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            <li>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li>
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok "></i>
            </li>
          </ul>

          <div>
            <ul className="flex items-center gap-4">
              {token ? (
                <li>
                  <span className="cursor-pointer" onClick={() => logout()}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
