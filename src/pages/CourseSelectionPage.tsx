import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../types/course';
import { loadCourses } from '../data/courses';

const CourseSelectionPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedCourses = loadCourses();
    setCourses(loadedCourses);
  }, []);

  const handleCourseSelect = (course: Course) => {
    navigate('/examination/student-info', { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#3A1C71]">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative min-h-[35vh] flex items-center justify-center pt-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
              alt="Examination Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 to-[#3A1C71]/80" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
            >
              Select Your Course
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Choose the course you want to take the examination for
            </motion.p>
          </div>
        </div>

        {/* Course Selection */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-yellow-400/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400">{course.name}</h3>
                      <p className="text-sm text-neutral-300">{course.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-300">Total Students: {course.totalStudents}</p>
                    <p className="text-sm text-neutral-300">Active Exams: {course.activeExams}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-neutral-300">1 Hour</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-neutral-300">50 MCQ</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCourseSelect(course)}
                  className="mt-4 w-full bg-yellow-400 text-[#0D0D0D] py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-300 font-semibold"
                >
                  Select Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelectionPage; 