import mongoose from 'mongoose';

/**
 * Product Schema
 * Defines the structure of product documents in MongoDB
 */
const productSchema = new mongoose.Schema(
  {
    // Unique identifier from external API or custom ID
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    // Product name/title
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    // Product price in USD
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    // Product description
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    // URL to product image
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    // Product category
    category: {
      type: String,
      required: true,
    },
    // Available stock quantity
    stock: {
      type: Number,
      default: 100,
      min: [0, 'Stock cannot be negative'],
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
