

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loaders/Loaders';
import styles from './Products.module.css';
import { userContext } from '../../context/userContext';
import { addToCart } from '../Services/cartService'; // Import the utility function


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const { isLogin } = useContext(userContext);
  const navigate = useNavigate();

  const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/products';
  const ADD_TO_CART_URL = 'https://ecommerce.routemisr.com/api/v1/cart';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!isLogin) {
      alert("You need to log in to add items to your cart.");
      return;
    }

    const token = localStorage.getItem('userToken');

    try {
      const response = await axios.post(ADD_TO_CART_URL, {
        productId: productId,
        quantity: 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Product added to cart:", response.data);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container my-5">
      {!isLoading ? (
        <div className={`d-flex flex-wrap ${styles.productGrid}`}>
          {products.slice(0, visibleCount).map((productInfo) => (
            <div className={`col-12 col-md-6 col-lg-4 ${styles.productCard}`} key={productInfo._id}>
              <img src={productInfo.imageCover} className={`w-100 ${styles.productImage}`} alt={productInfo.title} />
              <span className="text-info d-block">{productInfo.category.name}</span>
              <span className="d-block">{productInfo.title.split(' ').slice(0, 3).join(' ')}</span>
              <div className="d-flex justify-content-between my-2">
                <span>{productInfo.price} EGP</span>
                <span>{productInfo.ratingsQuantity}<i className="fas fa-star text-warning"></i></span>
              </div>
              <div className={styles.actionButtons}>
                <button 
                  className={`btn btn-primary ${styles.button}`} 
                  onClick={() => handleAddToCart(productInfo._id)}
                >
                  Add to Cart
                </button>
                <button 
                  className={`btn btn-info ${styles.button}`} 
                  onClick={() => handleViewDetails(productInfo._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
      {visibleCount < products.length && (
        <div className="text-center my-3">
          <button className="btn btn-primary" onClick={loadMoreProducts}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
