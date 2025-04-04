import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
            alt="Contact Us"
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
              Get in Touch<br />
              <span className="text-yellow-400">We're Here to Help</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: 'Phone',
                info: '+1 (234) 567-890',
                subInfo: 'Mon-Sat 9am to 6pm'
              },
              {
                icon: Mail,
                title: 'Email',
                info: 'support@kmcomputers.com',
                subInfo: '24/7 Online Support'
              },
              {
                icon: MapPin,
                title: 'Location',
                info: '123 Tech Street',
                subInfo: 'Digital City, 12345'
              },
              {
                icon: Clock,
                title: 'Working Hours',
                info: 'Mon - Sat: 9AM to 6PM',
                subInfo: 'Sunday: Closed'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:bg-neutral-800/30 transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-400/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-300">{item.info}</p>
                <p className="text-sm text-neutral-400">{item.subInfo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gNzPCsDU4JzQ4LjAiVw!5e0!3m2!1sen!2sus!4v1635787400!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and support.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: 'What are the working hours?',
                answer: 'We are open Monday through Saturday from 9 AM to 6 PM. We are closed on Sundays and major holidays.'
              },
              {
                question: 'Do you offer emergency services?',
                answer: 'Yes, we offer emergency technical support services. Contact our 24/7 helpline for urgent assistance.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, UPI payments, net banking, and cash payments.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 mb-4"
              >
                <div className="flex gap-4">
                  <MessageSquare className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-neutral-300">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect With Us</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Follow us on social media for updates, tech tips, and special offers.
            </p>
          </motion.div>

          <div className="flex justify-center gap-8">
            {[
              { icon: Facebook, label: 'Facebook', link: '#' },
              { icon: Instagram, label: 'Instagram', link: '#' },
              { icon: Twitter, label: 'Twitter', link: '#' },
              { icon: Linkedin, label: 'LinkedIn', link: '#' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 glass-card rounded-full hover:bg-neutral-800/30 transition-colors group"
              >
                <social.icon className="w-6 h-6 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
              </motion.a>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Contact us now for expert computer services and support.
              We're here to help you with all your tech needs!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Schedule Service
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                Live Chat
                <MessageSquare size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}