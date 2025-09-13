import React, { useContext } from "react";
import ProductItem from "../../../shared/ProductItem/ProductItem";
import { CartContext } from "../../../../contexts/cartContext";
import { toast } from "react-toastify";

export default function RecentProducts({ products = [] }) {
  const { addToCart, loading } = useContext(CartContext);

  async function addProductToCart(productId) {
    const result = await addToCart(productId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 full-width justify-center items-center my-15">
      {products.map((product) => (
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
