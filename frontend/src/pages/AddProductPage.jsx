import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';
import Loader from '../components/Loader';
import '../styles/AddProduct.css';

/**
 * Add Product Page Component
 * Allows users to add new products to the store
 */
function AddProductPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    stock: '100'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.productId || !formData.name || !formData.price || !formData.description || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }

    if (isNaN(formData.productId) || formData.productId <= 0) {
      setError('Product ID must be a positive number');
      return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      setError('Price must be a positive number');
      return;
    }

    if (isNaN(formData.stock) || formData.stock < 0) {
      setError('Stock must be a non-negative number');
      return;
    }

    try {
      setLoading(true);
      
      // Convert string values to numbers
      const productData = {
        ...formData,
        productId: parseInt(formData.productId),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      await createProduct(productData);
      
      setSuccess('Product added successfully!');
      
      // Reset form
      setFormData({
        productId: '',
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        stock: '100'
      });

      // Redirect to products page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="add-product-container">
      <div className="add-product-form-card">
        <h1 className="add-product-title">Add New Product</h1>
        
        {error && (
          <div className="alert alert-error">
            <p className="alert-title">Error:</p>
            <p className="alert-message">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            <div className="flex items-center">
              <span className="success-checkmark"></span>
              <div>
                <p className="alert-title">{success}</p>
                <p className="alert-message">Redirecting to products page...</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          {/* Row 1: Product ID and Name */}
          <div className="form-row">
            {/* Product ID */}
            <div className="form-group">
              <label htmlFor="productId" className="form-label">
                Product ID <span className="required">*</span>
              </label>
              <input
                type="number"
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 11"
                required
              />
              <p className="form-helper-text">Unique identifier for the product</p>
            </div>

            {/* Product Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Wireless Keyboard"
                required
              />
            </div>
          </div>

          {/* Row 2: Price and Category */}
          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price (USD) <span className="required">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 49.99"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Furniture">Furniture</option>
                <option value="Home & Office">Home & Office</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
                <option value="Other">Other</option>
              </select>
              {formData.category && (
                <span className={`category-badge category-${formData.category.toLowerCase().replace(/ & /g, '-')}`}>
                  {formData.category}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Enter a detailed product description..."
              required
            />
            <p className="form-helper-text">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Image URL */}
          <div className="form-group full-width">
            <label htmlFor="image" className="form-label">
              Image URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
              required
            />
            <p className="form-helper-text">Enter a valid image URL</p>
            {formData.image && (
              <div className="image-preview">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  onError={(e) => {
                    e.target.parentElement.innerHTML = '<div class="image-preview-placeholder">Invalid image URL</div>';
                  }}
                />
              </div>
            )}
          </div>

          {/* Stock */}
          <div className="form-group">
            <label htmlFor="stock" className="form-label">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 100"
              min="0"
            />
            {formData.stock && (
              <div className="stock-indicator">
                <span className={`stock-dot ${
                  formData.stock > 50 ? 'stock-high' : 
                  formData.stock > 20 ? 'stock-medium' : 
                  'stock-low'
                }`}></span>
                <span className="form-helper-text">
                  {formData.stock > 50 ? 'High stock' : 
                   formData.stock > 20 ? 'Medium stock' : 
                   'Low stock'}
                </span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? '' : '✓ Add Product'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              ✕ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
