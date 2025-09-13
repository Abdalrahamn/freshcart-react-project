/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { toast } from "react-toastify";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loader from "../shared/Loader/Loader";

export default function ProductDetails() {
  const { id, categoryId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, loading } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

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

  async function handleAddToCart() {
    const result = await addToCart(product.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  if (!product) return <Loader />;

  return (
    <>
      <div className="flex gap-8 p-4 justify-center items-center my-10">
        <div className="w-1/3">
          <Slider {...settings}>
            {product.images.map((image) => (
              <img src={image} alt={product.title} key={image} />
            ))}
          </Slider>
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

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="btn bg-main text-center text-white p-2 rounded-md w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Related Products</h2>
      <div className="my-10">
        <RelatedProducts id={id} categoryId={categoryId} />
      </div>
    </>
  );
}
