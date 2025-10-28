import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import ProductQuickView from '../components/ProductQuickView';
import '../styles/layout.css';

/**
 * Wishlist Page
 * Displays all saved favorite products
 */
const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleMoveToCart = async (product) => {
    try {
      const quantity = quantities[product.productId] || 1;
      await addToCart(product.productId, quantity);
      removeFromWishlist(product.productId);
      showToast('Moved to cart!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    showToast('Removed from wishlist', 'info');
  };

  const updateQuantity = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">❤️</div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite products to buy them later!</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>My Wishlist</h1>
          <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.productId} className="wishlist-card">
            <button
              className="wishlist-remove-btn"
              onClick={() => handleRemove(product.productId)}
              title="Remove from wishlist"
            >
              ✕
            </button>

            <button
              className="wishlist-quick-view-btn"
              onClick={() => setSelectedProduct(product)}
              title="Quick View"
            >
              👁️
            </button>
            
            <div className="wishlist-image" onClick={() => setSelectedProduct(product)}>
              <img src={product.image} alt={product.name} />
            </div>

            <div className="wishlist-info">
              <h3>{product.name}</h3>
              <p className="wishlist-category">{product.category}</p>
              <p className="wishlist-price">₹{product.price.toFixed(2)}</p>
              
              <div className="wishlist-stock">
                {product.stock > 0 ? (
                  <span className="in-stock">In Stock: {product.stock}</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>

              <div className="wishlist-actions">
                <div className="quantity-selector-small">
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.productId,
                        (quantities[product.productId] || 1) - 1
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantities[product.productId] || 1}
                    onChange={(e) =>
                      updateQuantity(product.productId, e.target.value)
                    }
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.productId,
                        (quantities[product.productId] || 1) + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary btn-move-to-cart"
                  onClick={() => handleMoveToCart(product)}
                  disabled={product.stock === 0}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default WishlistPage;
