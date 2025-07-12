// Comprehensive dummy data for the application
import type { User, Question, Answer } from '../App';

// Dummy users
export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
    followers: 85,
    following: 92,
    categories: ['React', 'JavaScript']
  },
  {
    id: '2',
    username: 'mike_architect',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
    followers: 156,
    following: 43,
    categories: ['React', 'Architecture']
  },
  {
    id: '3',
    username: 'perf_ninja',
    email: 'ninja@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    followers: 67,
    following: 112,
    categories: ['React', 'Performance']
  },
  {
    id: '4',
    username: 'ts_enthusiast',
    email: 'ts@example.com',
    avatar: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?w=150',
    followers: 89,
    following: 45,
    categories: ['TypeScript', 'JavaScript']
  },
  {
    id: '5',
    username: 'backend_guru',
    email: 'backend@example.com',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=150',
    followers: 203,
    following: 78,
    categories: ['Node.js', 'Python']
  },
  {
    id: '6',
    username: 'python_master',
    email: 'python@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150',
    followers: 134,
    following: 67,
    categories: ['Python', 'Data Science']
  },
  {
    id: '7',
    username: 'java_expert',
    email: 'java@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
    followers: 98,
    following: 34,
    categories: ['Java', 'Spring']
  },
  {
    id: '8',
    username: 'aws_cloud',
    email: 'aws@example.com',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=150',
    followers: 167,
    following: 89,
    categories: ['AWS', 'DevOps']
  }
];

