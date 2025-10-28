import mongoose from 'mongoose';

/**
 * MongoDB Connection Configuration
 * Establishes connection to MongoDB database using Mongoose
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure code if connection fails
    process.exit(1);
  }
};

export default connectDB;
