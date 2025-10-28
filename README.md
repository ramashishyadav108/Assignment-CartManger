# Mock E-Com Cart

A full-stack MERN (MongoDB, Express, React, Node.js) shopping cart application for a coding assignment.

## 📋 Project Overview

This is a simple e-commerce shopping cart application that allows users to:
- Browse products with search and category filters
- Add/remove products to/from cart
- Update product quantities in cart
- View cart totals
- Complete a mock checkout (no real payment processing)

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Context API** - State management
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
mock-ecom-cart/
├── README.md
├── package.json
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── checkoutRoutes.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── checkoutController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── asyncHandler.js
│   └── utils/
│       ├── sampleData.js
│       └── seedProducts.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── App.css
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProductCard.jsx
        │   ├── CartItem.jsx
        │   ├── ReceiptModal.jsx
        │   └── Loader.jsx
        ├── pages/
        │   ├── ProductsPage.jsx
        │   ├── CartPage.jsx
        │   └── CheckoutPage.jsx
        ├── context/
        │   └── CartContext.jsx
        ├── services/
        │   ├── api.js
        │   ├── productService.js
        │   ├── cartService.js
        │   └── checkoutService.js
        └── styles/
            ├── components.css
            └── layout.css
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mock-ecom-cart
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   
   Or install manually:
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Setup Backend Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update the `.env` file with your MongoDB connection string:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mock-ecom-cart
   # For MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mock-ecom-cart
   ```

4. **Setup Frontend Environment Variables**
   
   Create a `.env` file in the `frontend` directory:
   ```bash
   cd frontend
   cp .env.example .env
   ```
   
   The default configuration should work:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. **Seed the Database**
   
   Populate the database with sample products:
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

#### Option 1: Run Both Frontend and Backend Together

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:5173`

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout
- `GET /api/checkout/:orderId` - Get order details

## 📝 API Usage Examples

### Add Item to Cart
```javascript
POST /api/cart
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2,
  "sessionId": "default-session"
}
```

### Process Checkout
```javascript
POST /api/checkout
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "sessionId": "default-session"
}
```

## ✨ Features

### Backend Features
- ✅ RESTful API architecture
- ✅ MongoDB data persistence
- ✅ Input validation and error handling
- ✅ Modular route organization
- ✅ Async error handling
- ✅ CORS enabled
- ✅ Sample data seeding

### Frontend Features
- ✅ Responsive design (mobile-friendly)
- ✅ Product browsing with search and filters
- ✅ Shopping cart management
- ✅ Real-time cart updates
- ✅ Mock checkout process
- ✅ Order receipt modal
- ✅ Loading states and error handling
- ✅ Global state management with Context API

## 🎨 UI Features

- Modern gradient design
- Responsive grid layout for products
- Category filters
- Search functionality
- Cart badge showing item count
- Quantity selectors
- Real-time price calculations
- Receipt modal with order summary

## 🔄 State Management

The application uses **React Context API** for global state management:
- `CartContext` - Manages cart state and operations
- Provides cart operations to all components
- Automatic cart synchronization with backend

## 🛡️ Error Handling

### Backend
- Centralized error handler middleware
- Mongoose validation errors
- Custom error messages
- Proper HTTP status codes

### Frontend
- Try-catch blocks for async operations
- User-friendly error messages
- Loading states for better UX
- Axios interceptors for global error handling

## 📦 Database Schema

### Product Schema
```javascript
{
  productId: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number,
  timestamps: true
}
```

### Cart Schema
```javascript
{
  sessionId: String,
  items: [{
    product: ObjectId,
    productId: Number,
    name: String,
    price: Number,
    image: String,
    quantity: Number
  }],
  totalPrice: Number,
  totalItems: Number,
  timestamps: true
}
```

## 🧪 Testing the Application

1. **Browse Products** - Visit the homepage to see all products
2. **Search Products** - Use the search bar to find specific items
3. **Filter by Category** - Click category buttons to filter products
4. **Add to Cart** - Select quantity and click "Add to Cart"
5. **View Cart** - Click cart icon in navbar to view cart
6. **Update Quantity** - Use +/- buttons to change quantities
7. **Remove Items** - Click trash icon to remove items
8. **Checkout** - Fill in name and email, then submit
9. **View Receipt** - See order confirmation modal

## 🚧 Future Enhancements (Optional)

- User authentication and authorization
- User profiles and order history
- Real payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management
- Email notifications
- Advanced search and filtering
- Product recommendations

## 📄 License

This project is created for educational purposes as part of a coding assignment.

## 👤 Author

Your Name - [Your Email]

## 🙏 Acknowledgments

- Sample product data from [Fake Store API](https://fakestoreapi.com/)
- Product images from various sources
- Built with MERN stack

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify environment variables are set correctly
4. Make sure all dependencies are installed

**Happy Coding! 🎉**
