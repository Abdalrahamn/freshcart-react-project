import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../contexts/tokenContext.jsx";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, [setToken]);

  const initialState = {
    email: "",
    password: "",
  };

  const loginForm = useFormik({
    initialValues: initialState,
    onSubmit: callLoginApi,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must be less than 30 characters")
        .required("Password is required"),
    }),
  });

  async function callLoginApi(values) {
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("userToken", response.data.token);
      setToken(response.data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={loginForm.handleSubmit}>
      <h1 className="text-4xl  mb-5">Login</h1>
      {error && (
        <div
          className="p-2 mb-3 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{error}</span>
        </div>
      )}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          User Email
        </label>

        {loginForm.errors.email && loginForm.touched.email ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{loginForm.errors.email}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>

        {loginForm.errors.password && loginForm.touched.password ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{loginForm.errors.password}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-end items-center">
          <div className="bg-main rounded-full p-2 w-20 flex justify-center items-center">
            <PuffLoader size={30} />
          </div>
        </div>
      ) : (
        <button
          type="submit"
          className="text-white bg-main hover:bg-main/80 focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main/80 dark:focus:ring-main ml-auto block"
        >
          Submit
        </button>
      )}
    </form>
  );
}
