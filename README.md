# 🛒 ShopMart - E-Commerce Cart Manager

A modern, full-stack MERN e-commerce application with a beautiful Zomato-inspired UI design. Built with React, Node.js, Express, and MongoDB.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🛍️ Shopping Experience
- **Product Browsing** - Grid view with search and category filters
- **Smart Cart Management** - Add, update, remove items with real-time updates
- **Wishlist System** - Save favorite products for later
- **Quick View Modal** - View product details without navigation
- **Star Ratings** - 5-star rating system with review counts
- **Stock Management** - Real-time stock availability display

### 🎨 User Interface
- **Zomato-Inspired Design** - Modern red theme with smooth animations
- **Toast Notifications** - Beautiful feedback for user actions
- **Responsive Layout** - Mobile-first design, works on all devices
- **Loading States** - Smooth loading animations
- **Empty States** - Beautiful placeholders for empty cart/wishlist

### 🔧 Technical Features
- **RESTful API** - Clean backend architecture
- **Context API** - Global state management (Cart, Wishlist, Toast)
- **LocalStorage** - Persistent wishlist across sessions
- **Error Handling** - Comprehensive error management
- **Faker.js** - Random product data generation

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Custom CSS** - Zomato theme styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Faker.js** - Test data generation
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Clone Repository
```bash
git clone https://github.com/ramashishyadav108/Assignment-CartManger.git
cd Assignment-CartManger
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Seed the database with sample products:
```bash
npm run seed
```

Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000
```

Start frontend development server:
```bash
npm run dev
```

## �️ Building for Production

Build the entire project for deployment:
```bash
npm run build
```

This will create optimized production builds:
- Frontend build in `frontend/dist/`
- Backend ready for production

Start production server:
```bash
npm run prod
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## �🎯 Usage

1. **Browse Products** - View all products on the home page
2. **Search & Filter** - Use search bar and category filters
3. **Add to Wishlist** - Click the heart icon (❤️) to save favorites
4. **Quick View** - Click eye icon (👁️) or product image for details
5. **Add to Cart** - Select quantity and click "Add to Cart"
6. **Manage Cart** - Update quantities or remove items
7. **Checkout** - Review order and complete purchase

## 📸 Screenshots

### Product Page
- Grid layout with product cards
- Star ratings and stock indicators
- Wishlist and quick view buttons

### Cart Page
- Full-width layout with item list
- Quantity controls and pricing
- Order summary sidebar

### Wishlist Page
- Saved products grid
- Move to cart functionality
- Quick view integration


## 📁 Project Structure

```
Assignment-CartManger/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Cart.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   ├── checkoutRoutes.js
│   │   └── productRoutes.js
│   ├── utils/
│   │   ├── generateProducts.js
│   │   ├── sampleData.js
│   │   └── seedProducts.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CartItem.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductQuickView.jsx
│   │   │   ├── ReceiptModal.jsx
│   │   │   ├── StarRating.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   ├── ToastContext.jsx
│   │   │   └── WishlistContext.jsx
│   │   ├── pages/
│   │   │   ├── AddProductPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   └── WishlistPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── cartService.js
│   │   │   ├── checkoutService.js
│   │   │   └── productService.js
│   │   ├── styles/
│   │   │   ├── AddProduct.css
│   │   │   ├── components.css
│   │   │   ├── enhanced-ui.css
│   │   │   └── layout.css
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout

## 🌟 Key Features Explained

### Toast Notification System
- Success, error, warning, and info types
- Auto-dismiss after 3 seconds
- Smooth slide-in/fade-out animations
- Stacked notifications support

### Wishlist Management
- LocalStorage persistence
- Heart icon on product cards
- Badge counter in navbar
- Move to cart functionality
- Quick view integration

### Product Quick View
- Modal with full product details
- Add to cart from modal
- Wishlist toggle
- Stock status display
- Smooth animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ramashish Yadav**
- GitHub: [@ramashishyadav108](https://github.com/ramashishyadav108)
- LinkedIn: [ramashish108](https://www.linkedin.com/in/ramashish108/)
- Email: ray09112004@gmail.com

## 🙏 Acknowledgments

- Design inspiration from Zomato
- Icons and emojis for better UX
- Unsplash for product images
- Faker.js for test data

## 📞 Support

For support, email ray09112004@gmail.com or create an issue in the repository.

---
