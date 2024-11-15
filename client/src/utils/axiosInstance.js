// src/utils/axiosInstance.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Set base URL from environment variable
  timeout: 10000, // Set a timeout of 10 seconds (optional)
});

// Add a request interceptor to include the token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage or context
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if successful
  (error) => {
    // Handle errors, such as unauthorized access (401)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login page if needed
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
