import React from "react";
import notFoundImage from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center mt-32
    "
    >
      <img src={notFoundImage} alt="not found" />
    </div>
  );
}
