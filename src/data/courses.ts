import { FileText } from 'lucide-react';
import { fundamentalsQuestions, ioDevicesQuestions, networkingQuestions } from './questions';

export interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
  totalStudents: number;
  activeExams: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const STORAGE_KEY = 'exam_courses_data';

export const loadCourses = (): Course[] => {
  try {
    const savedCourses = localStorage.getItem(STORAGE_KEY);
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  } catch (error) {
    console.error('Error loading courses:', error);
    return initialCourses;
  }
};

export const saveCourses = (courses: Course[]): void => {
  try {
    const coursesToSave = courses.map(course => ({
      ...course,
      updatedAt: new Date().toISOString(),
      questions: course.questions.map(q => ({
        ...q,
        correctAnswer: q.correctAnswer.toString()
      }))
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coursesToSave));
  } catch (error) {
    console.error('Error saving courses:', error);
  }
};

export const initialCourses: Course[] = [
  {
    id: '1',
    name: 'Fundamentals of Computer',
    description: 'Learn the basics of computer systems, hardware, software, and their applications.',
    icon: 'FileText',
    questions: fundamentalsQuestions,
    totalStudents: 0,
    activeExams: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Input Output Devices',
    description: 'Understand various input and output devices used in computer systems.',
    icon: 'FileText',
    questions: ioDevicesQuestions,
    totalStudents: 0,
    activeExams: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Networking',
    description: 'Learn about computer networks, protocols, and network devices.',
    icon: 'FileText',
    questions: networkingQuestions,
    totalStudents: 0,
    activeExams: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Excel Certification',
    description: 'Master Microsoft Excel with comprehensive training',
    icon: 'BookOpen',
    questions: [
      // Easy Questions (20)
      {
        id: '1',
        question: 'What is the shortcut key to create a new workbook in Excel?',
        options: ['Ctrl + N', 'Ctrl + W', 'Ctrl + O', 'Ctrl + S'],
        correctAnswer: '0'
      },
      {
        id: '2',
        question: 'Which function is used to add up a range of cells?',
        options: ['COUNT', 'SUM', 'AVERAGE', 'MAX'],
        correctAnswer: '1'
      },
      {
        id: '3',
        question: 'What is the shortcut to save a workbook?',
        options: ['Ctrl + S', 'Ctrl + P', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: '0'
      },
      {
        id: '4',
        question: 'Which tab contains the Print command?',
        options: ['Home', 'Insert', 'File', 'View'],
        correctAnswer: '2'
      },
      {
        id: '5',
        question: 'What is the default file extension for Excel files?',
        options: ['.xls', '.xlsx', '.csv', '.txt'],
        correctAnswer: '1'
      },
      {
        id: '6',
        question: 'Which function counts the number of cells that contain numbers?',
        options: ['COUNT', 'SUM', 'AVERAGE', 'MAX'],
        correctAnswer: '0'
      },
      {
        id: '7',
        question: 'What is the shortcut to copy selected cells?',
        options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
        correctAnswer: '0'
      },
      {
        id: '8',
        question: 'Which function finds the highest value in a range?',
        options: ['MIN', 'MAX', 'AVERAGE', 'SUM'],
        correctAnswer: '1'
      },
      {
        id: '9',
        question: 'What is the shortcut to paste copied cells?',
        options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
        correctAnswer: '0'
      },
      {
        id: '10',
        question: 'Which function finds the lowest value in a range?',
        options: ['MIN', 'MAX', 'AVERAGE', 'SUM'],
        correctAnswer: '0'
      },
      {
        id: '11',
        question: 'What is the shortcut to undo an action?',
        options: ['Ctrl + Z', 'Ctrl + Y', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: '0'
      },
      {
        id: '12',
        question: 'Which function calculates the average of numbers?',
        options: ['AVERAGE', 'SUM', 'COUNT', 'MAX'],
        correctAnswer: '0'
      },
      {
        id: '13',
        question: 'What is the shortcut to redo an action?',
        options: ['Ctrl + Y', 'Ctrl + Z', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: '0'
      },
      {
        id: '14',
        question: 'Which function counts non-empty cells?',
        options: ['COUNTA', 'COUNT', 'SUM', 'AVERAGE'],
        correctAnswer: '0'
      },
      {
        id: '15',
        question: 'What is the shortcut to cut selected cells?',
        options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'],
        correctAnswer: '0'
      },
      {
        id: '16',
        question: 'Which function concatenates text?',
        options: ['CONCAT', 'JOIN', 'MERGE', 'COMBINE'],
        correctAnswer: '0'
      },
      {
        id: '17',
        question: 'What is the shortcut to find text?',
        options: ['Ctrl + F', 'Ctrl + H', 'Ctrl + G', 'Ctrl + I'],
        correctAnswer: '0'
      },
      {
        id: '18',
        question: 'Which function returns the current date?',
        options: ['TODAY', 'NOW', 'DATE', 'CURRENT'],
        correctAnswer: '0'
      },
      {
        id: '19',
        question: 'What is the shortcut to replace text?',
        options: ['Ctrl + H', 'Ctrl + F', 'Ctrl + G', 'Ctrl + I'],
        correctAnswer: '0'
      },
      {
        id: '20',
        question: 'Which function returns the current time?',
        options: ['NOW', 'TODAY', 'TIME', 'CURRENT'],
        correctAnswer: '0'
      },
      // Moderate Questions (15)
      {
        id: '21',
        question: 'What does the VLOOKUP function do?',
        options: ['Looks up a value in the first column of a table and returns a value in the same row from another column', 'Counts the number of cells that contain numbers', 'Returns the average of the arguments', 'Returns the maximum value in a set of values'],
        correctAnswer: '0'
      },
      {
        id: '22',
        question: 'Which function is used to find the position of a value in a range?',
        options: ['MATCH', 'FIND', 'SEARCH', 'LOOKUP'],
        correctAnswer: '0'
      },
      {
        id: '23',
        question: 'What does the INDEX function do?',
        options: ['Returns a value from a specific position in a range', 'Finds the position of a value', 'Looks up a value', 'Counts cells'],
        correctAnswer: '0'
      },
      {
        id: '24',
        question: 'Which function combines INDEX and MATCH?',
        options: ['INDEX-MATCH', 'VLOOKUP', 'HLOOKUP', 'LOOKUP'],
        correctAnswer: '0'
      },
      {
        id: '25',
        question: 'What does the IF function do?',
        options: ['Returns one value if a condition is true and another if false', 'Counts cells that meet a condition', 'Sums cells that meet a condition', 'Averages cells that meet a condition'],
        correctAnswer: '0'
      },
      {
        id: '26',
        question: 'Which function counts cells that meet multiple criteria?',
        options: ['COUNTIFS', 'COUNTIF', 'SUMIFS', 'SUMIF'],
        correctAnswer: '0'
      },
      {
        id: '27',
        question: 'What does the SUMIF function do?',
        options: ['Sums cells that meet a condition', 'Counts cells that meet a condition', 'Averages cells that meet a condition', 'Finds cells that meet a condition'],
        correctAnswer: '0'
      },
      {
        id: '28',
        question: 'Which function removes extra spaces from text?',
        options: ['TRIM', 'CLEAN', 'SUBSTITUTE', 'REPLACE'],
        correctAnswer: '0'
      },
      {
        id: '29',
        question: 'What does the CONCATENATE function do?',
        options: ['Joins text from multiple cells', 'Splits text into multiple cells', 'Replaces text', 'Finds text'],
        correctAnswer: '0'
      },
      {
        id: '30',
        question: 'Which function extracts a specific number of characters from text?',
        options: ['LEFT', 'RIGHT', 'MID', 'LEN'],
        correctAnswer: '2'
      },
      {
        id: '31',
        question: 'What does the ROUND function do?',
        options: ['Rounds a number to a specified number of digits', 'Rounds up a number', 'Rounds down a number', 'Returns the integer part of a number'],
        correctAnswer: '0'
      },
      {
        id: '32',
        question: 'Which function returns the current date and time?',
        options: ['NOW', 'TODAY', 'DATE', 'TIME'],
        correctAnswer: '0'
      },
      {
        id: '33',
        question: 'What does the RAND function do?',
        options: ['Returns a random number between 0 and 1', 'Returns a random integer', 'Returns a random date', 'Returns a random text'],
        correctAnswer: '0'
      },
      {
        id: '34',
        question: 'Which function returns the number of characters in text?',
        options: ['LEN', 'LEFT', 'RIGHT', 'MID'],
        correctAnswer: '0'
      },
      {
        id: '35',
        question: 'What does the SUBSTITUTE function do?',
        options: ['Replaces specific text in a string', 'Finds text in a string', 'Extracts text from a string', 'Joins text from strings'],
        correctAnswer: '0'
      },
      // Advanced Questions (15)
      {
        id: '36',
        question: 'What does the INDIRECT function do?',
        options: ['Returns a reference specified by a text string', 'Returns a value from a range', 'Returns a cell address', 'Returns a range address'],
        correctAnswer: '0'
      },
      {
        id: '37',
        question: 'Which function creates a dynamic array of unique values?',
        options: ['UNIQUE', 'FILTER', 'SORT', 'SORTBY'],
        correctAnswer: '0'
      },
      {
        id: '38',
        question: 'What does the XLOOKUP function do?',
        options: ['Searches a range and returns an item', 'Filters a range', 'Sorts a range', 'Returns unique values'],
        correctAnswer: '0'
      },
      {
        id: '39',
        question: 'Which function filters a range based on criteria?',
        options: ['FILTER', 'SORT', 'UNIQUE', 'SORTBY'],
        correctAnswer: '0'
      },
      {
        id: '40',
        question: 'What does the LET function do?',
        options: ['Assigns names to calculation results', 'Filters data', 'Sorts data', 'Returns unique values'],
        correctAnswer: '0'
      },
      {
        id: '41',
        question: 'Which function sorts a range based on another range?',
        options: ['SORTBY', 'SORT', 'FILTER', 'UNIQUE'],
        correctAnswer: '0'
      },
      {
        id: '42',
        question: 'What does the SEQUENCE function do?',
        options: ['Generates a sequence of numbers', 'Filters data', 'Sorts data', 'Returns unique values'],
        correctAnswer: '0'
      },
      {
        id: '43',
        question: 'Which function returns an array of random numbers?',
        options: ['RANDARRAY', 'RAND', 'RANDBETWEEN', 'RANDOM'],
        correctAnswer: '0'
      },
      {
        id: '44',
        question: 'What does the LAMBDA function do?',
        options: ['Creates custom functions', 'Filters data', 'Sorts data', 'Returns unique values'],
        correctAnswer: '0'
      },
      {
        id: '45',
        question: 'Which function returns an array of dates?',
        options: ['SEQUENCE', 'RANDARRAY', 'UNIQUE', 'FILTER'],
        correctAnswer: '0'
      },
      {
        id: '46',
        question: 'What does the BYROW function do?',
        options: ['Applies a LAMBDA to each row', 'Filters data', 'Sorts data', 'Returns unique values'],
        correctAnswer: '0'
      },
      {
        id: '47',
        question: 'Which function returns an array of text?',
        options: ['TEXTSPLIT', 'TEXTJOIN', 'CONCAT', 'JOIN'],
        correctAnswer: '0'
      },
      {
        id: '48',
        question: 'What does the BYCOL function do?',
        options: ['Applies a LAMBDA to each column', 'Filters data', 'Sorts data', 'Returns unique values'],
        correctAnswer: '0'
      },
      {
        id: '49',
        question: 'Which function returns an array of numbers?',
        options: ['SEQUENCE', 'RANDARRAY', 'UNIQUE', 'FILTER'],
        correctAnswer: '0'
      },
      {
        id: '50',
        question: 'What does the MAP function do?',
        options: ['Applies a LAMBDA to create a new array', 'Filters data', 'Sorts data', 'Returns unique values'],
        correctAnswer: '0'
      }
    ],
    totalStudents: 0,
    activeExams: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'MS Office Certification',
    description: 'Get certified in Microsoft Office suite applications',
    icon: 'FileText',
    questions: [
      // Easy Questions (20)
      {
        id: '1',
        question: 'What is the default file extension for Word documents?',
        options: ['.doc', '.docx', '.txt', '.pdf'],
        correctAnswer: '1'
      },
      {
        id: '2',
        question: 'Which tab contains the Print command in Word?',
        options: ['Home', 'Insert', 'File', 'View'],
        correctAnswer: '2'
      },
      {
        id: '3',
        question: 'What is the shortcut to save a document?',
        options: ['Ctrl + S', 'Ctrl + P', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: '0'
      },
      {
        id: '4',
        question: 'Which function is used to create a new document?',
        options: ['Ctrl + N', 'Ctrl + O', 'Ctrl + S', 'Ctrl + P'],
        correctAnswer: '0'
      },
      {
        id: '5',
        question: 'What is the shortcut to open a document?',
        options: ['Ctrl + O', 'Ctrl + N', 'Ctrl + S', 'Ctrl + P'],
        correctAnswer: '0'
      },
      {
        id: '6',
        question: 'Which tab contains the font formatting options?',
        options: ['Home', 'Insert', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '7',
        question: 'What is the shortcut to copy text?',
        options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
        correctAnswer: '0'
      },
      {
        id: '8',
        question: 'What is the shortcut to paste text?',
        options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
        correctAnswer: '0'
      },
      {
        id: '9',
        question: 'What is the shortcut to cut text?',
        options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'],
        correctAnswer: '0'
      },
      {
        id: '10',
        question: 'What is the shortcut to undo an action?',
        options: ['Ctrl + Z', 'Ctrl + Y', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: '0'
      },
      {
        id: '11',
        question: 'What is the shortcut to redo an action?',
        options: ['Ctrl + Y', 'Ctrl + Z', 'Ctrl + X', 'Ctrl + C'],
        correctAnswer: '0'
      },
      {
        id: '12',
        question: 'Which tab contains the table options?',
        options: ['Insert', 'Home', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '13',
        question: 'What is the shortcut to find text?',
        options: ['Ctrl + F', 'Ctrl + H', 'Ctrl + G', 'Ctrl + I'],
        correctAnswer: '0'
      },
      {
        id: '14',
        question: 'What is the shortcut to replace text?',
        options: ['Ctrl + H', 'Ctrl + F', 'Ctrl + G', 'Ctrl + I'],
        correctAnswer: '0'
      },
      {
        id: '15',
        question: 'Which tab contains the page setup options?',
        options: ['Page Layout', 'Home', 'Insert', 'View'],
        correctAnswer: '0'
      },
      {
        id: '16',
        question: 'What is the shortcut to print a document?',
        options: ['Ctrl + P', 'Ctrl + S', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: '0'
      },
      {
        id: '17',
        question: 'Which tab contains the header and footer options?',
        options: ['Insert', 'Home', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '18',
        question: 'What is the shortcut to select all text?',
        options: ['Ctrl + A', 'Ctrl + S', 'Ctrl + N', 'Ctrl + O'],
        correctAnswer: '0'
      },
      {
        id: '19',
        question: 'Which tab contains the review options?',
        options: ['Review', 'Home', 'Insert', 'View'],
        correctAnswer: '0'
      },
      {
        id: '20',
        question: 'What is the shortcut to check spelling?',
        options: ['F7', 'F5', 'F6', 'F8'],
        correctAnswer: '0'
      },
      // Moderate Questions (15)
      {
        id: '21',
        question: 'What is the purpose of the Mail Merge feature?',
        options: ['To create personalized documents for multiple recipients', 'To send emails', 'To merge multiple documents', 'To create templates'],
        correctAnswer: '0'
      },
      {
        id: '22',
        question: 'Which feature allows you to track changes in a document?',
        options: ['Track Changes', 'Compare', 'Review', 'Changes'],
        correctAnswer: '0'
      },
      {
        id: '23',
        question: 'What is the purpose of the Table of Contents feature?',
        options: ['To create an organized list of document sections', 'To create a table', 'To create a list', 'To create a summary'],
        correctAnswer: '0'
      },
      {
        id: '24',
        question: 'Which feature allows you to create a bibliography?',
        options: ['References', 'Insert', 'Review', 'View'],
        correctAnswer: '0'
      },
      {
        id: '25',
        question: 'What is the purpose of the Styles feature?',
        options: ['To apply consistent formatting', 'To create styles', 'To format text', 'To create templates'],
        correctAnswer: '0'
      },
      {
        id: '26',
        question: 'Which feature allows you to create a form?',
        options: ['Developer', 'Insert', 'Review', 'View'],
        correctAnswer: '0'
      },
      {
        id: '27',
        question: 'What is the purpose of the Macros feature?',
        options: ['To automate tasks', 'To create macros', 'To run scripts', 'To create programs'],
        correctAnswer: '0'
      },
      {
        id: '28',
        question: 'Which feature allows you to create a watermark?',
        options: ['Design', 'Insert', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '29',
        question: 'What is the purpose of the Navigation Pane?',
        options: ['To navigate through a document', 'To view pages', 'To search text', 'To view headings'],
        correctAnswer: '0'
      },
      {
        id: '30',
        question: 'Which feature allows you to create a table of figures?',
        options: ['References', 'Insert', 'Review', 'View'],
        correctAnswer: '0'
      },
      {
        id: '31',
        question: 'What is the purpose of the Quick Parts feature?',
        options: ['To insert reusable content', 'To create parts', 'To insert text', 'To create templates'],
        correctAnswer: '0'
      },
      {
        id: '32',
        question: 'Which feature allows you to create a cover page?',
        options: ['Insert', 'Home', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '33',
        question: 'What is the purpose of the Document Inspector?',
        options: ['To remove hidden data', 'To inspect documents', 'To check content', 'To verify data'],
        correctAnswer: '0'
      },
      {
        id: '34',
        question: 'Which feature allows you to create a table of authorities?',
        options: ['References', 'Insert', 'Review', 'View'],
        correctAnswer: '0'
      },
      {
        id: '35',
        question: 'What is the purpose of the Building Blocks feature?',
        options: ['To insert reusable content', 'To create blocks', 'To insert text', 'To create templates'],
        correctAnswer: '0'
      },
      // Advanced Questions (15)
      {
        id: '36',
        question: 'What is the purpose of the Content Controls feature?',
        options: ['To create structured documents', 'To control content', 'To manage content', 'To organize content'],
        correctAnswer: '0'
      },
      {
        id: '37',
        question: 'Which feature allows you to create a custom XML schema?',
        options: ['Developer', 'Insert', 'Review', 'View'],
        correctAnswer: '0'
      },
      {
        id: '38',
        question: 'What is the purpose of the Document Properties feature?',
        options: ['To manage document metadata', 'To set properties', 'To manage files', 'To organize documents'],
        correctAnswer: '0'
      },
      {
        id: '39',
        question: 'Which feature allows you to create a custom ribbon?',
        options: ['Options', 'Customize Ribbon', 'Developer', 'View'],
        correctAnswer: '1'
      },
      {
        id: '40',
        question: 'What is the purpose of the Quick Access Toolbar?',
        options: ['To access frequently used commands', 'To access tools', 'To access options', 'To access features'],
        correctAnswer: '0'
      },
      {
        id: '41',
        question: 'Which feature allows you to create a custom style set?',
        options: ['Design', 'Home', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '42',
        question: 'What is the purpose of the Document Themes feature?',
        options: ['To apply consistent formatting', 'To create themes', 'To format documents', 'To style documents'],
        correctAnswer: '0'
      },
      {
        id: '43',
        question: 'Which feature allows you to create a custom keyboard shortcut?',
        options: ['Options', 'Customize Ribbon', 'Developer', 'View'],
        correctAnswer: '0'
      },
      {
        id: '44',
        question: 'What is the purpose of the Document Templates feature?',
        options: ['To create reusable documents', 'To create templates', 'To format documents', 'To style documents'],
        correctAnswer: '0'
      },
      {
        id: '45',
        question: 'Which feature allows you to create a custom building block?',
        options: ['Insert', 'Home', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '46',
        question: 'What is the purpose of the Document Protection feature?',
        options: ['To restrict editing', 'To protect documents', 'To secure files', 'To lock content'],
        correctAnswer: '0'
      },
      {
        id: '47',
        question: 'Which feature allows you to create a custom watermark?',
        options: ['Design', 'Insert', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '48',
        question: 'What is the purpose of the Document Compare feature?',
        options: ['To compare two documents', 'To check differences', 'To verify changes', 'To review documents'],
        correctAnswer: '0'
      },
      {
        id: '49',
        question: 'Which feature allows you to create a custom table style?',
        options: ['Design', 'Home', 'Page Layout', 'View'],
        correctAnswer: '0'
      },
      {
        id: '50',
        question: 'What is the purpose of the Document Inspector feature?',
        options: ['To remove hidden data', 'To inspect documents', 'To check content', 'To verify data'],
        correctAnswer: '0'
      }
    ],
    totalStudents: 0,
    activeExams: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'BCA Certification',
    description: 'Bachelor of Computer Applications certification program',
    icon: 'GraduationCap',
    questions: [
      // Easy Questions (20)
      {
        id: '1',
        question: 'What is the full form of BCA?',
        options: ['Bachelor of Computer Applications', 'Bachelor of Computer Arts', 'Bachelor of Computer Administration', 'Bachelor of Computer Analysis'],
        correctAnswer: '0'
      },
      {
        id: '2',
        question: 'Which programming language is commonly taught in BCA?',
        options: ['C', 'Java', 'Python', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '3',
        question: 'What is the duration of a BCA course?',
        options: ['3 years', '4 years', '2 years', '5 years'],
        correctAnswer: '0'
      },
      {
        id: '4',
        question: 'Which subject is NOT typically part of BCA curriculum?',
        options: ['Data Structures', 'Database Management', 'Civil Engineering', 'Operating Systems'],
        correctAnswer: '2'
      },
      {
        id: '5',
        question: 'What is the basic unit of memory in a computer?',
        options: ['Bit', 'Byte', 'Kilobyte', 'Megabyte'],
        correctAnswer: '0'
      },
      {
        id: '6',
        question: 'Which of these is a high-level programming language?',
        options: ['Assembly', 'Machine Code', 'Python', 'Binary'],
        correctAnswer: '2'
      },
      {
        id: '7',
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'High Text Modern Language'],
        correctAnswer: '0'
      },
      {
        id: '8',
        question: 'Which of these is a database management system?',
        options: ['MySQL', 'Java', 'Python', 'HTML'],
        correctAnswer: '0'
      },
      {
        id: '9',
        question: 'What is the extension of a Python file?',
        options: ['.py', '.java', '.cpp', '.html'],
        correctAnswer: '0'
      },
      {
        id: '10',
        question: 'Which of these is a web browser?',
        options: ['Chrome', 'Word', 'Excel', 'PowerPoint'],
        correctAnswer: '0'
      },
      {
        id: '11',
        question: 'What is the main function of an operating system?',
        options: ['Manage hardware resources', 'Create documents', 'Design websites', 'Write programs'],
        correctAnswer: '0'
      },
      {
        id: '12',
        question: 'Which of these is a type of computer network?',
        options: ['LAN', 'WAN', 'MAN', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '13',
        question: 'What is the full form of URL?',
        options: ['Uniform Resource Locator', 'Universal Resource Locator', 'Uniform Resource Link', 'Universal Resource Link'],
        correctAnswer: '0'
      },
      {
        id: '14',
        question: 'Which of these is a programming paradigm?',
        options: ['Object-Oriented', 'Procedural', 'Functional', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '15',
        question: 'What is the extension of a Java file?',
        options: ['.java', '.py', '.cpp', '.html'],
        correctAnswer: '0'
      },
      {
        id: '16',
        question: 'Which of these is a version control system?',
        options: ['Git', 'Java', 'Python', 'HTML'],
        correctAnswer: '0'
      },
      {
        id: '17',
        question: 'What is the full form of SQL?',
        options: ['Structured Query Language', 'Simple Query Language', 'Structured Question Language', 'Simple Question Language'],
        correctAnswer: '0'
      },
      {
        id: '18',
        question: 'Which of these is a type of computer memory?',
        options: ['RAM', 'ROM', 'Cache', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '19',
        question: 'What is the extension of a C++ file?',
        options: ['.cpp', '.java', '.py', '.html'],
        correctAnswer: '0'
      },
      {
        id: '20',
        question: 'Which of these is a type of computer virus?',
        options: ['Trojan', 'Worm', 'Spyware', 'All of the above'],
        correctAnswer: '3'
      },
      // Moderate Questions (15)
      {
        id: '21',
        question: 'What is the time complexity of binary search?',
        options: ['O(log n)', 'O(n)', 'O(n^2)', 'O(1)'],
        correctAnswer: '0'
      },
      {
        id: '22',
        question: 'Which data structure uses LIFO principle?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        correctAnswer: '0'
      },
      {
        id: '23',
        question: 'What is normalization in database?',
        options: ['Process of organizing data', 'Process of deleting data', 'Process of copying data', 'Process of encrypting data'],
        correctAnswer: '0'
      },
      {
        id: '24',
        question: 'Which of these is a sorting algorithm?',
        options: ['Quick Sort', 'Bubble Sort', 'Merge Sort', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '25',
        question: 'What is the purpose of DNS?',
        options: ['Convert domain names to IP addresses', 'Convert IP addresses to domain names', 'Create domain names', 'Delete domain names'],
        correctAnswer: '0'
      },
      {
        id: '26',
        question: 'Which of these is a type of inheritance?',
        options: ['Single', 'Multiple', 'Multilevel', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '27',
        question: 'What is the purpose of a firewall?',
        options: ['Network security', 'Data storage', 'Data processing', 'Data backup'],
        correctAnswer: '0'
      },
      {
        id: '28',
        question: 'Which of these is a type of database model?',
        options: ['Relational', 'Hierarchical', 'Network', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '29',
        question: 'What is the purpose of an API?',
        options: ['Enable communication between software', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '30',
        question: 'Which of these is a type of testing?',
        options: ['Unit Testing', 'Integration Testing', 'System Testing', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '31',
        question: 'What is the purpose of a compiler?',
        options: ['Convert high-level code to machine code', 'Convert machine code to high-level code', 'Store code', 'Backup code'],
        correctAnswer: '0'
      },
      {
        id: '32',
        question: 'Which of these is a type of cloud service?',
        options: ['IaaS', 'PaaS', 'SaaS', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '33',
        question: 'What is the purpose of a virtual machine?',
        options: ['Run multiple operating systems', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '34',
        question: 'Which of these is a type of software development model?',
        options: ['Waterfall', 'Agile', 'Spiral', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '35',
        question: 'What is the purpose of a router?',
        options: ['Connect networks', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      // Advanced Questions (15)
      {
        id: '36',
        question: 'What is the time complexity of Dijkstra\'s algorithm?',
        options: ['O(V^2)', 'O(V log V)', 'O(E log V)', 'O(E + V log V)'],
        correctAnswer: '3'
      },
      {
        id: '37',
        question: 'Which of these is a type of machine learning?',
        options: ['Supervised', 'Unsupervised', 'Reinforcement', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '38',
        question: 'What is the purpose of a neural network?',
        options: ['Pattern recognition', 'Data storage', 'Data processing', 'Data backup'],
        correctAnswer: '0'
      },
      {
        id: '39',
        question: 'Which of these is a type of blockchain?',
        options: ['Public', 'Private', 'Consortium', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '40',
        question: 'What is the purpose of a quantum computer?',
        options: ['Solve complex problems', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '41',
        question: 'Which of these is a type of artificial intelligence?',
        options: ['Narrow AI', 'General AI', 'Super AI', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '42',
        question: 'What is the purpose of a distributed system?',
        options: ['Share resources', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '43',
        question: 'Which of these is a type of cryptography?',
        options: ['Symmetric', 'Asymmetric', 'Hash', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '44',
        question: 'What is the purpose of a microservice architecture?',
        options: ['Build scalable applications', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '45',
        question: 'Which of these is a type of cloud deployment model?',
        options: ['Public', 'Private', 'Hybrid', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '46',
        question: 'What is the purpose of a container?',
        options: ['Package software', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '47',
        question: 'Which of these is a type of software architecture?',
        options: ['Monolithic', 'Microservices', 'Event-Driven', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '48',
        question: 'What is the purpose of a load balancer?',
        options: ['Distribute traffic', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      },
      {
        id: '49',
        question: 'Which of these is a type of database index?',
        options: ['B-tree', 'Hash', 'Bitmap', 'All of the above'],
        correctAnswer: '3'
      },
      {
        id: '50',
        question: 'What is the purpose of a message queue?',
        options: ['Handle asynchronous communication', 'Store data', 'Process data', 'Backup data'],
        correctAnswer: '0'
      }
    ],
    totalStudents: 0,
    activeExams: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]; 