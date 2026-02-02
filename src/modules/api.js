/**
 * Модуль для работы с API погоды
 * TODO: Реализовать реальный запрос к OpenWeatherMap API
 * @see https://openweathermap.org/api
 */

import { API_KEY, BASE_URL } from "/src/config.js";
//const API_KEY = "97d93f1704dcb8e35dd2045c8e75710d"; // Получите на openweathermap.org
//const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Запрашивает текущую погоду для указанного города
 * @param {string} city - Название города
 * @returns {Promise<object>} Данные о погоде
 */
export async function fetchWeather(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;
  const response = await fetch(url);

  if (!response.ok) {
    // Если API вернуло ошибку (например, город не найден)
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }
  return response.json();
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
