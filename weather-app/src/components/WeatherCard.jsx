import React from 'react';
import { MapPin } from 'lucide-react';
import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils';
import styles from '../styles/WeatherCard.module.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className={`${styles.container} fadeIn`}>
      {/* City Name */}
      <div className={styles.cityName}>
        <MapPin size={24} color="#ef4444" />
        {weatherData.name}
      </div>

      {/* Weather Icon & Temperature */}
      <div className={styles.weatherSection}>
        <div className={`${styles.weatherIcon} pulse`}>
          {getWeatherIcon(weatherData.weather[0].main)}
        </div>
        <div className={styles.temperature}>
          {formatTemperature(weatherData.main.temp)}°C
        </div>
        <div className={styles.description}>
          {weatherData.weather[0].description}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;