// Category-based questions
export const categoryQuestions: Record<string, Question[]> = {
  'React': [
    {
      id: 'react-1',
      title: 'How to implement JWT authentication in React with TypeScript?',
      description: 'I\'m building a React application with TypeScript and need to implement JWT-based authentication. What\'s the best approach for storing tokens securely and handling token refresh? I\'ve tried localStorage but heard it\'s not secure.',
      author: dummyUsers[0],
      tags: ['React', 'JWT', 'Authentication', 'TypeScript', 'Security'],
      upvotes: 24,
      downvotes: 2,
      answers: [
        {
          id: 'react-1-ans-1',
          content: 'For JWT authentication in React, I recommend using httpOnly cookies for token storage and implementing a refresh token mechanism. Here\'s a complete example with axios interceptors...',
          author: dummyUsers[1],
          upvotes: 15,
          downvotes: 0,
          isAccepted: true,
          createdAt: '1 hour ago',
          userVote: undefined
        }
      ],
      createdAt: '2 hours ago',
      userVote: undefined
    },
    {
      id: 'react-2',
      title: 'Best practices for state management in large React applications?',
      description: 'Working on a large scale React application with complex state requirements. Should I use Redux Toolkit, Zustand, or stick with Context API? What are the performance implications and trade-offs of each approach?',
      author: dummyUsers[1],
      tags: ['React', 'State Management', 'Redux', 'Architecture', 'Performance'],
      upvotes: 18,
      downvotes: 1,
      answers: [],
      createdAt: '4 hours ago',
      userVote: undefined
    },
    {
      id: 'react-3',
      title: 'How to optimize React component re-renders and improve performance?',
      description: 'My React app is experiencing performance issues due to unnecessary re-renders. I\'ve heard about React.memo, useMemo, and useCallback, but I\'m not sure when and how to use them effectively.',
      author: dummyUsers[2],
      tags: ['React', 'Performance', 'Optimization', 'Memoization', 'Hooks'],
      upvotes: 31,
      downvotes: 0,
      answers: [],
      createdAt: '6 hours ago',
      userVote: undefined
    }
  ],
  'JavaScript': [
    {
      id: 'js-1',
      title: 'Understanding async/await vs Promises in JavaScript',
      description: 'I\'m trying to understand the differences between async/await and Promises. When should I use each approach? Are there performance differences?',
      author: dummyUsers[3],
      tags: ['JavaScript', 'Async', 'Promises', 'ES6'],
      upvotes: 22,
      downvotes: 3,
      answers: [],
      createdAt: '3 hours ago',
      userVote: undefined
    },
    {
      id: 'js-2',
      title: 'How to implement debouncing and throttling in JavaScript?',
      description: 'I need to optimize my search input and scroll handlers. Can someone explain the difference between debouncing and throttling with practical examples?',
      author: dummyUsers[0],
      tags: ['JavaScript', 'Performance', 'Debouncing', 'Throttling'],
      upvotes: 16,
      downvotes: 1,
      answers: [],
      createdAt: '5 hours ago',
      userVote: undefined
    }
  ],
  'TypeScript': [
    {
      id: 'ts-1',
      title: 'TypeScript vs JavaScript: When to use each in modern web development?',
      description: 'I\'m starting a new project and debating between TypeScript and JavaScript. What are the key benefits of TypeScript for team development?',
      author: dummyUsers[3],
      tags: ['TypeScript', 'JavaScript', 'Web Development', 'Best Practices'],
      upvotes: 15,
      downvotes: 3,
      answers: [],
      createdAt: '1 day ago',
      userVote: undefined
    },
    {
      id: 'ts-2',
      title: 'Advanced TypeScript generics and utility types',
      description: 'I want to learn more about TypeScript generics and utility types like Partial, Pick, Omit. Can someone provide practical examples?',
      author: dummyUsers[1],
      tags: ['TypeScript', 'Generics', 'Utility Types', 'Advanced'],
      upvotes: 12,
      downvotes: 0,
      answers: [],
      createdAt: '2 days ago',
      userVote: undefined
    }
  ],
  'Node.js': [
    {
      id: 'node-1',
      title: 'Node.js vs Python for backend API development: Performance comparison',
      description: 'I need to build a REST API and can\'t decide between Node.js and Python (FastAPI/Django). What are the performance characteristics?',
      author: dummyUsers[4],
      tags: ['Node.js', 'Python', 'Backend', 'API', 'Performance'],
      upvotes: 27,
      downvotes: 2,
      answers: [],
      createdAt: '2 days ago',
      userVote: undefined
    },
    {
      id: 'node-2',
      title: 'Best practices for error handling in Node.js applications',
      description: 'What are the best practices for error handling in Node.js? Should I use try-catch, error-first callbacks, or something else?',
      author: dummyUsers[5],
      tags: ['Node.js', 'Error Handling', 'Best Practices'],
      upvotes: 19,
      downvotes: 1,
      answers: [],
      createdAt: '3 days ago',
      userVote: undefined
    }
  ],
  'Python': [
    {
      id: 'python-1',
      title: 'Data analysis with pandas: Performance optimization tips',
      description: 'I\'m working with large datasets in pandas and experiencing slow performance. What are the best optimization techniques?',
      author: dummyUsers[5],
      tags: ['Python', 'Pandas', 'Data Analysis', 'Performance'],
      upvotes: 33,
      downvotes: 0,
      answers: [],
      createdAt: '1 day ago',
      userVote: undefined
    },
    {
      id: 'python-2',
      title: 'FastAPI vs Django: Which framework for modern web development?',
      description: 'I\'m building a new web application and considering FastAPI vs Django. What are the pros and cons of each?',
      author: dummyUsers[4],
      tags: ['Python', 'FastAPI', 'Django', 'Web Development'],
      upvotes: 21,
      downvotes: 2,
      answers: [],
      createdAt: '4 days ago',
      userVote: undefined
    }
  ],
  'Java': [
    {
      id: 'java-1',
      title: 'Spring Boot microservices architecture best practices',
      description: 'I\'m designing a microservices architecture with Spring Boot. What are the best practices for service communication and data consistency?',
      author: dummyUsers[6],
      tags: ['Java', 'Spring Boot', 'Microservices', 'Architecture'],
      upvotes: 28,
      downvotes: 1,
      answers: [],
      createdAt: '2 days ago',
      userVote: undefined
    }
  ],
  'AWS': [
    {
      id: 'aws-1',
      title: 'AWS Lambda deployment strategies and best practices',
      description: 'I\'m deploying serverless functions with AWS Lambda. What are the best practices for deployment, monitoring, and cost optimization?',
      author: dummyUsers[7],
      tags: ['AWS', 'Lambda', 'Serverless', 'Deployment'],
      upvotes: 25,
      downvotes: 2,
      answers: [],
      createdAt: '1 day ago',
      userVote: undefined
    }
  ]
};

// List of all categories (including UI names)
const allCategories = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'csharp', 'php', 'aws', 'C#', 'PHP', 'AWS', 'MongoDB', 'SQL', 'Mobile Dev', 'Architecture', 'Performance', 'Data Science', 'Spring', 'DevOps'
];

// Map UI category names to dummy data keys
const categoryMap: Record<string, string> = {
  'C#': 'csharp',
  'PHP': 'php',
  'AWS': 'aws',
  'Node.js': 'Node.js',
  'Mobile Dev': 'Mobile Dev',
  // Add more mappings as needed
};

