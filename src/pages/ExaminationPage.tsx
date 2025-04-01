import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Award, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, HelpCircle, Download, Info, Flag, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Types
interface Course {
  id: number;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface StudentInfo {
  name: string;
  email: string;
  verificationCode: string;
}

// Sample courses with 30 MCQs each
const courses: Course[] = [
  {
    id: 1,
    name: 'Excel Certification',
    description: 'Master Microsoft Excel with our comprehensive certification exam',
    icon: FileText,
    questions: [
      {
        question: 'What is the shortcut to create a new workbook in Excel?',
        options: ['Ctrl + N', 'Ctrl + W', 'Ctrl + O', 'Ctrl + S'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to find the average of a range of cells?',
        options: ['SUM()', 'AVERAGE()', 'COUNT()', 'MAX()'],
        correctAnswer: 1
      },
      {
        question: 'What is the maximum number of rows in an Excel worksheet?',
        options: ['1,048,576', '1,000,000', '2,000,000', '500,000'],
        correctAnswer: 0
      },
      {
        question: 'Which chart type is best for showing trends over time?',
        options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Scatter Plot'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the VLOOKUP function?',
        options: ['Vertical lookup in a table', 'Horizontal lookup in a table', 'Sort data', 'Filter data'],
        correctAnswer: 0
      },
      {
        question: 'Which operator is used for absolute cell reference?',
        options: ['$', '#', '@', '&'],
        correctAnswer: 0
      },
      {
        question: 'What is the shortcut to save a workbook?',
        options: ['Ctrl + S', 'Ctrl + W', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to count the number of cells in a range?',
        options: ['SUM()', 'COUNT()', 'AVERAGE()', 'MAX()'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the IF function?',
        options: ['Sort data', 'Filter data', 'Make logical comparisons', 'Calculate averages'],
        correctAnswer: 2
      },
      {
        question: 'Which chart type is best for showing proportions?',
        options: ['Line Chart', 'Bar Chart', 'Pie Chart', 'Scatter Plot'],
        correctAnswer: 2
      },
      {
        question: 'What is the shortcut to undo the last action?',
        options: ['Ctrl + Z', 'Ctrl + Y', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to find the highest value in a range?',
        options: ['MIN()', 'MAX()', 'AVERAGE()', 'COUNT()'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the CONCATENATE function?',
        options: ['Split text', 'Join text', 'Sort text', 'Filter text'],
        correctAnswer: 1
      },
      {
        question: 'Which chart type is best for comparing quantities?',
        options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Scatter Plot'],
        correctAnswer: 2
      },
      {
        question: 'What is the shortcut to copy selected cells?',
        options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to find the lowest value in a range?',
        options: ['MAX()', 'MIN()', 'AVERAGE()', 'COUNT()'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the SORT function?',
        options: ['Filter data', 'Join text', 'Sort data', 'Calculate averages'],
        correctAnswer: 2
      },
      {
        question: 'Which chart type is best for showing relationships between variables?',
        options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Scatter Plot'],
        correctAnswer: 3
      },
      {
        question: 'What is the shortcut to paste copied cells?',
        options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to round a number to a specified number of digits?',
        options: ['SUM()', 'ROUND()', 'COUNT()', 'MAX()'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the FILTER function?',
        options: ['Sort data', 'Join text', 'Filter data', 'Calculate averages'],
        correctAnswer: 2
      },
      {
        question: 'Which chart type is best for showing distribution of data?',
        options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Histogram'],
        correctAnswer: 3
      },
      {
        question: 'What is the shortcut to cut selected cells?',
        options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to count non-empty cells in a range?',
        options: ['COUNT()', 'COUNTA()', 'COUNTIF()', 'COUNTBLANK()'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the UNIQUE function?',
        options: ['Sort data', 'Join text', 'Filter data', 'Remove duplicates'],
        correctAnswer: 3
      },
      {
        question: 'Which chart type is best for showing cumulative totals?',
        options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Area Chart'],
        correctAnswer: 3
      },
      {
        question: 'What is the shortcut to redo the last action?',
        options: ['Ctrl + Y', 'Ctrl + Z', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to find the position of a value in a range?',
        options: ['MATCH()', 'LOOKUP()', 'VLOOKUP()', 'HLOOKUP()'],
        correctAnswer: 0
      },
      {
        question: 'What is the purpose of the TRANSPOSE function?',
        options: ['Sort data', 'Join text', 'Filter data', 'Switch rows and columns'],
        correctAnswer: 3
      },
      {
        question: 'Which chart type is best for showing hierarchical data?',
        options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Treemap'],
        correctAnswer: 3
      },
      {
        question: 'What is the shortcut to select all cells in a worksheet?',
        options: ['Ctrl + A', 'Ctrl + B', 'Ctrl + C', 'Ctrl + D'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 2,
    name: 'MS Office Certification',
    description: 'Get certified in Microsoft Office suite applications',
    icon: FileText,
    questions: [
      {
        question: 'What is the default file extension for Word documents?',
        options: ['.docx', '.doc', '.txt', '.pdf'],
        correctAnswer: 0
      },
      {
        question: 'Which tab contains the formatting options in Word?',
        options: ['Home', 'Insert', 'Layout', 'Review'],
        correctAnswer: 0
      },
      {
        question: 'What is the shortcut to save a document?',
        options: ['Ctrl + S', 'Ctrl + W', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: 0
      },
      {
        question: 'Which view shows how the document will look when printed?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the Styles feature in Word?',
        options: ['Format text consistently', 'Insert images', 'Create tables', 'Add page numbers'],
        correctAnswer: 0
      },
      {
        question: 'Which function is used to create a table of contents?',
        options: ['References tab', 'Insert tab', 'Layout tab', 'Review tab'],
        correctAnswer: 0
      },
      {
        question: 'What is the shortcut to create a new document?',
        options: ['Ctrl + N', 'Ctrl + W', 'Ctrl + O', 'Ctrl + S'],
        correctAnswer: 0
      },
      {
        question: 'Which feature is used to track changes in a document?',
        options: ['Track Changes', 'Comments', 'Compare', 'Restrict Editing'],
        correctAnswer: 0
      },
      {
        question: 'What is the purpose of the Mail Merge feature?',
        options: ['Create envelopes', 'Send emails', 'Create form letters', 'Format text'],
        correctAnswer: 2
      },
      {
        question: 'Which view shows the document structure?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 3
      },
      {
        question: 'What is the shortcut to print a document?',
        options: ['Ctrl + P', 'Ctrl + S', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: 0
      },
      {
        question: 'Which feature is used to protect a document with a password?',
        options: ['Track Changes', 'Comments', 'Compare', 'Restrict Editing'],
        correctAnswer: 3
      },
      {
        question: 'What is the purpose of the Header and Footer feature?',
        options: ['Add page numbers', 'Format text', 'Create tables', 'Insert images'],
        correctAnswer: 0
      },
      {
        question: 'Which view shows how the document will look on the web?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 2
      },
      {
        question: 'What is the shortcut to open a document?',
        options: ['Ctrl + O', 'Ctrl + W', 'Ctrl + N', 'Ctrl + S'],
        correctAnswer: 0
      },
      {
        question: 'Which feature is used to compare two documents?',
        options: ['Track Changes', 'Comments', 'Compare', 'Restrict Editing'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of the Page Setup feature?',
        options: ['Format text', 'Set page margins', 'Create tables', 'Insert images'],
        correctAnswer: 1
      },
      {
        question: 'Which view shows the document without formatting?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 0
      },
      {
        question: 'What is the shortcut to close a document?',
        options: ['Ctrl + W', 'Ctrl + O', 'Ctrl + N', 'Ctrl + S'],
        correctAnswer: 0
      },
      {
        question: 'Which feature is used to add comments to a document?',
        options: ['Track Changes', 'Comments', 'Compare', 'Restrict Editing'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of the Find and Replace feature?',
        options: ['Format text', 'Search and replace text', 'Create tables', 'Insert images'],
        correctAnswer: 1
      },
      {
        question: 'Which view shows the document in a simplified format?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 0
      },
      {
        question: 'What is the shortcut to undo the last action?',
        options: ['Ctrl + Z', 'Ctrl + Y', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: 0
      },
      {
        question: 'Which feature is used to check spelling and grammar?',
        options: ['Track Changes', 'Comments', 'Compare', 'Spelling & Grammar'],
        correctAnswer: 3
      },
      {
        question: 'What is the purpose of the Page Numbers feature?',
        options: ['Format text', 'Add page numbers', 'Create tables', 'Insert images'],
        correctAnswer: 1
      },
      {
        question: 'Which view shows the document in a hierarchical structure?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 3
      },
      {
        question: 'What is the shortcut to redo the last action?',
        options: ['Ctrl + Y', 'Ctrl + Z', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: 0
      },
      {
        question: 'Which feature is used to create a bibliography?',
        options: ['Track Changes', 'Comments', 'Compare', 'Bibliography'],
        correctAnswer: 3
      },
      {
        question: 'What is the purpose of the Page Breaks feature?',
        options: ['Format text', 'Control page breaks', 'Create tables', 'Insert images'],
        correctAnswer: 1
      },
      {
        question: 'Which view shows the document in a full-screen format?',
        options: ['Draft', 'Print Layout', 'Web Layout', 'Full Screen Reading'],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 3,
    name: 'BCA Certification',
    description: 'Test your knowledge in Bachelor of Computer Applications',
    icon: FileText,
    questions: [
      {
        question: 'What is the full form of BCA?',
        options: ['Bachelor of Computer Applications', 'Bachelor of Computer Arts', 'Bachelor of Computer Administration', 'Bachelor of Computer Analysis'],
        correctAnswer: 0
      },
      {
        question: 'Which programming language is commonly used in BCA?',
        options: ['Java', 'Python', 'C++', 'All of the above'],
        correctAnswer: 3
      },
      {
        question: 'What is the duration of a BCA course?',
        options: ['2 years', '3 years', '4 years', '5 years'],
        correctAnswer: 1
      },
      {
        question: 'Which subject is not typically part of BCA curriculum?',
        options: ['Programming', 'Database Management', 'Medicine', 'Web Development'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of Object-Oriented Programming?',
        options: ['To make code more complex', 'To organize code into objects', 'To slow down development', 'To increase bugs'],
        correctAnswer: 1
      },
      {
        question: 'Which database is commonly used in BCA?',
        options: ['MySQL', 'Oracle', 'MongoDB', 'All of the above'],
        correctAnswer: 3
      },
      {
        question: 'What is the role of an operating system?',
        options: ['To make computers slower', 'To manage hardware and software', 'To create viruses', 'To delete files'],
        correctAnswer: 1
      },
      {
        question: 'Which networking protocol is most common?',
        options: ['TCP/IP', 'FTP', 'SMTP', 'HTTP'],
        correctAnswer: 0
      },
      {
        question: 'What is the purpose of data structures?',
        options: ['To make code harder', 'To organize data efficiently', 'To create bugs', 'To slow down programs'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a programming paradigm?',
        options: ['Object-Oriented', 'Procedural', 'Cooking', 'Functional'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of algorithms?',
        options: ['To make problems harder', 'To solve problems efficiently', 'To create errors', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a software development model?',
        options: ['Waterfall', 'Agile', 'Baking', 'Spiral'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of version control?',
        options: ['To lose code', 'To manage code changes', 'To create bugs', 'To slow down development'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a programming language?',
        options: ['Java', 'Python', 'English', 'C++'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of testing?',
        options: ['To create bugs', 'To find and fix bugs', 'To slow down development', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a database type?',
        options: ['Relational', 'NoSQL', 'Cooking', 'Object-Oriented'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of documentation?',
        options: ['To confuse users', 'To explain code', 'To create bugs', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a web technology?',
        options: ['HTML', 'CSS', 'Cooking', 'JavaScript'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of debugging?',
        options: ['To create bugs', 'To find and fix bugs', 'To slow down development', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a computer network type?',
        options: ['LAN', 'WAN', 'Cooking', 'MAN'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of optimization?',
        options: ['To make code slower', 'To improve performance', 'To create bugs', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a software testing type?',
        options: ['Unit Testing', 'Integration Testing', 'Cooking', 'System Testing'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of security?',
        options: ['To make systems vulnerable', 'To protect systems', 'To create bugs', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a programming tool?',
        options: ['IDE', 'Compiler', 'Cooking', 'Debugger'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of maintenance?',
        options: ['To break systems', 'To keep systems working', 'To create bugs', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a computer architecture?',
        options: ['Von Neumann', 'Harvard', 'Cooking', 'RISC'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of scalability?',
        options: ['To make systems smaller', 'To handle growth', 'To create bugs', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a software license?',
        options: ['Open Source', 'Proprietary', 'Cooking', 'Freeware'],
        correctAnswer: 2
      },
      {
        question: 'What is the purpose of backup?',
        options: ['To lose data', 'To protect data', 'To create bugs', 'To waste time'],
        correctAnswer: 1
      },
      {
        question: 'Which is not a computer component?',
        options: ['CPU', 'RAM', 'Cooking', 'GPU'],
        correctAnswer: 2
      }
    ]
  }
];

export default function ExaminationPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [tempStudentInfo, setTempStudentInfo] = useState<StudentInfo>({
    name: '',
    email: '',
    verificationCode: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [showStudentInfo, setShowStudentInfo] = useState(false);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
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

  // Handlers
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowScore(false);
    setShowInstructions(true);
    setExamStarted(false);
    setExamCompleted(false);
    setTimeLeft(3600);
    setAnswers({});
    setCurrentQuestion(0);
    setMarkedForReview([]);
    setStudentInfo(null);
    setTempStudentInfo({
      name: '',
      email: '',
      verificationCode: ''
    });
  };

  const handleStudentInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentInfo(tempStudentInfo);
    setShowStudentInfo(false);
    setExamStarted(true);
    setCurrentQuestion(0);
    setTimeLeft(3600); // 1 hour in seconds
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (currentQuestion !== null) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: optionIndex,
      }));
    }
  };

  const handleSubmit = () => {
    if (!selectedCourse) return;
    
    const correctAnswers = Object.values(answers).filter((answer, index) => 
      answer === selectedCourse.questions[index].correctAnswer
    ).length;
    
    const finalScore = (correctAnswers / selectedCourse.questions.length) * 100;
    setScore(finalScore);
    setExamCompleted(true);
    setExamStarted(false);
    
    if (finalScore >= 70) {
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

  const handleMarkForReview = () => {
    if (currentQuestion !== null) {
      setMarkedForReview((prev) =>
        prev.includes(currentQuestion)
          ? prev.filter((q) => q !== currentQuestion)
          : [...prev, currentQuestion]
      );
    }
  };

  const handleStartExam = () => {
    setShowInstructions(false);
    setExamStarted(true);
    setCurrentQuestion(0);
    setTimeLeft(3600);
    setAnswers({});
    setMarkedForReview([]);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#3A1C71]">
      {/* Hero Section */}
      <div className="relative min-h-[35vh] flex items-center justify-center">
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
      <div className="container mx-auto px-4 -mt-16">
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
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center mb-4">
                    <course.icon className="w-8 h-8 text-yellow-400 mr-3" />
                    <h2 className="text-xl font-semibold text-yellow-400">{course.name}</h2>
                  </div>
                  <p className="text-neutral-400 mb-4">{course.description}</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-neutral-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      30 Multiple Choice Questions
                    </li>
                    <li className="flex items-center text-neutral-300">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      1 Hour Duration
                    </li>
                    <li className="flex items-center text-neutral-300">
                      <Award className="w-5 h-5 text-yellow-400 mr-2" />
                      Professional Certificate
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCourseSelect(course)}
                    className="w-full bg-yellow-400 text-neutral-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Start Exam
                  </motion.button>
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
                    type="text"
                    value={tempStudentInfo.verificationCode}
                    onChange={(e) => setTempStudentInfo({ ...tempStudentInfo, verificationCode: e.target.value })}
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
                    Start Exam
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
              {/* Timer */}
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-yellow-400 mr-3" />
                    <span className="text-xl font-semibold text-yellow-400">
                      Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-neutral-400">
                      Question {currentQuestion !== null ? currentQuestion + 1 : 0} of {selectedCourse?.questions.length}
                    </span>
                    <div className="w-32 h-2 bg-neutral-700 rounded-full">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion !== null ? currentQuestion + 1 : 0) / (selectedCourse?.questions.length || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
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
                      onClick={handleMarkForReview}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        markedForReview.includes(currentQuestion)
                          ? 'bg-yellow-400 text-neutral-900'
                          : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                      }`}
                    >
                      <Flag className="w-5 h-5 mr-2" />
                      {markedForReview.includes(currentQuestion) ? 'Marked for Review' : 'Mark for Review'}
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
                          answers[currentQuestion] === index
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

              {/* Navigation */}
              <div className="glass-card p-4 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    currentQuestion === 0
                      ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                      : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  }`}
                >
                  Previous
                </motion.button>
                <div className="flex items-center space-x-4">
                  <span className="text-neutral-400">
                    {Object.keys(answers).length} of {selectedCourse?.questions.length} answered
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length === 0}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      Object.keys(answers).length === 0
                        ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                        : 'bg-yellow-400 text-neutral-900 hover:bg-yellow-500'
                    }`}
                  >
                    Submit Exam
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={currentQuestion === (selectedCourse?.questions.length || 0) - 1}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    currentQuestion === (selectedCourse?.questions.length || 0) - 1
                      ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                      : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  }`}
                >
                  Next
                </motion.button>
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
                    <span className="text-green-400">{score}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Wrong Answers</span>
                    <span className="text-red-400">{Object.keys(answers).length - score}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Percentage Score</span>
                    <span className={`font-semibold ${
                      (score / (selectedCourse?.questions.length || 1)) * 100 >= 70
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {((score / (selectedCourse?.questions.length || 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Status</span>
                    <span className={`font-semibold ${
                      (score / (selectedCourse?.questions.length || 1)) * 100 >= 70
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {(score / (selectedCourse?.questions.length || 1)) * 100 >= 70 ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                {(score / (selectedCourse?.questions.length || 1)) * 100 >= 70 ? (
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
  );
} 