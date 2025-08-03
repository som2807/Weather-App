import React, { useState, useEffect } from 'react';
import { Sun, AlertCircle } from 'lucide-react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import WeatherDetails from './WeatherDetails';
import { fetchWeatherData, getCurrentLocationWeather } from '../services/weatherService';
import { getWeatherBackground } from '../utils/weatherUtils';
import styles from '../styles/WeatherApp.module.css';

const LoadingSpinner = () => (
  <div className={styles.loadingContainer}>
    <div className={`${styles.spinner} spin`}></div>
    <p className={styles.loadingText}>Getting weather data...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className={styles.errorContainer}>
    <AlertCircle size={20} />
    <p className={styles.errorText}>{message}</p>
  </div>
);

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeatherData(city.trim());
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getCurrentLocationWeather();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDefaultWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData('Kolkata');
        setWeatherData(data);
      } catch (err) {
        setError('Failed to load default weather data');
      } finally {
        setLoading(false);
      }
    };

    loadDefaultWeather();
  }, []);

  const weatherMain = weatherData?.weather?.[0]?.main || 'Clear';
  const backgroundStyle = {
    background: getWeatherBackground(weatherMain)
  };

  return (
    <div className={styles.container} style={backgroundStyle}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Sun size={32} color="#fbbf24" className="pulse" />
            Weather App
          </h1>
          <p className={styles.subtitle}>Get instant weather updates</p>
        </div>

        {/* Search Section */}
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          onGetLocation={handleGetLocation}
          loading={loading}
        />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className={styles.weatherContainer}>
            <WeatherCard weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
          </div>
        )}

        {/* Footer */}
        {weatherData && !loading && (
          <div className={styles.footer}>
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;