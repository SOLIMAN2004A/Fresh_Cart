// src/Services/cartService.js
import axios from 'axios';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/wishlist'; // or cart

export const addToCart = async (productId, token) => {
    try {
        const response = await axios.post(
            BASE_URL,
            { productId },
            { headers: { token } }
        );

        return response.data.success; // Check the structure of your API response
    } catch (error) {
        console.error("Error adding product to cart:", error);

        // Throw an error with a detailed message
        throw new Error(error.response?.data?.message || "Failed to add product to cart.");
    }
};
