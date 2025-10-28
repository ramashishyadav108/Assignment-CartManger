import '../styles/components.css';

/**
 * Star Rating Component
 * Displays star rating and review count
 */
const StarRating = ({ rating = 0, reviews = 0, size = 'medium', showCount = true }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <span key={i} className={`star star-full star-${size}`}>
          ★
        </span>
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <span key={i} className={`star star-half star-${size}`}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className={`star star-empty star-${size}`}>
          ★
        </span>
      );
    }
  }

  return (
    <div className="star-rating">
      <div className="stars">{stars}</div>
      {showCount && reviews > 0 && (
        <span className="rating-count">
          {rating.toFixed(1)} ({reviews.toLocaleString()} {reviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default StarRating;
