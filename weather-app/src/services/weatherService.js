const mockWeatherData = {
  "new york": {
    name: "New York",
    main: {
      temp: 22,
      feels_like: 24,
      humidity: 65,
      pressure: 1013
    },
    weather: [{
      main: "Clear",
      description: "clear sky"
    }],
    wind: {
      speed: 3.2
    },
    visibility: 10000
  },
  "london": {
    name: "London",
    main: {
      temp: 15,
      feels_like: 13,
      humidity: 78,
      pressure: 1020
    },
    weather: [{
      main: "Clouds",
      description: "partly cloudy"
    }],
    wind: {
      speed: 2.1
    },
    visibility: 8000
  },
  "tokyo": {
    name: "Tokyo",
    main: {
      temp: 28,
      feels_like: 31,
      humidity: 70,
      pressure: 1008
    },
    weather: [{
      main: "Rain",
      description: "light rain"
    }],
    wind: {
      speed: 1.8
    },
    visibility: 5000
  },
  "kolkata": {
    name: "Kolkata",
    main: {
      temp: 32,
      feels_like: 36,
      humidity: 75,
      pressure: 1010
    },
    weather: [{
      main: "Clouds",
      description: "partly cloudy"
    }],
    wind: {
      speed: 2.8
    },
    visibility: 6000
  },
  "mumbai": {
    name: "Mumbai",
    main: {
      temp: 30,
      feels_like: 34,
      humidity: 80,
      pressure: 1008
    },
    weather: [{
      main: "Rain",
      description: "heavy rain"
    }],
    wind: {
      speed: 4.2
    },
    visibility: 4000
  },
  "delhi": {
    name: "Delhi",
    main: {
      temp: 35,
      feels_like: 42,
      humidity: 45,
      pressure: 1005
    },
    weather: [{
      main: "Clear",
      description: "sunny"
    }],
    wind: {
      speed: 2.5
    },
    visibility: 8000
  }
};

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (cityName) => {
  try {
    if (API_KEY !== 'demo_key') {
      const response = await fetch(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      return await response.json();
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cityKey = cityName.toLowerCase();
    
    if (mockWeatherData[cityKey]) {
      return mockWeatherData[cityKey];
    } else {
      return {
        name: cityName,
        main: {
          temp: Math.floor(Math.random() * 35) + 5,
          feels_like: Math.floor(Math.random() * 35) + 8,
          humidity: Math.floor(Math.random() * 50) + 30,
          pressure: Math.floor(Math.random() * 50) + 1000
        },
        weather: [{
          main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
          description: ['sunny', 'partly cloudy', 'light rain', 'snow'][Math.floor(Math.random() * 4)]
        }],
        wind: {
          speed: (Math.random() * 5 + 1).toFixed(1)
        },
        visibility: Math.floor(Math.random() * 5000) + 5000
      };
    }
  } catch (error) {
    throw new Error('Unable to fetch weather data. Please try again.');
  }
};

export const getCurrentLocationWeather = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        resolve(mockWeatherData.kolkata);
      },
      () => {
        reject(new Error('Unable to get your location. Please search for a city manually.'));
      }
    );
  });
};