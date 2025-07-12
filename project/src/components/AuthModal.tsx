import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function AuthModal({ mode, onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Completely dummy login - accept anything
      if (currentMode === 'login') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        onLogin(email, password);
      } else {
        // Register mode - also dummy
        if (!username.trim()) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        onLogin(email, password);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl border border-[#FEFAD4]/30 w-full max-w-md relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8FB9A8] rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F1828D] rounded-full transform -translate-x-12 translate-y-12"></div>
        </div>

        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#FEFAD4] mb-2">
              {currentMode === 'login' ? 'Welcome Back' : 'Join StackIt'}
            </h2>
            <p className="text-white/70">
              {currentMode === 'login' 
                ? 'Sign in to your account to continue' 
                : 'Create your account and start learning'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-[#FEFAD4] mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#FEFAD4]/30 rounded-lg text-[#FEFAD4] placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8FB9A8] transition-all duration-300"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#FEFAD4] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#FEFAD4]/30 rounded-lg text-[#FEFAD4] placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8FB9A8] transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FEFAD4] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-[#FEFAD4]/30 rounded-lg text-[#FEFAD4] placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8FB9A8] transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                loading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#F1828D] text-white hover:bg-[#F1828D]/80 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{currentMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-white/70">
              {currentMode === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button
                onClick={() => setCurrentMode(currentMode === 'login' ? 'register' : 'login')}
                className="text-[#8FB9A8] hover:text-[#F1828D] transition-colors duration-300 font-medium"
              >
                {currentMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}