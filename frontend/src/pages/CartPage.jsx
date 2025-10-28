import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import '../styles/layout.css';
import '../styles/enhanced-ui.css';

/**
 * Cart Page
 * Displays cart items and allows users to proceed to checkout
 */
const CartPage = () => {
  const navigate = useNavigate();
  const { cart, loading, clearCart, getCartTotal, getCartItemCount } = useCart();

  /**
   * Handle clear cart
   */
  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (error) {
        alert(`Error clearing cart: ${error.message}`);
      }
    }
  };

  /**
   * Navigate to checkout
   */
  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading && !cart) {
    return <Loader message="Loading cart..." />;
  }

  const cartItems = cart?.items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="gradient-text-primary">Shopping Cart</h1>
        <p className="gradient-text-secondary">
          {isEmpty
            ? 'Your cart is empty'
            : `${getCartItemCount()} item(s) in your cart`}
        </p>
      </div>

      {isEmpty ? (
        <div className="empty-cart glassmorphism shadow-colorful-lg">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="gradient-text-primary">Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate('/')} className="btn btn-primary neon-btn neon-btn-primary">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header glassmorphism">
              <h2 className="gradient-text-primary">Items in Cart</h2>
              <button onClick={handleClearCart} className="btn btn-secondary neon-btn neon-btn-danger">
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary glassmorphism shadow-colorful-lg animated-border-wrapper">
            <h2 className="gradient-text-accent">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="gradient-text-primary">₹{getCartTotal().toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span className="gradient-text-success">FREE</span>
            </div>

            <div className="summary-row">
              <span>Tax:</span>
              <span>₹0.00</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row summary-total">
              <span className="gradient-text-accent">Total:</span>
              <span className="gradient-text-accent" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{getCartTotal().toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary btn-block neon-btn neon-btn-primary"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary btn-block neon-btn neon-btn-ghost"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
