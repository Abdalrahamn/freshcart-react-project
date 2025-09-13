import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductItem from "../../../shared/ProductItem/ProductItem";
import { CartContext } from "../../../../contexts/cartContext";
import { toast } from "react-toastify";

export default function RelatedProducts(props) {
  const { id, categoryId } = props;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart, loading } = useContext(CartContext);

  async function addProductToCart(productId) {
    const result = await addToCart(productId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  function getRelatedProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => {
        setRelatedProducts(
          data.data.data.filter(
            (product) =>
              product.id !== id && product.category._id === categoryId
          )
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getRelatedProducts();
  }, [id, categoryId]);

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center my-15">
      {relatedProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addProductToCart={addProductToCart}
          loading={loading}
        />
      ))}
    </div>
  );
}
