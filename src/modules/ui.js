/**
 * Модуль для обновления пользовательского интерфейса
 */

/**
 * Обновляет все элементы интерфейса данными о погоде
 * @param {object} data - Данные о погоде
 */
export function updateUI(data) {
  // Заглушка - просто выводим данные в консоль
  //console.log('[UI] Updating interface with data:', data);
  // TODO: Реализовать обновление DOM-элементов из data
}

/**
 * Показывает сообщение об ошибке
 * @param {string} message - Текст ошибки
 */
export function showError(message) {
  alert(`Error: ${message}`); // Временное решение
  //console.error('[UI] Error:', message);
  // TODO: Реализовать красивый вывод ошибок в интерфейсе
}
