import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageCircle, Share, Clock, Tag, Check, Eye } from 'lucide-react';
import type { User, Question } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  currentUser: User | null;
  onVote: (questionId: string, voteType: 'up' | 'down') => void;
}

export function QuestionCard({ question, currentUser, onVote }: QuestionCardProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [voteAnim, setVoteAnim] = useState<'up' | 'down' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answers, setAnswers] = useState(question.answers);
  const [newAnswer, setNewAnswer] = useState('');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: question.title,
        text: question.description,
        url: window.location.href + '/question/' + question.id,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + '/question/' + question.id);
      setShowShareMenu(true);
      setTimeout(() => setShowShareMenu(false), 2000);
    }
  };

  const handleVote = (type: 'up' | 'down') => {
    setVoteAnim(type);
    onVote(question.id, type);
    if (type === 'up' && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
    setTimeout(() => setVoteAnim(null), 400);
  };

  const handleAddAnswer = () => {
    if (!currentUser || !newAnswer.trim()) return;
    const answer = {
      id: 'user-' + Date.now(),
      content: newAnswer,
      author: currentUser,
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
      createdAt: 'Just now',
      userVote: undefined
    };
    setAnswers([answer, ...answers]);
    setNewAnswer('');
  };

  return (
    <motion.div
      className="glass dark:glass-dark rounded-2xl shadow-xl border border-blue-500/20 p-6 hover:scale-[1.02] transition-transform duration-200 group relative overflow-hidden backdrop-blur-xl ring-1 ring-blue-400/10 hover:ring-blue-400/30 animate-fade-in"
      whileHover={{ rotate: 0.5, boxShadow: '0 8px 32px 0 rgba(80,80,255,0.15)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Confetti burst on upvote */}
      <AnimatePresence>
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
      </AnimatePresence>
      {/* Glassy animated highlight */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-80 opacity-60 transition-all duration-300" />
      {/* Header */}
      <div className="flex items-center mb-3">
        <img
          src={question.author.avatar}
          alt={question.author.username}
          className="w-10 h-10 rounded-full border-2 border-blue-500 mr-3 shadow-md"
        />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-base leading-tight">{question.author.username}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{question.createdAt}</div>
        </div>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <AnimatePresence>
            {question.tags.map(tag => (
              <motion.span
                key={tag}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="px-2 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-600/30 dark:to-purple-600/30 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium border border-blue-500/20 dark:border-blue-500/30 shadow hover:bg-blue-600/40 hover:text-white transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                #{tag}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-snug drop-shadow-sm">
        {question.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm">{question.description}</p>
      <div className="flex items-center gap-4 flex-wrap mb-2">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${answers.length > 0 ? 'bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400' : 'bg-gray-200 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300'}`}>{answers.length} Answers</span>
        <span className="text-yellow-500 dark:text-yellow-400 font-bold text-xs flex items-center gap-1"><ArrowUp className="w-4 h-4" />{question.upvotes}</span>
        <span className="text-red-500 dark:text-red-400 font-bold text-xs flex items-center gap-1"><ArrowDown className="w-4 h-4" />{question.downvotes}</span>
        <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1"><Eye className="w-4 h-4" />1.2k views</span>
        {answers.some(a => a.isAccepted) && (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-semibold"><Check className="w-4 h-4" />Solved</span>
        )}
      </div>
      <div className="flex items-center gap-3 mt-2">
        {/* Voting */}
        <motion.button
          onClick={() => handleVote('up')}
          disabled={!currentUser}
          whileTap={{ scale: 1.2 }}
          animate={voteAnim === 'up' ? { scale: [1, 1.3, 1], backgroundColor: ['#22c55e33', '#22c55e99', '#22c55e33'] } : {}}
          transition={{ duration: 0.4 }}
          className={`p-2 rounded-lg transition-all duration-300 shadow hover:scale-110 ${question.userVote === 'up' ? 'bg-green-200 dark:bg-green-500/20 text-green-600 dark:text-green-400 shadow-green-500/20' : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/10'} ${!currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Upvote"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => handleVote('down')}
          disabled={!currentUser}
          whileTap={{ scale: 1.2 }}
          animate={voteAnim === 'down' ? { scale: [1, 1.3, 1], backgroundColor: ['#ef444433', '#ef444499', '#ef444433'] } : {}}
          transition={{ duration: 0.4 }}
          className={`p-2 rounded-lg transition-all duration-300 shadow hover:scale-110 ${question.userVote === 'down' ? 'bg-red-200 dark:bg-red-500/20 text-red-600 dark:text-red-400 shadow-red-500/20' : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10'} ${!currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Downvote"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
        {/* Comments/Answers */}
        <motion.button
          onClick={() => setShowAnswers(!showAnswers)}
          whileTap={{ scale: 1.1 }}
          className={`flex items-center space-x-2 p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-300 hover:scale-105 ${showAnswers ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : ''}`}
          title="Show Answers"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Answers</span>
        </motion.button>
        {/* Share */}
        <div className="relative">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/10 rounded-lg transition-all duration-300 hover:scale-105"
            title="Share"
          >
            <Share className="w-5 h-5" />
            <span className="hidden sm:block">Share</span>
          </button>
          {showShareMenu && (
            <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-green-500 text-white text-sm rounded-lg shadow-lg">
              Link copied!
            </div>
          )}
        </div>
      </div>
      {/* Answers Section */}
      <AnimatePresence>
        {showAnswers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="mt-6 pt-6 border-t border-blue-400/10"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Answers ({answers.length})
            </h3>
            {/* Comment input */}
            {currentUser && (
              <div className="mb-6 flex gap-2 items-start">
                <img src={currentUser.avatar} alt="avatar" className="w-9 h-9 rounded-full border-2 border-blue-500 mt-1" />
                <textarea
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-2 border border-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[48px] shadow"
                  placeholder="Write your answer..."
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                />
                <button
                  onClick={handleAddAnswer}
                  className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow mt-1 disabled:opacity-50 transition-all duration-300"
                  disabled={!newAnswer.trim()}
                >
                  Post
                </button>
              </div>
            )}
            <div className="space-y-4">
              {answers.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center">No answers yet. Be the first to answer!</div>
              ) : (
                answers.map(answer => (
                  <motion.div
                    key={answer.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3 }}
                    className="glass dark:glass-dark rounded-lg p-4 border border-blue-400/10 shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={answer.author.avatar}
                        alt={answer.author.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-gray-900 dark:text-white font-medium">{answer.author.username}</span>
                          {answer.isAccepted && (
                            <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs">
                              <Check className="w-3 h-3" />
                              <span>Accepted</span>
                            </div>
                          )}
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{answer.createdAt}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-sm">
                          {answer.content}
                        </p>
                        <div className="flex items-center space-x-2">
                          <button
                            className={`p-1 rounded transition-colors duration-300 ${answer.userVote === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'}`}
                            title="Upvote Answer"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <span className="text-gray-900 dark:text-white text-sm">
                            {answer.upvotes - answer.downvotes}
                          </span>
                          <button
                            className={`p-1 rounded transition-colors duration-300 ${answer.userVote === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'}`}
                            title="Downvote Answer"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}