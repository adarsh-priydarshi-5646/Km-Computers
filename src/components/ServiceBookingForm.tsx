import { useState } from 'react';
import { sendEmail } from '../utils/emailjs';
import { motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

type ServiceBookingFormProps = {
  services: Array<{
    id: number;
    title: string;
  }>;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  description: string;
};

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  description: ''
};

export default function ServiceBookingForm({ services }: ServiceBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>(initialFormState);

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email format";
    if (!form.phone.trim()) return "Phone number is required";
    if (!form.service) return "Please select a service";
    if (!form.date) return "Please select a date";
    if (!form.time) return "Please select a time";
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
      const result = await sendEmail("SERVICE", {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        service_type: form.service,
        preferred_date: form.date,
        preferred_time: form.time,
        description: form.description,
        reply_to: form.email
      });

      if (result.success) {
        toast.success("Service booking request submitted successfully!");
        setForm(initialFormState);
      } else {
        toast.error("Failed to submit booking request. Please try again later.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
          Phone Number *
        </label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">
          Service Type *
        </label>
        <select
          required
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
        >
          <option value="">Select a service</option>
          {services.map(service => (
            <option key={service.id} value={service.title}>{service.title}</option>
          ))}
          <option value="Other">Other (please specify)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Preferred Date *
          </label>
          <input
            type="date"
            required
            min={minDate}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Preferred Time *
          </label>
          <select
            required
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          >
            <option value="">Select a time</option>
            <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
            <option value="Afternoon (12PM - 3PM)">Afternoon (12PM - 3PM)</option>
            <option value="Evening (3PM - 6PM)">Evening (3PM - 6PM)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">
          Issue Description
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          placeholder="Please describe the issue you're experiencing..."
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
            Submitting...
          </>
        ) : (
          <>
            Submit Service Request
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
}