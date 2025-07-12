import type { Answer } from '../App';

const STACK_EXCHANGE_API_BASE = 'https://api.stackexchange.com/2.3';
const API_KEY = 'rl_TWQf5BER28XnxnSGXLsSZ5uxi';

export interface StackExchangeQuestion {
  question_id: number;
  title: string;
  body: string;
  score: number;
  answer_count: number;
  view_count: number;
  creation_date: number;
  last_activity_date: number;
  tags: string[];
  owner: {
    user_id: number;
    display_name: string;
    profile_image: string;
    reputation: number;
  };
  is_answered: boolean;
  accepted_answer_id?: number;
}

export interface StackExchangeAnswer {
  answer_id: number;
  body: string;
  score: number;
  is_accepted: boolean;
  creation_date: number;
  owner: {
    user_id: number;
    display_name: string;
    profile_image: string;
    reputation: number;
  };
}

// Helper to use a CORS proxy for frontend-only
function withCorsProxy(url: string) {
  return `https://corsproxy.io/?${encodeURIComponent(url)}`;
}

export async function fetchQuestions(tagged: string[] = [], page: number = 1) {
  const params = new URLSearchParams({
    site: 'stackoverflow',
    order: 'desc',
    sort: 'activity',
    filter: 'withbody',
    pagesize: '20',
    page: page.toString(),
    key: API_KEY,
  });
  if (tagged.length > 0) params.append('tagged', tagged.join(';'));
  const url = `${STACK_EXCHANGE_API_BASE}/questions?${params.toString()}`;
  const response = await fetch(withCorsProxy(url));
  const data = await response.json();
  return data.items as StackExchangeQuestion[];
}

export async function fetchAnswers(questionId: number) {
  const params = new URLSearchParams({
    site: 'stackoverflow',
    order: 'desc',
    sort: 'votes',
    filter: 'withbody',
    key: API_KEY,
  });
  const url = `${STACK_EXCHANGE_API_BASE}/questions/${questionId}/answers?${params.toString()}`;
  const response = await fetch(withCorsProxy(url));
  const data = await response.json();
  return data.items as StackExchangeAnswer[];
}

// Transform Stack Exchange data to app's format
export function transformStackExchangeQuestion(seQuestion: StackExchangeQuestion): {
  id: string;
  title: string;
  description: string;
  author: any;
  tags: string[];
  upvotes: number;
  downvotes: number;
  answers: Answer[];
  createdAt: string;
  userVote?: 'up' | 'down';
} {
  return {
    id: seQuestion.question_id.toString(),
    title: seQuestion.title,
    description: seQuestion.body.replace(/<[^>]*>/g, '').substring(0, 300) + '...',
    author: {
      id: seQuestion.owner.user_id.toString(),
      username: seQuestion.owner.display_name,
      email: `${seQuestion.owner.display_name.toLowerCase()}@example.com`,
      avatar: seQuestion.owner.profile_image,
      followers: Math.floor(seQuestion.owner.reputation / 100),
      following: Math.floor(seQuestion.owner.reputation / 200),
      categories: seQuestion.tags.slice(0, 3)
    },
    tags: seQuestion.tags,
    upvotes: seQuestion.score > 0 ? seQuestion.score : 0,
    downvotes: seQuestion.score < 0 ? Math.abs(seQuestion.score) : 0,
    answers: [],
    createdAt: new Date(seQuestion.creation_date * 1000).toLocaleDateString(),
    userVote: undefined as 'up' | 'down' | undefined
  };
}

export function transformStackExchangeAnswer(seAnswer: StackExchangeAnswer): Answer {
  return {
    id: seAnswer.answer_id.toString(),
    content: seAnswer.body.replace(/<[^>]*>/g, '').substring(0, 500) + '...',
    author: {
      id: seAnswer.owner.user_id.toString(),
      username: seAnswer.owner.display_name,
      email: `${seAnswer.owner.display_name.toLowerCase()}@example.com`,
      avatar: seAnswer.owner.profile_image,
      followers: Math.floor(seAnswer.owner.reputation / 100),
      following: Math.floor(seAnswer.owner.reputation / 200),
      categories: []
    },
    upvotes: seAnswer.score > 0 ? seAnswer.score : 0,
    downvotes: seAnswer.score < 0 ? Math.abs(seAnswer.score) : 0,
    isAccepted: seAnswer.is_accepted,
    createdAt: new Date(seAnswer.creation_date * 1000).toLocaleDateString(),
    userVote: undefined as 'up' | 'down' | undefined
  };
} 