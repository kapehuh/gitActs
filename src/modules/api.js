/**
 * Модуль для работы с API погоды
 * TODO: Реализовать реальный запрос к OpenWeatherMap API
 * @see https://openweathermap.org/api
 */

const API_KEY = "YOUR_API_KEY"; // Получите на openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Запрашивает текущую погоду для указанного города
 * @param {string} city - Название города
 * @returns {Promise<object>} Данные о погоде
 */
export async function fetchWeather(city) {
  // Заглушка для будущей реализации
  //console.log(`[API] Fetching weather for ${city}`);
  throw new Error("API module not implemented yet");
}

/**
 * Запрашивает прогноз на 5 дней
 * @param {string} city - Название города
 * @returns {Promise<Array>} Массив с прогнозом
 */
export async function fetchForecast(city) {
  //console.log(`[API] Fetching forecast for ${city}`);
  throw new Error("Forecast API not implemented yet");
}
