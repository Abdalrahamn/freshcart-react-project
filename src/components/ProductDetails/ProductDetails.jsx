import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  const { id, categoryId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetails();
  });

  function getProductDetails() {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}?categoryId=${categoryId}`
      )
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="flex gap-8 p-4 justify-center items-center">
        <div className="w-1/3">
          <img src={product.imageCover} alt={product.title} />
        </div>
        <div className="w-2/3">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-gray-500">{product.category.name}</p>
          <div className="flex justify-between items-center">
            <p>{product.price}</p>
            <p>
              <i className="fa-solid fa-star rating-color"></i>{" "}
              {product.ratingsAverage}
            </p>
          </div>

          <button className="btn bg-main text-center text-white p-2 rounded-md w-full cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Related Products</h2>
      <div className="">
        <RelatedProducts id={id} categoryId={categoryId} />
      </div>
    </>
  );
}