// Generate massive dummy questions and answers for all categories
allCategories.forEach((cat, idx) => {
  const key = (categoryMap[cat] || cat).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!categoryQuestions[key]) categoryQuestions[key] = [];
  for (let i = 1; i <= 20; i++) {
    const qid = `${key}-${i}`;
    const answers = [];
    for (let j = 1; j <= 3; j++) {
      answers.push({
        id: `${qid}-ans-${j}`,
        content: `This is answer #${j} for question #${i} in ${cat}. Here is a detailed explanation and code example for answer #${j}.`,
        author: dummyUsers[(i + j) % dummyUsers.length],
        upvotes: Math.floor(Math.random() * 30) + 1,
        downvotes: Math.floor(Math.random() * 5),
        isAccepted: j === 1,
        createdAt: `${j} hours ago`,
        userVote: undefined
      });
    }
    categoryQuestions[key].push({
      id: qid,
      title: `${cat} Dummy Question #${i}`,
      description: `This is a dummy question #${i} for the ${cat} category. How do you solve problem ${i}? Please provide a detailed answer and code example.`,
      author: dummyUsers[i % dummyUsers.length],
      tags: [cat, 'dummy', 'example'],
      upvotes: Math.floor(Math.random() * 100) + 1,
      downvotes: Math.floor(Math.random() * 10),
      answers,
      createdAt: `${i} hours ago`,
      userVote: undefined
    });
  }
});

