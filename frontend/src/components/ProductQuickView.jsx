import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import StarRating from './StarRating';
import '../styles/components.css';

/**
 * Product Quick View Modal
 * Shows product details in a modal without navigation
 */
const ProductQuickView = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  // Sample images (in real app, product would have multiple images)
  const images = [product.image];

  const inWishlist = isInWishlist(product.productId);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product);
    showToast(
      added ? 'Added to wishlist!' : 'Removed from wishlist',
      added ? 'success' : 'info'
    );
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="quick-view-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="quick-view-content">
          {/* Image Section */}
          <div className="quick-view-images">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="quick-view-info">
            <div className="quick-view-header">
              <div>
                <span className="product-category-badge">{product.category}</span>
                <h2>{product.name}</h2>
                <StarRating rating={product.rating || 4.5} reviews={product.reviews || 128} />
              </div>
            </div>

            <div className="quick-view-price">
              <span className="price-current">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="price-original">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="price-discount">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="quick-view-stock">
              {product.stock > 0 ? (
                <>
                  <span className="stock-badge in-stock">✓ In Stock</span>
                  <span className="stock-count">
                    {product.stock} {product.stock === 1 ? 'unit' : 'units'} available
                  </span>
                </>
              ) : (
                <span className="stock-badge out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="quick-view-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="quick-view-actions">
              <div className="quantity-selector-large">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isAdding}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))
                    }
                    min="1"
                    max={product.stock}
                    disabled={isAdding}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={isAdding}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="quick-view-buttons">
                <button
                  className="btn btn-primary btn-add-to-cart-large"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                >
                  {isAdding ? 'Adding...' : '🛒 Add to Cart'}
                </button>
                <button
                  className={`btn btn-wishlist ${inWishlist ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {inWishlist ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
