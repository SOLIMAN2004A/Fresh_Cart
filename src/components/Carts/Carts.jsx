// Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loaders/Loaders';
import { addToCart } from '../Services/cartService'; // Import the addToCart function

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("You need to be logged in to add products to the cart.");
      return;
    }

    try {
      const success = await addToCart(productId, token);
      if (success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: {product.price} EGP</p>
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