// Add demo Q&A pairs for a lively home feed
const demoQA = [
  {
    title: 'What is the best way to start learning coding in 2025?',
    description: 'What is the best way to start learning coding in 2025?',
    answer: "Start with Python. It's beginner-friendly and widely used. Use platforms like freeCodeCamp, W3Schools, and YouTube crash courses. Once you're confident, move on to small projects.",
    tags: ['Python', 'Learning', 'Beginner']
  },
  {
    title: 'Is AI going to replace most jobs in the next 10 years?',
    description: 'Is AI going to replace most jobs in the next 10 years?',
    answer: 'Not replace — but transform. Routine and repetitive jobs will be automated, but roles requiring creativity, strategy, and emotional intelligence will grow in demand.',
    tags: ['AI', 'Future', 'Jobs']
  },
  {
    title: 'How do I become more productive as a college student?',
    description: 'How do I become more productive as a college student?',
    answer: "Follow the 3Ps: Plan, Prioritize, and Protect your time. Use time-blocking, avoid multitasking, and always keep distractions (like your phone) out of sight while studying.",
    tags: ['Productivity', 'College', 'Students']
  },
  {
    title: 'What is a simple explanation of Blockchain?',
    description: 'What is a simple explanation of Blockchain?',
    answer: "Blockchain is like a digital ledger shared across computers. Once data is added, it can’t be changed easily. It’s used in cryptocurrencies, but also in voting, contracts, and more.",
    tags: ['Blockchain', 'Technology', 'Crypto']
  },
  {
    title: 'Why do people fail to stay consistent in gym workouts?',
    description: 'Why do people fail to stay consistent in gym workouts?',
    answer: "Lack of routine, setting unrealistic goals, or not tracking progress. Start small, track your wins, and remember — discipline > motivation.",
    tags: ['Fitness', 'Habits', 'Motivation']
  },
  {
    title: 'Can someone really earn money from freelancing?',
    description: 'Can someone really earn money from freelancing?',
    answer: "Yes! Platforms like Fiverr, Upwork, and Toptal offer freelancers global opportunities. Start with small gigs, build your profile, and deliver quality work consistently.",
    tags: ['Freelancing', 'Career', 'Money']
  },
  {
    title: 'What are the best YouTube channels for learning tech skills?',
    description: 'What are the best YouTube channels for learning tech skills?',
    answer: `Some great ones:\n\nTech With Tim (Python & ML)\nTraversy Media (Web Dev)\nSimplilearn (General Tech)\nFireship (Fast, high-quality explainers)`,
    tags: ['YouTube', 'Learning', 'Tech']
  },
  {
    title: 'Is waking up at 5 AM actually helpful?',
    description: 'Is waking up at 5 AM actually helpful?',
    answer: "Only if you sleep early. It gives you quiet hours, fewer distractions, and mental clarity. But it's more about consistent sleep cycles than waking up early for the sake of it.",
    tags: ['Habits', 'Productivity', 'Lifestyle']
  },
  {
    title: 'What are the best skills to learn in 2025?',
    description: 'What are the best skills to learn in 2025?',
    answer: `Top skills:\n\nData Analysis\nPrompt Engineering\nEmotional Intelligence\nDigital Marketing\nUI/UX Design\nCybersecurity basics`,
    tags: ['Skills', '2025', 'Learning']
  },
  {
    title: 'How can I improve my communication skills?',
    description: 'How can I improve my communication skills?',
    answer: "Read more, speak more. Record yourself, join clubs like Toastmasters, and get feedback. Also, try writing on platforms like LinkedIn to improve clarity.",
    tags: ['Communication', 'Skills', 'Personal Development']
  },
  {
    title: 'What is ChatGPT and how can it help students?',
    description: 'What is ChatGPT and how can it help students?',
    answer: "ChatGPT is an AI that helps generate answers, essays, code, and ideas. For students, it’s great for brainstorming, solving doubts, or learning in a simplified way.",
    tags: ['AI', 'ChatGPT', 'Students']
  },
  {
    title: 'How do I stay focused while studying?',
    description: 'How do I stay focused while studying?',
    answer: "Use the Pomodoro technique, keep your phone in another room, and have a study playlist. Also, declutter your workspace and study in sprints.",
    tags: ['Focus', 'Study', 'Productivity']
  },
  {
    title: 'Which is better: a job or starting your own business?',
    description: 'Which is better: a job or starting your own business?',
    answer: "Depends on your risk tolerance. A job offers stability; a business offers freedom. Both can make you successful if you stay committed and keep learning.",
    tags: ['Career', 'Business', 'Jobs']
  },
  {
    title: 'How do I manage time better while working from home?',
    description: 'How do I manage time better while working from home?',
    answer: "Set fixed work hours, take timed breaks, and have a to-do list ready the night before. Track time using apps like Clockify or Toggl.",
    tags: ['Time Management', 'Remote Work', 'Productivity']
  },
  {
    title: 'Is learning data science hard?',
    description: 'Is learning data science hard?',
    answer: "It can be at first, but with consistent practice and the right resources (like Kaggle, Coursera, and YouTube), anyone can get good at it.",
    tags: ['Data Science', 'Learning', 'Tech']
  },
  {
    title: 'How can I build a personal brand online?',
    description: 'How can I build a personal brand online?',
    answer: "Start by sharing content consistently on LinkedIn, X, or Medium. Focus on a niche, engage with others, and show your progress authentically.",
    tags: ['Branding', 'Personal Development', 'Online']
  },
  {
    title: 'What are the top 5 AI tools everyone should know in 2025?',
    description: 'What are the top 5 AI tools everyone should know in 2025?',
    answer: `ChatGPT\nMidjourney\nNotion AI\nPerplexity.ai\nRunwayML (for video AI)`,
    tags: ['AI', 'Tools', '2025']
  },
  {
    title: 'Why do some students top exams while others struggle?',
    description: 'Why do some students top exams while others struggle?',
    answer: "Toppers usually have better habits: consistency, revision, and clarity of concept. Intelligence matters, but discipline wins more often.",
    tags: ['Students', 'Exams', 'Habits']
  },
  {
    title: 'How can I deal with self-doubt while building a startup?',
    description: 'How can I deal with self-doubt while building a startup?',
    answer: "Everyone feels it. Validate your idea early, talk to users, and take small wins seriously. Surround yourself with doers — not doubters.",
    tags: ['Startups', 'Self-doubt', 'Entrepreneurship']
  },
  {
    title: "What's one thing you wish you knew before starting your career?",
    description: "What's one thing you wish you knew before starting your career?",
    answer: "Networking > Grades. Build real connections, ask questions, and learn from people — they’ll take you further than your resume ever can.",
    tags: ['Career', 'Advice', 'Networking']
  },
];

