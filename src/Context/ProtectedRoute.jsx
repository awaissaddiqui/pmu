import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthProvider'; // Ensure you have this hook

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
