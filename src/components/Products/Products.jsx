import React, { useContext } from "react";
import { CounterContext } from "../../contexts/counterContext.jsx";
import Btn from "../Btn/Btn";

export default function Products() {
  const { counter, setCounter } = useContext(CounterContext);

  const changeCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      {
        <button
          className="bg-blue-500 text-white rounded-sm px-2"
          onClick={changeCounter}
        >
          +
        </button>
      }
    </>
  );
}
