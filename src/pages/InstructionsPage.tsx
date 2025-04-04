import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { course, studentInfo } = location.state || {};

  const handleStartExam = () => {
    navigate('/questions', { state: { course, studentInfo } });
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
              Examination Instructions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Please read the instructions carefully before starting
            </motion.p>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-3xl mx-auto mt-8 bg-neutral-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Important Instructions</h2>
          <ul className="space-y-4 text-neutral-300">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              The examination consists of {course?.questions?.length || 0} multiple-choice questions.
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              You have 60 minutes to complete the examination.
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              Each question carries equal marks.
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              You can navigate between questions using the "Next" and "Previous" buttons.
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              You can mark questions for review and come back to them later.
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              Once you submit the examination, you cannot go back to change your answers.
            </li>
          </ul>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleStartExam}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Start Examination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage; 