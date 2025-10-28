import express from 'express';
import {
  processCheckout,
  getOrder,
} from '../controllers/checkoutController.js';

const router = express.Router();

/**
 * Checkout Routes
 * Handles checkout and order processing endpoints
 */

// POST to process checkout
router.post('/', processCheckout); // POST /api/checkout

// GET order details by ID
router.get('/:orderId', getOrder); // GET /api/checkout/:orderId

export default router;
