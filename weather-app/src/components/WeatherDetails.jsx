import React from 'react';
import { Thermometer, Droplets, Wind, Gauge, Eye } from 'lucide-react';
import { formatTemperature, formatWindSpeed, formatVisibility } from '../utils/weatherUtils';
import styles from '../styles/WeatherDetails.module.css';

const WeatherDetailCard = ({ icon: Icon, label, value, className }) => (
  <div className={`${styles.detailCard} ${className} scaleIn`}>
    <div className={styles.detailHeader}>
      <Icon size={20} color="#374151" />
      <span className={styles.detailLabel}>{label}</span>
    </div>
    <div className={styles.detailValue}>{value}</div>
  </div>
);

const WeatherDetails = ({ weatherData }) => {
  if (!weatherData) return null;

  const details = [
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${formatTemperature(weatherData.main.feels_like)}°C`,
      className: styles.feelsLike
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weatherData.main.humidity}%`,
      className: styles.humidity
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${formatWindSpeed(weatherData.wind.speed)} m/s`,
      className: styles.windSpeed
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weatherData.main.pressure} hPa`,
      className: styles.pressure
    }
  ];

  return (
    <div className={styles.container}>
      {/* Main Details Grid */}
      <div className={styles.detailsGrid}>
        {details.map((detail, index) => (
          <WeatherDetailCard key={index} {...detail} />
        ))}
      </div>

      {/* Visibility */}
      {weatherData.visibility && (
        <div className={`${styles.visibilityCard} scaleIn`}>
          <div className={styles.visibilityHeader}>
            <Eye size={20} color="#6b7280" />
            <span className={styles.detailLabel}>Visibility</span>
          </div>
          <div className={styles.visibilityValue}>
            {formatVisibility(weatherData.visibility)} km
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;