import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, FileText, PlayCircle, HelpCircle, CheckCircle2, ArrowRight, Clock, Download, Cpu, Monitor, HardDrive, Wifi, Shield, Zap, Award, Bookmark, ChevronDown, ChevronUp, Lightbulb, Smartphone, Server, Database, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

// Quiz type definitions
type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function EducationPage() {
  // State for quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  // State for FAQ accordions
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State for hardware guides
  const [openHardwareGuide, setOpenHardwareGuide] = useState<number | null>(null as number | null);
  
  // State for exam system
  const [showExamSystem, setShowExamSystem] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState({
    studentName: '',
    courseName: '',
    score: 0,
    completionDate: ''
  });
  
  // Quiz questions
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the main function of a CPU?",
      options: [
        "Store data permanently",
        "Process instructions and perform calculations",
        "Display graphics on the screen",
        "Connect to the internet"
      ],
      correctAnswer: 1
    },
    {
      question: "Which component stores data temporarily while a computer is running?",
      options: [
        "Hard Drive",
        "CPU",
        "RAM",
        "Graphics Card"
      ],
      correctAnswer: 2
    },
    {
      question: "What does SSD stand for?",
      options: [
        "System Storage Drive",
        "Solid State Drive",
        "Super Speed Disk",
        "System Software Directory"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT an operating system?",
      options: [
        "Windows",
        "macOS",
        "Linux",
        "Microsoft Office"
      ],
      correctAnswer: 3
    },
    {
      question: "What is the purpose of a firewall?",
      options: [
        "Cool down the computer",
        "Increase processing speed",
        "Protect against unauthorized access",
        "Improve display resolution"
      ],
      correctAnswer: 2
    }
  ];
  
  // Hardware guides
  const hardwareGuides = [
    {
      title: "Understanding Computer Components",
      icon: Cpu,
      content: "Learn about the essential components that make up a computer system, including the motherboard, CPU, RAM, storage devices, and power supply. Understand how these components work together to create a functioning computer.",
      details: "The motherboard is the main circuit board that connects all components. The CPU (Central Processing Unit) is the brain of the computer, executing instructions. RAM (Random Access Memory) provides temporary storage for active programs. Storage devices like SSDs and HDDs store data permanently. The power supply converts AC power to DC power for the components."
    },
    {
      title: "Display Technologies Explained",
      icon: Monitor,
      content: "Explore different display technologies including LCD, LED, OLED, and IPS panels. Learn about resolution, refresh rates, and color accuracy to make informed decisions when purchasing a monitor.",
      details: "LCD (Liquid Crystal Display) uses liquid crystals to produce images. LED displays are LCDs with LED backlighting for better energy efficiency. OLED (Organic Light Emitting Diode) displays produce their own light for perfect blacks and better contrast. IPS (In-Plane Switching) panels offer better color accuracy and viewing angles. Resolution refers to the number of pixels (e.g., 1920x1080 for Full HD), while refresh rate (measured in Hz) indicates how many times per second the screen updates."
    },
    {
      title: "Storage Solutions",
      icon: HardDrive,
      content: "Compare different storage options including HDDs, SSDs, NVMe drives, and external storage solutions. Understand the pros and cons of each technology and how to choose the right storage for your needs.",
      details: "HDDs (Hard Disk Drives) use magnetic platters and are more affordable but slower. SSDs (Solid State Drives) use flash memory with no moving parts, offering faster speeds and better reliability. NVMe (Non-Volatile Memory Express) drives connect directly to the PCIe bus for even faster speeds. External storage includes USB drives, external HDDs/SSDs, and network-attached storage (NAS) for backups and additional space."
    },
    {
      title: "Networking Fundamentals",
      icon: Wifi,
      content: "Learn about networking concepts including LAN, WAN, Wi-Fi standards, Ethernet, IP addressing, and basic troubleshooting for connectivity issues.",
      details: "LAN (Local Area Network) connects devices within a limited area like a home or office. WAN (Wide Area Network) connects LANs across larger distances. Wi-Fi standards (802.11n, ac, ax/Wi-Fi 6) determine speed and range capabilities. Ethernet provides wired connectivity with various speeds (100Mbps, 1Gbps, 10Gbps). IP addresses uniquely identify devices on a network, with IPv4 (e.g., 192.168.1.1) and IPv6 addressing systems."
    },
    {
      title: "Computer Security Essentials",
      icon: Shield,
      content: "Discover essential security practices including antivirus software, firewalls, secure passwords, two-factor authentication, and safe browsing habits to protect your digital life.",
      details: "Antivirus software detects and removes malware. Firewalls monitor and filter network traffic. Strong passwords should be unique, long, and complex. Two-factor authentication adds an extra layer of security beyond passwords. Safe browsing includes checking for HTTPS, avoiding suspicious links, and being cautious with downloads and email attachments."
    }
  ];
  
  // Software guides
  const softwareGuides = [
    {
      title: "Operating System Basics",
      icon: Zap,
      content: "Learn about different operating systems (Windows, macOS, Linux) and their features, advantages, and basic operations."
    },
    {
      title: "Productivity Software",
      icon: FileText,
      content: "Master essential productivity tools including Microsoft Office, Google Workspace, and alternatives for document creation, spreadsheets, and presentations."
    },
    {
      title: "Creative Software",
      icon: PenTool,
      content: "Explore creative applications for photo editing, video production, graphic design, and digital art."
    },
    {
      title: "Cloud Services",
      icon: Database,
      content: "Understand cloud storage, backup solutions, and synchronization services to keep your data safe and accessible."
    },
    {
      title: "Mobile Applications",
      icon: Smartphone,
      content: "Discover essential mobile apps that complement desktop software and enhance productivity on the go."
    }
  ];
  
  // Blog posts
  const blogPosts = [
    {
      title: "How to Choose the Right Laptop for Your Needs",
      date: "June 15, 2025",
      excerpt: "Navigating the many options when buying a laptop can be overwhelming. This guide breaks down the key factors to consider based on your specific use case.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80"
    },
    {
      title: "The Future of Computing: Trends to Watch",
      date: "May 28, 2025",
      excerpt: "From quantum computing to AI-powered devices, explore the emerging technologies that will shape the future of personal and business computing.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
    },
    {
      title: "Essential Software for Students in 2025",
      date: "April 10, 2025",
      excerpt: "Discover the must-have applications and tools that can help students excel in their studies, from note-taking apps to research assistants.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80"
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: "What basic computer skills should I learn first?",
      answer: "Start with operating system basics (navigating files, using the interface), then learn essential software like word processing and web browsers. Understanding email, internet safety, and basic troubleshooting are also important foundational skills."
    },
    {
      question: "How long does it take to become proficient in Microsoft Office?",
      answer: "Basic proficiency can be achieved in 2-4 weeks with regular practice. Mastering advanced features may take 2-3 months. Our structured courses can help you learn efficiently with hands-on exercises and real-world applications."
    },
    {
      question: "Do you offer personalized learning plans?",
      answer: "Yes, we provide customized learning paths based on your current skill level, goals, and available time. Our instructors will assess your needs and create a tailored curriculum that focuses on the skills most relevant to you."
    },
    {
      question: "What's the difference between HDD and SSD storage?",
      answer: "HDDs (Hard Disk Drives) use magnetic storage and mechanical parts, offering more storage for less money but slower speeds. SSDs (Solid State Drives) use flash memory with no moving parts, providing faster performance, better reliability, and less power consumption, but at a higher cost per gigabyte."
    },
    {
      question: "How can I protect my computer from viruses?",
      answer: "Use reputable antivirus software and keep it updated. Keep your operating system and applications updated with security patches. Be cautious with email attachments and downloads. Use strong, unique passwords and consider a password manager. Regularly back up your important data to an external device or cloud storage."
    }
  ];
  
  // Handle quiz answer selection
  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    // Check if answer is correct
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Delay to show next question
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };
  
  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };
  
  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  // Toggle hardware guide
  const toggleHardwareGuide = (index: number) => {
    setOpenHardwareGuide(openHardwareGuide === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
            alt="Computer Education"
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
              Learn & Grow with<br />
              <span className="text-yellow-400">KM Computers!</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Master computer basics, software skills, and online form filling with our expert guidance.
              Start your learning journey today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">
                Start Learning
                <ArrowRight size={20} />
              </button>
              <a href="#resources" className="btn-secondary">
                Free Resources
                <Download size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Paths</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Choose a structured learning path tailored to your goals and current skill level.
              From complete beginners to advanced users, we have courses for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Computer Basics",
                icon: Monitor,
                level: "Beginner",
                duration: "4 Weeks",
                description: "Perfect for absolute beginners. Learn computer fundamentals, basic operations, and essential software.",
                topics: ["Hardware Basics", "Windows/macOS Navigation", "Internet & Email", "File Management"]
              },
              {
                title: "Office Productivity",
                icon: FileText,
                level: "Intermediate",
                duration: "6 Weeks",
                description: "Master essential productivity software for work and study. Become proficient in document creation and data management.",
                topics: ["Microsoft Word", "Excel Spreadsheets", "PowerPoint Presentations", "Google Workspace"]
              },
              {
                title: "Digital Literacy",
                icon: Lightbulb,
                level: "All Levels",
                duration: "8 Weeks",
                description: "Comprehensive program covering both basics and advanced topics for complete digital proficiency.",
                topics: ["Computer Essentials", "Online Security", "Digital Communication", "Cloud Services"]
              }
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <path.icon className="w-12 h-12 text-yellow-400" />
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400">{path.level}</span>
                    <span className="text-sm text-neutral-400 mt-1 flex items-center gap-1">
                      <Clock size={14} />
                      {path.duration}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                <p className="text-neutral-300 mb-4">{path.description}</p>
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-neutral-400 mb-2">TOPICS COVERED:</h4>
                  <ul className="space-y-1">
                    {path.topics.map((topic, tIndex) => (
                      <li key={tIndex} className="flex items-center gap-2 text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn-primary w-full justify-center">
                  Enroll Now
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Guides Section */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hardware Guides</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Understanding computer hardware is essential for troubleshooting, upgrades, and making informed purchasing decisions.
              Explore our comprehensive hardware guides.
            </p>
          </motion.div>

          <div className="space-y-6">
            {hardwareGuides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleHardwareGuide(index)}
                >
                  <div className="flex items-start gap-4">
                    <guide.icon className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{guide.title}</h3>
                        {openHardwareGuide === index ? (
                          <ChevronUp className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-neutral-300 mt-2">{guide.content}</p>
                    </div>
                  </div>
                </div>
                
                {openHardwareGuide === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 pt-2 border-t border-neutral-800"
                  >
                    <div className="pl-12">
                      <p className="text-neutral-300 mb-4">{guide.details}</p>
                      <div className="flex gap-4">
                        <button className="btn-secondary py-2 text-sm">
                          Download Guide
                          <Download size={16} />
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 text-sm">
                          View Related Videos
                          <PlayCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Guides Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Software Guides</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Master essential software applications for productivity, creativity, and everyday tasks.
              Our guides cover everything from basic operations to advanced techniques.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareGuides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:bg-neutral-800/30 transition-colors"
              >
                <guide.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-neutral-300 mb-4">{guide.content}</p>
                <button className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Form Filling Guide */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Online Form Filling Guide</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Learn how to fill various online forms with our step-by-step guidance.
              From government documents to job applications, we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Government Forms',
                icon: FileText,
                forms: ['Aadhar Card', 'PAN Card', 'Passport', 'Voter ID', 'Income Tax Returns', 'Property Registration'],
                description: "Navigate complex government forms with ease. Our experts guide you through each field, ensuring accurate information and proper documentation."
              },
              {
                title: 'Educational Forms',
                icon: BookOpen,
                forms: ['College Admission', 'Scholarship', 'Exam Registration', 'Course Enrollment', 'Education Loans', 'Transfer Certificates'],
                description: "Don't miss application deadlines or make costly mistakes. Get help with educational forms to secure admissions, scholarships, and more."
              },
              {
                title: 'Employment Forms',
                icon: FileText,
                forms: ['Job Applications', 'Resume Building', 'LinkedIn Profile', 'Professional Certificates', 'Employment Verification', 'Retirement Benefits'],
                description: "Make a strong impression with perfectly completed employment forms. From job applications to professional profiles, we help you stand out."
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <category.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-neutral-300 mb-4">{category.description}</p>
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-neutral-400 mb-2">FORMS WE HELP WITH:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {category.forms.map((form, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                        {form}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn-primary w-full justify-center">
                  Get Assistance
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Quiz Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Test Your Knowledge</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Take our quick computer knowledge quiz to test your understanding of basic computer concepts.
              It's a fun way to identify areas where you might want to learn more!
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              {showScore ? (
                <div className="text-center">
                  <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                  <p className="text-xl mb-6">
                    You scored <span className="text-yellow-400 font-bold">{score}</span> out of {quizQuestions.length}
                  </p>
                  <div className="mb-8">
                    {score === quizQuestions.length ? (
                      <p className="text-green-400">Perfect score! You have excellent computer knowledge!</p>
                    ) : score >= quizQuestions.length * 0.7 ? (
                      <p className="text-green-400">Great job! You have good computer knowledge.</p>
                    ) : score >= quizQuestions.length * 0.5 ? (
                      <p className="text-yellow-400">Not bad! You have a basic understanding of computers.</p>
                    ) : (
                      <p className="text-red-400">You might want to explore our computer basics courses to improve your knowledge.</p>
                    )}
                  </div>
                  <button 
                    onClick={resetQuiz}
                    className="btn-primary"
                  >
                    Take Quiz Again
                    <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Question {currentQuestion + 1}/{quizQuestions.length}</h3>
                    <span className="text-sm text-neutral-400">Score: {score}</span>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-lg mb-6">{quizQuestions[currentQuestion].question}</p>
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerClick(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            selectedAnswer === null
                              ? 'bg-neutral-800 hover:bg-neutral-700'
                              : selectedAnswer === index
                                ? index === quizQuestions[currentQuestion].correctAnswer
                                  ? 'bg-green-500/20 border border-green-500'
                                  : 'bg-red-500/20 border border-red-500'
                                : index === quizQuestions[currentQuestion].correctAnswer && selectedAnswer !== null
                                  ? 'bg-green-500/20 border border-green-500'
                                  : 'bg-neutral-800 opacity-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-sm">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="resources" className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Tech Articles</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Stay updated with our latest articles on technology trends, tips, and tutorials.
              Expand your knowledge with our free educational resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-48">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 bg-yellow-400 text-black px-3 py-1 text-sm font-semibold">
                    Article
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-neutral-400 mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-neutral-300 mb-4">{post.excerpt}</p>
                  <Link to="#" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                    Read Full Article
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="btn-secondary">
              View All Articles
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Tutorials</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Learn at your own pace with our comprehensive video tutorials.
              Watch, practice, and master new skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Computer Basics for Beginners',
                duration: '45 minutes',
                thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
                lessons: 12,
                level: 'Beginner'
              },
              {
                title: 'Microsoft Office Essentials',
                duration: '60 minutes',
                thumbnail: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&q=80',
                lessons: 18,
                level: 'Intermediate'
              },
              {
                title: 'Online Form Filling Guide',
                duration: '30 minutes',
                thumbnail: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80',
                lessons: 8,
                level: 'Beginner'
              },
              {
                title: 'Troubleshooting Common PC Issues',
                duration: '55 minutes',
                thumbnail: 'https://images.unsplash.com/photo-1539683255143-73a6b838b106?auto=format&fit=crop&q=80',
                lessons: 14,
                level: 'Intermediate'
              },
              {
                title: 'Internet Security Fundamentals',
                duration: '40 minutes',
                thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80',
                lessons: 10,
                level: 'All Levels'
              },
              {
                title: 'Cloud Storage & Backup Solutions',
                duration: '35 minutes',
                thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
                lessons: 9,
                level: 'Beginner'
              }
            ].map((video, index) => (
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
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="w-16 h-16 text-yellow-400" />
                  </div>
                  <div className="absolute top-0 left-0 bg-yellow-400 text-black px-3 py-1 text-sm font-semibold">
                    {video.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
                    <p className="flex items-center gap-1">
                      <Clock size={14} />
                      {video.duration}
                    </p>
                    <p className="flex items-center gap-1">
                      <Bookmark size={14} />
                      {video.lessons} Lessons
                    </p>
                  </div>
                  <button className="btn-primary w-full justify-center py-2 text-sm">
                    Watch Tutorial
                    <PlayCircle size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-900/50">
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
              Find answers to common questions about our computer education and form filling services.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Join our computer education program today and take the first step towards digital literacy.
              Expert guidance and practical training await you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Enroll Now
                <ArrowRight size={20} />
              </button>
              <Link to="/contact" className="btn-secondary">
                Contact Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}