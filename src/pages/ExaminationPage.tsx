import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Award, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, HelpCircle, Download, Info, Flag, XCircle, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, LogIn, Settings, X } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Course, Question, initialCourses } from '../data/courses';
import { loadCourses } from '../data/courses';

// Types
interface StudentInfo {
  name: string;
  email: string;
  verificationCode: string;
  rollNumber: string;
  password: string;
}

const ExaminationPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [tempStudentInfo, setTempStudentInfo] = useState<StudentInfo>({
    name: '',
    email: '',
    verificationCode: '',
    rollNumber: '',
    password: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const [results, setResults] = useState({ 
    correct: 0, 
    wrong: 0, 
    percentage: 0,
    attempted: 0,
    notAttempted: 0,
    markedForReview: 0
  });
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    timeSpent: 0,
    averageTimePerQuestion: 0
  });

  // Load courses from localStorage on component mount
  useEffect(() => {
    const loadedCourses = loadCourses();
    setCourses(loadedCourses);
  }, []);

  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowInstructions(true);
  };

  const handleStudentInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === '229310') {
      setStudentInfo(tempStudentInfo);
      setShowStudentInfo(false);
      setExamStarted(true);
      setCurrentQuestion(0);
      setTimeLeft(3600); // 1 hour in seconds
    } else {
      toast.error('Invalid verification code. Please enter 229310');
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (currentQuestion !== null) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: optionIndex.toString(),
      }));
    }
  };

  const handleMarkForReview = (questionIndex: number) => {
    if (markedQuestions.includes(questionIndex)) {
      setMarkedQuestions(markedQuestions.filter(q => q !== questionIndex));
    } else {
      setMarkedQuestions([...markedQuestions, questionIndex]);
    }
  };

  const handleSubmit = () => {
    if (!selectedCourse) return;
    
    const attemptedQuestions = Object.keys(answers).length;
    const correctAnswers = Object.entries(answers).filter(([index, answer]) => 
      answer === selectedCourse.questions[parseInt(index)].correctAnswer.toString()
    ).length;
    
    const wrongAnswers = attemptedQuestions - correctAnswers;
    const notAttempted = selectedCourse.questions.length - attemptedQuestions;
    const percentage = Math.round((correctAnswers / selectedCourse.questions.length) * 100);
    
    setResults({
      correct: correctAnswers,
      wrong: wrongAnswers,
      percentage: percentage,
      attempted: attemptedQuestions,
      notAttempted: notAttempted,
      markedForReview: markedQuestions.length
    });
    setScore(percentage);
    setExamCompleted(true);
    setExamStarted(false);
    
    if (percentage >= 70) {
      setShowCertificate(true);
    }
  };

  const handleReset = () => {
    setSelectedCourse(null);
    setStudentInfo(null);
    setCurrentQuestion(null);
    setAnswers({});
    setMarkedForReview([]);
    setScore(0);
    setExamStarted(false);
    setExamCompleted(false);
    setShowInstructions(false);
    setShowStudentInfo(false);
  };

  const handleGenerateCertificate = () => {
    if (!selectedCourse || !studentInfo?.name) return;

    const doc = new jsPDF();
    
    // Add background pattern
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add border
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);
    
    // Add decorative corners
    doc.setLineWidth(1);
    doc.line(10, 10, 30, 10);
    doc.line(10, 10, 10, 30);
    doc.line(200, 10, 180, 10);
    doc.line(200, 10, 200, 30);
    doc.line(10, 287, 30, 287);
    doc.line(10, 287, 10, 267);
    doc.line(200, 287, 180, 287);
    doc.line(200, 287, 200, 267);
    
    // Add title
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.text('Certificate of Completion', 105, 50, { align: 'center' });
    
    // Add content
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(`This is to certify that`, 105, 80, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text(studentInfo.name, 105, 100, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(`has successfully completed the`, 105, 120, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text(selectedCourse.name, 105, 140, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(`with a score of ${score.toFixed(1)}%`, 105, 160, { align: 'center' });
    doc.text(`on ${new Date().toLocaleDateString()}`, 105, 180, { align: 'center' });
    
    // Add signature
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Authorized Signature', 150, 250, { align: 'right' });
    doc.text('KM Computers', 150, 260, { align: 'right' });
    
    // Save the PDF
    doc.save(`${studentInfo.name}_${selectedCourse.name}_Certificate.pdf`);
  };

  const handleReviewQuestion = (questionIndex: number) => {
    setCurrentReviewIndex(questionIndex);
    setShowReview(true);
  };

  const handleNextReview = () => {
    const currentIndex = markedQuestions.indexOf(currentReviewIndex);
    if (currentIndex < markedQuestions.length - 1) {
      setCurrentReviewIndex(markedQuestions[currentIndex + 1]);
    } else {
      setShowReview(false);
    }
  };

  const handlePrevReview = () => {
    const currentIndex = markedQuestions.indexOf(currentReviewIndex);
    if (currentIndex > 0) {
      setCurrentReviewIndex(markedQuestions[currentIndex - 1]);
    }
  };

  // Add navigation handlers
  const handlePrevious = () => {
    if (currentQuestion !== null) {
      setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const handleNext = () => {
    if (currentQuestion !== null && selectedCourse) {
      setCurrentQuestion((prev) => (prev < selectedCourse.questions.length - 1 ? prev + 1 : prev));
    }
  };

  const handleVerification = () => {
    if (verificationCode === '229310') {
      setShowStudentInfo(true);
      setShowInstructions(false);
    } else {
      toast.error('Invalid verification code. Please enter 229310');
    }
  };

  const handleStartExam = () => {
    if (verificationCode === '229310') {
      setShowInstructions(true);
      setShowStudentInfo(false);
    } else {
      toast.error('Invalid verification code. Please enter 229310');
    }
  };

  const handleAdminLogin = () => {
    if (adminCredentials.username === 'KM123' && adminCredentials.password === 'KM@123') {
      setShowAdminLogin(false);
      navigate('/manage-exam');
    } else {
      setAdminError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#3A1C71]">
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
            Online Examination
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Test your knowledge with our comprehensive online examinations
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400">Courses</h1>
            <button
              onClick={() => setShowAdminLogin(true)}
              className="flex items-center gap-2 bg-yellow-400 text-neutral-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Manage Exam
            </button>
          </div>

          {showAdminLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Admin Login</h3>
                  <button
                    onClick={() => setShowAdminLogin(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Username</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-neutral-700 rounded-lg border border-neutral-600 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full p-3 bg-neutral-700 rounded-lg border border-neutral-600 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  {adminError && (
                    <p className="text-red-400 text-sm">{adminError}</p>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAdminLogin(false)}
                      className="px-4 py-2 text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAdminLogin}
                      className="px-4 py-2 bg-yellow-400 text-neutral-900 rounded-lg hover:bg-yellow-500"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!selectedCourse && !showInstructions && !showStudentInfo && !examStarted && !examCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-neutral-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-yellow-400">{course.name}</h3>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-yellow-400" />
                          <span className="text-sm text-neutral-300">50 MCQ</span>
                        </div>
                      </div>
                      <p className="text-neutral-300 mb-4">{course.description}</p>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-neutral-300">Passing Score: 60%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-neutral-300">Certificate on Completion</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <HelpCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-neutral-300">Negative Marking: No</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-neutral-300">60 mins</span>
                        </div>
                        <button
                          onClick={() => handleCourseSelect(course)}
                          className="px-4 py-2 bg-yellow-400 text-neutral-900 rounded-lg hover:bg-yellow-500 transition-colors"
                        >
                          Start Exam
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto glass-card p-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-8">Exam Instructions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <p className="text-neutral-300">Total Questions: 30 Multiple Choice Questions</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <p className="text-neutral-300">Time Limit: 1 Hour</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Flag className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <p className="text-neutral-300">Mark for Review option available</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <p className="text-neutral-300">Exam will auto-submit when time expires</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <p className="text-neutral-300">Pass Percentage: 70%</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <p className="text-neutral-300">Multiple selection not allowed</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowInstructions(false)}
                    className="px-6 py-2 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowInstructions(false);
                      setShowStudentInfo(true);
                    }}
                    className="px-6 py-2 bg-yellow-400 text-neutral-900 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}

            {showStudentInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto glass-card p-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-8">Student Information</h2>
                <form onSubmit={handleStudentInfoSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-neutral-300 text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      value={tempStudentInfo.name}
                      onChange={(e) => setTempStudentInfo({ ...tempStudentInfo, name: e.target.value })}
                      className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-300 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={tempStudentInfo.email}
                      onChange={(e) => setTempStudentInfo({ ...tempStudentInfo, email: e.target.value })}
                      className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-300 text-sm font-medium">Verification Code</label>
                    <input
                      type="password"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full bg-neutral-700 text-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter verification code"
                      required
                    />
                  </div>
                  <div className="flex justify-between space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setShowStudentInfo(false)}
                      className="px-6 py-2 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-2 bg-yellow-400 text-neutral-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Verify and Continue
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {examStarted && studentInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                {/* Timer and Question Info */}
                <div className="glass-card p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Clock className="w-6 h-6 text-yellow-400" />
                      <div className="text-xl font-semibold text-yellow-400">
                        Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-xl font-semibold text-neutral-300">
                        Question {currentQuestion + 1} of {selectedCourse?.questions.length}
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(answers).length === 0}
                      className="btn-primary"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>

                {/* Question */}
                {currentQuestion !== null && selectedCourse && (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-8 mb-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-yellow-400">
                        Question {currentQuestion + 1} of {selectedCourse.questions.length}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMarkForReview(currentQuestion)}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                          markedQuestions.includes(currentQuestion)
                            ? 'bg-yellow-400 text-neutral-900'
                            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                      >
                        <Flag className="w-5 h-5 mr-2" />
                        {markedQuestions.includes(currentQuestion) ? 'Marked for Review' : 'Mark for Review'}
                      </motion.button>
                    </div>
                    <p className="text-lg text-neutral-300 mb-6">
                      {selectedCourse.questions[currentQuestion].question}
                    </p>
                    <div className="space-y-4">
                      {selectedCourse.questions[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            answers[currentQuestion] === index.toString()
                              ? 'bg-yellow-400 text-neutral-900'
                              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="btn-secondary disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleMarkForReview(currentQuestion)}
                      className={`p-2 rounded-lg ${
                        markedQuestions.includes(currentQuestion)
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                      }`}
                    >
                      <Flag className="w-5 h-5" />
                    </button>
                    <span className="text-neutral-400">
                      Question {currentQuestion + 1} of {selectedCourse?.questions.length}
                    </span>
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestion === selectedCourse?.questions.length - 1}
                    className="btn-secondary disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>

                {/* Question Grid Navigation */}
                <div className="mt-4">
                  <div className="grid grid-cols-10 gap-1">
                    {selectedCourse?.questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                          currentQuestion === index
                            ? 'bg-blue-500 text-white'
                            : markedQuestions.includes(index)
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : Object.keys(answers).includes(index.toString())
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-green-500/20"></div>
                      <span className="text-neutral-400">Attempted</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-yellow-500/20"></div>
                      <span className="text-neutral-400">Marked</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span className="text-neutral-400">Current</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {examCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto glass-card p-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-8">Exam Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Total Questions</span>
                      <span className="text-neutral-300">{selectedCourse?.questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Questions Attempted</span>
                      <span className="text-neutral-300">{Object.keys(answers).length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Correct Answers</span>
                      <span className="text-green-400">{results.correct}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Wrong Answers</span>
                      <span className="text-red-400">{results.wrong}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Percentage Score</span>
                      <span className={`font-semibold ${
                        results.percentage >= 70
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {results.percentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Status</span>
                      <span className={`font-semibold ${
                        results.percentage >= 70
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {results.percentage >= 70 ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  {results.percentage >= 70 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGenerateCertificate}
                      className="px-6 py-2 bg-yellow-400 text-neutral-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Download Certificate
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="px-6 py-2 bg-yellow-400 text-neutral-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Re-Take Exam
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="px-6 py-2 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors"
                  >
                    Back to Courses
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExaminationPage; 