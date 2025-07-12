import React, { useState } from 'react';
import { Bell, User, Search, Home, Users, MessageSquare, Plus, Briefcase, X, Image, Sun, Moon } from 'lucide-react';
import type { User as UserType } from '../App';
import { getUnreadNotificationsCount } from '../services/dummyData';
import { NotificationsModal } from './NotificationsModal';
import { GalleryModal } from './GalleryModal';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  currentUser: UserType | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onNavigate: (view: 'feed' | 'profile' | 'categories' | 'chat' | 'notifications' | 'messages') => void;
  activeView: string;
  onAskQuestion?: () => void;
}

export function Navigation({ 
  currentUser, 
  onLogin, 
  onRegister, 
  onLogout, 
  onNavigate, 
  activeView,
  onAskQuestion
}: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 backdrop-blur-xl shadow-2xl border-b border-blue-400/10 px-4 py-2 flex items-center justify-between transition-all duration-300">
      {/* Logo and Home */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('feed')}
          className={`flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight px-2 py-1 rounded-lg transition-all duration-300 ${activeView === 'feed' ? 'ring-2 ring-blue-400/60' : ''}`}
        >
          <Home className="w-7 h-7" />
          <span className="hidden sm:inline">StackIt</span>
        </button>
      </div>
      {/* Main Nav Buttons */}
      <div className="hidden md:flex items-center gap-6 relative">
        {['feed', 'categories', 'messages', 'notifications', 'profile'].map((view, idx) => (
          <button
            key={view}
            onClick={() => onNavigate(view as any)}
            className={`flex flex-col items-center px-3 py-2 rounded-lg font-semibold text-base transition-all duration-300 group ${activeView === view ? 'text-blue-400' : 'text-gray-300 hover:text-blue-300'}`}
          >
            {view === 'feed' && <Home className="w-5 h-5 mb-1" />}
            {view === 'categories' && <Briefcase className="w-5 h-5 mb-1" />}
            {view === 'messages' && <MessageSquare className="w-5 h-5 mb-1" />}
            {view === 'notifications' && <Bell className="w-5 h-5 mb-1" />}
            {view === 'profile' && <User className="w-5 h-5 mb-1" />}
            <span className="text-xs capitalize">{view}</span>
            {/* Animated active tab indicator */}
            <span className={`absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${activeView === view ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'}`}></span>
          </button>
        ))}
      </div>
      {/* Profile/Ask/Logout & Theme Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-300 transition-all duration-300 rotate-0" />
          ) : (
            <Moon className="w-5 h-5 text-blue-900 transition-all duration-300 rotate-180" />
          )}
        </button>
        {currentUser ? (
          <>
            <button
              onClick={onAskQuestion}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg transition-all duration-300 font-semibold"
            >
              Logout
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="hidden md:block text-white font-medium">Me</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={onLogin} className="text-blue-400 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">Login</button>
            <button onClick={onRegister} className="text-purple-400 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">Register</button>
          </>
        )}
      </div>
      {/* Floating Ask Button for Mobile */}
      {currentUser && onAskQuestion && (
        <motion.button
          onClick={onAskQuestion}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
          className="fixed bottom-6 right-6 z-50 flex md:hidden items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 focus:outline-none border-4 border-white/10"
          title="Ask Question"
        >
          <Plus className="w-8 h-8" />
        </motion.button>
      )}
    </nav>
  );
}