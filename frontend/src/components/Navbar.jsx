import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/components.css';
import '../styles/enhanced-ui.css';

/**
 * Navbar Component
 * Navigation bar with links and cart badge
 */
const Navbar = () => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="navbar gradient-bg-animated">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '2rem', filter: 'brightness(0)', opacity: '0.8' }}>🛒</span> Mock E-Com
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link" style={{ color: 'white', fontSize: '1.05rem', fontWeight: '600' }}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/add-product" className="navbar-link" style={{ color: 'white', fontSize: '1.05rem', fontWeight: '600' }}>
              + Add Product
            </Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link cart-link" style={{ color: 'white', fontSize: '1.05rem', fontWeight: '600' }}>
              Cart
              {cartItemCount > 0 && (
                <span className="cart-badge badge badge-danger glow-danger">{cartItemCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
