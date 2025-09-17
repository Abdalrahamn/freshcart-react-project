import React, { useContext, useState, useEffect, useCallback } from "react";
import { CartContext } from "../../contexts/cartContext";
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "../../contexts/tokenContext";
import styles from "./Allorders.module.css";

export default function Allorders() {
  const { getUserOrders } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUserId = useCallback(() => {
    if (!token) return null;
    const userId = jwtDecode(token).id;
    return userId;
  }, [token]);

  const getOrders = useCallback(async () => {
    if (!token) return;
    const response = await getUserOrders(getUserId());
    if (response) {
      setOrders(response);
    }
  }, [token, getUserOrders, getUserId]);

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token, getOrders]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (isPaid, isDelivered) => {
    if (isDelivered) {
      return <span className={styles.badgeDelivered}>Delivered</span>;
    } else if (isPaid) {
      return <span className={styles.badgePaid}>Paid</span>;
    } else {
      return <span className={styles.badgePending}>Pending</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Orders</h1>
        <p className={styles.subtitle}>Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <h3>No orders yet</h3>
          <p>Your orders will appear here once you make a purchase.</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className={styles.orderId}>#{order.id}</td>
                  <td className={styles.date}>{formatDate(order.createdAt)}</td>
                  <td className={styles.price}>${order.totalOrderPrice}</td>
                  <td className={styles.paymentMethod}>
                    <span className={styles.paymentBadge}>
                      {order.paymentMethodType === "card"
                        ? "💳 Card"
                        : "💵 Cash"}
                    </span>
                  </td>
                  <td>{getStatusBadge(order.isPaid, order.isDelivered)}</td>
                  <td className={styles.itemCount}>
                    {order.cartItems.length} items
                  </td>
                  <td>
                    <button
                      className={styles.viewBtn}
                      onClick={() => openModal(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Cart Items */}
      {isModalOpen && selectedOrder && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Order Details - #{selectedOrder.id}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Order Date:</span>
                  <span>{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Payment Method:</span>
                  <span>
                    {selectedOrder.paymentMethodType === "card"
                      ? "💳 Card"
                      : "💵 Cash"}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Status:</span>
                  <span>
                    {getStatusBadge(
                      selectedOrder.isPaid,
                      selectedOrder.isDelivered
                    )}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Total Price:</span>
                  <span className={styles.totalPrice}>
                    ${selectedOrder.totalOrderPrice}
                  </span>
                </div>
              </div>

              <div className={styles.itemsSection}>
                <h3>Order Items ({selectedOrder.cartItems.length})</h3>
                <div className={styles.itemsList}>
                  {selectedOrder.cartItems.map((item) => (
                    <div key={item._id} className={styles.itemCard}>
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemTitle}>
                          {item.product.title}
                        </h4>
                        <p className={styles.itemBrand}>
                          {item.product.brand.name}
                        </p>
                        <p className={styles.itemCategory}>
                          {item.product.category.name}
                        </p>
                        <div className={styles.itemMeta}>
                          <span className={styles.itemPrice}>
                            ${item.price}
                          </span>
                          <span className={styles.itemQuantity}>
                            Qty: {item.count}
                          </span>
                          <span className={styles.itemTotal}>
                            Total: ${item.price * item.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
