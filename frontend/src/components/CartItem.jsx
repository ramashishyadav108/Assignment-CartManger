import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/components.css';

/**
 * Cart Item Component - Zomato Style
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
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={() => handleUpdateQuantity(quantity - 1)}
          className="quantity-btn"
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
          className="quantity-input"
          min="1"
          disabled={isUpdating}
        />
        <button
          onClick={() => handleUpdateQuantity(quantity + 1)}
          className="quantity-btn"
          disabled={isUpdating}
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal</span>
        <span className="subtotal-amount">₹{subtotal}</span>
      </div>

      <button
        onClick={handleRemove}
        className="remove-btn-cart"
        disabled={isUpdating}
        title="Remove from cart"
      >
        ✕
      </button>

      {error && <p className="cart-item-error">{error}</p>}
    </div>
  );
};

export default CartItem;
