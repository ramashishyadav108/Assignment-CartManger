import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

/**
 * Product Routes
 * Handles all product-related API endpoints
 */

// GET all products & POST new product
router.route('/')
  .get(getProducts)      // GET /api/products
  .post(createProduct);  // POST /api/products

// GET, PUT, DELETE specific product by ID
router.route('/:id')
  .get(getProductById)   // GET /api/products/:id
  .put(updateProduct)    // PUT /api/products/:id
  .delete(deleteProduct); // DELETE /api/products/:id

export default router;
