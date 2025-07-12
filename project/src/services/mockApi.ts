// Mock API for additional features
import type { User, Question, Answer } from '../App';

// Mock database
let users: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
    followers: 142,
    following: 89,
    categories: ['React', 'JavaScript']
  },
  {
    id: '2',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
    followers: 85,
    following: 92,
    categories: ['React', 'TypeScript']
  }
];

let localQuestions: Question[] = [];
let chatMessages: any[] = [];

export class MockAPI {
  // User Management
  static async login(email: string, password: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users.find(u => u.email === email);
    if (user && password === 'password') { // Simple mock validation
      return user;
    }
    return null;
  }

  static async register(email: string, password: string, username: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      email,
      avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000)}/pexels-photo-${Math.floor(Math.random() * 1000)}.jpeg?w=150`,
      followers: 0,
      following: 0,
      categories: []
    };
    
    users.push(newUser);
    return newUser;
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      return users[userIndex];
    }
    throw new Error('User not found');
  }

  // Local Questions (for user-created content)
  static async createQuestion(question: Omit<Question, 'id' | 'createdAt'>): Promise<Question> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newQuestion: Question = {
      ...question,
      id: (localQuestions.length + 1).toString(),
      createdAt: new Date().toLocaleDateString(),
      answers: []
    };
    
    localQuestions.push(newQuestion);
    return newQuestion;
  }

  static async getLocalQuestions(): Promise<Question[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return localQuestions;
  }

  static async addAnswer(questionId: string, answer: Omit<Answer, 'id' | 'createdAt'>): Promise<Answer> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const question = localQuestions.find(q => q.id === questionId);
    if (!question) {
      throw new Error('Question not found');
    }
    
    const newAnswer: Answer = {
      ...answer,
      id: (question.answers.length + 1).toString(),
      createdAt: new Date().toLocaleDateString()
    };
    
    question.answers.push(newAnswer);
    return newAnswer;
  }

  // Chat System
  static async getChatRooms(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        name: 'React Developers',
        description: 'Discuss React best practices and troubleshoot together',
        members: 156,
        category: 'React',
        isPrivate: false,
        lastMessage: 'Hey everyone! Just finished implementing a custom hook...',
        lastMessageTime: '2 min ago'
      },
      {
        id: '2',
        name: 'JavaScript Fundamentals',
        description: 'Learn JavaScript from basics to advanced concepts',
        members: 89,
        category: 'JavaScript',
        isPrivate: false,
        lastMessage: 'Can someone explain closures in JavaScript?',
        lastMessageTime: '5 min ago'
      },
      {
        id: '3',
        name: 'Node.js Backend',
        description: 'Server-side JavaScript development discussions',
        members: 67,
        category: 'Node.js',
        isPrivate: false,
        lastMessage: 'What\'s the best way to handle authentication?',
        lastMessageTime: '10 min ago'
      }
    ];
  }

  static async getChatMessages(roomId: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return chatMessages.filter(msg => msg.roomId === roomId);
  }

  static async sendChatMessage(roomId: string, message: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      roomId,
      timestamp: new Date().toISOString()
    };
    
    chatMessages.push(newMessage);
    return newMessage;
  }

  // Notifications
  static async getNotifications(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        type: 'answer',
        message: 'Sarah answered your question about React hooks',
        time: '2 min ago',
        read: false
      },
      {
        id: '2',
        type: 'upvote',
        message: 'Your answer received 5 upvotes',
        time: '1 hour ago',
        read: false
      },
      {
        id: '3',
        type: 'follow',
        message: 'Mike started following you',
        time: '3 hours ago',
        read: true
      }
    ];
  }

  // Search
  static async searchQuestions(query: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock search results
    return [
      {
        id: '1',
        title: `How to ${query} in React?`,
        tags: ['react', 'javascript'],
        score: 15,
        answerCount: 3
      },
      {
        id: '2',
        title: `Best practices for ${query}`,
        tags: ['typescript', 'react'],
        score: 8,
        answerCount: 1
      }
    ];
  }
} 