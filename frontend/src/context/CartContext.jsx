import { createContext, useContext, useState, useEffect } from 'react';
import * as cartService from '../services/cartService';

/**
 * Cart Context
 * Provides global cart state and operations throughout the application
 */

// Create context
const CartContext = createContext();

/**
 * Custom hook to use cart context
 * @returns {Object} Cart context value
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

/**
 * Cart Provider Component
 * Wraps the app and provides cart functionality
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch cart from API
   */
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.getCart();
      setCart(response.cart);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add item to cart
   * @param {number} productId - Product ID
   * @param {number} quantity - Quantity to add
   */
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.addToCart(productId, quantity);
      setCart(response.cart);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update cart item quantity
   * @param {string} itemId - Cart item ID
   * @param {number} quantity - New quantity
   */
  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.updateCartItem(itemId, quantity);
      setCart(response.cart);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update cart item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove item from cart
   * @param {string} itemId - Cart item ID
   */
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.removeFromCart(itemId);
      setCart(response.cart);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear entire cart
   */
  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.clearCart();
      setCart(response.cart);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get cart item count
   */
  const getCartItemCount = () => {
    return cart?.totalItems || 0;
  };

  /**
   * Get cart total price
   */
  const getCartTotal = () => {
    return cart?.totalPrice || 0;
  };

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Context value
  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartItemCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
