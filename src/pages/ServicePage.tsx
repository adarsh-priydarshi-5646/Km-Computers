import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  PenTool as Tool, 
  FileText, 
  Monitor, 
  Truck, 
  Phone, 
  ArrowRight, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  HardDrive, 
  Cpu, 
  Battery, 
  Keyboard, 
  Download, 
  Upload, 
  Bug, 
  Settings, 
  Users,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Zap,
  Wifi,
  Database,
  Printer,
  Smartphone,
  Server
} from 'lucide-react';

// Service type definition
type Service = {
  id: number;
  title: string;
  description: string;
  price: string;
  estimatedTime: string;
  icon: React.ElementType;
  benefits: string[];
};

// Review type definition
type Review = {
  id: number;
  name: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
};

export default function ServicePage() {
  // State for booking form
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    description: ''
  });
  
  // State for FAQ accordions
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State for service details
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  // Services data
  const services: Service[] = [
    {
      id: 1,
      title: "Laptop Repair",
      description: "Professional repair services for all laptop brands. We diagnose and fix hardware and software issues to get your laptop running like new.",
      price: "₹500 - ₹5,000",
      estimatedTime: "1-3 days",
      icon: Wrench,
      benefits: [
        "Expert technicians with years of experience",
        "Genuine replacement parts",
        "90-day repair warranty",
        "Free diagnostic assessment"
      ]
    },
    {
      id: 2,
      title: "Data Recovery",
      description: "Recover lost or deleted data from any storage device. Our advanced tools can retrieve data from damaged drives, accidental deletions, and corrupted storage.",
      price: "₹1,500 - ₹8,000",
      estimatedTime: "2-5 days",
      icon: HardDrive,
      benefits: [
        "High success rate for data recovery",
        "Confidential and secure process",
        "Recovery from all storage types",
        "No recovery, no fee policy"
      ]
    },
    {
      id: 3,
      title: "Virus Removal",
      description: "Remove viruses, malware, and spyware from your computer. We'll clean your system and implement security measures to prevent future infections.",
      price: "₹800 - ₹2,500",
      estimatedTime: "1-2 days",
      icon: Bug,
      benefits: [
        "Complete system scan and cleaning",
        "Security software installation",
        "Performance optimization",
        "Preventive measures implementation"
      ]
    },
    {
      id: 4,
      title: "Hardware Upgrade",
      description: "Upgrade your computer components for better performance. From RAM and storage to processors and graphics cards, we can enhance your system.",
      price: "₹1,000 - ₹15,000",
      estimatedTime: "Same day - 2 days",
      icon: Cpu,
      benefits: [
        "Performance assessment before upgrade",
        "Compatible component selection",
        "Professional installation",
        "System optimization after upgrade"
      ]
    },
    {
      id: 5,
      title: "Software Support",
      description: "Installation and configuration of software applications. We handle operating systems, productivity software, and specialized applications.",
      price: "₹500 - ₹3,000",
      estimatedTime: "Same day",
      icon: Settings,
      benefits: [
        "OS installation and updates",
        "Software configuration",
        "Driver installation",
        "User training available"
      ]
    },
    {
      id: 6,
      title: "Network Setup",
      description: "Setup and configuration of home or small business networks. We ensure secure and efficient connectivity for all your devices.",
      price: "₹1,200 - ₹6,000",
      estimatedTime: "1-2 days",
      icon: Wifi,
      benefits: [
        "Wired and wireless network setup",
        "Router configuration",
        "Network security implementation",
        "Device connectivity setup"
      ]
    },
    {
      id: 7,
      title: "Cloud Services",
      description: "Setup and management of cloud storage and backup solutions. Keep your data safe and accessible from anywhere.",
      price: "₹800 - ₹4,000",
      estimatedTime: "1-3 days",
      icon: Database,
      benefits: [
        "Cloud storage setup",
        "Automatic backup configuration",
        "Data synchronization across devices",
        "Security and privacy settings"
      ]
    },
    {
      id: 8,
      title: "Printer Setup",
      description: "Installation and configuration of printers and scanners. We ensure proper connectivity and optimal print quality.",
      price: "₹500 - ₹1,500",
      estimatedTime: "Same day",
      icon: Printer,
      benefits: [
        "Printer hardware setup",
        "Driver installation",
        "Network printing configuration",
        "Print quality optimization"
      ]
    },
    {
      id: 9,
      title: "Mobile Device Support",
      description: "Troubleshooting and repair services for smartphones and tablets. From screen replacements to software issues, we've got you covered.",
      price: "₹600 - ₹5,000",
      estimatedTime: "1-3 days",
      icon: Smartphone,
      benefits: [
        "Screen replacement",
        "Battery replacement",
        "Data transfer and backup",
        "Software troubleshooting"
      ]
    },
    {
      id: 10,
      title: "Server Management",
      description: "Setup, configuration, and maintenance of servers for small businesses. Ensure reliable and secure operation of your business infrastructure.",
      price: "₹3,000 - ₹20,000",
      estimatedTime: "3-7 days",
      icon: Server,
      benefits: [
        "Server hardware setup",
        "Operating system installation",
        "Security implementation",
        "Backup and recovery planning"
      ]
    }
  ];
  
  // Customer reviews
  const reviews: Review[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      service: "Laptop Repair",
      rating: 5,
      date: "June 15, 2025",
      comment: "Excellent service! My laptop was overheating and shutting down randomly. The technician identified the issue quickly and fixed it the same day. Now it runs perfectly without any issues.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Priya Patel",
      service: "Data Recovery",
      rating: 5,
      date: "May 28, 2025",
      comment: "I accidentally deleted important files from my thesis project. I was devastated until KM Computers recovered everything! Their data recovery service saved my academic career. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Amit Verma",
      service: "Virus Removal",
      rating: 4,
      date: "April 10, 2025",
      comment: "My computer was extremely slow due to viruses. The team at KM Computers removed all malware and optimized my system. It's now running much faster. The only reason for 4 stars is that it took a bit longer than expected.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      service: "Hardware Upgrade",
      rating: 5,
      date: "March 22, 2025",
      comment: "I needed more RAM and an SSD for my aging laptop. The upgrade has transformed my computer - it's like having a new machine! The technician explained everything clearly and completed the work quickly.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "Vikram Singh",
      service: "Network Setup",
      rating: 5,
      date: "February 15, 2025",
      comment: "Had my home office network set up by KM Computers. The technician was knowledgeable and ensured all my devices were properly connected. The Wi-Fi coverage is now excellent throughout my house.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      name: "Neha Kapoor",
      service: "Software Support",
      rating: 4,
      date: "January 30, 2025",
      comment: "Needed help with software installation and configuration for my design work. The support was thorough and they even provided some useful tips for optimizing my workflow. Very satisfied with the service.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: "How long does a typical laptop repair take?",
      answer: "Most laptop repairs are completed within 1-3 business days, depending on the issue and availability of parts. Simple repairs like RAM upgrades or software fixes can often be done the same day. For complex repairs requiring special parts, it may take up to 5 business days. We'll provide you with an estimated timeframe when you bring in your device."
    },
    {
      question: "Do you offer on-site services for businesses?",
      answer: "Yes, we offer on-site services for businesses within a 25km radius of our location. Our technicians can come to your office to handle repairs, upgrades, network setup, and maintenance. For businesses, we also offer service contracts with priority support and discounted rates. Please contact us for a customized quote based on your specific needs."
    },
    {
      question: "What is your data recovery success rate?",
      answer: "Our data recovery success rate is approximately 85-90% for most common scenarios like accidental deletion, formatting, or minor physical damage. However, success rates vary depending on the extent of damage, the storage device type, and how the data was lost. We perform a free diagnostic assessment before proceeding with recovery and follow a 'no recovery, no fee' policy for most cases."
    },
    {
      question: "Do you provide warranty on repairs?",
      answer: "Yes, all our repairs come with a 90-day warranty covering both parts and labor. If the same issue recurs within the warranty period, we'll fix it at no additional cost. For hardware upgrades, the manufacturer's warranty on the components also applies. We use only genuine or high-quality compatible parts for all repairs to ensure reliability and longevity."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including cash, credit/debit cards, UPI payments (Google Pay, PhonePe, Paytm), net banking, and EMI options for larger purchases. For businesses, we also offer invoicing with payment terms. All our services are GST compliant, and proper invoices are provided for all transactions."
    }
  ];
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Service booking request submitted! We will contact you shortly to confirm your appointment.');
    // Reset form
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      description: ''
    });
  };
  
  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  // Toggle service details
  const toggleServiceDetails = (id: number) => {
    setSelectedService(selectedService === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80"
            alt="Computer Service"
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
              Expert Computer<br />
              <span className="text-yellow-400">Services & Support</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              From hardware repairs to software solutions, we provide comprehensive
              computer services to keep your devices running smoothly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#booking" className="btn-primary">
                Book a Service
                <ArrowRight size={20} />
              </a>
              <a href="#services" className="btn-secondary">
                View Services
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20">
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
              We offer a comprehensive range of computer services to meet all your technology needs.
              Our expert technicians are here to help with any computer-related issues.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:bg-neutral-800/30 transition-colors"
              >
                <service.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-neutral-300 mb-4">{service.description}</p>
                <div className="flex justify-between items-center text-sm text-neutral-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{service.estimatedTime}</span>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-400">{service.price}</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleServiceDetails(service.id)}
                  className="btn-primary w-full justify-center"
                >
                  View Details
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => window.location.href = '#all-services'}
              className="btn-secondary"
            >
              View All Services
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedService(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-auto glass-card"
            onClick={e => e.stopPropagation()}
          >
            {services.filter(s => s.id === selectedService).map(service => (
              <div key={service.id} className="p-6">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
                
                <div className="flex items-start gap-4 mb-6">
                  <service.icon className="w-12 h-12 text-yellow-400" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{service.title}</h3>
                    <p className="text-neutral-400">{service.price} • {service.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-neutral-300">{service.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Benefits</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-neutral-300">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <a href="#booking" className="btn-primary" onClick={() => setSelectedService(null)}>
                    Book This Service
                    <ArrowRight size={20} />
                  </a>
                  <button className="btn-secondary" onClick={() => setSelectedService(null)}>
                    Close
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* All Services Section */}
      <section id="all-services" className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Services</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Browse our complete range of services with detailed pricing and estimated completion times.
              Click on any service to see more details or book an appointment.
            </p>
          </motion.div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-800/50">
                    <th className="px-6 py-4 text-left">Service</th>
                    <th className="px-6 py-4 text-left">Description</th>
                    <th className="px-6 py-4 text-left">Price Range</th>
                    <th className="px-6 py-4 text-left">Est. Time</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <service.icon className="w-5 h-5 text-yellow-400" />
                          <span className="font-medium">{service.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-300 max-w-xs truncate">{service.description}</td>
                      <td className="px-6 py-4 text-yellow-400">{service.price}</td>
                      <td className="px-6 py-4 text-neutral-300">{service.estimatedTime}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleServiceDetails(service.id)}
                          className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors text-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Build Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Custom-Built Laptops<br />
                <span className="text-yellow-400">Tailored to Your Needs</span>
              </h2>
              <p className="text-neutral-300 mb-8">
                Get a laptop that perfectly matches your requirements. Whether you need a
                powerful gaming machine or a reliable workstation, we'll build it for you.
              </p>
              <div className="space-y-4">
                {[
                  { 
                    icon: Laptop, 
                    title: 'Gaming Laptops', 
                    desc: 'High-performance gaming machines with top-tier GPUs, fast processors, and high refresh rate displays.',
                    price: 'Starting at ₹85,000'
                  },
                  { 
                    icon: Monitor, 
                    title: 'Business Laptops', 
                    desc: 'Reliable workstations with long battery life, security features, and business-grade durability.',
                    price: 'Starting at ₹65,000'
                  },
                  { 
                    icon: FileText, 
                    title: 'Student Laptops', 
                    desc: 'Affordable options for education with good battery life and essential performance for coursework.',
                    price: 'Starting at ₹45,000'
                  },
                  { 
                    icon: Zap, 
                    title: 'Creator Laptops', 
                    desc: 'Specialized machines for creative professionals with color-accurate displays and powerful graphics.',
                    price: 'Starting at ₹95,000'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 glass-card p-4">
                    <div className="p-2 bg-yellow-400/10 rounded-lg">
                      <item.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{item.title}</h3>
                        <span className="text-sm text-yellow-400">{item.price}</span>
                      </div>
                      <p className="text-sm text-neutral-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-primary mt-8">
                Build Your Laptop
                <ArrowRight size={20} />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&q=80"
                alt="Custom Laptop Build"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-2">Custom Build Process</h3>
                  <ol className="space-y-1 text-sm text-neutral-300">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs">1</span>
                      Consultation to understand your needs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs">2</span>
                      Component selection and configuration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs">3</span>
                      Assembly and quality testing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs">4</span>
                      Software setup and optimization
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Booking Section */}
      <section id="booking" className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Service</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Schedule a service appointment with our expert technicians.
              Fill out the form below, and we'll contact you to confirm your booking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Service Request Form</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={bookingForm.email}
                      onChange={handleInputChange}
                 className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Service Type
                  </label>
                  <select
                    name="service"
                    required
                    value={bookingForm.service}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                    <option value="Other">Other (please specify)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      required
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    >
                      <option value="">Select a time</option>
                      <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                      <option value="Afternoon (12PM - 3PM)">Afternoon (12PM - 3PM)</option>
                      <option value="Evening (3PM - 6PM)">Evening (3PM - 6PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Issue Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={bookingForm.description}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    placeholder="Please describe the issue you're experiencing..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Submit Service Request
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6">Service Process</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Book an Appointment",
                      description: "Fill out the service request form or call us to schedule a convenient time."
                    },
                    {
                      step: 2,
                      title: "Diagnostic Assessment",
                      description: "Our technicians will examine your device and identify the issues."
                    },
                    {
                      step: 3,
                      title: "Service Quote",
                      description: "We'll provide a detailed quote with pricing and estimated completion time."
                    },
                    {
                      step: 4,
                      title: "Service Execution",
                      description: "Upon approval, our experts will perform the necessary repairs or services."
                    },
                    {
                      step: 5,
                      title: "Quality Testing",
                      description: "We thoroughly test all repairs to ensure everything works perfectly."
                    },
                    {
                      step: 6,
                      title: "Pickup & Support",
                      description: "Collect your device and receive guidance on preventing future issues."
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-semibold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-neutral-300 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6">Emergency Services</h3>
                <p className="text-neutral-300 mb-6">
                  Need urgent help? We offer emergency services for critical situations.
                  Call our emergency hotline for immediate assistance.
                </p>
                <div className="flex items-center gap-4 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                  <Phone className="w-10 h-10 text-yellow-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Emergency Hotline</p>
                    <p className="text-xl font-semibold text-yellow-400">+91 9198919229</p>
                    <p className="text-xs text-neutral-400">Available 24/7 for urgent issues</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Reviews</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Don't just take our word for it. See what our satisfied customers have to say about our services.
              We pride ourselves on delivering exceptional quality and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-neutral-400">{review.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      fill={star <= review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="ml-2 text-sm text-neutral-400">{review.date}</span>
                </div>
                <p className="text-neutral-300">{review.comment}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="#" className="btn-secondary">
              View All Reviews
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-neutral-900/50">
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
              We pride ourselves on delivering exceptional service and support.
              Here's what sets us apart from the competition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Expert Technicians',
                description: 'Our technicians are certified professionals with years of experience in computer repair and service.'
              },
              {
                icon: Clock,
                title: 'Quick Service',
                description: 'We understand the importance of your time and strive to provide fast turnaround for all repairs.'
              },
              {
                icon: Tool,
                title: 'Quality Parts',
                description: 'We use only genuine or high-quality compatible replacement parts for all repairs.'
              },
              {
                icon: Truck,
                title: 'Doorstep Service',
                description: "Can't come to us? We offer pickup and delivery services for your convenience."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:bg-neutral-800/30 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Find answers to common questions about our services, pricing, and processes.
              If you don't see your question here, feel free to contact us.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card mb-4 overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                </div>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 border-t border-neutral-800"
                  >
                    <p className="text-neutral-300 pt-4">{faq.answer}</p>
                  </motion.div>
                )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Our expert team is ready to assist you with any computer-related issues.
              Get in touch with us today!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#booking" className="btn-primary">
                Book a Service
                <ArrowRight size={20} />
              </a>
              <Link to="/contact" className="btn-secondary">
                Contact Support
                <MessageSquare size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}