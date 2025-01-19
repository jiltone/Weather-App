import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  Wind, 
  CloudSun 
} from 'lucide-react';

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const colors = {
  clear: 'text-yellow-400',
  cloudy: 'text-gray-400',
  rain: 'text-blue-400',
  snow: 'text-slate-200',
  thunderstorm: 'text-purple-400',
  fog: 'text-gray-300',
  windy: 'text-blue-300'
};

const iconVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: { type: "spring", duration: 0.5 }
  },
  hover: { scale: 1.1 }
};

export default function WeatherIcon({ condition, size = 'md', animated = true }) {
  const getIcon = () => {
    switch (condition) {
      case 'clear':
        return <Sun />;
      case 'cloudy':
        return <Cloud />;
      case 'rain':
        return <CloudRain />;
      case 'snow':
        return <CloudSnow />;
      case 'thunderstorm':
        return <CloudLightning />;
      case 'fog':
        return <CloudFog />;
      case 'windy':
        return <Wind />;
      default:
        console.warn(`Unknown condition: ${condition}`);
        return <CloudSun />;
    }
  };

  const IconWrapper = animated ? motion.div : 'div';
  const animationProps = animated ? {
    variants: iconVariants,
    initial: "initial",
    animate: "animate",
    whileHover: "hover"
  } : {};

  return (
    <IconWrapper 
      className={`${sizes[size]} ${colors[condition]}`}
      aria-label={`Weather condition: ${condition}`}
      {...animationProps}
    >
      {getIcon()}
    </IconWrapper>
  );
}

WeatherIcon.propTypes = {
  condition: PropTypes.oneOf([
    'clear',
    'cloudy',
    'rain',
    'snow',
    'thunderstorm',
    'fog',
    'windy'
  ]).isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  animated: PropTypes.bool
};

WeatherIcon.defaultProps = {
  size: 'md',
  animated: true,
};
