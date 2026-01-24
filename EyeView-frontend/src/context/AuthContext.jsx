import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('access_token');
    if (token) {
      // Validate token by fetching profile
      axios.get('http://localhost:5000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('access_token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const signup = async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        email,
        password,
        firstName,
        lastName
      });

      const { access_token, user: userData } = response.data;
      localStorage.setItem('access_token', access_token);
      setUser(userData);
      toast.success('Account created successfully!');
      return userData;
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      const { access_token, user: userData } = response.data;
      localStorage.setItem('access_token', access_token);
      setUser(userData);
      toast.success('Logged in successfully!');
      return userData;
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('access_token');
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed');
      throw error;
    }
  };

  const value = {
    user,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};