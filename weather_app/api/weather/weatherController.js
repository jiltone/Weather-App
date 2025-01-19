const axios = require('axios');
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

const getCurrentWeather = async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'An error occurred',
    });
  }
};

const getForecast = async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`${WEATHER_API_URL}/forecast/daily`, {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        cnt: 7, // Number of days for the forecast
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'An error occurred',
    });
  }
};

module.exports = { getCurrentWeather, getForecast };