// Add demo Q&A to dummy questions
const demoUser = dummyUsers[0];
demoQA.forEach((qa, i) => {
  const qid = `demo-${i+1}`;
  categoryQuestions['demo'] = categoryQuestions['demo'] || [];
  categoryQuestions['demo'].push({
    id: qid,
    title: qa.title,
    description: qa.description,
    author: demoUser,
    tags: qa.tags,
    upvotes: Math.floor(Math.random() * 100) + 1,
    downvotes: Math.floor(Math.random() * 10),
    answers: [
      {
        id: `${qid}-ans-1`,
        content: qa.answer,
        author: demoUser,
        upvotes: Math.floor(Math.random() * 30) + 1,
        downvotes: Math.floor(Math.random() * 5),
        isAccepted: true,
        createdAt: 'Just now',
        userVote: undefined
      }
    ],
    createdAt: `${Math.floor(Math.random() * 24) + 1} hours ago`,
    userVote: undefined
  });
});

// Dummy notifications
export const dummyNotifications = [
  {
    id: '1',
    type: 'answer',
    message: 'Sarah answered your question about React hooks',
    time: '2 min ago',
    read: false,
    icon: '💬'
  },
  {
    id: '2',
    type: 'upvote',
    message: 'Your answer received 5 upvotes',
    time: '1 hour ago',
    read: false,
    icon: '👍'
  },
  {
    id: '3',
    type: 'follow',
    message: 'Mike started following you',
    time: '3 hours ago',
    read: true,
    icon: '👤'
  },
  {
    id: '4',
    type: 'mention',
    message: 'You were mentioned in a discussion about TypeScript',
    time: '5 hours ago',
    read: false,
    icon: '📢'
  },
  {
    id: '5',
    type: 'badge',
    message: 'You earned the "Helpful Answer" badge!',
    time: '1 day ago',
    read: true,
    icon: '🏆'
  },
  {
    id: '6',
    type: 'question',
    message: 'New question in React category: "How to use React.memo?"',
    time: '2 days ago',
    read: true,
    icon: '❓'
  }
];

// Dummy chat rooms
export const dummyChatRooms = [
  {
    id: '1',
    name: 'React Developers',
    description: 'Discuss React best practices and troubleshoot together',
    members: 156,
    category: 'React',
    isPrivate: false,
    lastMessage: 'Hey everyone! Just finished implementing a custom hook for form validation. Anyone interested in seeing the code?',
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
  },
  {
    id: '4',
    name: 'TypeScript Enthusiasts',
    description: 'Advanced TypeScript discussions and tips',
    members: 45,
    category: 'TypeScript',
    isPrivate: false,
    lastMessage: 'Generics are so powerful!',
    lastMessageTime: '1 hour ago'
  },
  {
    id: '5',
    name: 'Python Data Science',
    description: 'Data analysis, machine learning, and Python',
    members: 78,
    category: 'Python',
    isPrivate: false,
    lastMessage: 'Pandas performance tips anyone?',
    lastMessageTime: '2 hours ago'
  }
];

// Store user-posted questions in memory
const userPostedQuestions: Question[] = [];

export function addUserPostedQuestion(question: any) {
  userPostedQuestions.unshift(question); // Ensure user-posted questions are tracked
  categoryQuestions['demo'] = categoryQuestions['demo'] || [];
  categoryQuestions['demo'].unshift(question);
}

export function getUserPostedQuestions(categories: string[]): Question[] {
  if (!categories || categories.length === 0) return userPostedQuestions;
  // Normalize categories
  const normalized = categories.map(cat => (categoryMap[cat] || cat).toLowerCase().replace(/[^a-z0-9]/g, ''));
  return userPostedQuestions.filter(q =>
    q.tags.some(tag => normalized.includes(tag.toLowerCase().replace(/[^a-z0-9]/g, '')))
  );
}

// Update getQuestionsByCategories to include user-posted questions
export function getQuestionsByCategories(categories: string[]): Question[] {
  let questions: Question[] = [];
  const normalized = categories.map(cat => (categoryMap[cat] || cat).toLowerCase().replace(/[^a-z0-9]/g, ''));
  normalized.forEach(category => {
    if (categoryQuestions[category]) {
      questions.push(...categoryQuestions[category]);
    }
  });
  // Add user-posted questions for these categories
  questions = getUserPostedQuestions(categories).concat(questions);
  // If no questions found for selected categories, show all
  if (questions.length === 0) {
    questions = userPostedQuestions.concat(Object.values(categoryQuestions).flat());
  }
  // Always return a large set (limit to 60 for performance)
  return questions.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).slice(0, 60);
}

// Get unread notifications count
export function getUnreadNotificationsCount(): number {
  return dummyNotifications.filter(n => !n.read).length;
}

// Mark notification as read
export function markNotificationAsRead(id: string): void {
  const notification = dummyNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
} 