// ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    // Replace 'userLoggedIn' with a check for the 'token' cookie
    const token = Cookies.get('token');

    React.useEffect(() => {
        // Redirect to login if token is not present
        if (!token) {
            window.location.href = '/login';
        }
    }, [location, token]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default ProtectedRoute;
