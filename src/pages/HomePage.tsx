import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Laptop, Shield, Star, Truck, Zap, Gift, Percent, Calendar, Award, Tag } from 'lucide-react';
import FestivalBanner from '../components/FestivalBanner';
import { generateFestivalOffer } from '../utils/festivalData';
import { FESTIVAL_ICONS } from '../utils/types';

export default function HomePage() {
  // Find the nearest upcoming festival
  const getCurrentFestival = () => {
    const now = new Date();
    const festivals = {
      EID: new Date('2025-03-31'),
      DIWALI: new Date('2025-11-12'),
      CHRISTMAS: new Date('2025-12-25'),
      HOLI: new Date('2025-03-14'),
      NEW_YEAR: new Date('2025-01-01'),
    };

    let nearestFestival: keyof typeof FESTIVAL_ICONS = 'EID';
    let minDiff = Infinity;

    Object.entries(festivals).forEach(([festival, date]) => {
      const diff = date.getTime() - now.getTime();
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        nearestFestival = festival as keyof typeof FESTIVAL_ICONS;
      }
    });

    return nearestFestival;
  };

  const currentFestival = getCurrentFestival();
  const currentOffer = generateFestivalOffer(currentFestival);

  const handleShopNow = () => {
    window.location.href = '/laptops';
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-48">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&q=80"
            alt="Laptop Setup"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/80 via-[#1A1A1A]/60 to-[#3A1C71]/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Your One-Stop Solution for<br />
              <span className="text-yellow-400">Laptops, Hardware, and Services!</span>
            </h1>
            <p className="text-xl text-neutral-200 mb-8 max-w-2xl">
              Experience top-notch computer solutions with expert guidance and support. 
              We're here to make technology work for you.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link to="/services" className="btn-primary">
                Explore Services
                <ArrowRight size={20} />
              </Link>
              <Link to="/laptops" className="btn-secondary">
                Shop Now
                <Laptop size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Festival Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FestivalBanner offer={currentOffer} onShopNow={handleShopNow} />
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase mb-2 block">Limited Time Deals</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers & Discounts</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Take advantage of our limited-time offers and exclusive deals. Don't miss out on these amazing savings!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-l-4 border-yellow-400 group hover:bg-yellow-400/5 transition-all duration-300 hover:border-l-8 hover:border-yellow-300"
            >
              <div className="flex items-start gap-4">
                <Gift className="w-12 h-12 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">STUDENT SPECIAL</div>
                  <h3 className="text-xl font-semibold mb-2">Student Discount</h3>
                  <p className="text-neutral-300 mb-4">
                    Students get an additional 10% off on all laptops and accessories.
                    Valid student ID required at checkout.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400">Use Code: <span className="text-yellow-400 font-mono">STUDENT10</span></span>
                    <button onClick={handleShopNow} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      Shop Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-l-4 border-yellow-400 group hover:bg-yellow-400/5 transition-all duration-300 hover:border-l-8 hover:border-yellow-300"
            >
              <div className="flex items-start gap-4">
                <Calendar className="w-12 h-12 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">SUMMER SALE</div>
                  <h3 className="text-xl font-semibold mb-2">Summer Special Sale</h3>
                  <p className="text-neutral-300 mb-4">
                    Beat the heat with cool discounts! Up to 30% off on selected laptops and accessories.
                    Limited time offer, ends August 31st.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400">Use Code: <span className="text-yellow-400 font-mono">SUMMER30</span></span>
                    <button onClick={handleShopNow} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      Explore Deals
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-l-4 border-yellow-400 group hover:bg-yellow-400/5 transition-all duration-300 hover:border-l-8 hover:border-yellow-300"
            >
              <div className="flex items-start gap-4">
                <Zap className="w-12 h-12 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="bg-red-500/20 text-red-500 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">FLASH SALE</div>
                  <h3 className="text-xl font-semibold mb-2">24 Hours Gaming Sale</h3>
                  <p className="text-neutral-300 mb-4">
                    Get an extra 15% off on gaming laptops for the next 24 hours.
                    Plus free gaming mouse with every purchase!
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400">Use Code: <span className="text-yellow-400 font-mono">FLASH15</span></span>
                    <button onClick={handleShopNow} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      Shop Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-l-4 border-yellow-400 group hover:bg-yellow-400/5 transition-all duration-300 hover:border-l-8 hover:border-yellow-300"
            >
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">PREMIUM DEAL</div>
                  <h3 className="text-xl font-semibold mb-2">Premium Bundle Offer</h3>
                  <p className="text-neutral-300 mb-4">
                    Buy any premium laptop and get a wireless mouse, keyboard, and headset at 50% off.
                    Bundle and save big!
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400">Use Code: <span className="text-yellow-400 font-mono">BUNDLE50</span></span>
                    <button onClick={handleShopNow} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      View Bundles
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-l-4 border-yellow-400 group hover:bg-yellow-400/5 transition-all duration-300 hover:border-l-8 hover:border-yellow-300"
            >
              <div className="flex items-start gap-4">
                <Tag className="w-12 h-12 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="bg-green-500/20 text-green-500 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">EXCHANGE OFFER</div>
                  <h3 className="text-xl font-semibold mb-2">Exchange & Upgrade</h3>
                  <p className="text-neutral-300 mb-4">
                    Exchange your old laptop and get up to ₹20,000 off on any new laptop purchase.
                    Plus additional 5% cashback!
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400">Use Code: <span className="text-yellow-400 font-mono">EXCHANGE20</span></span>
                    <button onClick={handleShopNow} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      Check Value
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-l-4 border-yellow-400 group hover:bg-yellow-400/5 transition-all duration-300 hover:border-l-8 hover:border-yellow-300"
            >
              <div className="flex items-start gap-4">
                <Percent className="w-12 h-12 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="bg-purple-500/20 text-purple-500 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">BANK OFFER</div>
                  <h3 className="text-xl font-semibold mb-2">Bank Card Discounts</h3>
                  <p className="text-neutral-300 mb-4">
                    Get additional 10% instant discount on HDFC Bank Cards. Plus 6 months no-cost EMI
                    on all major bank cards!
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400">Use Code: <span className="text-yellow-400 font-mono">HDFC10</span></span>
                    <button onClick={handleShopNow} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      Learn More
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link 
              to="/laptops" 
              className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              View All Offers
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with<br />
                <span className="text-yellow-400">Latest Offers & Tech News</span>
              </h2>
              <p className="text-neutral-300 mb-6">
                Subscribe to our newsletter to receive exclusive offers, tech tips, and updates on the latest products.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="text-sm text-neutral-400 mt-3">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Benefits of Subscribing</h3>
              <ul className="space-y-3">
                {[
                  'Exclusive deals and promotions',
                  'Early access to sales and new products',
                  'Tech tips and tutorials',
                  'Industry news and updates',
                  'Personalized recommendations'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              We pride ourselves on delivering exceptional service and value to our customers.
              Here's what sets us apart.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: 'Best Prices', description: 'Competitive prices on all our products and services' },
              { icon: Shield, title: 'Trusted Service', description: 'Years of experience in providing reliable solutions' },
              { icon: Truck, title: 'Fast Delivery', description: 'Quick and secure delivery of your orders' },
              { icon: Clock, title: 'Expert Support', description: '24/7 technical support for all your needs' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <feature.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Explore our top-selling laptops and accessories, handpicked for quality and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dell XPS 15",
                image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80",
                price: 149999,
                originalPrice: 169999,
                specs: "Intel i7, 16GB RAM, 512GB SSD",
                tag: "Best Seller"
              },
              {
                name: "MacBook Pro M2",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80",
                price: 199999,
                originalPrice: 219999,
                specs: "Apple M2 Pro, 32GB RAM, 1TB SSD",
                tag: "Premium"
              },
              {
                name: "ASUS ROG Zephyrus",
                image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80",
                price: 169999,
                originalPrice: 189999,
                specs: "AMD Ryzen 9, 32GB RAM, 1TB SSD",
                tag: "Gaming"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 bg-yellow-400 text-black px-3 py-1 text-sm font-semibold">
                    {product.tag}
                  </div>
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-neutral-300 mb-3">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-yellow-400">₹{product.price.toLocaleString()}</p>
                      <p className="text-sm text-neutral-400 line-through">₹{product.originalPrice.toLocaleString()}</p>
                    </div>
                    <Link to="/laptops" className="btn-primary py-2">
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/laptops" className="btn-secondary">
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              From hardware solutions to educational support, we offer a comprehensive range of services
              to meet all your computer needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Laptop Sales & Repair',
                description: 'Wide range of laptops and professional repair services',
                features: ['New & Refurbished Laptops', 'Hardware Upgrades', 'Screen Replacement', 'Battery Service'],
                link: '/services'
              },
              {
                title: 'Computer Education',
                description: 'Learn computer basics and advanced skills',
                features: ['Basic Computer Training', 'Software Training', 'Online Form Filling', 'Technical Support'],
                link: '/education'
              },
              {
                title: 'Custom Solutions',
                description: 'Tailored solutions for your specific needs',
                features: ['Custom PC Builds', 'Software Installation', 'Data Recovery', 'Network Setup'],
                link: '/services'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-neutral-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-neutral-300">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={service.link} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our products and services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Software Developer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
                quote: "The laptop I purchased from KM Computers has been exceptional for my development work. The team helped me choose the perfect configuration for my needs."
              },
              {
                name: "Priya Patel",
                role: "College Student",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
                quote: "As a student, I needed an affordable yet powerful laptop. KM Computers not only provided me with great options but also gave me a student discount!"
              },
              {
                name: "Amit Verma",
                role: "Business Owner",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
                quote: "The repair service at KM Computers saved my business data when my laptop crashed. Fast, professional, and reliable service!"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-neutral-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-neutral-300 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-1 mt-4 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
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
            className="glass-card p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help? Contact Us Now!</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Our team of experts is ready to assist you with any computer-related queries or services.
              Get in touch with us today!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Us
                <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="btn-secondary">
                View Services
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}