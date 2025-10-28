import api from './api';

/**
 * Product Service
 * Handles all product-related API calls
 */

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of products
 */
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data; // Returns array of products
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new product (admin functionality)
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
