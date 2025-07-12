import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Feed } from './components/Feed';
import { CategorySelection } from './components/CategorySelection';
import { UserProfile } from './components/UserProfile';
import { AuthModal } from './components/AuthModal';
import { CreatePost } from './components/CreatePost';
import { GroupChat } from './components/GroupChat';
import { NotificationsPage } from './components/NotificationsPage';
import { MessagesPage } from './components/MessagesPage';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  followers: number;
  following: number;
  categories: string[];
}

export interface Question {
  id: string;
  title: string;
  description: string;
  author: User;
  tags: string[];
  upvotes: number;
  downvotes: number;
  answers: Answer[];
  createdAt: string;
  userVote?: 'up' | 'down';
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  createdAt: string;
  userVote?: 'up' | 'down';
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeView, setActiveView] = useState<'feed' | 'profile' | 'categories' | 'chat' | 'notifications' | 'messages'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);
  const { theme } = useTheme();

  // Simple dummy login - accept any email/password
  const handleLogin = (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0] || 'user',
      email,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
      followers: Math.floor(Math.random() * 200) + 50,
      following: Math.floor(Math.random() * 100) + 20,
      categories: []
    };
    setCurrentUser(mockUser);
    setShowAuth(false);
    setShowCategorySelection(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCategories([]);
    setActiveView('feed');
    setShowCategorySelection(false);
    setShowAuth(false);
    setShowCreatePost(false);
  };

  const handleCategoriesSelected = (categories: string[]) => {
    setSelectedCategories(categories);
    if (currentUser) {
      setCurrentUser({ ...currentUser, categories });
    }
    setShowCategorySelection(false);
    setActiveView('feed');
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Professional Backgrounds for Both Themes */}
      <div className="fixed inset-0 z-0">
        {/* Dark mode backgrounds */}
        <div className="hidden dark:block">
          <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
          <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        </div>
        {/* Light mode backgrounds */}
        <div className="block dark:hidden">
          <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-indigo-100"></div>
          <div className="fixed inset-0 bg-gradient-to-tr from-blue-200/40 via-purple-200/40 to-pink-200/40"></div>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent"></div>
        </div>
        {/* Animated background elements (shared) */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      <Navigation 
        currentUser={currentUser}
        onLogin={() => { setAuthMode('login'); setShowAuth(true); }}
        onRegister={() => { setAuthMode('register'); setShowAuth(true); }}
        onLogout={handleLogout}
        onNavigate={setActiveView}
        activeView={activeView}
        onAskQuestion={() => setShowCreatePost(true)}
      />

      <main className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          {activeView === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Feed
                currentUser={currentUser}
                selectedCategories={selectedCategories}
                onCreatePost={() => setShowCreatePost(true)}
                feedRefreshKey={feedRefreshKey}
              />
            </motion.div>
          )}
          {activeView === 'profile' && currentUser && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <UserProfile user={currentUser} />
            </motion.div>
          )}
          {activeView === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <CategorySelection
                selectedCategories={selectedCategories}
                onCategoriesSelected={handleCategoriesSelected}
              />
            </motion.div>
          )}
          {activeView === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <GroupChat currentUser={currentUser} />
            </motion.div>
          )}
          {activeView === 'notifications' && currentUser && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <NotificationsPage currentUser={currentUser} />
            </motion.div>
          )}
          {activeView === 'messages' && currentUser && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <MessagesPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {showAuth && (
        <AuthModal 
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}

      {showCreatePost && currentUser && (
        <CreatePost 
          onClose={() => { setShowCreatePost(false); setFeedRefreshKey(k => k + 1); }}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default App;