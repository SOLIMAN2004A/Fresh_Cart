

import React, { useEffect, useState } from 'react';
import Loader from '../Loaders/Loaders'; // Import your Loader component
import axios from 'axios';
import styles from './Brands.module.css'; // Import the CSS module

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Track number of visible brands

  const BASE_URL = 'https://ecommerce.routemisr.com'; // API base URL

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/brands`);
        setBrands(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch brand data');
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const loadMoreBrands = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase visible count by 6
  };

  if (isLoading) {
    return <Loader />; // Use the Loader component while loading
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.brandsContainer}>
      <div className="row">
        {brands.slice(0, visibleCount).map((brand) => (
          <div className="col-12 col-md-4 mb-4" key={brand._id}>
            <div className={styles.brandCard}>
              <h2 className={styles.brandName}>{brand.name}</h2>
              <img src={brand.image} alt={brand.name} className={styles.brandImage} />
              <p className={styles.brandDescription}>{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < brands.length && ( // Show button only if there are more brands to load
        <div className="text-center my-4">
          <button className="btn btn-primary" onClick={loadMoreBrands}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Brands;
