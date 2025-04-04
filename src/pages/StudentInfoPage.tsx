import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    phone: '',
    verificationCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, any verification code will work
    if (studentInfo.verificationCode) {
      navigate('/instructions', { state: { course, studentInfo } });
    } else {
      alert('Please enter a verification code');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#3A1C71]">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative min-h-[35vh] w-full flex items-center justify-center pt-24">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
              alt="Examination Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 to-[#3A1C71]/80" />
          </div>
          <div className="relative z-10 text-center px-4 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
            >
              Student Information
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Please provide your details to continue
            </motion.p>
          </div>
        </div>

        {/* Student Info Form */}
        <div className="max-w-2xl mx-auto mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-neutral-800 text-white"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-neutral-800 text-white"
                value={studentInfo.email}
                onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-300">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-neutral-800 text-white"
                value={studentInfo.phone}
                onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-neutral-300">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-neutral-800 text-white"
                value={studentInfo.verificationCode}
                onChange={(e) => setStudentInfo({ ...studentInfo, verificationCode: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoPage; 