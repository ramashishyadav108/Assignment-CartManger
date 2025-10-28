import mongoose from 'mongoose';

/**
 * Cart Item Schema
 * Defines the structure of individual items in the shopping cart
 */
const cartItemSchema = new mongoose.Schema({
  // Reference to the Product model
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  // Product ID for easy access
  productId: {
    type: Number,
    required: true,
  },
  // Product name (denormalized for quick access)
  name: {
    type: String,
    required: true,
  },
  // Product price at the time of adding to cart
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  // Product image URL
  image: {
    type: String,
    required: true,
  },
  // Quantity of this product in cart
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
});

/**
 * Cart Schema
 * Represents a shopping cart (could be session-based or user-based)
 */
const cartSchema = new mongoose.Schema(
  {
    // Session ID or user identifier (for simplicity, using a session string)
    sessionId: {
      type: String,
      required: true,
      default: 'default-session',
    },
    // Array of cart items
    items: [cartItemSchema],
    // Total price of all items in cart
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Total number of items in cart
    totalItems: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Middleware to calculate totals before saving
 * Runs automatically before each save operation
 */
cartSchema.pre('save', function (next) {
  // Calculate total items
  this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calculate total price
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  // Round to 2 decimal places
  this.totalPrice = Math.round(this.totalPrice * 100) / 100;
  
  next();
});

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
