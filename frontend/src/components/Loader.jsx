import '../styles/components.css';

/**
 * Loader Component
 * Loading spinner displayed during async operations
 */
const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;
