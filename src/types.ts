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
