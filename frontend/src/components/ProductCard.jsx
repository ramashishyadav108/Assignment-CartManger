import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/components.css';
import '../styles/enhanced-ui.css';

/**
 * Product Card Component
 * Displays individual product with add to cart functionality
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  /**
   * Handle add to cart
   */
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setMessage('');
      await addToCart(product.productId, quantity);
      setMessage('✓ Added to cart!');
      setQuantity(1);
      
      // Clear success message after 2 seconds
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage(`✗ ${error.message}`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card card-3d-hover glassmorphism shadow-colorful-lg">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="animated-border"></div>
      </div>

      <div className="product-info">
        <h3 className="product-name gradient-text-primary">{product.name}</h3>
        <p className="product-category badge badge-primary">{product.category}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price gradient-text-accent">₹{product.price.toFixed(2)}</span>
          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock badge badge-success glow-success">In Stock: {product.stock}</span>
            ) : (
              <span className="out-of-stock badge badge-danger">Out of Stock</span>
            )}
          </div>
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="quantity-btn btn-secondary"
              disabled={isAdding}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="quantity-input"
              min="1"
              max={product.stock}
              disabled={isAdding}
            />
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="quantity-btn btn-secondary"
              disabled={isAdding}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn neon-btn neon-btn-primary"
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>

        {message && (
          <p className={`product-message ${message.includes('✓') ? 'success gradient-text-success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
