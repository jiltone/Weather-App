const express = require('express');
const { getCurrentWeather, getForecast } = require('./weatherController');

const router = express.Router();

// Route to get current weather
router.get('/current', getCurrentWeather);

// Route to get 7-day forecast
router.get('/forecast', getForecast);

module.exports = router;
