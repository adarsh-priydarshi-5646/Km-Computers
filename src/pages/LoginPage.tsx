import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  Shield,
  User,
  Key,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotUsername, setShowForgotUsername] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
      toast.error('Invalid credentials!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode !== '229310') {
      setError('Invalid verification code');
      return;
    }
    setIsVerifying(true);
    try {
      // Here you would typically make an API call to reset password
      setError('Password reset successful! Please check your email.');
      setShowForgotPassword(false);
      setVerificationCode('');
      setNewPassword('');
    } catch (err) {
      setError('Failed to reset password');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleForgotUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode !== '229310') {
      setError('Invalid verification code');
      return;
    }
    setIsVerifying(true);
    try {
      // Here you would typically make an API call to reset username
      setError('Username reset successful! Please check your email.');
      setShowForgotUsername(false);
      setVerificationCode('');
      setNewUsername('');
    } catch (err) {
      setError('Failed to reset username');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
          </div>

          {/* Header */}
          <div className="relative text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-4 bg-yellow-400/10 rounded-full flex items-center justify-center"
            >
              <Shield className="w-10 h-10 text-yellow-400" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-neutral-300">
              Sign in to access admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="relative space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Username
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your username"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-yellow-400 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-yellow-400 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotUsername(true)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot username?
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full justify-center group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sign In
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-400"
          >
            <Shield className="w-4 h-4" />
            Your data is protected with industry-standard encryption
          </motion.div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-neutral-900 rounded-xl p-8 max-w-md w-full border border-neutral-800 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Reset Password</h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 border border-transparent rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Forgot Username Modal */}
      {showForgotUsername && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-neutral-900 rounded-xl p-8 max-w-md w-full border border-neutral-800 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Reset Username</h3>
              <button
                onClick={() => setShowForgotUsername(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleForgotUsername} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  New Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForgotUsername(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 border border-transparent rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Reset Username'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}