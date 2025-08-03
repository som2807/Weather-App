export const getWeatherIcon = (weatherMain) => {
  const icons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Snow': '❄️',
    'Thunderstorm': '⛈️',
    'Drizzle': '🌦️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Smoke': '💨'
  };
  return icons[weatherMain] || '🌤️';
};

export const getWeatherBackground = (weatherMain) => {
  const backgrounds = {
    'Clear': 'linear-gradient(135deg, #fbbf24, #f59e0b, #dc2626)',
    'Clouds': 'linear-gradient(135deg, #9ca3af, #6b7280, #4b5563)',
    'Rain': 'linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)',
    'Snow': 'linear-gradient(135deg, #dbeafe, #bfdbfe, #93c5fd)',
    'Thunderstorm': 'linear-gradient(135deg, #8b5cf6, #7c3aed, #3730a3)',
    'Drizzle': 'linear-gradient(135deg, #7dd3fc, #38bdf8, #0ea5e9)',
    'Mist': 'linear-gradient(135deg, #d1d5db, #9ca3af, #6b7280)',
    'Fog': 'linear-gradient(135deg, #d1d5db, #9ca3af, #6b7280)',
    'Haze': 'linear-gradient(135deg, #fef3c7, #fde68a, #f59e0b)',
    'Smoke': 'linear-gradient(135deg, #6b7280, #4b5563, #374151)'
  };
  return backgrounds[weatherMain] || 'linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)';
};

export const formatTemperature = (temp) => {
  return Math.round(temp);
};

export const formatWindSpeed = (speed) => {
  return Number(speed).toFixed(1);
};

export const formatVisibility = (visibility) => {
  return (visibility / 1000).toFixed(1);
};