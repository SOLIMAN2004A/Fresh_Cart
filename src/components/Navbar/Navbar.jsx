
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import img from '../../assets/images/freshcart.png';
import styles from './Navbar.module.css'; // Import the CSS module

export default function Navbar() {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(userContext);

  function logOut() {
    localStorage.removeItem('userToken');
    setLogin(null); // Modify isLogin from token to null
    navigate('/login');
  }

  return (
    <nav className='bg-dark-subtle px-3 shadow-sm'>
      <div className='d-flex flex-column flex-lg-row justify-content-between'>
        <div className='logo d-flex flex-column flex-lg-row'>
          <img src={img} width='50' alt='logo' />
          {isLogin ? (
            <ul className='d-flex flex-column flex-lg-row list-unstyled p-3'>
              <li><NavLink to={''} className='text-decoration-none p-2'>Home</NavLink></li>
              <li><NavLink to={'carts'} className='text-decoration-none p-2'>Carts</NavLink></li>
              <li><NavLink to={'brands'} className='text-decoration-none p-2'>Brands</NavLink></li>
              <li><NavLink to={'orders'} className='text-decoration-none p-2'>Orders</NavLink></li>
              <li><NavLink to={'add-product'} className='text-decoration-none p-2'>Add Product</NavLink></li> {/* Add Product link */}
            </ul>
          ) : null}
        </div>

        <div className={styles.social}>
          <ul className='d-flex flex-column flex-lg-row p-3 list-unstyled align-items-center'>
            {!isLogin ? (
              <>
                <li><NavLink to={'register'} className='text-decoration-none p-2'>Register</NavLink></li>
                <li><NavLink to={'login'} className='text-decoration-none p-2'>Login</NavLink></li>
              </>
            ) : (
              <li className={styles.logout} onClick={logOut}>Logout</li>
            )}
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
