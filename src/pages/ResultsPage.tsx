import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, studentInfo, score, totalQuestions } = location.state || {};

  const percentage = ((score || 0) / (totalQuestions || 1)) * 100;
  const isPassed = percentage >= 60;

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
              Examination Results
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Congratulations on completing the examination!
            </motion.p>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-neutral-800/50 rounded-lg p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {isPassed ? 'Congratulations!' : 'Better Luck Next Time'}
              </h2>
              <p className="text-neutral-300">
                {isPassed
                  ? 'You have successfully passed the examination.'
                  : 'You need to score at least 60% to pass.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-neutral-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Student Details</h3>
                <div className="space-y-2 text-neutral-300">
                  <p>Name: {studentInfo?.name}</p>
                  <p>Email: {studentInfo?.email}</p>
                  <p>Phone: {studentInfo?.phone}</p>
                </div>
              </div>

              <div className="bg-neutral-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Course Details</h3>
                <div className="space-y-2 text-neutral-300">
                  <p>Course: {course?.name}</p>
                  <p>Total Questions: {totalQuestions}</p>
                  <p>Score: {score}/{totalQuestions}</p>
                  <p>Percentage: {percentage.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/examination')}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Take Another Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 