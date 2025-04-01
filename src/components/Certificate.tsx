import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { motion } from 'framer-motion';

type CertificateProps = {
  studentName: string;
  courseName: string;
  score: number;
  completionDate: string;
};

export default function Certificate({ studentName, courseName, score, completionDate }: CertificateProps) {
  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add background pattern
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 297, 210, 'F');

    // Add border
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 277, 190);

    // Add decorative corners
    doc.setLineWidth(2);
    doc.line(20, 20, 40, 20);
    doc.line(20, 20, 20, 40);
    doc.line(257, 20, 277, 20);
    doc.line(277, 20, 277, 40);
    doc.line(20, 190, 40, 190);
    doc.line(20, 190, 20, 170);
    doc.line(257, 190, 277, 190);
    doc.line(277, 190, 277, 170);

    // Add logo (you'll need to add your logo file)
    // doc.addImage('logo.png', 'PNG', 120, 20, 60, 60);

    // Add title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Completion', 148.5, 50, { align: 'center' });

    // Add certificate text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', 148.5, 70, { align: 'center' });

    // Add student name
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(studentName, 148.5, 90, { align: 'center' });

    // Add course details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`has successfully completed the ${courseName} course`, 148.5, 110, { align: 'center' });
    doc.text(`with a score of ${score.toFixed(1)}%`, 148.5, 130, { align: 'center' });
    doc.text(`on ${completionDate}`, 148.5, 150, { align: 'center' });

    // Add signature line
    doc.line(80, 170, 217, 170);
    doc.setFontSize(12);
    doc.text('Authorized Signature', 148.5, 180, { align: 'center' });

    // Save the PDF
    doc.save(`certificate-${studentName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Certificate is Ready!</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="font-medium">{studentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Course</p>
              <p className="font-medium">{courseName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Score</p>
              <p className="font-medium">{score.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completion Date</p>
              <p className="font-medium">{completionDate}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateCertificate}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Download Certificate
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 