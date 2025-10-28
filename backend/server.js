import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

/**
 * Middleware Configuration
 */

// Enable CORS for cross-origin requests (frontend on different port)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (optional, for development)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * API Routes
 */

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mock E-Com Cart API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      checkout: '/api/checkout',
    },
  });
});

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

/**
 * Error Handling Middleware
 * Must be placed after all routes
 */

// 404 handler for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
