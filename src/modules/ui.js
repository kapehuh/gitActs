// src/modules/ui.js

// DOM-элементы (можно получать внутри функций или экспортировать глобально)
const cityNameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("current-temp");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");

/**
 * Обновляет интерфейс данными погоды (формат после трансформации)
 * @param {object} weatherData
 */
export function updateUI(weatherData) {
  if (!weatherData) return;

  cityNameEl.textContent = weatherData.name || "Unknown";
  currentTempEl.textContent = Math.round(weatherData.main.temp);
  feelsLikeEl.textContent = Math.round(weatherData.main.feels_like);
  humidityEl.textContent = weatherData.main.humidity;

  // скорость ветра из м/с в км/ч (если нужно)
  const windSpeedKmh = (weatherData.wind.speed * 3.6).toFixed(1);
  windSpeedEl.textContent = windSpeedKmh;
}

/**
 * Показывает сообщение об ошибке (временная заглушка – можно улучшить)
 * @param {string} message
 */
export function showError(message) {
  alert(message); // или более изящный компонент
  console.error(message);
}
