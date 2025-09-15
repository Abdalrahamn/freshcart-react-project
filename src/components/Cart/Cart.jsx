import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../../contexts/cartContext";
import Loader from "../shared/Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    loading,
    getCartItems,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    const result = await getCartItems();
    if (result && result.success) {
      setCartData(result.data);
    } else {
      toast.error(result.message);
    }
  }

  async function handleUpdateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    const result = await updateCartItemQuantity(productId, newQuantity);
    if (result.success) {
      toast.success("Cart updated successfully");
      setCartData(result.data);
    } else {
      toast.error(result.message);
    }
  }

  async function handleRemoveItem(productId) {
    const result = await removeFromCart(productId);
    if (result.success) {
      toast.success("Item removed from cart");
      setCartData(result.data);
    } else {
      toast.error(result.message);
    }
  }

  async function handleClearCart() {
    const result = await clearCart();
    if (result.success) {
      toast.success("Cart cleared successfully");
      setCartData(null);
    } else {
      toast.error(result.message);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );

  if (!cartData || cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 text-xl mb-4">Your cart is empty</div>
        <p className="text-gray-400">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
          >
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex-grow ml-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {item.product.category.name}
              </p>
              <p className="text-main font-bold text-lg mt-2">${item.price}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.product.id, item.count - 1)
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  disabled={item.count <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300 bg-gray-50">
                  {item.count}
                </span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.product.id, item.count + 1)
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartData && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Price:</span>
            <span className="text-main">${cartData.totalCartPrice}</span>
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to="/checkout"
              className="bg-main text-white p-5 rounded-md hover:bg-green-600 transition-colors text-lg font-semibold cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
