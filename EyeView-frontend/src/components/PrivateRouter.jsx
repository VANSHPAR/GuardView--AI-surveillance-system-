import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRouter = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRouter
