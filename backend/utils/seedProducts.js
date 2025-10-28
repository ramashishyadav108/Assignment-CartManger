import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import { sampleProducts } from './generateProducts.js';

// Load environment variables
dotenv.config();

/**
 * Seed Products to Database
 * This script populates the database with random products using Faker
 * Run with: npm run seed
 */

const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products generated with Faker
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} random products seeded successfully using Faker`);

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding products: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
