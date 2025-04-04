import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { course, studentInfo } = location.state || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, timerActive]);

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < (course?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setTimerActive(false);
    let score = 0;
    course?.questions?.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    navigate('/results', {
      state: {
        course,
        studentInfo,
        score,
        totalQuestions: course?.questions?.length || 0,
      },
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
              Examination Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Answer all questions carefully
            </motion.p>
          </div>
        </div>

        {/* Question Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-yellow-400 font-semibold">
              Question {currentQuestionIndex + 1} of {course?.questions?.length || 0}
            </div>
            <div className="text-red-400 font-semibold">
              Time Remaining: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="bg-neutral-800/50 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-300 mb-4">
                {course?.questions?.[currentQuestionIndex]?.question}
              </h3>
              <div className="space-y-3">
                {course?.questions?.[currentQuestionIndex]?.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      answers[currentQuestionIndex] === option
                        ? 'bg-yellow-500/20 border-yellow-500'
                        : 'bg-neutral-700/50 border-neutral-600'
                    } border`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[currentQuestionIndex] === option}
                      onChange={() => handleAnswerSelect(option)}
                      className="mr-3"
                    />
                    <span className="text-neutral-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-x-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-neutral-700 text-white rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === (course?.questions?.length || 0) - 1}
                  className="px-4 py-2 bg-neutral-700 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="space-x-4">
                <button
                  onClick={handleMarkForReview}
                  className={`px-4 py-2 rounded-lg ${
                    markedForReview.has(currentQuestionIndex)
                      ? 'bg-yellow-500 text-white'
                      : 'bg-neutral-700 text-white'
                  }`}
                >
                  {markedForReview.has(currentQuestionIndex)
                    ? 'Unmark for Review'
                    : 'Mark for Review'}
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage; 