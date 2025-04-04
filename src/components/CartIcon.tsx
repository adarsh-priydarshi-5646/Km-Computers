import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const { state } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="fixed top-20 right-4 z-50">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          onHoverStart={() => setShowPreview(true)}
          onHoverEnd={() => setShowPreview(false)}
        >
          <button 
            className="p-3 bg-yellow-400 rounded-full text-black hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/20"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <AnimatePresence>
            {showPreview && state.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute top-full right-0 mt-2 w-72 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-lg shadow-xl"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Cart ({totalItems} items)</h3>
                  <div className="space-y-3 max-h-64 overflow-auto">
                    {state.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium">Total:</span>
                      <span className="font-semibold">₹{state.total.toLocaleString()}</span>
                    </div>
                    <button 
                      className="btn-primary w-full justify-center py-2"
                      onClick={() => setIsCartOpen(true)}
                    >
                      View Cart
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}