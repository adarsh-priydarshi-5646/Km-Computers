import { useState } from 'react';
import { sendEmail } from '../utils/emailjs';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>(initialFormState);

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email format";
    if (!form.subject.trim()) return "Subject is required";
    if (!form.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmail("CONTACT", {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        reply_to: form.email
      });

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setForm(initialFormState);
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">
          Subject *
        </label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">
          Message *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={20} />
          </>
        )}
      </button>
    </form>
  );
}