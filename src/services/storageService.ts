// src/services/storageService.js

const STORAGE_KEYS = {
  LAST_CITY: "lastCity",
} as const;

class StorageService {
  /**
   * Сохранить название последнего города
   * @param {string} city
   */
  saveLastCity(city: string): void {
    if (!city) return;
    localStorage.setItem(STORAGE_KEYS.LAST_CITY, city);
  }

  /**
   * Получить название последнего города
   * @returns {string|null}
   */
  getLastCity(): string|null {
    return localStorage.getItem(STORAGE_KEYS.LAST_CITY) || null;
  }

  /**
   * Очистить сохранённый город
   */
  clearLastCity(): void {
    localStorage.removeItem(STORAGE_KEYS.LAST_CITY);
  }
}

export default new StorageService();
