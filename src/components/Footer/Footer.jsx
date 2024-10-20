import React from 'react';
import styles from './footer.module.css'; // Import the CSS module

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerLinks}>
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/brands">Brands</a>
                    <a href="/carts">Carts</a>
                    <a href="/contact">Contact Us</a>
                </div>
                <div className={styles.socialMedia}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <div className={styles.footerText}>
                    <p>&copy; {new Date().getFullYear()} Team-4. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
