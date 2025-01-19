import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch, recentLocations, onLocationSelect }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = new FormData(form).get('search');
    if (query.trim()) {
      onSearch(query);
      form.reset();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.form
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            name="search"
            placeholder="Search for a city..."
            className="w-full bg-white/20 backdrop-blur-sm border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </motion.form>

      {recentLocations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute w-full mt-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden"
        >
          {recentLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between"
            >
              <span>{location.name}, {location.country}</span>
              {location.isFavorite && (
                <span className="text-yellow-400">★</span>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  recentLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool
    })
  ).isRequired,
  onLocationSelect: PropTypes.func.isRequired
};