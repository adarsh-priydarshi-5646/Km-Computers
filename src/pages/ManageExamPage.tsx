import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Trash2, Edit2, Save, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Course, Question, loadCourses, saveCourses, initialCourses } from '../data/courses';

const ManageExamPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    description: '',
    icon: 'BookOpen'
  });
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  // Load courses from localStorage on component mount
  useEffect(() => {
    const loadedCourses = loadCourses();
    setCourses(loadedCourses);
  }, []);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      name: newCourse.name,
      description: newCourse.description,
      icon: newCourse.icon || 'BookOpen',
      questions: [],
      totalStudents: 0,
      activeExams: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedCourses = [...courses, course];
    setCourses(updatedCourses);
    setNewCourse({ name: '', description: '', icon: 'BookOpen' });
    setIsAddingCourse(false);
    toast.success('Course added successfully');
  };

  const handleAddQuestion = () => {
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }

    if (!newQuestion.question || !newQuestion.options.every(opt => opt.trim()) || !newQuestion.correctAnswer) {
      toast.error('Please fill in all fields');
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer
    };

    const updatedCourse = {
      ...selectedCourse,
      questions: [...selectedCourse.questions, question],
      updatedAt: new Date().toISOString()
    };

    const updatedCourses = courses.map(c => c.id === selectedCourse.id ? updatedCourse : c);
    setCourses(updatedCourses);
    setSelectedCourse(updatedCourse);
    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
    setIsAddingQuestion(false);
    toast.success('Question added successfully');
  };

  const handleUpdateQuestion = () => {
    if (!selectedCourse || !editingQuestion) return;

    const updatedCourse = {
      ...selectedCourse,
      questions: selectedCourse.questions.map(q => 
        q === editingQuestion ? newQuestion as Question : q
      ),
      updatedAt: new Date().toISOString()
    };

    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
    setEditingQuestion(null);
    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
    toast.success('Question updated successfully');
  };

  const handleDeleteQuestion = (question: Question) => {
    if (!selectedCourse) return;

    const updatedCourse = {
      ...selectedCourse,
      questions: selectedCourse.questions.filter(q => q !== question),
      updatedAt: new Date().toISOString()
    };

    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
    toast.success('Question deleted successfully');
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options as string[]];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  // Calculate total students and active exams
  const totalStudents = courses.reduce((sum, course) => sum + (course.totalStudents || 0), 0);
  const totalActiveExams = courses.reduce((sum, course) => sum + (course.activeExams || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Exam Management</h1>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{courses.length}</div>
              <div className="text-gray-300">Total Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{totalStudents}</div>
              <div className="text-gray-300">Total Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{totalActiveExams}</div>
              <div className="text-gray-300">Active Exams</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white/10 backdrop-blur-lg rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                selectedCourse?.id === course.id ? 'ring-2 ring-blue-500' : 'hover:bg-white/20'
              }`}
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{course.name}</h3>
                  <p className="text-gray-300 text-sm">{course.description}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{course.questions.length} Questions</span>
                <span>{course.totalStudents || 0} Students</span>
                <span>{course.activeExams || 0} Active Exams</span>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedCourse && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedCourse.name} Questions</h2>
              <button
                onClick={() => setIsAddingQuestion(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {selectedCourse.questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center gap-2 ${
                              optIndex === question.correctAnswer ? 'text-green-400' : 'text-gray-300'
                            }`}
                          >
                            {optIndex === question.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-400" />
                            )}
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingQuestion(question);
                          setNewQuestion({ ...question });
                          setIsAddingQuestion(true);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAddingCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add New Course</h2>
                <button
                  onClick={() => setIsAddingCourse(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleAddCourse}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Course
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAddingQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  {editingQuestion ? 'Edit Question' : 'Add New Question'}
                </h2>
                <button
                  onClick={() => {
                    setIsAddingQuestion(false);
                    setEditingQuestion(null);
                    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Question</label>
                  <textarea
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your question"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Options</label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        className="w-4 h-4 text-blue-500"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${index + 1}`}
                      />
                      {index > 2 && (
                        <button
                          onClick={() => {
                            const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
                            setNewQuestion({ ...newQuestion, options: updatedOptions });
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  ))}
                  {newQuestion.options.length < 4 && (
                    <button
                      onClick={() => {
                        setNewQuestion({
                          ...newQuestion,
                          options: [...newQuestion.options, '']
                        });
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  )}
                </div>
                <button
                  onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageExamPage; 