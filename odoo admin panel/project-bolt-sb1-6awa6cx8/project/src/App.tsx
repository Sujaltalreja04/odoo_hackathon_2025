import React, { useState, useEffect } from 'react';
import ManageUsers from './components/ManageUsers';
import Comments from './components/Comments';
import Questions from './components/Questions';
import Answers from './components/Answers';
import PieChart from './components/PieChart';
import {
  Users,
  Settings as SettingsIcon,
  Menu,
  X,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Eye,
  Clock,
  ChevronRight,
  ThumbsUp,
  Shield
} from 'lucide-react';

interface SummaryCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface Report {
  id: string;
  user: string;
  content: string;
  type: 'question' | 'answer';
  time: string;
  status: 'pending' | 'reviewed';
}

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (sidebar && !sidebar.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const summaryCards: SummaryCard[] = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12% from last month',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Questions',
      value: '8,423',
      change: '+8% from last month',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Reports Pending',
      value: '23',
      change: '5 new today',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Blocked Content',
      value: '156',
      change: '+3 this week',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const recentReports: Report[] = [
    {
      id: '1',
      user: 'john_doe',
      content: 'Inappropriate question about...',
      type: 'question',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      user: 'jane_smith',
      content: 'Spam answer with links to...',
      type: 'answer',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      user: 'user123',
      content: 'Offensive language in question...',
      type: 'question',
      time: '6 hours ago',
      status: 'reviewed'
    },
    {
      id: '4',
      user: 'anonymous',
      content: 'Copyright violation in answer...',
      type: 'answer',
      time: '1 day ago',
      status: 'pending'
    }
  ];

  const chartData = [
    { day: 'Mon', questions: 45 },
    { day: 'Tue', questions: 62 },
    { day: 'Wed', questions: 38 },
    { day: 'Thu', questions: 71 },
    { day: 'Fri', questions: 55 },
    { day: 'Sat', questions: 42 },
    { day: 'Sun', questions: 28 }
  ];

  const maxQuestions = Math.max(...chartData.map(d => d.questions));

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'questions', label: 'Questions', icon: MessageSquare },
    { id: 'answers', label: 'Answers', icon: ThumbsUp }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <ManageUsers />;
      case 'comments':
        return <Comments />;
      case 'questions':
        return <Questions />;
      case 'answers':
        return <Answers />;
      default:
        const pieChartData = [
          { label: 'Questions', value: 8423, color: '#06b6d4' },
          { label: 'Answers', value: 15678, color: '#3b82f6' },
          { label: 'Comments', value: 4521, color: '#8b5cf6' },
          { label: 'Users', value: 12847, color: '#10b981' }
        ];

        return (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {summaryCards.map((card, index) => (
                <div
                  key={card.title}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out both'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      {card.icon}
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">{card.title}</h3>
                    <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
                    <p className="text-sm text-gray-500">{card.change}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Activity Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Questions Activity</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Last 7 days</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={item.day} className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-400 w-10">{item.day}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${(item.questions / maxQuestions) * 100}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-8">{item.questions}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Content Distribution</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>Overview</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <PieChart data={pieChartData} size={280} />
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View All</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all duration-200 hover:transform hover:scale-102"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInRight 0.6s ease-out both'
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-white">{report.user}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            report.type === 'question' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {report.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{report.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.time}</p>
                      </div>
                      <div className="ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'pending' 
                            ? 'bg-orange-500/20 text-orange-400' 
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">StackIt</h1>
                <p className="text-sm text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 transform scale-105'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:transform hover:scale-105'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-80">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                id="menu-button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome Admin 👋</h1>
                <p className="text-gray-400">Here's what's happening with StackIt today</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-sm font-medium">2 minutes ago</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">
          {renderContent()}
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;