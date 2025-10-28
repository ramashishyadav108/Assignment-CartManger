/**
 * Generate Random Products using Faker
 * Creates realistic product data for the e-commerce store
 */

import { faker } from '@faker-js/faker';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports & Fitness',
  'Books',
  'Toys & Games',
  'Beauty & Personal Care',
  'Automotive',
  'Office Supplies',
  'Health & Wellness'
];

/**
 * Generate a single random product
 */
const generateProduct = (id) => {
  const category = faker.helpers.arrayElement(categories);
  const productName = faker.commerce.productName();
  
  // Generate better product images based on category
  const imageUrls = {
    'Electronics': [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', // Headphones
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', // Watch
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop', // Camera
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', // Phone
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', // Laptop
    ],
    'Clothing': [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', // T-Shirt
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=400&fit=crop', // Jeans
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', // Shoes
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop', // Dress
    ],
    'Home & Kitchen': [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop', // Kitchen
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop', // Decor
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', // Coffee Maker
    ],
    'Sports & Fitness': [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', // Gym
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', // Yoga
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop', // Running
    ],
    'Books': [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', // Book
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop', // Books
    ],
  };
  
  // Get images for category or use generic
  const categoryImages = imageUrls[category] || [
    `https://source.unsplash.com/400x400/?product,${category.toLowerCase().replace(/\s+/g, '-')}`
  ];
  
  const image = faker.helpers.arrayElement(categoryImages);
  
  return {
    productId: id,
    name: productName,
    price: parseFloat(faker.commerce.price({ min: 99, max: 9999, dec: 2 })),
    description: faker.commerce.productDescription(),
    image: image,
    category: category,
    stock: faker.number.int({ min: 0, max: 100 })
  };
};

/**
 * Generate multiple random products
 */
export const generateRandomProducts = (count = 20) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push(generateProduct(i));
  }
  return products;
};

/**
 * Generate sample products with realistic Indian product names
 */
export const generateIndianProducts = () => {
  return [
    {
      productId: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 2999.99,
      description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      category: 'Electronics',
      stock: 50,
    },
    {
      productId: 2,
      name: 'Smart Fitness Watch',
      price: 7999.99,
      description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and smartphone notifications.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      category: 'Electronics',
      stock: 30,
    },
    {
      productId: 3,
      name: 'Ergonomic Office Chair',
      price: 12499.99,
      description: 'Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Ideal for long working hours.',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
      category: 'Furniture',
      stock: 20,
    },
    {
      productId: 4,
      name: 'Stainless Steel Water Bottle',
      price: 599.99,
      description: 'Eco-friendly insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      category: 'Home & Kitchen',
      stock: 100,
    },
    {
      productId: 5,
      name: 'Portable Laptop Stand',
      price: 1499.99,
      description: 'Adjustable aluminum laptop stand improves posture and cooling. Compatible with all laptop sizes, foldable for easy transport.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      category: 'Electronics',
      stock: 45,
    },
    {
      productId: 6,
      name: 'Organic Cotton T-Shirt',
      price: 899.99,
      description: 'Soft, breathable organic cotton t-shirt. Sustainable and comfortable for everyday wear. Available in multiple colors.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      category: 'Clothing',
      stock: 80,
    },
    {
      productId: 7,
      name: 'LED Desk Lamp',
      price: 1699.99,
      description: 'Modern LED desk lamp with adjustable brightness levels and color temperature. USB charging port included. Energy-efficient design.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
      category: 'Office Supplies',
      stock: 60,
    },
    {
      productId: 8,
      name: 'Yoga Mat with Carrying Strap',
      price: 1299.99,
      description: 'Non-slip yoga mat with extra cushioning for comfort. Eco-friendly material, easy to clean, includes carrying strap.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      category: 'Sports & Fitness',
      stock: 70,
    },
    {
      productId: 9,
      name: 'Wireless Mouse',
      price: 749.99,
      description: 'Ergonomic wireless mouse with silent clicks and precise tracking. Long battery life and universal compatibility.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      category: 'Electronics',
      stock: 90,
    },
    {
      productId: 10,
      name: 'Coffee Maker with Timer',
      price: 3499.99,
      description: 'Programmable coffee maker with 12-cup capacity. Features auto-brew timer, pause and serve, and keep-warm function.',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop',
      category: 'Home & Kitchen',
      stock: 35,
    },
  ];
};

// Export random products by default
export const sampleProducts = generateRandomProducts(20);
