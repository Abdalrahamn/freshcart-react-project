/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import LayOut from "./components/LayOut/LayOut";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthView from "./components/AuthView/AuthView";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          path: "login",
          element: (
            <AuthView>
              <Login />
            </AuthView>
          ),
        },
        {
          path: "register",
          element: (
            <AuthView>
              <Register />
            </AuthView>
          ),
        },
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDetails/:id/:categoryId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
