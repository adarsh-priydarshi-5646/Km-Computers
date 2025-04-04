import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, CheckCircle2, Shield, QrCode, Share2 } from 'lucide-react';
import { useState } from 'react';
import QRCode from 'qrcode.react';

type CertificateProps = {
  studentName: string;
  courseName: string;
  score: number;
  completionDate: string;
};

export default function Certificate({ studentName, courseName, score, completionDate }: CertificateProps) {
  const [showQR, setShowQR] = useState(false);
  const certificateId = `KM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add gradient background with pattern
    const gradient = doc.setGState(new doc.GState({opacity: 0.1}));
    doc.setFillColor(255, 215, 0);
    doc.rect(0, 0, 297, 210, 'F');

    // Add border with decorative pattern
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 277, 190);

    // Add decorative corners with gold color
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(2);
    doc.line(20, 20, 40, 20);
    doc.line(20, 20, 20, 40);
    doc.line(257, 20, 277, 20);
    doc.line(277, 20, 277, 40);
    doc.line(20, 190, 40, 190);
    doc.line(20, 190, 20, 170);
    doc.line(257, 190, 277, 190);
    doc.line(277, 190, 277, 170);

    // Add watermark with pattern
    doc.setFontSize(60);
    doc.setTextColor(255, 215, 0, 0.1);
    doc.text('KM Computers', 148.5, 105, { align: 'center' });

    // Add title with gold color and shadow effect
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 215, 0);
    doc.text('Certificate of Excellence', 148.5, 50, { align: 'center' });

    // Add certificate text with improved typography
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('This is to certify that', 148.5, 70, { align: 'center' });

    // Add student name with gold color and shadow
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 215, 0);
    doc.text(studentName, 148.5, 90, { align: 'center' });

    // Add course details with improved formatting
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`has successfully completed the ${courseName} course`, 148.5, 110, { align: 'center' });
    doc.text(`with an outstanding score of ${score.toFixed(1)}%`, 148.5, 130, { align: 'center' });
    doc.text(`on ${completionDate}`, 148.5, 150, { align: 'center' });

    // Add signature line with gold color and improved style
    doc.setDrawColor(255, 215, 0);
    doc.line(80, 170, 217, 170);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Authorized Signature', 148.5, 180, { align: 'center' });

    // Add certificate ID and QR code
    doc.setFontSize(10);
    doc.text(`Certificate ID: ${certificateId}`, 20, 200);

    // Save the PDF with improved filename
    doc.save(`KM-Computers-Certificate-${studentName.toLowerCase().replace(/\s+/g, '-')}-${certificateId}.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KM Computers Certificate',
          text: `I have completed the ${courseName} course with ${score.toFixed(1)}% score!`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative overflow-hidden">
        {/* Decorative elements with improved design */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400 opacity-10 rounded-full -translate-y-20 translate-x-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 opacity-10 rounded-full translate-y-20 -translate-x-20 blur-2xl"></div>

        <div className="relative">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Award className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Certificate of Excellence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600"
            >
              KM Computers Certification Program
            </motion.p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600 mb-1">Student Name</p>
                <p className="font-semibold text-lg">{studentName}</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600 mb-1">Course</p>
                <p className="font-semibold text-lg">{courseName}</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className="font-semibold text-lg text-green-600">{score.toFixed(1)}%</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600 mb-1">Completion Date</p>
                <p className="font-semibold text-lg">{completionDate}</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <Shield className="w-4 h-4 text-green-500" />
              <span>This certificate is digitally verified and can be validated through our system</span>
            </motion.div>

            <div className="mt-8 flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateCertificate}
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Certificate
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQR(!showQR)}
                className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Show QR Code
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </motion.button>
            </div>

            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 flex flex-col items-center gap-4"
                >
                  <QRCode 
                    value={`https://kmcomputers.com/verify/${certificateId}`}
                    size={128}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="text-sm text-gray-500">Scan to verify certificate</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 