import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite";
import CounterContextProvider from "./contexts/counterContext.jsx";
import TokenContextProvider from "./contexts/tokenContext.jsx";
import CartContextProvider from "./contexts/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <CounterContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </CounterContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
