import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Laptop, 
  Upload, 
  Plus, 
  Trash2,
  LogOut,
  ArrowLeft,
  Shield,
  Save,
  AlertCircle,
  FileText,
  Edit2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Laptop {
  id: string;
  model: string;
  name: string;
  price: number;
  image: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
}

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

export default function AdminPage() {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [newLaptop, setNewLaptop] = useState<Partial<Laptop>>({
    model: '',
    name: '',
    price: 0,
    image: '',
    specs: {
      processor: '',
      ram: '',
      storage: '',
      display: ''
    }
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }

    // Load existing laptops
    const savedLaptops = localStorage.getItem('laptops');
    if (savedLaptops) {
      setLaptops(JSON.parse(savedLaptops));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLaptop({ ...newLaptop, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newLaptop.model || !newLaptop.name || !newLaptop.price || !newLaptop.image) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new laptop object with all required fields
      const laptop: Laptop = {
        id: Date.now().toString(),
        model: newLaptop.model,
        name: newLaptop.name,
        price: newLaptop.price || 0,
        image: newLaptop.image,
        specs: {
          processor: newLaptop.specs?.processor || '',
          ram: newLaptop.specs?.ram || '',
          storage: newLaptop.specs?.storage || '',
          display: newLaptop.specs?.display || ''
        }
      };

      // Get existing laptops from localStorage
      const existingLaptops = localStorage.getItem('laptops');
      const parsedLaptops = existingLaptops ? JSON.parse(existingLaptops) : [];
      
      // Add new laptop to the array
      const updatedLaptops = [...parsedLaptops, laptop];
      
      // Update state and localStorage
      setLaptops(updatedLaptops);
      localStorage.setItem('laptops', JSON.stringify(updatedLaptops));
      
      // Reset form
      setNewLaptop({
        model: '',
        name: '',
        price: 0,
        image: '',
        specs: {
          processor: '',
          ram: '',
          storage: '',
          display: ''
        }
      });
      setImageFile(null);
      
      toast.success('Laptop added successfully!');
    } catch (error) {
      console.error('Error adding laptop:', error);
      toast.error('Failed to add laptop. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedLaptops = laptops.filter(laptop => laptop.id !== id);
      setLaptops(updatedLaptops);
      localStorage.setItem('laptops', JSON.stringify(updatedLaptops));
      toast.success('Laptop deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete laptop. Please try again.');
    }
  };

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: courses.length + 1,
      name: '',
      description: '',
      icon: FileText,
      questions: []
    };
    setCourses([...courses, newCourse]);
    setEditingCourse(newCourse);
    setShowAddCourse(false);
  };

  const handleUpdateCourse = (course: Course) => {
    setCourses(courses.map(c => c.id === course.id ? course : c));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const handleAddQuestion = (courseId: number) => {
    const newQuestion: Question = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return { ...course, questions: [...course.questions, newQuestion] };
      }
      return course;
    }));
    setEditingQuestion(newQuestion);
    setShowAddQuestion(false);
  };

  const handleUpdateQuestion = (courseId: number, questionIndex: number, updatedQuestion: Question) => {
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
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const newQuestions = course.questions.filter((_, index) => index !== questionIndex);
        return { ...course, questions: newQuestions };
      }
      return course;
    }));
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="btn-secondary group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add New Laptop Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-yellow-400/10 rounded-lg">
                  <Plus className="w-6 h-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Add New Laptop</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Laptop Model
                  </label>
                  <input
                    type="text"
                    required
                    value={newLaptop.model}
                    onChange={(e) => setNewLaptop({ ...newLaptop, model: e.target.value })}
                    className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter laptop model"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Laptop Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newLaptop.name}
                    onChange={(e) => setNewLaptop({ ...newLaptop, name: e.target.value })}
                    className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter laptop name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newLaptop.price}
                    onChange={(e) => setNewLaptop({ ...newLaptop, price: Number(e.target.value) })}
                    className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 btn-secondary cursor-pointer group"
                    >
                      <Upload size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                      Upload Image
                    </label>
                    {newLaptop.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <img
                          src={newLaptop.image}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-neutral-400">
                    Maximum file size: 5MB. Supported formats: JPG, PNG, WebP
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Processor
                    </label>
                    <input
                      type="text"
                      value={newLaptop.specs?.processor}
                      onChange={(e) => setNewLaptop({
                        ...newLaptop,
                        specs: { ...newLaptop.specs!, processor: e.target.value }
                      })}
                      className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="e.g. Intel i7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      RAM
                    </label>
                    <input
                      type="text"
                      value={newLaptop.specs?.ram}
                      onChange={(e) => setNewLaptop({
                        ...newLaptop,
                        specs: { ...newLaptop.specs!, ram: e.target.value }
                      })}
                      className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="e.g. 16GB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Storage
                    </label>
                    <input
                      type="text"
                      value={newLaptop.specs?.storage}
                      onChange={(e) => setNewLaptop({
                        ...newLaptop,
                        specs: { ...newLaptop.specs!, storage: e.target.value }
                      })}
                      className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="e.g. 512GB SSD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Display
                    </label>
                    <input
                      type="text"
                      value={newLaptop.specs?.display}
                      onChange={(e) => setNewLaptop({
                        ...newLaptop,
                        specs: { ...newLaptop.specs!, display: e.target.value }
                      })}
                      className="w-full p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="e.g. 15.6' FHD"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        Add Laptop
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Existing Laptops */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-yellow-400/10 rounded-lg">
                  <Laptop className="w-6 h-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Existing Laptops</h2>
              </div>

              <div className="space-y-4">
                {laptops.map((laptop) => (
                  <motion.div
                    key={laptop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg group hover:bg-neutral-800/70 transition-colors"
                  >
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-yellow-400 transition-colors">
                        {laptop.name}
                      </h3>
                      <p className="text-yellow-400">₹{laptop.price.toLocaleString()}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-neutral-400">{laptop.specs.processor}</p>
                        <p className="text-sm text-neutral-400">{laptop.specs.ram} RAM • {laptop.specs.storage}</p>
                        <p className="text-sm text-neutral-400">{laptop.specs.display}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(laptop.id)}
                      className="p-2 text-neutral-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
                {laptops.length === 0 && (
                  <div className="text-center text-neutral-400 py-12">
                    <Laptop size={48} className="mx-auto mb-4" />
                    <p>No laptops added yet</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-700">Questions</h3>
                  </div>

                  {course.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div>
                        <p className="font-medium text-gray-800">{question.question}</p>
                        <div className="mt-2 space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <p
                              key={optionIndex}
                              className={`text-sm ${
                                optionIndex === question.correctAnswer
                                  ? 'text-green-600 font-medium'
                                  : 'text-gray-600'
                              }`}
                            >
                              {optionIndex + 1}. {option}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 