import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ReceiptModal from '../components/ReceiptModal';
import Loader from '../components/Loader';
import { processCheckout } from '../services/checkoutService';
import '../styles/layout.css';

/**
 * Checkout Page
 * Handles customer information and order processing
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartItemCount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await processCheckout(formData);
      setReceipt(response);
    } catch (error) {
      alert(`Checkout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle modal close
   */
  const handleCloseReceipt = () => {
    setReceipt(null);
    navigate('/');
  };

  // Check if cart is empty
  const isEmpty = !cart || cart.items.length === 0;

  if (isEmpty) {
    return (
      <div className="page-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products before checkout</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loader message="Processing your order..." />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your order</p>
      </div>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cart.items.map((item) => (
              <div key={item._id} className="checkout-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="checkout-item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-totals">
            <div className="summary-row">
              <span>Items ({getCartItemCount()}):</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row summary-total">
              <strong>Total:</strong>
              <strong>₹{getCartTotal().toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form-container">
          <h2>Customer Information</h2>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="customerName">Full Name *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`form-input ${errors.customerName ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <span className="error-message">{errors.customerName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email Address *</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={`form-input ${errors.customerEmail ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.customerEmail && (
                <span className="error-message">{errors.customerEmail}</span>
              )}
            </div>

            <div className="form-info">
              <p>
                ℹ️ This is a mock checkout. No actual payment will be
                processed.
              </p>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-block">
                Complete Order
              </button>
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="btn btn-secondary btn-block"
              >
                Back to Cart
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
      )}
    </div>
  );
};

export default CheckoutPage;
