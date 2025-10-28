import '../styles/components.css';

/**
 * Receipt Modal Component
 * Displays order receipt after successful checkout
 */
const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✓ Order Confirmed!</h2>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>

        <div className="receipt-content">
          <div className="receipt-section">
            <p className="receipt-message">{receipt.message}</p>
          </div>

          <div className="receipt-section">
            <h3>Order Details</h3>
            <p>
              <strong>Order ID:</strong> {receipt.orderId}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
            <p>
              <strong>Customer:</strong> {receipt.customerName}
            </p>
            <p>
              <strong>Email:</strong> {receipt.customerEmail}
            </p>
          </div>

          <div className="receipt-section">
            <h3>Items Ordered</h3>
            <div className="receipt-items">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <span className="receipt-item-name">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="receipt-item-price">
                    ₹{item.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="receipt-section receipt-total">
            <div className="total-row">
              <span>Total Items:</span>
              <span>{receipt.totalItems}</span>
            </div>
            <div className="total-row total-price">
              <span>Total Amount:</span>
              <span>₹{receipt.totalPrice.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Payment Status:</span>
              <span className="payment-status">{receipt.paymentStatus}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
