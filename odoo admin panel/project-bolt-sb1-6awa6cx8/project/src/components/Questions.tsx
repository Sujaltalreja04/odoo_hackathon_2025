import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  User,
  Calendar,
  Clock,
  Download,
  RefreshCw,
  Flag,
  ThumbsUp,
  ThumbsDown,
  X,
  Tag,
  CheckCircle
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  dislikes: number;
  answersCount: number;
  tags: string[];
  status: 'active' | 'closed' | 'flagged' | 'deleted';
  isSolved: boolean;
}

const Questions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const [questions] = useState<Question[]>([
    {
      id: 'q1',
      title: 'How to center a div in CSS?',
      content: 'I\'ve been trying to center a div element both horizontally and vertically but can\'t seem to get it right. What\'s the best modern approach?',
      userId: 'u1',
      username: 'john_doe',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      views: 1250,
      likes: 45,
      dislikes: 2,
      answersCount: 8,
      tags: ['css', 'html', 'flexbox'],
      status: 'active',
      isSolved: true
    },
    {
      id: 'q2',
      title: 'JavaScript async/await best practices',
      content: 'What are the best practices when using async/await in JavaScript? Should I always use try/catch blocks?',
      userId: 'u2',
      username: 'jane_smith',
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T16:20:00Z',
      views: 890,
      likes: 32,
      dislikes: 1,
      answersCount: 12,
      tags: ['javascript', 'async', 'promises'],
      status: 'active',
      isSolved: false
    },
    {
      id: 'q3',
      title: 'React hooks tutorial',
      content: 'Can someone explain the difference between useState and useEffect hooks with practical examples?',
      userId: 'u3',
      username: 'mike_wilson',
      createdAt: '2024-01-13T09:20:00Z',
      updatedAt: '2024-01-13T09:20:00Z',
      views: 2100,
      likes: 67,
      dislikes: 3,
      answersCount: 15,
      tags: ['react', 'hooks', 'javascript'],
      status: 'active',
      isSolved: true
    },
    {
      id: 'q4',
      title: 'Inappropriate question content',
      content: 'This question contains inappropriate content that violates community guidelines...',
      userId: 'u4',
      username: 'flagged_user',
      createdAt: '2024-01-12T14:10:00Z',
      updatedAt: '2024-01-12T14:10:00Z',
      views: 45,
      likes: 0,
      dislikes: 12,
      answersCount: 1,
      tags: ['spam'],
      status: 'flagged',
      isSolved: false
    },
    {
      id: 'q5',
      title: 'Python data structures',
      content: 'What\'s the difference between lists, tuples, and dictionaries in Python? When should I use each?',
      userId: 'u5',
      username: 'python_learner',
      createdAt: '2024-01-11T11:30:00Z',
      updatedAt: '2024-01-11T11:30:00Z',
      views: 756,
      likes: 28,
      dislikes: 0,
      answersCount: 6,
      tags: ['python', 'data-structures'],
      status: 'closed',
      isSolved: true
    }
  ]);

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || question.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      flagged: 'bg-red-500/20 text-red-400 border-red-500/30',
      deleted: 'bg-red-600/20 text-red-300 border-red-600/30'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === filteredQuestions.length 
        ? [] 
        : filteredQuestions.map(question => question.id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Questions</h1>
          <p className="text-gray-400">Manage all questions on the platform</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500/20">
              <MessageSquare className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-2xl font-bold text-white">{questions.filter(q => q.status === 'active').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Active Questions</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">{questions.filter(q => q.isSolved).length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Solved</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <Flag className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-2xl font-bold text-white">{questions.filter(q => q.status === 'flagged').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Flagged</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-white">{questions.reduce((sum, q) => sum + q.views, 0).toLocaleString()}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Total Views</h3>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="flagged">Flagged</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Questions ({filteredQuestions.length})</h3>
            {selectedQuestions.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">{selectedQuestions.length} selected</span>
                <button className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">
                  Flag Selected
                </button>
                <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Question ID</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Title</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">User</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Stats</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Tags</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Created</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => handleSelectQuestion(question.id)}
                      className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-cyan-400">{question.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="font-medium text-white truncate max-w-xs">{question.title}</p>
                        <p className="text-sm text-gray-400 truncate max-w-xs">{question.content}</p>
                      </div>
                      {question.isSolved && (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{question.username}</p>
                        <p className="text-xs text-gray-400">ID: {question.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-purple-400">
                          <Eye className="w-3 h-3" />
                          <span>{question.views}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-400">
                          <MessageSquare className="w-3 h-3" />
                          <span>{question.answersCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-green-400">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{question.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-red-400">
                          <ThumbsDown className="w-3 h-3" />
                          <span>{question.dislikes}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {question.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {question.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                          +{question.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(question.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{formatDate(question.createdAt)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="relative group">
                      <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button
                          onClick={() => {
                            setSelectedQuestion(question);
                            setShowQuestionModal(true);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-blue-400 hover:text-blue-300 first:rounded-t-lg"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View Details</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-cyan-400 hover:text-cyan-300">
                          <Edit className="w-4 h-4" />
                          <span className="text-sm">Edit Question</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-orange-400 hover:text-orange-300">
                          <Flag className="w-4 h-4" />
                          <span className="text-sm">Flag Question</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300 last:rounded-b-lg">
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Question Detail Modal */}
      {showQuestionModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Question Details</h3>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Question ID</label>
                  <p className="text-white font-mono mt-1">{selectedQuestion.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">User ID</label>
                  <p className="text-white font-mono mt-1">{selectedQuestion.userId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Username</label>
                  <p className="text-white mt-1">{selectedQuestion.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <div className="mt-1 flex items-center space-x-2">
                    {getStatusBadge(selectedQuestion.status)}
                    {selectedQuestion.isSolved && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                        Solved
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Title</label>
                <p className="text-white text-lg font-medium mt-1">{selectedQuestion.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Content</label>
                <p className="text-white mt-1 p-4 bg-gray-700/50 rounded-lg">{selectedQuestion.content}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedQuestion.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">Views</span>
                  </div>
                  <span className="text-xl font-bold text-white">{selectedQuestion.views.toLocaleString()}</span>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Answers</span>
                  </div>
                  <span className="text-xl font-bold text-white">{selectedQuestion.answersCount}</span>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Likes</span>
                  </div>
                  <span className="text-xl font-bold text-white">{selectedQuestion.likes}</span>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ThumbsDown className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-400">Dislikes</span>
                  </div>
                  <span className="text-xl font-bold text-white">{selectedQuestion.dislikes}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Created</label>
                  <p className="text-white mt-1">{formatDate(selectedQuestion.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Last Updated</label>
                  <p className="text-white mt-1">{formatDate(selectedQuestion.updatedAt)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                  <Flag className="w-4 h-4" />
                  <span>Flag</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;