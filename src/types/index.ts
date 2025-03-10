export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Image {
  id: string;
  user_id: string;
  url: string;
  name: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  images: Image[];
  messages: ChatMessage[];
}

export interface ChatImageRelation {
  chat_id: string;
  image_id: string;
} 