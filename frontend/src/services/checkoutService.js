import api from './api';

/**
 * Checkout Service
 * Handles checkout and order-related API calls
 */

// Session ID (same as cart service)
const SESSION_ID = 'default-session';

/**
 * Process checkout
 * @param {Object} customerData - Customer information { name, email }
 * @returns {Promise<Object>} Order receipt
 */
export const processCheckout = async (customerData) => {
  try {
    const response = await api.post('/checkout', {
      ...customerData,
      sessionId: SESSION_ID,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get order details by order ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/checkout/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
