import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import StarRating from './StarRating';
import ProductQuickView from './ProductQuickView';
import '../styles/components.css';

/**
 * Product Card Component - Enhanced Zomato Style
 * Displays individual product with wishlist, quick view, and ratings
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const inWishlist = isInWishlist(product.productId);

  /**
   * Handle add to cart
   */
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.productId, quantity);
      showToast('Added to cart!', 'success');
      setQuantity(1);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsAdding(false);
    }
  };

  /**
   * Handle wishlist toggle
   */
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? 'Added to wishlist!' : 'Removed from wishlist',
      added ? 'success' : 'info'
    );
  };

  return (
    <>
      <div className="product-card">
        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>

        {/* Quick View Button */}
        <button
          className="quick-view-btn"
          onClick={() => setShowQuickView(true)}
          title="Quick View"
        >
          👁️
        </button>

        <div className="product-image-container" onClick={() => setShowQuickView(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <StarRating 
          rating={product.rating || 4.5} 
          reviews={product.reviews || Math.floor(Math.random() * 200) + 20}
          size="small"
          showCount={false}
        />
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock: {product.stock}</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="quantity-btn"
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
              className="quantity-btn"
              disabled={isAdding}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? 'Adding...' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>

    {/* Quick View Modal */}
    {showQuickView && (
      <ProductQuickView
        product={product}
        onClose={() => setShowQuickView(false)}
      />
    )}
    </>
  );
};

export default ProductCard;
