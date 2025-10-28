import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  // Fetch all products from database
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  // Find product by MongoDB _id or productId
  const product = await Product.findOne({
    $or: [{ _id: req.params.id }, { productId: req.params.id }],
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Create new product (for testing/admin)
 * @route   POST /api/products
 * @access  Public (In production, this should be protected)
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { productId, name, price, description, image, category, stock } = req.body;

  // Validate required fields
  if (!productId || !name || !price || !description || !image) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check if product with same productId already exists
  const existingProduct = await Product.findOne({ productId });
  if (existingProduct) {
    res.status(400);
    throw new Error('Product with this ID already exists');
  }

  // Create new product
  const product = await Product.create({
    productId,
    name,
    price,
    description,
    image,
    category: category || 'General',
    stock: stock || 100,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Public (In production, this should be protected)
 */
export const updateProduct = asyncHandler(async (req, res) => {
  // Find and update product
  const product = await Product.findOneAndUpdate(
    { $or: [{ _id: req.params.id }, { productId: req.params.id }] },
    req.body,
    {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    }
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Public (In production, this should be protected)
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({
    $or: [{ _id: req.params.id }, { productId: req.params.id }],
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({
    success: true,
    message: 'Product removed',
    data: {},
  });
});
