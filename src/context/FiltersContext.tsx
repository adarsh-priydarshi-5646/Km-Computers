import { createContext, useContext, useReducer, useEffect } from 'react';

export type FilterState = {
  priceRange: { min: number; max: number };
  brands: string[];
  processors: string[];
  ram: string[];
  storage: string[];
  rating: number;
  sort: string;
  search: string;
};

type FilterAction =
  | { type: 'SET_PRICE_RANGE'; payload: { min: number; max: number } }
  | { type: 'TOGGLE_BRAND'; payload: string }
  | { type: 'TOGGLE_PROCESSOR'; payload: string }
  | { type: 'TOGGLE_RAM'; payload: string }
  | { type: 'TOGGLE_STORAGE'; payload: string }
  | { type: 'SET_RATING'; payload: number }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'CLEAR_FILTERS' };

const initialState: FilterState = {
  priceRange: { min: 0, max: 200000 },
  brands: [],
  processors: [],
  ram: [],
  storage: [],
  rating: 0,
  sort: 'featured',
  search: ''
};

const FiltersContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
} | undefined>(undefined);

function filtersReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'TOGGLE_BRAND':
      return {
        ...state,
        brands: state.brands.includes(action.payload)
          ? state.brands.filter(brand => brand !== action.payload)
          : [...state.brands, action.payload]
      };
    case 'TOGGLE_PROCESSOR':
      return {
        ...state,
        processors: state.processors.includes(action.payload)
          ? state.processors.filter(processor => processor !== action.payload)
          : [...state.processors, action.payload]
      };
    case 'TOGGLE_RAM':
      return {
        ...state,
        ram: state.ram.includes(action.payload)
          ? state.ram.filter(r => r !== action.payload)
          : [...state.ram, action.payload]
      };
    case 'TOGGLE_STORAGE':
      return {
        ...state,
        storage: state.storage.includes(action.payload)
          ? state.storage.filter(s => s !== action.payload)
          : [...state.storage, action.payload]
      };
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'CLEAR_FILTERS':
      return initialState;
    default:
      return state;
  }
}

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(filtersReducer, initialState, () => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters ? JSON.parse(savedFilters) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(state));
  }, [state]);

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
}