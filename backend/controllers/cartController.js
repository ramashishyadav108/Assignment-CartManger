import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @desc    Get cart items
 * @route   GET /api/cart
 * @access  Public
 */
export const getCart = asyncHandler(async (req, res) => {
  // Get session ID from query or use default
  const sessionId = req.query.sessionId || 'default-session';

  // Find or create cart for this session
  let cart = await Cart.findOne({ sessionId }).populate('items.product');

  if (!cart) {
    // Create new empty cart if none exists
    cart = await Cart.create({ sessionId, items: [] });
  }

  res.status(200).json({
    success: true,
    data: {
      cart,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
    },
  });
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Public
 */
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, sessionId = 'default-session' } = req.body;

  // Validate input
  if (!productId) {
    res.status(400);
    throw new Error('Product ID is required');
  }

  if (quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  // Find the product by productId (not MongoDB _id)
  const product = await Product.findOne({ productId });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if enough stock is available
  if (product.stock < quantity) {
    res.status(400);
    throw new Error(`Only ${product.stock} items available in stock`);
  }

  // Find or create cart
  let cart = await Cart.findOne({ sessionId });

  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if product already in cart
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;
    
    // Check stock availability for new quantity
    if (product.stock < newQuantity) {
      res.status(400);
      throw new Error(`Only ${product.stock} items available in stock`);
    }
    
    cart.items[existingItemIndex].quantity = newQuantity;
  } else {
    // Add new item to cart
    cart.items.push({
      product: product._id,
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  }

  // Save cart (pre-save middleware will calculate totals)
  await cart.save();

  // Populate product details before sending response
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    data: {
      cart,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
    },
  });
});

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:itemId
 * @access  Public
 */
export const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity, sessionId = 'default-session' } = req.body;

  // Validate quantity
  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  // Find cart
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find item in cart
  const item = cart.items.id(itemId);

  if (!item) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Check stock availability
  const product = await Product.findOne({ productId: item.productId });
  if (product && product.stock < quantity) {
    res.status(400);
    throw new Error(`Only ${product.stock} items available in stock`);
  }

  // Update quantity
  item.quantity = quantity;

  // Save cart
  await cart.save();
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    message: 'Cart updated',
    data: {
      cart,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
    },
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Public
 */
export const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const sessionId = req.query.sessionId || 'default-session';

  // Find cart
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find item index
  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Remove item from cart
  cart.items.splice(itemIndex, 1);

  // Save cart
  await cart.save();
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: {
      cart,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
    },
  });
});

/**
 * @desc    Clear entire cart
 * @route   DELETE /api/cart
 * @access  Public
 */
export const clearCart = asyncHandler(async (req, res) => {
  const sessionId = req.query.sessionId || 'default-session';

  // Find cart and clear items
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
    data: {
      cart,
      totalItems: 0,
      totalPrice: 0,
    },
  });
});
