import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  Code2,
  Github,
  Linkedin,
  Briefcase,
  Award,
  Star,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-yellow-400">KM Computers</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Your trusted partner in computer solutions since 2010. We provide
            expert guidance, quality products, and exceptional service to meet
            all your technology needs.
          </p>
        </motion.div>

        {/* Shop Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-yellow-400" />
            <h2 className="text-3xl font-bold">Shop Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">
                  123 Tech Street, Silicon Valley, Bangalore
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">
                  Mon-Sat: 10:00 AM - 8:00 PM
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">+91 9198919229</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">info@kmcomputers.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">
                  ISO 9001:2015 Certified
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">4.8/5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-yellow-400" />
                <span className="text-neutral-300">13+ Years Experience</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Owner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Owner Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">Mr. Ajay Kumar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">Founder & CEO</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">info@kmcomputers.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">+91 9198919229</span>
                </div>
              </div>
              <p className="mt-4 text-neutral-300">
                With over 15 years of experience in the computer hardware
                industry, Mr. Ajay Kumar founded KM Computers in 2010. His
                vision is to provide high-quality computer solutions with
                exceptional customer service.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Website Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQHPTdy_-5e4Yg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719745768443?e=1749081600&v=beta&t=gX2RVYqRsMrgLfckQfQUDOqEsoqjd1VWGHmYEmgZBjM"
                alt="Creator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                Website Creator and  Retail & Customer Service Manager
              </h2>
            <div>
              <h3 className=" text-xl font-bold">KM Computers</h3>
            </div><br />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">Adarsh Priydarshi</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">B.Tech CSE and (AI/Ml)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">Full Stack Developer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span className="text-neutral-300">
                    adarshpriydarshi5646@gmail.com
                  </span>
                </div>
              </div>

              <p className="mt-4 text-neutral-300">
                A passionate developer with expertise in modern web
                technologies. Specialized in creating responsive and
                user-friendly web applications with a focus on performance and
                user experience.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://github.com/adarsh-priydarshi-5646"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/adarsh-priydarshi-536430316/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
