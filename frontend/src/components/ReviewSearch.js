import React, { useState } from 'react';
import './ReviewSearch.css';

const ReviewSearch = ({ onSearch }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [category, setCategory] = useState('Bugs');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = () => {
    onSearch(selectedDate, category);
  };

  const getToday = () => new Date().toISOString().split('T')[0];
  
  const getDateSevenDaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="review-search">
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={getToday()}
          min={getDateSevenDaysAgo()}
        />
      </label>
      <label>
        Select Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="Bugs">Bugs</option>
          <option value="Complaints">Complaints</option>
          <option value="Crashes">Crashes</option>
          <option value="Praises">Praises</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ReviewSearch;
