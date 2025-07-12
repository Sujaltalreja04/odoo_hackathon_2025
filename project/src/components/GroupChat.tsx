import React, { useState, useEffect } from 'react';
import { Send, Users, Plus, Hash, Video, Phone } from 'lucide-react';
import type { User } from '../App';
import { dummyChatRooms } from '../services/dummyData';

interface GroupChatProps {
  currentUser: User;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  isPrivate: boolean;
}

interface Message {
  id: string;
  user: User;
  content: string;
  timestamp: string;
}

const mockRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'React Developers',
    description: 'Discuss React best practices and troubleshoot together',
    members: 156,
    category: 'React',
    isPrivate: false
  },
  {
    id: '2',
    name: 'JavaScript Fundamentals',
    description: 'Learn JavaScript from basics to advanced concepts',
    members: 89,
    category: 'JavaScript',
    isPrivate: false
  },
  {
    id: '3',
    name: 'Node.js Backend',
    description: 'Server-side JavaScript development discussions',
    members: 67,
    category: 'Node.js',
    isPrivate: false
  }
];

export function GroupChat({ currentUser }: GroupChatProps) {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  // Load dummy chat rooms
  useEffect(() => {
    setRooms(dummyChatRooms);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedRoom) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: currentUser,
      content: message,
      timestamp: 'Just now'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room);
    setMessages([]);
    
    // Add some dummy messages for the selected room
    const dummyMessages: Message[] = [
      {
        id: '1',
        user: {
          id: '2',
          username: 'sarah_dev',
          email: 'sarah@example.com',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
          followers: 85,
          following: 92,
          categories: ['React']
        },
        content: `Hey everyone! Welcome to ${room.name}! 👋`,
        timestamp: '2 min ago'
      },
      {
        id: '2',
        user: {
          id: '3',
          username: 'mike_architect',
          email: 'mike@example.com',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
          followers: 156,
          following: 43,
          categories: ['React']
        },
        content: 'Great to be here! Looking forward to some interesting discussions.',
        timestamp: '1 min ago'
      }
    ];
    
    setMessages(dummyMessages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Room List */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Chat Rooms</h2>
              <button className="p-2 bg-[#8FB9A8]/20 text-[#8FB9A8] rounded-lg hover:bg-[#8FB9A8]/30 transition-colors duration-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto">
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  selectedRoom?.id === room.id
                    ? 'bg-[#8FB9A8]/20 border border-[#8FB9A8]/30'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-[#F1828D]/20 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 text-[#F1828D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{room.name}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                  {room.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8FB9A8]">{room.category}</span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Users className="w-3 h-3" />
                    <span>{room.members}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden flex flex-col">
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F1828D]/20 rounded-lg flex items-center justify-center">
                      <Hash className="w-5 h-5 text-[#F1828D]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedRoom.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{selectedRoom.members} members</span>
                        </div>
                        <span>{selectedRoom.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <img
                      src={msg.user.avatar}
                      alt={msg.user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium">{msg.user.username}</span>
                        <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-gray-300 leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message #${selectedRoom.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8FB9A8] resize-none"
                      rows={1}
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      message.trim()
                        ? 'bg-gradient-to-r from-[#8FB9A8] to-[#F1828D] text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8FB9A8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#8FB9A8]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Select a Chat Room
                </h3>
                <p className="text-gray-400">
                  Choose a room from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}