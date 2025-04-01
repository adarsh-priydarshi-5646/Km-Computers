import { motion } from 'framer-motion';
import { 
  Laptop, 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  Star, 
  Shield, 
  Truck, 
  Clock,
  ChevronDown,
  Plus,
  Minus,
  ShoppingCart,
  Filter
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useFilters } from '../context/FiltersContext';
import CompareModal from '../components/CompareModal';
import FiltersSidebar from '../components/FiltersSidebar';
import ActiveFilters from '../components/ActiveFilters';

// Types for our data
type LaptopType = {
  id: number;
  name: string;
  brand: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
  };
  image: string;
  warranty: string;
  rating: number;
  inStock: boolean;
};

export default function LaptopsPage() {
  // State for comparison
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [adminLaptops, setAdminLaptops] = useState<LaptopType[]>([]);

  // Cart context
  const { dispatch } = useCart();
  const { state: filterState } = useFilters();

  // Load admin uploaded laptops
  useEffect(() => {
    const savedLaptops = localStorage.getItem('laptops');
    if (savedLaptops) {
      const parsedLaptops = JSON.parse(savedLaptops);
      // Convert admin laptop format to LaptopType format
      const convertedLaptops = parsedLaptops.map((laptop: any) => ({
        id: parseInt(laptop.id),
        name: laptop.name,
        brand: laptop.name.split(' ')[0], // Use first word as brand
        price: laptop.price,
        specs: {
          processor: laptop.specs.processor,
          ram: laptop.specs.ram,
          storage: laptop.specs.storage,
          display: laptop.specs.display,
          graphics: 'Integrated' // Default value
        },
        image: laptop.image,
        warranty: '1 Year', // Default value
        rating: 4.5, // Default value
        inStock: true // Default value
      }));
      setAdminLaptops(convertedLaptops);
    }
  }, []);

  // Sample laptop data
  const laptops: LaptopType[] = [
    {
      id: 1,
      name: "Dell XPS 15",
      brand: "Dell",
      price: 149999,
      specs: {
        processor: "Intel i7-12700H",
        ram: "16GB",
        storage: "512GB SSD",
        display: "15.6\" 4K OLED",
        graphics: "NVIDIA RTX 3050 Ti"
      },
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80",
      warranty: "2 Years",
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      brand: "Apple",
      price: 199999,
      specs: {
        processor: "Apple M2 Pro",
        ram: "32GB",
        storage: "1TB SSD",
        display: "16\" Liquid Retina XDR",
        graphics: "19-core GPU"
      },
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80",
      warranty: "1 Year",
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      brand: "Lenovo",
      price: 139999,
      specs: {
        processor: "Intel i5-1240P",
        ram: "16GB",
        storage: "512GB SSD",
        display: "14\" QHD+ IPS",
        graphics: "Intel Iris Xe"
      },
      image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80",
      warranty: "3 Years",
      rating: 4.7,
      inStock: true
    },
    {
      id: 4,
      name: "HP Spectre x360",
      brand: "HP",
      price: 159999,
      specs: {
        processor: "Intel i7-1260P",
        ram: "16GB",
        storage: "1TB SSD",
        display: "13.5\" OLED Touch",
        graphics: "Intel Iris Xe"
      },
      image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80",
      warranty: "2 Years",
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      name: "ASUS ROG Zephyrus G14",
      brand: "ASUS",
      price: 169999,
      specs: {
        processor: "AMD Ryzen 9 6900HS",
        ram: "32GB",
        storage: "1TB SSD",
        display: "14\" QHD 120Hz",
        graphics: "NVIDIA RTX 3060"
      },
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80",
      warranty: "2 Years",
      rating: 4.8,
      inStock: true
    },
    {
      id: 6,
      name: "Acer Swift 5",
      brand: "Acer",
      price: 89999,
      specs: {
        processor: "Intel i5-1135G7",
        ram: "8GB",
        storage: "512GB SSD",
        display: "14\" FHD IPS",
        graphics: "Intel Iris Xe"
      },
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80",
      warranty: "1 Year",
      rating: 4.3,
      inStock: true
    },
    {
      id: 7,
      name: "MSI Creator Z16",
      brand: "MSI",
      price: 189999,
      specs: {
        processor: "Intel i9-11900H",
        ram: "32GB",
        storage: "2TB SSD",
        display: "16\" QHD+ Touch",
        graphics: "NVIDIA RTX 3060"
      },
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80",
      warranty: "2 Years",
      rating: 4.7,
      inStock: false
    },
    {
      id: 8,
      name: "Dell Inspiron 15",
      brand: "Dell",
      price: 69999,
      specs: {
        processor: "Intel i3-1115G4",
        ram: "8GB",
        storage: "256GB SSD",
        display: "15.6\" FHD",
        graphics: "Intel UHD"
      },
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80",
      warranty: "1 Year",
      rating: 4.1,
      inStock: true
    },
    {
      id: 9,
      name: "Apple MacBook Air M1",
      brand: "Apple",
      price: 99999,
      specs: {
        processor: "Apple M1",
        ram: "8GB",
        storage: "256GB SSD",
        display: "13.3\" Retina",
        graphics: "7-core GPU"
      },
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80",
      warranty: "1 Year",
      rating: 4.8,
      inStock: true
    },
    {
      id: 10,
      name: "Lenovo Yoga 9i",
      brand: "Lenovo",
      price: 129999,
      specs: {
        processor: "Intel i7-1185G7",
        ram: "16GB",
        storage: "1TB SSD",
        display: "14\" 4K Touch",
        graphics: "Intel Iris Xe"
      },
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80",
      warranty: "2 Years",
      rating: 4.5,
      inStock: true
    },
    {
      id: 11,
      name: "HP Pavilion Gaming",
      brand: "HP",
      price: 79999,
      specs: {
        processor: "AMD Ryzen 5 5600H",
        ram: "8GB",
        storage: "512GB SSD",
        display: "15.6\" FHD 144Hz",
        graphics: "NVIDIA GTX 1650"
      },
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80",
      warranty: "1 Year",
      rating: 4.2,
      inStock: true
    },
    {
      id: 12,
      name: "ASUS ZenBook Pro Duo",
      brand: "ASUS",
      price: 229999,
      specs: {
        processor: "Intel i9-11900H",
        ram: "32GB",
        storage: "1TB SSD",
        display: "15.6\" OLED 4K + ScreenPad Plus",
        graphics: "NVIDIA RTX 3070"
      },
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80",
      warranty: "2 Years",
      rating: 4.9,
      inStock: false
    }
  ];

  // Combine existing and admin laptops
  const allLaptops = [...laptops, ...adminLaptops];

  // Filter and sort laptops
  const filteredLaptops = allLaptops.filter(laptop => {
    // Search query filter
    if (searchQuery && !laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !laptop.specs.processor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Brand filter
    if (filterState.brands.length > 0 && !filterState.brands.includes(laptop.brand)) {
      return false;
    }
    
    // Processor filter
    if (filterState.processors.length > 0 && 
        !filterState.processors.some(p => laptop.specs.processor.includes(p))) {
      return false;
    }
    
    // RAM filter
    if (filterState.ram.length > 0 && 
        !filterState.ram.some(r => laptop.specs.ram.includes(r))) {
      return false;
    }
    
    // Storage filter
    if (filterState.storage.length > 0 && 
        !filterState.storage.some(s => laptop.specs.storage.includes(s))) {
      return false;
    }
    
    // Rating filter
    if (filterState.rating > 0 && laptop.rating < filterState.rating) {
      return false;
    }
    
    // Price range filter
    if (laptop.price < filterState.priceRange.min || laptop.price > filterState.priceRange.max) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // featured
        return 0;
    }
  });

  // Toggle laptop for comparison
  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id]);
    } else {
      alert('You can compare up to 3 laptops at a time');
    }
  };

  // Add to cart handler
  const handleAddToCart = (laptop: LaptopType) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: laptop.id,
        name: laptop.name,
        price: laptop.price,
        image: laptop.image,
        quantity: 1
      }
    });
  };

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80"
            alt="Laptop Collection"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 to-[#3A1C71]/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect<br />
              <span className="text-yellow-400">Laptop</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Explore our wide range of laptops from top brands. Whether you're a student,
              professional, or gamer, we have the perfect match for you.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search laptops by name, brand, or specifications..."
                  className="w-full px-6 py-4 bg-neutral-900/50 backdrop-blur-md border border-neutral-800/50 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Star, title: 'Best Prices', description: 'Competitive prices guaranteed' },
              { icon: Shield, title: 'Warranty', description: 'Extended warranty options' },
              { icon: Truck, title: 'Fast Delivery', description: 'Free delivery on all orders' },
              { icon: Clock, title: 'Support', description: '24/7 technical assistance' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 flex items-center gap-4 hover:bg-neutral-800/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-neutral-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="btn-secondary w-full justify-center"
            >
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              <Filter size={16} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-1/4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <FiltersSidebar />
            </div>

            {/* Laptops Grid */}
            <div className="lg:w-3/4">
              {/* Active Filters */}
              <ActiveFilters />

              {/* Sort and Compare Bar */}
              <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-neutral-300">Sort by:</span>
                  <select 
                    className="bg-neutral-800 rounded border border-neutral-700 text-neutral-300 p-2"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-300">Compare ({compareList.length}/3):</span>
                  {compareList.length > 1 && (
                    <button 
                      className="btn-primary py-2"
                      onClick={() => setShowCompareModal(true)}
                    >
                      Compare Now
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-neutral-400">
                  Showing {filteredLaptops.length} of {allLaptops.length} laptops
                </p>
              </div>

              {/* Laptops Grid */}
              {filteredLaptops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredLaptops.map((laptop) => (
                    <motion.div
                      key={laptop.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="glass-card overflow-hidden group hover:bg-neutral-800/30 transition-colors"
                    >
                      <div className="relative">
                        <img 
                          src={laptop.image}
                          alt={laptop.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => toggleCompare(laptop.id)}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                              compareList.includes(laptop.id)
                                ? 'bg-yellow-400 text-black'
                                : 'bg-neutral-900/50 text-white hover:bg-neutral-800'
                            }`}
                          >
                            {compareList.includes(laptop.id) ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold mb-1">{laptop.name}</h3>
                            <p className="text-sm text-neutral-400">{laptop.brand}</p>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm">{laptop.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-neutral-300">{laptop.specs.processor}</p>
                          <p className="text-sm text-neutral-300">{laptop.specs.ram} RAM • {laptop.specs.storage}</p>
                          <p className="text-sm text-neutral-300">{laptop.specs.display}</p>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-lg font-semibold">₹{laptop.price.toLocaleString()}</p>
                            <p className="text-sm text-neutral-400">{laptop.warranty} Warranty</p>
                          </div>
                          <div className="text-sm">
                            {laptop.inStock ? (
                              <span className="text-green-400">In Stock</span>
                            ) : (
                              <span className="text-red-400">Out of Stock</span>
                            )}
                          </div>
                        </div>
                        <button 
                          className="btn-primary w-full justify-center"
                          onClick={() => handleAddToCart(laptop)}
                          disabled={!laptop.inStock}
                        >
                          {laptop.inStock ? (
                            <>
                              Add to Cart
                              <ShoppingCart size={16} />
                            </>
                          ) : (
                            'Out of Stock'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <Search className="w-16 h-16 mx-auto text-neutral-500" />
                    <h3 className="text-xl font-semibold">No laptops found</h3>
                    <p className="text-neutral-400">
                      Try adjusting your filters or search query to find what you're looking for.
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Warranty & Support Section */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Warranty & Support</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              We provide comprehensive warranty coverage and dedicated support for all our products.
              Your satisfaction is our top priority.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Extended Warranty',
                description: 'Get up to 3 years of extended warranty coverage for complete peace of mind.',
                features: ['Parts Coverage', 'Labor Coverage', 'Accidental Damage', 'Technical Support']
              },
              {
                title: 'Free Services',
                description: 'Enjoy complimentary services during the warranty period.',
                features: ['Health Checkup', 'Software Updates', 'Cleaning Service', 'Performance Optimization']
              },
              {
                title: '24/7 Support',
                description: 'Our expert team is always ready to help you with any issues.',
                features: ['Phone Support', 'Email Support', 'Remote Assistance', 'On-site Service']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:bg-neutral-800/30 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-neutral-300 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-neutral-300">
                      <Shield className="w-5 h-5 text-yellow-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center hover:bg-neutral-800/30 transition-colors"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Our expert team can help you find the perfect laptop based on your needs and budget.
              Get in touch with us today!
            </p>
            <button className="btn-primary">
              Contact Expert
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Compare Modal */}
      <CompareModal
        laptops={allLaptops.filter(laptop => compareList.includes(laptop.id))}
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
      />
    </div>
  );
}