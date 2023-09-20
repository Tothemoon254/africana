import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return  <Navigate replace to="/signin" />
  }
  return children;
};

export default ProtectedRoute;