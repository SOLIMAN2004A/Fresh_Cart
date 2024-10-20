


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loader from '../Loaders/Loaders'; // Import your Loader component
import { userContext } from '../../context/userContext'; // Import user context
import styles from './Orders.module.css'; // Import CSS module for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLogin } = useContext(userContext); // Get user login status from context
  const [visibleCount, setVisibleCount] = useState(6); // Track number of visible orders

  const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/orders/';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isLogin) {
        setError('You need to log in to view your orders.');
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('userToken'); // Get the token from local storage

      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data && response.data.data.length > 0) {
          setOrders(response.data.data); // Set orders
        } else {
          setError('No orders found.');
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders. Please try again.');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isLogin]);

  const loadMoreOrders = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase visible count by 6
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.ordersContainer}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <div className={styles.ordersList}>
          {orders.slice(0, visibleCount).map((order) => (
            <div className={styles.orderCard} key={order._id}>
              <h3 style={{ color: 'blue' }}>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <h4>Items:</h4>
              {order.products && order.products.length > 0 ? (
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.title} - Quantity: {product.quantity} - Price: {product.price} EGP
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in this order.</p>
              )}
              <h4>Total: {order.totalPrice} EGP</h4>
            </div>
          ))}
        </div>
      )}
      {visibleCount < orders.length && ( // Show button only if there are more orders to load
        <div className="text-center my-4">
          <button className="btn btn-primary" onClick={loadMoreOrders}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
