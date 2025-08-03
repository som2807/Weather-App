import React from 'react';
import { Search, MapPin } from 'lucide-react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ 
  city, 
  setCity, 
  onSearch, 
  onGetLocation, 
  loading 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          disabled={loading}
          className={styles.searchInput}
        />
        <button
          onClick={onSearch}
          disabled={loading || !city.trim()}
          className={styles.searchButton}
        >
          <Search size={20} />
        </button>
      </div>

      {/* Location Button */}
      <button
        onClick={onGetLocation}
        disabled={loading}
        className={styles.locationButton}
      >
        <MapPin size={20} />
        Use My Location
      </button>
    </div>
  );
};

export default SearchBar;