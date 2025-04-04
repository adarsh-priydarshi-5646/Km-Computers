import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Users,
  BookOpen,
  Settings,
  Save,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: number;
  name: string;
  description: string;
  icon: any;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
  status: 'active' | 'completed' | 'failed';
}

const ManageExam = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    const savedStudents = localStorage.getItem('students');
    
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
    // Also sync with exam page
    localStorage.setItem('examCourses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddCourse = () => {
    if (!editingCourse?.name || !editingCourse?.description) {
      alert('Please fill in all fields');
      return;
    }

    const newCourse: Course = {
      id: Date.now(), // Use timestamp for unique ID
      name: editingCourse.name,
      description: editingCourse.description,
      icon: FileText,
      questions: []
    };
    setCourses([...courses, newCourse]);
    setEditingCourse(null);
    setShowAddCourse(false);
  };

  const handleUpdateCourse = (course: Course) => {
    if (!course.name || !course.description) {
      alert('Please fill in all fields');
      return;
    }
    setCourses(courses.map(c => c.id === course.id ? course : c));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  const handleAddQuestion = () => {
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }

    if (!newQuestion.question || newQuestion.options.some(opt => !opt)) {
      alert('Please fill in all fields');
      return;
    }

    setCourses(courses.map(course => {
      if (course.id === selectedCourse.id) {
        return { ...course, questions: [...course.questions, newQuestion] };
      }
      return course;
    }));
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setShowAddQuestion(false);
    setSelectedCourse(null);
  };

  const handleUpdateQuestion = (courseId: number, questionIndex: number, updatedQuestion: Question) => {
    if (!updatedQuestion.question || updatedQuestion.options.some(opt => !opt)) {
      alert('Please fill in all fields');
      return;
    }

    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const newQuestions = [...course.questions];
        newQuestions[questionIndex] = updatedQuestion;
        return { ...course, questions: newQuestions };
      }
      return course;
    }));
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (courseId: number, questionIndex: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setCourses(courses.map(course => {
        if (course.id === courseId) {
          const newQuestions = course.questions.filter((_, index) => index !== questionIndex);
          return { ...course, questions: newQuestions };
        }
        return course;
      }));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#3A1C71]">
      {/* Hero Section */}
      <div className="relative min-h-[35vh] flex items-center justify-center pt-16">
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
            Exam Management Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Manage your examinations and courses efficiently
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400">Exam Management Portal</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddCourse(true)}
                className="flex items-center gap-2 bg-yellow-400 text-neutral-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Course
              </button>
              <button
                onClick={() => setShowAddQuestion(true)}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Question
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-300">Total Courses</h3>
                  <p className="text-2xl font-bold text-yellow-400">{courses.length}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-300">Total Students</h3>
                  <p className="text-2xl font-bold text-yellow-400">{students.length}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-300">Active Exams</h3>
                  <p className="text-2xl font-bold text-yellow-400">{courses.filter(c => c.questions.length > 0).length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Course Modal */}
          <AnimatePresence>
            {showAddCourse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              >
                <div className="bg-neutral-800 rounded-xl shadow-2xl p-8 max-w-md w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">Add New Course</h2>
                    <button
                      onClick={() => setShowAddCourse(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-neutral-300 mb-2">Course Name</label>
                      <input
                        type="text"
                        value={editingCourse?.name || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                        className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter course name"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-2">Description</label>
                      <textarea
                        value={editingCourse?.description || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                        className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter course description"
                        rows={3}
                      />
                    </div>
                    <button
                      onClick={handleAddCourse}
                      className="w-full bg-yellow-400 text-neutral-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Add Course
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Question Modal */}
          <AnimatePresence>
            {showAddQuestion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              >
                <div className="bg-neutral-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">Add New Question</h2>
                    <button
                      onClick={() => setShowAddQuestion(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {/* Course Selection */}
                    <div className="relative">
                      <label className="block text-neutral-300 mb-2">Select Course</label>
                      <button
                        onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                        className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-2 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        <span>{selectedCourse?.name || 'Select a course'}</span>
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      <AnimatePresence>
                        {showCourseDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                          >
                            {courses.map(course => (
                              <button
                                key={course.id}
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setShowCourseDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2 text-neutral-300 hover:bg-neutral-600 transition-colors"
                              >
                                {course.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Question Input */}
                    <div>
                      <label className="block text-neutral-300 mb-2">Question</label>
                      <textarea
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter your question"
                        rows={3}
                      />
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                      <label className="block text-neutral-300">Options</label>
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                            className="w-4 h-4 text-yellow-400"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="flex-1 bg-neutral-700 text-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder={`Option ${index + 1}`}
                          />
                          {index > 1 && (
                            <button
                              onClick={() => setNewQuestion({
                                ...newQuestion,
                                options: newQuestion.options.filter((_, i) => i !== index)
                              })}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      {newQuestion.options.length < 4 && (
                        <button
                          onClick={() => setNewQuestion({
                            ...newQuestion,
                            options: [...newQuestion.options, '']
                          })}
                          className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Option
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleAddQuestion}
                      disabled={!selectedCourse}
                      className="w-full bg-yellow-400 text-neutral-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <course.icon className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-yellow-400">{course.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setShowAddCourse(true);
                      }}
                      className="text-neutral-400 hover:text-white"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-neutral-400 mb-4">{course.description}</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-300">Questions</span>
                    <span className="text-yellow-400">{course.questions.length}</span>
                  </div>
                  {course.questions.length > 0 && (
                    <div className="space-y-2">
                      {course.questions.map((question, index) => (
                        <div key={index} className="bg-neutral-700/50 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-neutral-300 text-sm">{question.question}</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingQuestion(question);
                                  setSelectedCourse(course);
                                  setShowAddQuestion(true);
                                }}
                                className="text-neutral-400 hover:text-white"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(course.id, index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`text-sm ${
                                  optIndex === question.correctAnswer
                                    ? 'text-green-400'
                                    : 'text-neutral-400'
                                }`}
                              >
                                {optIndex === question.correctAnswer ? '✓ ' : '• '}
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageExam; 