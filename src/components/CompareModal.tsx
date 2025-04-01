import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type LaptopType = {
  id: number;
  name: string;
  brand: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
  };
  image: string;
  warranty: string;
  rating: number;
};

type CompareModalProps = {
  laptops: LaptopType[];
  isOpen: boolean;
  onClose: () => void;
};

export default function CompareModal({ laptops, isOpen, onClose }: CompareModalProps) {
  const specs = [
    { label: 'Processor', key: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Display', key: 'display' },
    { label: 'Graphics', key: 'graphics' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-auto glass-card"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Compare Laptops</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Headers */}
                <div className="hidden md:block">
                  <div className="h-48"></div> {/* Space for images */}
                  <div className="space-y-6 mt-6">
                    <p className="font-semibold">Brand</p>
                    <p className="font-semibold">Price</p>
                    <p className="font-semibold">Rating</p>
                    <p className="font-semibold">Warranty</p>
                    {specs.map(spec => (
                      <p key={spec.key} className="font-semibold">{spec.label}</p>
                    ))}
                  </div>
                </div>

                {/* Laptop Columns */}
                {laptops.map(laptop => (
                  <div key={laptop.id} className="glass-card p-4 md:p-0 md:bg-transparent md:backdrop-blur-none">
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{laptop.name}</h3>
                    
                    <div className="space-y-6">
                      <div className="md:hidden font-semibold">Brand</div>
                      <p>{laptop.brand}</p>
                      
                      <div className="md:hidden font-semibold">Price</div>
                      <p>₹{laptop.price.toLocaleString()}</p>
                      
                      <div className="md:hidden font-semibold">Rating</div>
                      <p>{laptop.rating}/5</p>
                      
                      <div className="md:hidden font-semibold">Warranty</div>
                      <p>{laptop.warranty}</p>
                      
                      {specs.map(spec => (
                        <div key={spec.key}>
                          <div className="md:hidden font-semibold">{spec.label}</div>
                          <p>{laptop.specs[spec.key as keyof typeof laptop.specs]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}