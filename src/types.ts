export interface BLItem {
  id: string;
  author: string;
  coverUrl: string;
  description: string;
  language: string;
  title: string;
}

export type MoodOptionType = {
  emoji: string;
  description: string;
};

export type MoodOptionWithTimestamp = {
  mood: MoodOptionType;
  timestamp: number;
};

type Language = 'en' | 'es' | 'it';

export interface SearchBooks {
  searchTerm: string;
  language: Language;
}

export interface User {
  id: string;
  lastName: string;
  name: string;
  email: string;
  location: string;
  photoUrl?: string;
}

interface UserItem {
  itemId: string;
  userId: string;
  isAvailable: boolean;
}

export interface CompleteUserItem extends UserItem {
  item: BLItem;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
}

export interface CompleteFriendRequest extends FriendRequest {
  sender: User;
}

export interface CompleteUser extends User {
  friends: User[];
  items: CompleteUserItem[];
  receivedFriendRequests: CompleteFriendRequest[];
  sentFriendRequests: FriendRequest[];
}
