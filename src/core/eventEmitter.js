class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Подписка на событие
   * @param {string} eventName
   * @param {Function} listener
   * @returns {Function} функция для отписки
   */
  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("listener must be a function");
    }
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return () => this.off(eventName, listener);
  }

  /**
   * Отписка от события
   * @param {string} eventName
   * @param {Function} listener
   */
  off(eventName, listener) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (l) => l !== listener,
    );
  }

  /**
   * Генерация события
   * @param {string} eventName
   * @param {...any} args
   */
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;
    // Копируем список, чтобы обработчики могли безопасно отписываться
    const listeners = [...this.events[eventName]];
    listeners.forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error);
      }
    });
  }

  /**
   * Очистить все подписки (для тестов)
   */
  clear() {
    this.events = {};
  }
}

export default EventEmitter;
