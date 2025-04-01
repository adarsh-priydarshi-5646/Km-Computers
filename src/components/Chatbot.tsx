import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Laptop, Percent, Clock, Shield } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  icon?: React.ReactNode;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: '👋 Hello! I\'m your AI assistant at KM Computers. I can help you with:\n\n• Laptop specifications and prices\n• Festival offers and discounts\n• Service inquiries\n• Technical support\n\nHow can I assist you today?',
      icon: <MessageSquare className="w-5 h-5 text-yellow-400" />
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('laptop') || message.includes('price')) {
      return {
        type: 'bot' as const,
        content: '💻 Here are our top laptop categories:\n\n• Gaming Laptops (₹50,000 - ₹2,00,000)\n• Business Laptops (₹40,000 - ₹1,50,000)\n• Student Laptops (₹30,000 - ₹80,000)\n\nWould you like to know more about any specific category?',
        icon: <Laptop className="w-5 h-5 text-yellow-400" />
      };
    }
    
    if (message.includes('offer') || message.includes('discount')) {
      return {
        type: 'bot' as const,
        content: '🎉 Current Offers:\n\n• Diwali Sale: Up to 40% OFF\n• Christmas Special: Up to 35% OFF\n• New Year Sale: Up to 50% OFF\n\nCheck our festival offers section for more details!',
        icon: <Percent className="w-5 h-5 text-yellow-400" />
      };
    }
    
    if (message.includes('service') || message.includes('repair')) {
      return {
        type: 'bot' as const,
        content: '🔧 Our Services:\n\n• Laptop Repair\n• Hardware Upgrades\n• Software Installation\n• Data Recovery\n\nWe offer 24/7 technical support. Need help with anything specific?',
        icon: <Shield className="w-5 h-5 text-yellow-400" />
      };
    }
    
    if (message.includes('time') || message.includes('open')) {
      return {
        type: 'bot' as const,
        content: '⏰ Our Business Hours:\n\n• Monday - Saturday: 10:00 AM - 8:00 PM\n• Sunday: 11:00 AM - 6:00 PM\n\nWe\'re here to serve you!',
        icon: <Clock className="w-5 h-5 text-yellow-400" />
      };
    }

    return {
      type: 'bot' as const,
      content: 'I\'m here to help! You can ask me about:\n\n• Laptop prices and specifications\n• Current offers and discounts\n• Service and repair options\n• Business hours\n\nWhat would you like to know?',
      icon: <MessageSquare className="w-5 h-5 text-yellow-400" />
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    
    // Get and add bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card w-80 h-96 mb-4 flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-700">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">KM Computers AI</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-neutral-800 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    {message.type === 'bot' && message.icon && (
                      <div className="flex items-center gap-2 mb-2">
                        {message.icon}
                        <span className="text-sm font-medium">AI Assistant</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about laptops, offers, or services..."
                  className="flex-1 p-2 bg-neutral-800 rounded-lg border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
                <button
                  type="submit"
                  className="p-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-yellow-400 text-black rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
} 