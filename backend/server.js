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

// CORS Configuration - Allow all origins
// app.use(cors({
//   origin: '*', // Allow all origins
//   credentials: false, // Must be false when origin is '*'
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
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

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

/**
 * Root Endpoint - API Info
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ShopMart API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    status: 'running',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      checkout: '/api/checkout',
    },
  });
});

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

// Only start server if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
export default app;
