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
  
  return {
    productId: id,
    name: productName,
    price: parseFloat(faker.commerce.price({ min: 99, max: 9999, dec: 2 })),
    description: faker.commerce.productDescription(),
    image: `https://picsum.photos/400/400?random=${id}`,
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
      image: 'https://picsum.photos/400/400?random=1',
      category: 'Electronics',
      stock: 50,
    },
    {
      productId: 2,
      name: 'Smart Fitness Watch',
      price: 7999.99,
      description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and smartphone notifications.',
      image: 'https://picsum.photos/400/400?random=2',
      category: 'Electronics',
      stock: 30,
    },
    {
      productId: 3,
      name: 'Ergonomic Office Chair',
      price: 12499.99,
      description: 'Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Ideal for long working hours.',
      image: 'https://picsum.photos/400/400?random=3',
      category: 'Furniture',
      stock: 20,
    },
    {
      productId: 4,
      name: 'Stainless Steel Water Bottle',
      price: 599.99,
      description: 'Eco-friendly insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.',
      image: 'https://picsum.photos/400/400?random=4',
      category: 'Home & Kitchen',
      stock: 100,
    },
    {
      productId: 5,
      name: 'Portable Laptop Stand',
      price: 1499.99,
      description: 'Adjustable aluminum laptop stand improves posture and cooling. Compatible with all laptop sizes, foldable for easy transport.',
      image: 'https://picsum.photos/400/400?random=5',
      category: 'Electronics',
      stock: 45,
    },
    {
      productId: 6,
      name: 'Organic Cotton T-Shirt',
      price: 899.99,
      description: 'Soft, breathable organic cotton t-shirt. Sustainable and comfortable for everyday wear. Available in multiple colors.',
      image: 'https://picsum.photos/400/400?random=6',
      category: 'Clothing',
      stock: 80,
    },
    {
      productId: 7,
      name: 'LED Desk Lamp',
      price: 1699.99,
      description: 'Modern LED desk lamp with adjustable brightness levels and color temperature. USB charging port included. Energy-efficient design.',
      image: 'https://picsum.photos/400/400?random=7',
      category: 'Office Supplies',
      stock: 60,
    },
    {
      productId: 8,
      name: 'Yoga Mat with Carrying Strap',
      price: 1299.99,
      description: 'Non-slip yoga mat with extra cushioning for comfort. Eco-friendly material, easy to clean, includes carrying strap.',
      image: 'https://picsum.photos/400/400?random=8',
      category: 'Sports & Fitness',
      stock: 70,
    },
    {
      productId: 9,
      name: 'Wireless Mouse',
      price: 749.99,
      description: 'Ergonomic wireless mouse with silent clicks and precise tracking. Long battery life and universal compatibility.',
      image: 'https://picsum.photos/400/400?random=9',
      category: 'Electronics',
      stock: 90,
    },
    {
      productId: 10,
      name: 'Coffee Maker with Timer',
      price: 3499.99,
      description: 'Programmable coffee maker with 12-cup capacity. Features auto-brew timer, pause and serve, and keep-warm function.',
      image: 'https://picsum.photos/400/400?random=10',
      category: 'Home & Kitchen',
      stock: 35,
    },
  ];
};

// Export random products by default
export const sampleProducts = generateRandomProducts(20);
