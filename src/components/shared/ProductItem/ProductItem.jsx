import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem({ product, addProductToCart, loading }) {
  return (
    <div className="flex flex-col gap-2 w-1/6 border-2 border-gray-300 rounded-md p-2 shadow-md">
      <div className="product">
        <Link
          to={`/productDetails/${product.id}/${product.category._id}`}
          className="cursor-pointer"
        >
          <img src={product.imageCover} alt={product.title} />

          <p className="text-main">{product.category.name}</p>
          <h3 className="mb-2 font-semibold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between items-center">
            <p>{product.price}</p>
            <p>
              <i className="fa-solid fa-star rating-color"></i>{" "}
              {product.ratingsAverage}
            </p>
          </div>
        </Link>

        <button
          onClick={() => addProductToCart(product.id)}
          disabled={loading}
          className="btn bg-main text-center text-white p-2 rounded-md w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
