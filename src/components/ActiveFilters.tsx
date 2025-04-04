import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFilters } from '../context/FiltersContext';

export default function ActiveFilters() {
  const { state, dispatch } = useFilters();

  const hasActiveFilters = () => {
    return (
      state.brands.length > 0 ||
      state.processors.length > 0 ||
      state.ram.length > 0 ||
      state.storage.length > 0 ||
      state.rating > 0 ||
      state.priceRange.min > 0 ||
      state.priceRange.max < 200000
    );
  };

  if (!hasActiveFilters()) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Active Filters</h3>
        <button
          onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
          className="text-sm text-yellow-400 hover:text-yellow-300"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {state.brands.map(brand => (
            <motion.span
              key={`brand-${brand}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card px-3 py-1 text-sm flex items-center gap-2"
            >
              {brand}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_BRAND', payload: brand })}
                className="hover:text-yellow-400"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}

          {state.processors.map(processor => (
            <motion.span
              key={`processor-${processor}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card px-3 py-1 text-sm flex items-center gap-2"
            >
              {processor}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_PROCESSOR', payload: processor })}
                className="hover:text-yellow-400"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}

          {state.ram.map(ram => (
            <motion.span
              key={`ram-${ram}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card px-3 py-1 text-sm flex items-center gap-2"
            >
              {ram}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_RAM', payload: ram })}
                className="hover:text-yellow-400"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}

          {state.storage.map(storage => (
            <motion.span
              key={`storage-${storage}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card px-3 py-1 text-sm flex items-center gap-2"
            >
              {storage}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_STORAGE', payload: storage })}
                className="hover:text-yellow-400"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}

          {state.rating > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card px-3 py-1 text-sm flex items-center gap-2"
            >
              {state.rating}+ Stars
              <button
                onClick={() => dispatch({ type: 'SET_RATING', payload: 0 })}
                className="hover:text-yellow-400"
              >
                <X size={14} />
              </button>
            </motion.span>
          )}

          {(state.priceRange.min > 0 || state.priceRange.max < 200000) && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card px-3 py-1 text-sm flex items-center gap-2"
            >
              ₹{state.priceRange.min.toLocaleString()} - ₹{state.priceRange.max.toLocaleString()}
              <button
                onClick={() => dispatch({ type: 'SET_PRICE_RANGE', payload: { min: 0, max: 200000 } })}
                className="hover:text-yellow-400"
              >
                <X size={14} />
              </button>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}