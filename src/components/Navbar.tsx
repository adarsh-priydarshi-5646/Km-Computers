import { Menu, X, Laptop, Wrench, Info, Phone, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/50 backdrop-blur-md border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Laptop className="w-6 h-6" />
            <span>KM Computers</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link>
            <Link to="/education" className="text-neutral-300 hover:text-white transition-colors">Education</Link>
            <Link to="/laptops" className="text-neutral-300 hover:text-white transition-colors">Laptops</Link>
            <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">Services</Link>
            <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link>
            <Link to="/examination" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Exam
            </Link>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900"
          >
            <div className="px-4 py-4 space-y-4">
              <Link to="/" className="block text-neutral-300 hover:text-white transition-colors">Home</Link>
              <Link to="/education" className="block text-neutral-300 hover:text-white transition-colors">Education</Link>
              <Link to="/laptops" className="block text-neutral-300 hover:text-white transition-colors">Laptops</Link>
              <Link to="/services" className="block text-neutral-300 hover:text-white transition-colors">Services</Link>
              <Link to="/about" className="block text-neutral-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="block text-neutral-300 hover:text-white transition-colors">Contact</Link>
              <Link to="/examination" className="block text-neutral-300 hover:text-white transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Exam
              </Link>
              <Link to="/login" className="btn-primary w-full justify-center">Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}