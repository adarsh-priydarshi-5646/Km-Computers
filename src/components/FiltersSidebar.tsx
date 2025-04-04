import { motion } from 'framer-motion';
import { Star, SlidersHorizontal } from 'lucide-react';
import { useFilters } from '../context/FiltersContext';

const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'MSI'];
const processors = ['Intel i3', 'Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2'];
const ramSizes = ['8GB', '16GB', '32GB', '64GB'];
const storageTypes = ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD', '1TB HDD', '2TB HDD'];

export default function FiltersSidebar() {
  const { state, dispatch } = useFilters();

  return (
    <div className="glass-card p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <SlidersHorizontal className="w-5 h-5" />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-neutral-400">Min</label>
            <input
              type="number"
              value={state.priceRange.min}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0 && value <= state.priceRange.max) {
                  dispatch({
                    type: 'SET_PRICE_RANGE',
                    payload: { ...state.priceRange, min: value }
                  });
                }
              }}
              className="w-full p-2 bg-neutral-800 rounded border border-neutral-700 text-neutral-300"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-400">Max</label>
            <input
              type="number"
              value={state.priceRange.max}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= state.priceRange.min) {
                  dispatch({
                    type: 'SET_PRICE_RANGE',
                    payload: { ...state.priceRange, max: value }
                  });
                }
              }}
              className="w-full p-2 bg-neutral-800 rounded border border-neutral-700 text-neutral-300"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.brands.includes(brand)}
                onChange={() => dispatch({ type: 'TOGGLE_BRAND', payload: brand })}
                className="w-4 h-4 rounded border-neutral-600 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="text-neutral-300">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Processor Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Processor</h3>
        <div className="space-y-2">
          {processors.map(processor => (
            <label key={processor} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.processors.includes(processor)}
                onChange={() => dispatch({ type: 'TOGGLE_PROCESSOR', payload: processor })}
                className="w-4 h-4 rounded border-neutral-600 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="text-neutral-300">{processor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RAM Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">RAM</h3>
        <div className="space-y-2">
          {ramSizes.map(ram => (
            <label key={ram} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.ram.includes(ram)}
                onChange={() => dispatch({ type: 'TOGGLE_RAM', payload: ram })}
                className="w-4 h-4 rounded border-neutral-600 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="text-neutral-300">{ram}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Storage Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Storage</h3>
        <div className="space-y-2">
          {storageTypes.map(storage => (
            <label key={storage} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.storage.includes(storage)}
                onChange={() => dispatch({ type: 'TOGGLE_STORAGE', payload: storage })}
                className="w-4 h-4 rounded border-neutral-600 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="text-neutral-300">{storage}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch({ type: 'SET_RATING', payload: rating })}
              className={`p-2 rounded ${
                state.rating === rating
                  ? 'text-yellow-400'
                  : 'text-neutral-400 hover:text-yellow-400'
              }`}
            >
              <Star
                size={20}
                fill={state.rating >= rating ? 'currentColor' : 'none'}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
        className="btn-secondary w-full justify-center"
      >
        Clear All Filters
      </button>
    </div>
  );
}