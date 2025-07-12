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
  CheckCircle,
  Award
} from 'lucide-react';

interface Answer {
  id: string;
  content: string;
  userId: string;
  username: string;
  questionId: string;
  questionTitle: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  status: 'active' | 'hidden' | 'flagged' | 'deleted';
  isAccepted: boolean;
  isBestAnswer: boolean;
}

const Answers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  const [answers] = useState<Answer[]>([
    {
      id: 'a1',
      content: 'You can center a div using Flexbox. Set the parent container to display: flex, justify-content: center, and align-items: center. This is the modern and most reliable approach.',
      userId: 'u1',
      username: 'css_expert',
      questionId: 'q1',
      questionTitle: 'How to center a div in CSS?',
      createdAt: '2024-01-15T11:30:00Z',
      updatedAt: '2024-01-15T11:30:00Z',
      likes: 25,
      dislikes: 1,
      status: 'active',
      isAccepted: true,
      isBestAnswer: true
    },
    {
      id: 'a2',
      content: 'Always use try/catch blocks with async/await to handle potential errors. Also, avoid using async/await in loops unless you specifically need sequential execution.',
      userId: 'u2',
      username: 'js_developer',
      questionId: 'q2',
      questionTitle: 'JavaScript async/await best practices',
      createdAt: '2024-01-14T16:45:00Z',
      updatedAt: '2024-01-14T16:45:00Z',
      likes: 18,
      dislikes: 0,
      status: 'active',
      isAccepted: false,
      isBestAnswer: false
    },
    {
      id: 'a3',
      content: 'useState is for managing state variables, while useEffect is for side effects like API calls, subscriptions, or DOM manipulation. Here\'s a practical example...',
      userId: 'u3',
      username: 'react_guru',
      questionId: 'q3',
      questionTitle: 'React hooks tutorial',
      createdAt: '2024-01-13T10:20:00Z',
      updatedAt: '2024-01-13T10:20:00Z',
      likes: 42,
      dislikes: 2,
      status: 'active',
      isAccepted: true,
      isBestAnswer: true
    },
    {
      id: 'a4',
      content: 'This answer contains inappropriate content and should be flagged for review by moderators.',
      userId: 'u4',
      username: 'flagged_user',
      questionId: 'q4',
      questionTitle: 'Inappropriate question content',
      createdAt: '2024-01-12T15:10:00Z',
      updatedAt: '2024-01-12T15:10:00Z',
      likes: 0,
      dislikes: 15,
      status: 'flagged',
      isAccepted: false,
      isBestAnswer: false
    },
    {
      id: 'a5',
      content: 'Lists are mutable and ordered, tuples are immutable and ordered, dictionaries are mutable and unordered (key-value pairs). Use lists for collections that change, tuples for fixed data, and dictionaries for key-value relationships.',
      userId: 'u5',
      username: 'python_master',
      questionId: 'q5',
      questionTitle: 'Python data structures',
      createdAt: '2024-01-11T12:30:00Z',
      updatedAt: '2024-01-11T12:30:00Z',
      likes: 33,
      dislikes: 1,
      status: 'active',
      isAccepted: true,
      isBestAnswer: true
    }
  ]);

  const filteredAnswers = answers.filter(answer => {
    const matchesSearch = answer.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.questionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || answer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      hidden: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      flagged: 'bg-red-500/20 text-red-400 border-red-500/30',
      deleted: 'bg-red-600/20 text-red-300 border-red-600/30'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleSelectAnswer = (answerId: string) => {
    setSelectedAnswers(prev => 
      prev.includes(answerId) 
        ? prev.filter(id => id !== answerId)
        : [...prev, answerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAnswers(
      selectedAnswers.length === filteredAnswers.length 
        ? [] 
        : filteredAnswers.map(answer => answer.id)
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
          <h1 className="text-3xl font-bold text-white mb-2">Answers</h1>
          <p className="text-gray-400">Manage all answers on the platform</p>
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
              <ThumbsUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-2xl font-bold text-white">{answers.filter(a => a.status === 'active').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Active Answers</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">{answers.filter(a => a.isAccepted).length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Accepted</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-2xl font-bold text-white">{answers.filter(a => a.isBestAnswer).length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Best Answers</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <Flag className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-2xl font-bold text-white">{answers.filter(a => a.status === 'flagged').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Flagged</h3>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search answers..."
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
              <option value="hidden">Hidden</option>
              <option value="flagged">Flagged</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Answers Table */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Answers ({filteredAnswers.length})</h3>
            {selectedAnswers.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">{selectedAnswers.length} selected</span>
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
                    checked={selectedAnswers.length === filteredAnswers.length && filteredAnswers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Answer ID</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Content</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">User</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Question</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Engagement</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Created</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredAnswers.map((answer) => (
                <tr key={answer.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedAnswers.includes(answer.id)}
                      onChange={() => handleSelectAnswer(answer.id)}
                      className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-cyan-400">{answer.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="text-white truncate max-w-xs">{answer.content}</p>
                      </div>
                      <div className="flex space-x-1">
                        {answer.isAccepted && (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        )}
                        {answer.isBestAnswer && (
                          <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{answer.username}</p>
                        <p className="text-xs text-gray-400">ID: {answer.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-300 truncate max-w-xs">{answer.questionTitle}</p>
                        <p className="text-xs text-gray-400">ID: {answer.questionId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-1 text-green-400">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{answer.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-red-400">
                        <ThumbsDown className="w-3 h-3" />
                        <span>{answer.dislikes}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(answer.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{formatDate(answer.createdAt)}</span>
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
                            setSelectedAnswer(answer);
                            setShowAnswerModal(true);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-blue-400 hover:text-blue-300 first:rounded-t-lg"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View Details</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-cyan-400 hover:text-cyan-300">
                          <Edit className="w-4 h-4" />
                          <span className="text-sm">Edit Answer</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-yellow-400 hover:text-yellow-300">
                          <Award className="w-4 h-4" />
                          <span className="text-sm">Mark as Best</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-orange-400 hover:text-orange-300">
                          <Flag className="w-4 h-4" />
                          <span className="text-sm">Flag Answer</span>
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

      {/* Answer Detail Modal */}
      {showAnswerModal && selectedAnswer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Answer Details</h3>
                <button
                  onClick={() => setShowAnswerModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Answer ID</label>
                  <p className="text-white font-mono mt-1">{selectedAnswer.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">User ID</label>
                  <p className="text-white font-mono mt-1">{selectedAnswer.userId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Username</label>
                  <p className="text-white mt-1">{selectedAnswer.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <div className="mt-1 flex items-center space-x-2">
                    {getStatusBadge(selectedAnswer.status)}
                    {selectedAnswer.isAccepted && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                        Accepted
                      </span>
                    )}
                    {selectedAnswer.isBestAnswer && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium">
                        Best Answer
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Question</label>
                <p className="text-white text-lg font-medium mt-1">{selectedAnswer.questionTitle}</p>
                <p className="text-gray-400 text-sm mt-1">Question ID: {selectedAnswer.questionId}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Answer Content</label>
                <p className="text-white mt-1 p-4 bg-gray-700/50 rounded-lg">{selectedAnswer.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Likes</span>
                  </div>
                  <span className="text-xl font-bold text-white">{selectedAnswer.likes}</span>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ThumbsDown className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-400">Dislikes</span>
                  </div>
                  <span className="text-xl font-bold text-white">{selectedAnswer.dislikes}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Created</label>
                  <p className="text-white mt-1">{formatDate(selectedAnswer.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Last Updated</label>
                  <p className="text-white mt-1">{formatDate(selectedAnswer.updatedAt)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors">
                  <Award className="w-4 h-4" />
                  <span>Mark as Best</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                  <Flag className="w-4 h-4" />
                  <span>Flag</span>
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

export default Answers;