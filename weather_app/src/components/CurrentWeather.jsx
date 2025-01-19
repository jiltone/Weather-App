import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, Sunrise, Sunset, Thermometer } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import PropTypes from 'prop-types';

export default function CurrentWeather({ data, units, onUnitsToggle }) {
  const temperature = units === 'celsius' ? data.temperature : (data.temperature * 9/5) + 32;
  const feelsLike = units === 'celsius' ? data.feelsLike : (data.feelsLike * 9/5) + 32;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/10"
    >
      <div className="flex items-center justify-center mb-8">
        <MapPin className="w-6 h-6 text-white mr-2" />
        <h2 className="text-2xl font-semibold text-white">{data.location}</h2>
      </div>

      <div className="flex flex-col items-center mb-12">
        <WeatherIcon condition={data.condition} size="lg" />
        <motion.div 
          className="text-6xl font-bold text-white mb-2"
          whileHover={{ scale: 1.1 }}
          onClick={onUnitsToggle}
          style={{ cursor: 'pointer' }}
        >
          {Math.round(temperature)}°{units === 'celsius' ? 'C' : 'F'}
        </motion.div>
        <div className="text-xl text-white/80 capitalize flex items-center">
          <Thermometer className="w-5 h-5 mr-2" />
          Feels like {Math.round(feelsLike)}°
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <WeatherDetail
          icon={<Wind className="w-6 h-6 text-white" />}
          label="Wind"
          value={`${data.windSpeed} km/h ${data.windDirection}`}
        />
        <WeatherDetail
          icon={<Droplets className="w-6 h-6 text-white" />}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <WeatherDetail
          icon={<Sunrise className="w-6 h-6 text-white" />}
          label="Sunrise"
          value={data.sunrise}
        />
        <WeatherDetail
          icon={<Sunset className="w-6 h-6 text-white" />}
          label="Sunset"
          value={data.sunset}
        />
      </div>
    </motion.div>
  );
}

function WeatherDetail({ icon, label, value }) {
  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm text-white/80">{label}</span>
      <span className="text-lg font-semibold text-white">{value}</span>
    </motion.div>
  );
}

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    condition: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired,
    windDirection: PropTypes.string.isRequired,
    sunrise: PropTypes.string.isRequired,
    sunset: PropTypes.string.isRequired,
    feelsLike: PropTypes.number.isRequired
  }).isRequired,
  units: PropTypes.oneOf(['celsius', 'fahrenheit']).isRequired,
  onUnitsToggle: PropTypes.func.isRequired
};

WeatherDetail.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};