import React, { useState, useEffect } from "react";
import RecentProducts from "../Home/components/RecentProducts/RecentProducts";
import axios from "axios";
import PopularCategories from "./components/PopularCategories/PopularCategories";

export default function Home() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  });

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <PopularCategories />
      <RecentProducts products={products} />
    </div>
  );
}
