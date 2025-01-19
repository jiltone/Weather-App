import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import PropTypes from 'prop-types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Forecast({ forecast, units }) {
  const convertTemp = (temp) => {
    return units === 'celsius' ? temp : (temp * 9/5) + 32;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Calendar className="w-6 h-6 text-white mr-2" />
        <h2 className="text-xl font-semibold text-white">7-Day Forecast</h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {forecast.map((day) => (
          <motion.div
            key={day.date}
            variants={item}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col items-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-white/80 text-sm">{day.day}</span>
            <span className="text-white/60 text-xs mb-2">{day.date}</span>
            <WeatherIcon condition={day.condition} size="md" />
            <div className="mt-2 text-white">
              <span className="font-semibold">{Math.round(convertTemp(day.high))}°</span>
              <span className="mx-1 text-white/60">/</span>
              <span className="text-white/80">{Math.round(convertTemp(day.low))}°</span>
            </div>
            <div className="mt-2 text-white/60 text-xs">
              <div>Wind: {day.windSpeed} km/h</div>
              <div>Precipitation: {day.precipitation}%</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      condition: PropTypes.string.isRequired,
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      windSpeed: PropTypes.number.isRequired,
      precipitation: PropTypes.number.isRequired
    })
  ).isRequired,
  units: PropTypes.oneOf(['celsius', 'fahrenheit']).isRequired
};