import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import '../styles/layout.css';

/**
 * Cart Page - Zomato Style
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
        <h1>Shopping Cart</h1>
        <p>
          {isEmpty
            ? 'Your cart is empty'
            : `${getCartItemCount()} item(s) in your cart`}
        </p>
      </div>

      {isEmpty ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Items in Cart</h2>
              <button onClick={handleClearCart} className="btn-clear-cart">
                CLEAR CART
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="summary-row">
              <span>Tax:</span>
              <span>₹0.00</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Total:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary btn-block"
            >
              PROCEED TO CHECKOUT
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary btn-block"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
