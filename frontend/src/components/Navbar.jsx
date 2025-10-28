import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/components.css';

/**
 * Navbar Component - Enhanced Zomato Style
 * Navigation bar with cart and wishlist counters
 */
const Navbar = () => {
  const { getCartItemCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const cartItemCount = getCartItemCount();
  const wishlistCount = getWishlistCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛒 ShopMart
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              <span style={{ marginRight: '6px' }}>🛍️</span>
              Products
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="navbar-link wishlist-link">
              <span style={{ marginRight: '6px' }}>❤️</span>
              Wishlist
              {wishlistCount > 0 && (
                <span className="wishlist-badge">{wishlistCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link cart-link">
              <span style={{ marginRight: '6px' }}>🛒️</span>
              Cart
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
