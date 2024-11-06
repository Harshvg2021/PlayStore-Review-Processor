import React, { useState } from 'react';
import axios from 'axios';
import ReviewSearch from './components/ReviewSearch';
import ReviewDisplay from './components/ReviewDisplay';

const App = () => {
  const [reviewData, setReviewData] = useState(null);

  const handleSearch = async (date, category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/search`, {
        params: { date, category }
      });
      setReviewData(response.data);
    } catch (error) {
      console.error("Error fetching review data:", error);
      setReviewData(null);
    }
  };

  return (
    <div>
      <h1>Review Tracker</h1> 
      <ReviewSearch onSearch={handleSearch} />
      <ReviewDisplay reviewData={reviewData} />
    </div>
  );
};

export default App;
