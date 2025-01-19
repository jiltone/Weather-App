import React, { useState, useEffect } from 'react';
import WeatherBackground from './components/WeatherBackground';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import axios from 'axios';

function App() {
  const [units, setUnits] = useState('celsius');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [recentLocations, setRecentLocations] = useState([
    { id: '1', name: 'New York', country: 'US', isFavorite: true },
    { id: '2', name: 'London', country: 'UK', isFavorite: false },
    { id: '3', name: 'Tokyo', country: 'JP', isFavorite: true }
  ]);

  useEffect(() => {
    fetchWeatherData('New York');
    fetchForecastData('New York');
  }, []);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/current`, {
        params: { city }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/forecast`, {
        params: { city }
      });
      setForecast(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const handleSearch = (query) => {
    fetchWeatherData(query);
    fetchForecastData(query);
  };

  const handleLocationSelect = (location) => {
    fetchWeatherData(location.name);
    fetchForecastData(location.name);
  };

  const handleUnitsToggle = () => {
    setUnits(units === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="min-h-screen relative">
      {weatherData && <WeatherBackground condition={weatherData.weather[0].main.toLowerCase()} />}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <SearchBar
          onSearch={handleSearch}
          recentLocations={recentLocations}
          onLocationSelect={handleLocationSelect}
        />
        <div className="mt-8 "> 
          {weatherData && (
            <CurrentWeather
              data={{
                condition: weatherData.weather[0].main.toLowerCase(),
                temperature: weatherData.main.temp,
                location: weatherData.name,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                windDirection: weatherData.wind.deg,
                sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
                feelsLike: weatherData.main.feels_like
              }}
              units={units}
              onUnitsToggle={handleUnitsToggle}
            />
          )}
          {forecast.length > 0 && <Forecast forecast={forecast} units={units} />}
        </div>
      </div>
    </div>
  );
}

export default App;