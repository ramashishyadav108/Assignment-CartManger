import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/components.css';
import '../styles/enhanced-ui.css';

/**
 * Cart Item Component
 * Displays individual item in the cart with update/remove functionality
 */
const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle quantity update
   */
  const handleUpdateQuantity = async (newQuantity) => {
    // If quantity is 0 or less, remove the item
    if (newQuantity < 1) {
      await handleRemove();
      return;
    }

    try {
      setIsUpdating(true);
      setError('');
      await updateCartItem(item._id, newQuantity);
      setQuantity(newQuantity);
    } catch (err) {
      setError(err.message);
      // Revert to previous quantity on error
      setQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Handle remove from cart
   */
  const handleRemove = async () => {
    try {
      setIsUpdating(true);
      setError('');
      await removeFromCart(item._id);
    } catch (err) {
      setError(err.message);
      setIsUpdating(false);
    }
  };

  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item glassmorphism shadow-colorful-md animated-border-wrapper">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name gradient-text-primary">{item.name}</h3>
        <p className="cart-item-price gradient-text-accent">₹{item.price.toFixed(2)} each</p>
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={() => handleUpdateQuantity(quantity - 1)}
          className="quantity-btn btn-secondary neon-btn neon-btn-ghost"
          disabled={isUpdating}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const newQty = parseInt(e.target.value) || 1;
            setQuantity(newQty);
          }}
          onBlur={() => handleUpdateQuantity(quantity)}
          className="quantity-input floating-input"
          min="1"
          disabled={isUpdating}
        />
        <button
          onClick={() => handleUpdateQuantity(quantity + 1)}
          className="quantity-btn btn-secondary neon-btn neon-btn-ghost"
          disabled={isUpdating}
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-amount gradient-text-success">₹{subtotal}</span>
      </div>

      <button
        onClick={handleRemove}
        className="remove-btn"
        disabled={isUpdating}
        title="Remove from cart"
        style={{
          background: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '40px',
          minHeight: '40px',
          boxShadow: '0 0 15px rgba(238, 9, 121, 0.5)'
        }}
      >
        🗑️
      </button>

      {error && <p className="cart-item-error badge badge-danger">{error}</p>}
    </div>
  );
};

export default CartItem;
