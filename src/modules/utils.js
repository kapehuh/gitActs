/**
 * Вспомогательные функции
 */

/**
 * Форматирует дату в читаемый вид
 * @param {Date|string} date - Дата для форматирования
 * @returns {string} Отформатированная дата
 */
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Конвертирует температуру из Кельвинов в Цельсии
 * @param {number} kelvin - Температура в Кельвинах
 * @returns {number} Температура в Цельсиях
 */
export function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

/**
 * Обрабатывает ошибки fetch-запросов
 * @param {Response} response - Ответ от сервера
 * @returns {Promise} Промис с данными или ошибкой
 */
export function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
