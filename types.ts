export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  isAiGenerated?: boolean;
  bookTag?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'character';
  text: string;
  timestamp: Date;
}

export interface LiteraryCharacter {
  id: string;
  name: string;
  book: string;
  avatar: string;
  personality: string;
}
