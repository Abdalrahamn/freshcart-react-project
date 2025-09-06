import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const registerForm = useFormik({
    initialValues: initialState,
    onSubmit: callRegisterApi,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be less than 30 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must be less than 30 characters")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Repeat Password is required"),
      phone: Yup.string()
        .min(11, "Phone number must be at least 11 characters")
        .max(11, "Phone number must be less than 11 characters")
        .required("Phone number is required"),
    }),
  });

  async function callRegisterApi(values) {
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(response);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <form
      className="max-w-md mx-auto mt-10"
      onSubmit={registerForm.handleSubmit}
    >
      <h1 className="text-4xl  mb-5">Register</h1>
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
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={registerForm.values.name}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          User Name
        </label>

        {registerForm.errors.name && registerForm.touched.name ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{registerForm.errors.name}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={registerForm.values.email}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          User Email
        </label>

        {registerForm.errors.email && registerForm.touched.email ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{registerForm.errors.email}</span>
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
          value={registerForm.values.password}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>

        {registerForm.errors.password && registerForm.touched.password ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{registerForm.errors.password}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={registerForm.values.rePassword}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          required
        />
        <label
          htmlFor="rePassword"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Repeat Password
        </label>

        {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">
              {registerForm.errors.rePassword}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={registerForm.values.phone}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone Number
        </label>

        {registerForm.errors.phone && registerForm.touched.phone ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{registerForm.errors.phone}</span>
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
