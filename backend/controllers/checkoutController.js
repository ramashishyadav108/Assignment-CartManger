import Cart from '../models/Cart.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @desc    Process checkout and create order receipt
 * @route   POST /api/checkout
 * @access  Public
 */
export const processCheckout = asyncHandler(async (req, res) => {
  const { sessionId = 'default-session', customerName, customerEmail } = req.body;

  // Validate customer information
  if (!customerName || !customerEmail) {
    res.status(400);
    throw new Error('Please provide customer name and email');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customerEmail)) {
    res.status(400);
    throw new Error('Please provide a valid email address');
  }

  // Find cart
  const cart = await Cart.findOne({ sessionId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  // Generate order ID (simple timestamp-based ID)
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Create order receipt
  const receipt = {
    orderId,
    customerName,
    customerEmail,
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    })),
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    timestamp: new Date().toISOString(),
    paymentStatus: 'Completed (Mock)',
    message: 'Thank you for your order! This is a mock checkout.',
  };

  // In a real application, you would:
  // 1. Create an Order document in the database
  // 2. Process payment through payment gateway
  // 3. Update product stock
  // 4. Send confirmation email
  // 5. Clear the cart

  // For this mock checkout, we'll just clear the cart
  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Checkout completed successfully',
    data: receipt,
  });
});

/**
 * @desc    Get order by ID (mock implementation)
 * @route   GET /api/checkout/:orderId
 * @access  Public
 */
export const getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  // In a real application, you would fetch this from an Orders collection
  // For now, we'll return a mock response
  res.status(200).json({
    success: true,
    message: 'In a real application, this would return order details',
    data: {
      orderId,
      note: 'Order tracking not implemented in mock version',
    },
  });
});
