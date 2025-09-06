/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function Footer() {
  const [count, setCount] = useState(0);
  return (
    <footer className="bg-[rgb(242,242,242)] w-full p-6">
      <div className="container w-full">
        <h2 className="text-3xl text-[#212529]">Get the freshCart App</h2>
        <p className="text-[#6d767e] mb-4 font-light">
          Lorem, ipsum dolor sit amet consectetur
        </p>
        <div className="flex mb-5">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter your email"
          />
          <button className="bg-main p-2 text-white rounded-md ml-2">
            Share app link
          </button>
        </div>
        <div className="partner flex justify-between py-6 border-y-2">
          <div className="payment">
            <p>Payment partners</p>
          </div>
          <div className="app">
            <p>get with freshCart</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
