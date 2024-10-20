/*import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Contact.module.css'; // Import CSS module for styling
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form Submitted:', values);
      alert('Your message has been sent!');
      resetForm();
    }
  });

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? styles.errorInput : ''}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? styles.errorInput : ''}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={formik.touched.message && formik.errors.message ? styles.errorInput : ''}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <div className={styles.error}>{formik.errors.message}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Social Media Links *//*}
      <div className={styles.socialMediaContainer}>
        <h3>Follow Us</h3>
        <div className={styles.socialMediaLinks}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;*/

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Contact.module.css'; // Import CSS module for styling
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons

const Contact = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form Submitted:', values);
      setSuccessMessage('Your message has been sent!'); // Set success message
      resetForm();
    }
  });

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? styles.errorInput : ''}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? styles.errorInput : ''}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={formik.touched.message && formik.errors.message ? styles.errorInput : ''}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <div className={styles.error}>{formik.errors.message}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Success Message */}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      {/* Social Media Links */}
      <div className={styles.socialMediaContainer}>
        <h3>Follow Us</h3>
        <div className={styles.socialMediaLinks}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

