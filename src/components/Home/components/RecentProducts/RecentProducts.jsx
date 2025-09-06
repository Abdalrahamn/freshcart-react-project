import React from "react";
import ProductItem from "../../../shared/ProductItem/ProductItem";

export default function RecentProducts({ products = [] }) {
  return (
    <div className="flex flex-wrap gap-2 full-width justify-center items-center my-15">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
