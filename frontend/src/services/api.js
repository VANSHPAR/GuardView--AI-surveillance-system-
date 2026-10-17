import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle unauthorized / expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      // If unauthorized on protected route, redirect to login if not already there
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/signup') && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  getAnalytics: () => api.get('/auth/analytics'),
};

export const surveillanceAPI = {
  getAlerts: () => api.get('/alerts'),
  getHistoryClips: () => api.get('/history_clips'),
  setDetectionMode: (mode) => api.post('/set-detection-mode', { mode }),
  getVideoFeedUrl: () => `${API_BASE_URL}/video_feed`,
  getClipUrl: (filename) => `${API_BASE_URL}/history_clips/${filename}`,
  getThumbnailUrl: (filename) => `${API_BASE_URL}/thumbnails/${filename}`,
};

export default api;
