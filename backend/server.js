import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';

// ES module __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

/**
 * Serve Frontend in Production
 */
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend build
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Serve index.html for any other routes (SPA support)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  // Development mode - API info endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to ShopMart API',
      version: '1.0.0',
      environment: 'development',
      endpoints: {
        products: '/api/products',
        cart: '/api/cart',
        checkout: '/api/checkout',
      },
    });
  });
}

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
