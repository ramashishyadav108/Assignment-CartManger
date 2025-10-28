import api from './api';

/**
 * Cart Service
 * Handles all cart-related API calls
 */

// Session ID for cart (in a real app, this could be from user auth or browser storage)
const SESSION_ID = 'default-session';

/**
 * Get current cart
 * @returns {Promise<Object>} Cart object with items and totals
 */
export const getCart = async () => {
  try {
    const response = await api.get('/cart', {
      params: { sessionId: SESSION_ID },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Add item to cart
 * @param {number} productId - Product ID
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {Promise<Object>} Updated cart
 */
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart', {
      productId,
      quantity,
      sessionId: SESSION_ID,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update cart item quantity
 * @param {string} itemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart
 */
export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${itemId}`, {
      quantity,
      sessionId: SESSION_ID,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Remove item from cart
 * @param {string} itemId - Cart item ID
 * @returns {Promise<Object>} Updated cart
 */
export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`, {
      params: { sessionId: SESSION_ID },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Clear entire cart
 * @returns {Promise<Object>} Empty cart
 */
export const clearCart = async () => {
  try {
    const response = await api.delete('/cart', {
      params: { sessionId: SESSION_ID },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
