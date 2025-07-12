import React, { useState } from 'react';
import { Edit, Users, UserPlus, Award, Calendar, MessageSquare } from 'lucide-react';
import type { User } from '../App';
import { categoryQuestions, getUserPostedQuestions } from '../services/dummyData';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'questions' | 'answers' | 'activity'>('questions');

  // Gather all questions (dummy + user-posted)
  const allQuestions = [
    ...Object.values(categoryQuestions).flat(),
    ...getUserPostedQuestions([])
  ];
  // User's questions
  const userQuestions = allQuestions.filter(q => q.author.id === user.id);
  // User's answers
  const userAnswers = allQuestions
    .flatMap(q => q.answers.map(a => ({ ...a, questionTitle: q.title })))
    .filter(a => a.author.id === user.id);

  const mockStats = {
    questionsAsked: 15,
    answersGiven: 32,
    reputation: 1250,
    joinDate: 'March 2024'
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-[#FEFAD4]/20 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-[#8FB9A8]"
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#F1828D] rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#FEFAD4] mb-2">
                  {user.username}
                </h1>
                <p className="text-white/70 mb-4">{user.email}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleFollow}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isFollowing
                      ? 'bg-white/20 text-[#FEFAD4] hover:bg-white/30'
                      : 'bg-[#F1828D] text-white hover:bg-[#F1828D]/80 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-[#FEFAD4] rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#8FB9A8] mb-1">
                  {user.followers}
                </div>
                <div className="text-white/60 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F1828D] mb-1">
                  {user.following}
                </div>
                <div className="text-white/60 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FEFAD4] mb-1">
                  {mockStats.questionsAsked}
                </div>
                <div className="text-white/60 text-sm">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FCD0D4] mb-1">
                  {mockStats.answersGiven}
                </div>
                <div className="text-white/60 text-sm">Answers</div>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6">
              <h3 className="text-[#FEFAD4] font-semibold mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.categories.map(category => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-[#765D69]/20 text-[#FCD0D4] rounded-full text-sm border border-[#765D69]/30"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-[#FEFAD4]/20 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#8FB9A8]/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-[#8FB9A8]" />
            </div>
            <h3 className="text-lg font-semibold text-[#FEFAD4]">Reputation</h3>
          </div>
          <div className="text-3xl font-bold text-[#8FB9A8] mb-2">
            {mockStats.reputation.toLocaleString()}
          </div>
          <p className="text-white/60 text-sm">
            Earned through helpful answers and community engagement
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-[#FEFAD4]/20 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#F1828D]/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#F1828D]" />
            </div>
            <h3 className="text-lg font-semibold text-[#FEFAD4]">Member Since</h3>
          </div>
          <div className="text-xl font-semibold text-[#FEFAD4] mb-2">
            {mockStats.joinDate}
          </div>
          <p className="text-white/60 text-sm">
            Active community member for 9 months
          </p>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-[#FEFAD4]/20">
        <div className="border-b border-[#FEFAD4]/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'questions', label: 'Questions', icon: MessageSquare },
              { id: 'answers', label: 'Answers', icon: MessageSquare },
              { id: 'activity', label: 'Activity', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-[#8FB9A8] text-[#8FB9A8]'
                    : 'border-transparent text-white/60 hover:text-[#FEFAD4]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'questions' && (
            userQuestions.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#FEFAD4] mb-2">No Questions Yet</h3>
                <p className="text-white/60">Start asking questions to help the community!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userQuestions.map(q => (
                  <div key={q.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{q.title}</span>
                      <span className="text-xs text-gray-400">{q.createdAt}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{q.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {q.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Upvotes: {q.upvotes}</span>
                      <span>Downvotes: {q.downvotes}</span>
                      <span>Answers: {q.answers.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
          {activeTab === 'answers' && (
            userAnswers.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#FEFAD4] mb-2">No Answers Yet</h3>
                <p className="text-white/60">Share your knowledge by answering questions!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userAnswers.map(a => (
                  <div key={a.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Answer to: {a.questionTitle}</span>
                      <span className="text-xs text-gray-400">{a.createdAt}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{a.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Upvotes: {a.upvotes}</span>
                      <span>Downvotes: {a.downvotes}</span>
                      {a.isAccepted && <span className="text-green-400">Accepted</span>}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
          {activeTab === 'activity' && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#FEFAD4] mb-2">Activity Feed</h3>
              <p className="text-white/60">Recent activity will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}