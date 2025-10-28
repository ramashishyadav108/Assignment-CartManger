import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

/**
 * Cart Routes
 * Handles all shopping cart-related API endpoints
 */

// GET cart & POST to add items & DELETE to clear cart
router.route('/')
  .get(getCart)       // GET /api/cart
  .post(addToCart)    // POST /api/cart
  .delete(clearCart); // DELETE /api/cart

// PUT to update item quantity & DELETE to remove item
router.route('/:itemId')
  .put(updateCartItem)    // PUT /api/cart/:itemId
  .delete(removeFromCart); // DELETE /api/cart/:itemId

export default router;
