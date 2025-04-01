import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// Types
type Course = {
  name: string;
  questions: Question[];
};

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type StudentInfo = {
  name: string;
  email: string;
  verificationCode: string;
};

// Sample courses with 30 MCQs each
const courses: Course[] = [
  {
    name: "Excel",
    questions: [
      {
        question: "What is the shortcut for copy in Excel?",
        options: ["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + Z"],
        correctAnswer: 0
      },
      // Add 29 more questions here
    ]
  },
  {
    name: "MS Office",
    questions: [
      {
        question: "Which function is used to insert a table in MS Word?",
        options: ["Insert > Table", "Table > Insert", "Format > Table", "View > Table"],
        correctAnswer: 0
      },
      // Add 29 more questions here
    ]
  },
  // Add more courses here
];

export default function ExamSystem() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    if (isExamStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [isExamStarted, timeLeft]);

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
  };

  const handleStudentInfoSubmit = (info: StudentInfo) => {
    if (info.verificationCode === "229310") {
      setStudentInfo(info);
      setIsExamStarted(true);
    } else {
      alert("Invalid verification code!");
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    const course = courses.find(c => c.name === selectedCourse);
    if (!course) return;

    const correctAnswers = answers.filter((answer, index) => 
      answer === course.questions[index].correctAnswer
    );
    
    const score = (correctAnswers.length / course.questions.length) * 100;
    setScore(score);
    setIsExamCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {!selectedCourse ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select a Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <motion.button
                  key={course.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCourseSelect(course.name)}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                  <p className="text-gray-600 mt-2">30 MCQs • 1 Hour Duration</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !studentInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Enter Your Details</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleStudentInfoSubmit({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                verificationCode: formData.get('verificationCode') as string
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                  <input
                    type="text"
                    name="verificationCode"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Exam
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : !isExamCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCourse} Exam
                </h2>
                <div className="flex items-center text-red-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-medium text-gray-900">
                    Question {currentQuestion + 1} of 30
                  </p>
                  <p className="mt-2 text-gray-700">
                    {courses.find(c => c.name === selectedCourse)?.questions[currentQuestion].question}
                  </p>
                </div>

                <div className="space-y-3">
                  {courses.find(c => c.name === selectedCourse)?.questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border ${
                        answers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (currentQuestion === 29) {
                        handleSubmit();
                      } else {
                        setCurrentQuestion(prev => Math.min(29, prev + 1));
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {currentQuestion === 29 ? 'Submit' : 'Next'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center"
          >
            {score >= 60 ? (
              <>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Congratulations!</h2>
                <p className="text-gray-600 mb-6">
                  You scored {score.toFixed(1)}% and passed the exam!
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  Download Certificate
                </motion.button>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Passed</h2>
                <p className="text-gray-600 mb-6">
                  You scored {score.toFixed(1)}%. The passing score is 60%.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCourse(null);
                    setStudentInfo(null);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setTimeLeft(3600);
                    setIsExamStarted(false);
                    setIsExamCompleted(false);
                    setScore(0);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 