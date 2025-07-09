import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthProvider';

const UserProtectedRoute = ({ children }) => {
    const { user, role } = useAuth();

    // Only allow if logged in and role is user
    if (!user || role !== "user") {
        return <Navigate to="/user/login" replace />;
    }
    return children;
};

export default UserProtectedRoute;