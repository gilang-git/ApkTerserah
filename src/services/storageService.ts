import { ChatSession } from '../types';

const STORAGE_KEYS = {
  FAVORITES: 'terserah_favorites',
  CHAT_HISTORY: 'terserah_chat_history',
  NOTIFICATIONS_ENABLED: 'terserah_notifications_enabled',
  DARK_MODE: 'terserah_dark_mode',
  SPIN_WHEEL_ITEMS: 'terserah_spin_wheel_items'
};

export class StorageService {
  static getFavorites(): string[] {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  }

  static saveFavorites(favorites: string[]) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

  static getChatHistory(): ChatSession[] {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return data ? JSON.parse(data) : [];
  }

  static saveChatHistory(history: ChatSession[]) {
    // Limit to 10 most recent
    const limitedHistory = history
      .sort((a, b) => b.lastUpdated - a.lastUpdated)
      .slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(limitedHistory));
  }

  static addChatSession(session: ChatSession) {
    if (session.messages.length === 0) return;
    const history = this.getChatHistory();
    const existingIndex = history.findIndex(s => s.id === session.id);
    
    if (existingIndex > -1) {
      history[existingIndex] = session;
    } else {
      history.push(session);
    }
    
    this.saveChatHistory(history);
  }

  static resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.SPIN_WHEEL_ITEMS);
  }

  static deleteFavorites() {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
  }

  static deleteChatHistory() {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  }

  static getSettings() {
    return {
      notificationsEnabled: localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED) !== 'false',
      darkMode: localStorage.getItem(STORAGE_KEYS.DARK_MODE) !== 'false'
    };
  }

  static saveSettings(settings: { notificationsEnabled: boolean, darkMode: boolean }) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, String(settings.notificationsEnabled));
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(settings.darkMode));
  }

  static getSpinWheelItems(): string[] {
    const data = localStorage.getItem(STORAGE_KEYS.SPIN_WHEEL_ITEMS);
    return data ? JSON.parse(data) : [];
  }

  static saveSpinWheelItems(items: string[]) {
    localStorage.setItem(STORAGE_KEYS.SPIN_WHEEL_ITEMS, JSON.stringify(items));
  }
}
