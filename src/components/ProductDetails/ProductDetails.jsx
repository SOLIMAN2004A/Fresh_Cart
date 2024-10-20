

import React, { useEffect, useState } from 'react';
import Loader from '../Loaders/Loaders';
import styles from './ProductDetails.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../Services/cartService'; // Import the utility function

const ProductDetails = () => {
    const { ProductId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const BASE_URL = `https://ecommerce.routemisr.com/api/v1/products/${ProductId}`;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(BASE_URL);
                if (response.data.data) {
                    setProduct(response.data.data);
                } else {
                    setError("Product not found.");
                }
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err.response?.data?.message || "Product not found.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [BASE_URL]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert("You need to be logged in to add products to the cart.");
            navigate('/login');
            return;
        }

        try {
            const success = await addToCart(ProductId, token);
            if (success) {
                alert("Product added to cart!");
                navigate('/cart');
            } else {
                alert("Failed to add product to cart.");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.productDetailsContainer}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <img src={product.imageCover} alt={product.title} className={styles.productImage} />
            <p className={styles.productDescription}>{product.description}</p>
            <h3>Price: {product.price} EGP</h3>
            
            {/* Add to Cart Button */}
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;

