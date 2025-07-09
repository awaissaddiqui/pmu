import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthProvider'; // Ensure you have this hook

const ProtectedRoute = ({ children }) => {
    const { user, role } = useAuth();
    if (!user || role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
