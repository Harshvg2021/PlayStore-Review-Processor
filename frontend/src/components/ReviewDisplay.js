import React from 'react';
import './ReviewDisplay.css';

const ReviewDisplay = ({ reviewData }) => {
  if (!reviewData) {
    return <p className="no-reviews">No data to display. Please perform a search.</p>;
  }

  const { count, data, dateRange } = reviewData;

  return (
    <div className="review-display">
      <h2>Review Data</h2>
      {dateRange && (
        <p>
          Showing reviews from: {new Date(dateRange.from).toLocaleDateString()} to {new Date(dateRange.to).toLocaleDateString()}
        </p>
      )}
      <p>Total Reviews Found: {count}</p>

      <table className="review-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Review Content</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((review) => (
              <tr key={review._id}>
                <td>{new Date(review.date).toLocaleDateString()}</td>
                <td>{review.category}</td>
                <td>{review.content}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-reviews">No reviews found for the selected date and category.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewDisplay;
