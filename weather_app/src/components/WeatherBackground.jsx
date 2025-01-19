import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 1 }
  }
};

export default function WeatherBackground({ condition }) {
  const getBackgroundStyle = () => {
    switch (condition) {
      case 'clear':
        return 'bg-gradient-to-b from-blue-400 to-blue-600';
      case 'cloudy':
        return 'bg-gradient-to-b from-gray-400 to-gray-600';
      case 'rain':
        return 'bg-gradient-to-b from-slate-600 to-slate-800';
      case 'snow':
        return 'bg-gradient-to-b from-slate-300 to-slate-500';
      case 'thunderstorm':
        return 'bg-gradient-to-b from-purple-700 to-slate-900';
      case 'fog':
        return 'bg-gradient-to-b from-gray-300 to-gray-500';
      case 'windy':
        return 'bg-gradient-to-b from-blue-300 to-blue-500';
      default:
        return 'bg-gradient-to-b from-blue-400 to-blue-600';
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 ${getBackgroundStyle()}`}
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    />
  );
}

WeatherBackground.propTypes = {
  condition: PropTypes.oneOf([
    'clear',
    'cloudy',
    'rain',
    'snow',
    'thunderstorm',
    'fog',
    'windy'
  ]).isRequired
};