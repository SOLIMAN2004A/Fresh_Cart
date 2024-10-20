import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../context/userContext';

const ProtectedRoutes = ({ children }) => {
    const { isLogin } = useContext(userContext);

    return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes; // Ensure this line is present
