import React from 'react';
import { Navigate, Redirect } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Redirect to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;