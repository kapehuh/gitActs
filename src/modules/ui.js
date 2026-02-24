// src/modules/ui.js

// DOM-элементы
const cityNameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("current-temp");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");

/**
 * Обновляет интерфейс
 * @param {object} weatherData
 */
export function updateUI(weatherData) {
  if (!weatherData) return;

  cityNameEl.textContent = weatherData.name || "Unknown";
  currentTempEl.textContent = Math.round(weatherData.main.temp);
  feelsLikeEl.textContent = Math.round(weatherData.main.feels_like);
  humidityEl.textContent = weatherData.main.humidity;

  //const windSpeedKmh = (weatherData.wind.speed * 3.6).toFixed(1);
  windSpeedEl.textContent = weatherData.wind.speed;
}

/**
 * Показывает сообщение об ошибке
 * @param {string} message
 */
export function showError(message) {
  alert(message);
  console.error(message);
}
