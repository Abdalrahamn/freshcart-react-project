import React from "react";

export default function Btn({ children }) {
  return (
    <>
      <button style={{ backgroundColor: "red" }}>{children}</button>
    </>
  );
}
