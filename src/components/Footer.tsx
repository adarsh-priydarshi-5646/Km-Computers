import { Facebook, Instagram, Mail, MapPin, Phone, Apple as WhatsApp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-900/50 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">KM Computers</h3>
          <p className="text-neutral-300">Your one-stop solution for all computer needs. Quality service guaranteed.</p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/education" className="text-neutral-300 hover:text-white transition-colors">Education</Link></li>
            <li><Link to="/laptops" className="text-neutral-300 hover:text-white transition-colors">Laptops</Link></li>
            <li><Link to="/services" className="text-neutral-300 hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+1234567890" className="text-neutral-300 hover:text-white transition-colors">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:info@kmcomputers.com" className="text-neutral-300 hover:text-white transition-colors">info@kmcomputers.com</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="text-neutral-300">123 Tech Street, Digital City</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="text-neutral-300 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-neutral-300 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-neutral-300 hover:text-white transition-colors">
              <WhatsApp size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-neutral-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-neutral-400">
          © {new Date().getFullYear()} KM Computers. All rights reserved.
        </div>
      </div>
    </footer>
  );
}