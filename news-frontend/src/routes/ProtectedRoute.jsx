// ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => { // Ensure children is destructured from props
    const location = useLocation();
    const isLoggedIn = Cookies.get('userLoggedIn');

    React.useEffect(() => {
        // This effect will run every time the location changes
        if (!isLoggedIn) {
            // If the cookie is not found, redirect to the login page
            window.location.href = '/login';
        }
    }, [location, isLoggedIn]); // Add isLoggedIn to the dependency array

    // If not logged in, render null or redirect
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, render the children components
    return children;
};

export default ProtectedRoute;
