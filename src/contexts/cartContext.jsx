import { createContext, useState, useContext } from "react";
import axios from "axios";
import { TokenContext } from "./tokenContext";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const { token } = useContext(TokenContext);

  // Add product to cart
  async function addToCart(productId) {
    if (!token) {
      return { success: false, message: "Please login first" };
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        setCartCount(response.data.numOfCartItems);
        setCartItems(response.data.data.products);
        setLoading(false);
        return {
          success: true,
          message: response.data.message,
          data: response.data,
        };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Failed to add product to cart";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  // Get cart items
  async function getCartItems() {
    if (!token) return { success: false, message: "Please login first" };

    setLoading(true);
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        setCartId(response.data.cartId);
        setCartCount(response.data.numOfCartItems);
        setCartItems(response.data.data.products);
        setLoading(false);
        return {
          success: true,
          data: response.data.data,
          message: "Cart loaded successfully",
        };
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cart:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to load cart",
      };
    }
  }

  async function checkout(values) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.status === "success") {
        return { success: true, data: response.data.session };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to checkout",
      };
    }
  }

  // Update cart item quantity
  async function updateCartItemQuantity(productId, count) {
    if (!token) return { success: false, message: "Please login first" };

    setLoading(true);
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        setCartCount(response.data.numOfCartItems);
        setCartItems(response.data.data.products);
        setLoading(false);
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating cart item:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update cart item",
      };
    }
  }

  // Remove item from cart
  async function removeFromCart(productId) {
    if (!token) return { success: false, message: "Please login first" };

    setLoading(true);
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        setCartCount(response.data.numOfCartItems);
        setCartItems(response.data.data.products);
        setLoading(false);
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      setLoading(false);
      console.error("Error removing from cart:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to remove item from cart",
      };
    }
  }

  // Clear entire cart
  async function clearCart() {
    if (!token) return { success: false, message: "Please login first" };

    setLoading(true);
    try {
      const response = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.message === "success") {
        setCartCount(0);
        setCartItems([]);
        setLoading(false);
        return { success: true, data: response.data };
      }
    } catch (error) {
      setLoading(false);
      console.error("Error clearing cart:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to clear cart",
      };
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        cartId,
        addToCart,
        getCartItems,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
