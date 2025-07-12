import React, { useState, useEffect } from 'react';
import { Plus, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import type { User, Question } from '../App';
import { getQuestionsByCategories, categoryQuestions, getUserPostedQuestions } from '../services/dummyData';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchQuestions, transformStackExchangeQuestion } from '../services/stackApi';

interface FeedProps {
  currentUser: User | null;
  selectedCategories: string[];
  onCreatePost: () => void;
  feedRefreshKey?: number;
}

export function Feed({ currentUser, selectedCategories, onCreatePost, feedRefreshKey }: FeedProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'unanswered'>('newest');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Voting logic
  const handleVote = (questionId: string, voteType: 'up' | 'down') => {
    if (!currentUser) return;
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id !== questionId) return q;
      let upvotes = q.upvotes;
      let downvotes = q.downvotes;
      let userVote = q.userVote;
      if (voteType === 'up') {
        if (userVote === 'up') {
          upvotes -= 1;
          userVote = undefined;
        } else {
          upvotes += 1;
          if (userVote === 'down') downvotes -= 1;
          userVote = 'up';
        }
      } else {
        if (userVote === 'down') {
          downvotes -= 1;
          userVote = undefined;
        } else {
          downvotes += 1;
          if (userVote === 'up') upvotes -= 1;
          userVote = 'down';
        }
      }
      return { ...q, upvotes, downvotes, userVote };
    }));
  };

  useEffect(() => {
    setLoading(true);
    setApiError(false);
    // Try to fetch real questions from Stack Exchange API
    fetchQuestions([], 1)
      .then((items) => {
        let mergedQuestions: Question[] = [];
        if (items && items.length > 0) {
          mergedQuestions = [
            ...getUserPostedQuestions([]),
            ...items.map(transformStackExchangeQuestion)
          ];
        } else {
          // Fallback to demo questions
          const demoQuestions = categoryQuestions['demo'] || [];
          mergedQuestions = [
            ...getUserPostedQuestions([]),
            ...demoQuestions
          ];
        }
        setQuestions(mergedQuestions);
        setLoading(false);
      })
      .catch(() => {
        setApiError(true);
        // Fallback to demo questions
        const demoQuestions = categoryQuestions['demo'] || [];
        setQuestions([
          ...getUserPostedQuestions([]),
          ...demoQuestions
        ]);
        setLoading(false);
      });
  }, [selectedCategories, feedRefreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        <span className="ml-4 text-white text-lg">Loading questions...</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      {/* Animated background gradient and floating shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1e215d] via-[#2d1e4f] to-[#1e2a3a] animate-gradient-x opacity-90"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {/* Extra animated floating shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-blue-400/30 rounded-full blur-2xl animate-float-fast"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-2 sm:px-4"
      >
        <div className="flex items-center justify-between mb-8 mt-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x drop-shadow-lg tracking-tight">Questions</h1>
          <button
            onClick={onCreatePost}
            className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-base"
          >
            <Plus className="w-5 h-5" />
            <span>Ask Question</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow ${sortBy === 'newest' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSortBy('newest')}
          >
            <Clock className="w-4 h-4 inline-block mr-1" /> Newest
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow ${sortBy === 'popular' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSortBy('popular')}
          >
            <TrendingUp className="w-4 h-4 inline-block mr-1" /> Popular
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow ${sortBy === 'unanswered' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSortBy('unanswered')}
          >
            <Users className="w-4 h-4 inline-block mr-1" /> Unanswered
          </button>
        </div>
        {apiError && (
          <div className="text-red-400 text-center mb-4">Could not load live questions. Showing demo questions instead.</div>
        )}
        <div className="space-y-8">
          <AnimatePresence>
            {questions.length === 0 ? (
              <motion.div
                key="no-questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/70 text-center py-16 text-xl font-medium"
              >
                No questions found.
              </motion.div>
            ) : (
              questions.map((question, idx) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.97 }}
                  transition={{ duration: 0.5, delay: idx * 0.07, type: 'spring', stiffness: 120, damping: 18 }}
                  whileHover={{ scale: 1.015, boxShadow: '0 8px 32px 0 rgba(80,80,255,0.18)' }}
                >
                  <QuestionCard
                    question={question}
                    currentUser={currentUser}
                    onVote={handleVote}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}