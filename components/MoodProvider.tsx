import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
export const STORAGE_KEYS = {
  MOOD_ENTRIES: 'mood_entries',
  DIARY_ENTRIES: 'diary_entries',
};

// Mood entry interface
export interface MoodEntry {
  id: string;
  date: string;
  emoji: string;
  mood: string;
  note?: string;
  timestamp: number;
}

// Storage utilities
export const StorageUtils = {
  // Get mood entries
  async getMoodEntries(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting mood entries:', error);
      return [];
    }
  },

  // Save mood entry
  async saveMoodEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getMoodEntries();
      const updatedEntries = [...entries, entry];
      await AsyncStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  }
};
