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
  X
} from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  userId: string;
  username: string;
  questionId?: string;
  answerId?: string;
  parentType: 'question' | 'answer';
  parentTitle: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  status: 'active' | 'hidden' | 'flagged';
}

const Comments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedParentType, setSelectedParentType] = useState('all');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const [comments] = useState<Comment[]>([
    {
      id: 'c1',
      content: 'Great question! I had the same issue last week.',
      userId: 'u1',
      username: 'john_doe',
      questionId: 'q1',
      parentType: 'question',
      parentTitle: 'How to center a div in CSS?',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      likes: 5,
      dislikes: 0,
      status: 'active'
    },
    {
      id: 'c2',
      content: 'This solution worked perfectly for me, thanks!',
      userId: 'u2',
      username: 'jane_smith',
      answerId: 'a1',
      parentType: 'answer',
      parentTitle: 'How to center a div in CSS?',
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
      likes: 12,
      dislikes: 1,
      status: 'active'
    },
    {
      id: 'c3',
      content: 'Could you provide more details about the browser compatibility?',
      userId: 'u3',
      username: 'mike_wilson',
      answerId: 'a2',
      parentType: 'answer',
      parentTitle: 'JavaScript async/await best practices',
      createdAt: '2024-01-13T09:20:00Z',
      updatedAt: '2024-01-13T09:20:00Z',
      likes: 3,
      dislikes: 0,
      status: 'active'
    },
    {
      id: 'c4',
      content: 'This is spam content that should be flagged',
      userId: 'u4',
      username: 'spammer_user',
      questionId: 'q2',
      parentType: 'question',
      parentTitle: 'React hooks tutorial',
      createdAt: '2024-01-12T14:10:00Z',
      updatedAt: '2024-01-12T14:10:00Z',
      likes: 0,
      dislikes: 8,
      status: 'flagged'
    },
    {
      id: 'c5',
      content: 'Hidden comment due to inappropriate content',
      userId: 'u5',
      username: 'hidden_user',
      answerId: 'a3',
      parentType: 'answer',
      parentTitle: 'Python data structures',
      createdAt: '2024-01-11T11:30:00Z',
      updatedAt: '2024-01-11T11:30:00Z',
      likes: 1,
      dislikes: 15,
      status: 'hidden'
    }
  ]);

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.parentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || comment.status === selectedStatus;
    const matchesParentType = selectedParentType === 'all' || comment.parentType === selectedParentType;
    
    return matchesSearch && matchesStatus && matchesParentType;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      hidden: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      flagged: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getParentTypeIcon = (type: string) => {
    return type === 'question' ? 
      <MessageSquare className="w-4 h-4 text-blue-400" /> : 
      <ThumbsUp className="w-4 h-4 text-green-400" />;
  };

  const handleSelectComment = (commentId: string) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedComments(
      selectedComments.length === filteredComments.length 
        ? [] 
        : filteredComments.map(comment => comment.id)
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
          <h1 className="text-3xl font-bold text-white mb-2">Comments</h1>
          <p className="text-gray-400">Manage all comments on questions and answers</p>
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
            <span className="text-2xl font-bold text-white">{comments.filter(c => c.status === 'active').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Active Comments</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gray-500/20">
              <Eye className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-2xl font-bold text-white">{comments.filter(c => c.status === 'hidden').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Hidden</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <Flag className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-2xl font-bold text-white">{comments.filter(c => c.status === 'flagged').length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Flagged</h3>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">{comments.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-400">Total Comments</h3>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedParentType}
              onChange={(e) => setSelectedParentType(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="all">All Types</option>
              <option value="question">Question Comments</option>
              <option value="answer">Answer Comments</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Comments ({filteredComments.length})</h3>
            {selectedComments.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">{selectedComments.length} selected</span>
                <button className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-sm hover:bg-gray-500/30 transition-colors">
                  Hide Selected
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
                    checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Comment ID</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Content</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">User</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Parent</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Engagement</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Created</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredComments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment.id)}
                      onChange={() => handleSelectComment(comment.id)}
                      className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-cyan-400">{comment.id}</span>
                  </td>
                  <td className="p-4">
                    <p className="text-white truncate max-w-xs">{comment.content}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{comment.username}</p>
                        <p className="text-xs text-gray-400">ID: {comment.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getParentTypeIcon(comment.parentType)}
                      <div>
                        <p className="text-sm text-gray-300 capitalize">{comment.parentType}</p>
                        <p className="text-xs text-gray-400 truncate max-w-xs">{comment.parentTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-1 text-green-400">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-red-400">
                        <ThumbsDown className="w-3 h-3" />
                        <span>{comment.dislikes}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(comment.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
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
                            setSelectedComment(comment);
                            setShowCommentModal(true);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-blue-400 hover:text-blue-300 first:rounded-t-lg"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View Details</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-cyan-400 hover:text-cyan-300">
                          <Edit className="w-4 h-4" />
                          <span className="text-sm">Edit Comment</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-orange-400 hover:text-orange-300">
                          <Flag className="w-4 h-4" />
                          <span className="text-sm">Flag Comment</span>
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

      {/* Comment Detail Modal */}
      {showCommentModal && selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Comment Details</h3>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Comment ID</label>
                  <p className="text-white font-mono mt-1">{selectedComment.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">User ID</label>
                  <p className="text-white font-mono mt-1">{selectedComment.userId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Username</label>
                  <p className="text-white mt-1">{selectedComment.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(selectedComment.status)}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Comment Content</label>
                <p className="text-white mt-1 p-3 bg-gray-700/50 rounded-lg">{selectedComment.content}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Parent {selectedComment.parentType}</label>
                <p className="text-white mt-1">{selectedComment.parentTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Created</label>
                  <p className="text-white mt-1">{formatDate(selectedComment.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Last Updated</label>
                  <p className="text-white mt-1">{formatDate(selectedComment.updatedAt)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Likes</label>
                  <p className="text-green-400 font-bold mt-1">{selectedComment.likes}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Dislikes</label>
                  <p className="text-red-400 font-bold mt-1">{selectedComment.dislikes}</p>
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
                  <Eye className="w-4 h-4" />
                  <span>Hide</span>
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

export default Comments;