import React, { useState } from 'react';
import { X, Bell, Check, Trash2 } from 'lucide-react';
import { dummyNotifications, markNotificationAsRead, getUnreadNotificationsCount } from '../services/dummyData';
import { AnimatePresence, motion } from 'framer-motion';

interface NotificationsModalProps {
  onClose: () => void;
}

export function NotificationsModal({ onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications([...notifications]); // Trigger re-render
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) {
        markNotificationAsRead(n.id);
      }
    });
    setNotifications([...notifications]);
    // Show confetti if all are now read
    if (notifications.every(n => n.read)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  };

  const handleDeleteNotification = (id: string) => {
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
      setNotifications([...notifications]);
    }
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = getUnreadNotificationsCount();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-blue-400/20 shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-fade-in relative">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 z-50 p-3 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-blue-400/40 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300 border-4 border-white/20 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
          title="Close"
          style={{ boxShadow: '0 4px 32px 0 rgba(80,80,255,0.25)' }}
        >
          <X className="w-7 h-7" />
        </button>
        {/* Confetti Sparkle Animation */}
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <span className="text-6xl animate-bounce text-yellow-300 drop-shadow-lg">✨</span>
          </motion.div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-400/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">Notifications</h2>
              <p className="text-white/70 text-sm">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {/* Remove close button from here */}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-blue-400/20 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 text-center font-semibold transition-colors duration-300 ${
              activeTab === 'all'
                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/5'
                : 'text-white/60 hover:text-white'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex-1 py-3 text-center font-semibold transition-colors duration-300 ${
              activeTab === 'unread'
                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/5'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-4 border-b border-blue-400/20 bg-blue-500/5 flex justify-end">
            <button
              onClick={handleMarkAllAsRead}
              className="text-blue-400 hover:text-blue-200 text-sm font-semibold transition-colors duration-200 px-4 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 shadow-sm"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-200px)] bg-gradient-to-br from-blue-900/10 to-purple-900/10">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                {activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-white/60">
                {activeTab === 'unread' 
                  ? 'You\'re all caught up!' 
                  : 'Notifications will appear here'}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.07 }}
                  className={`p-4 transition-all duration-300 rounded-xl my-2 flex items-start gap-3 shadow-sm group hover:bg-blue-500/10 ${
                    notification.read ? 'bg-white/5 opacity-70' : 'bg-blue-500/20 border-l-4 border-blue-400 shadow-lg'
                  }`}
                  layout
                >
                  <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed font-medium ${
                      notification.read ? 'text-white/70' : 'text-white'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200 rounded-full hover:bg-green-500/10"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200 rounded-full hover:bg-red-500/10"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
} 