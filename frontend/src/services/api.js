import axios from 'axios';

/**
 * Axios Instance Configuration
 * Base configuration for all API requests
 */

// Get base URL from environment variable or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request Interceptor
 * Can be used to add auth tokens, logging, etc.
 */
api.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    // Example: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle responses and errors globally
 */
api.interceptors.response.use(
  (response) => {
    // Return the data directly if request was successful
    return response.data;
  },
  (error) => {
    // Handle errors globally
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('API Error:', message);
    }

    // Return a rejected promise with the error message
    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
