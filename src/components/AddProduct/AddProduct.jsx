import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from '../../context/userContext';

import styles from './AddProduct.module.css'; // Optional: Create a CSS module for styling

const AddProduct = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Use a formik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      imageUrl: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().required('Price is required').positive('Price must be a positive number'),
      imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token

        // Allow adding products regardless of logged-in status
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/products', values, {
          headers: { Authorization: `Bearer ${token}` }, // Use Bearer token for authentication
        });

        if (response.data.success) {
          setSuccess("Product added successfully!");
          formik.resetForm(); // Reset form after successful submission
        } else {
          setError("Failed to add product.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to add product.");
      }
    },
  });

  return (
    <div className={styles.addProductContainer}>
      <h1>Add New Product</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps('title')}
            className={styles.input}
          />
          {formik.touched.title && formik.errors.title && (
            <div className={styles.error}>{formik.errors.title}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            {...formik.getFieldProps('description')}
            className={styles.textarea}
          />
          {formik.touched.description && formik.errors.description && (
            <div className={styles.error}>{formik.errors.description}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            {...formik.getFieldProps('price')}
            className={styles.input}
          />
          {formik.touched.price && formik.errors.price && (
            <div className={styles.error}>{formik.errors.price}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            type="text"
            {...formik.getFieldProps('imageUrl')}
            className={styles.input}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <div className={styles.error}>{formik.errors.imageUrl}</div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>Add Product</button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
    </div>
  );
};

export default AddProduct;
