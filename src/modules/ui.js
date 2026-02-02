/**
 * Модуль для обновления пользовательского интерфейса
 */

/**
 * Обновляет все элементы интерфейса данными о погоде
 * @param {object} data - Данные о погоде
 */
export function updateUI(data) {
  // 1. Обновляем блок текущей погоды
  document.getElementById("city-name").textContent = data.city;
  document.getElementById("current-temp").textContent = Math.round(
    data.temperature,
  );
  document.getElementById("feels-like").textContent = Math.round(
    data.feelsLike,
  );
  document.getElementById("humidity").textContent = data.humidity;
  document.getElementById("wind-speed").textContent = Math.round(
    data.windSpeed,
  );

  // 2. Обновляем блок прогноза
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = ""; // Очищаем старый прогноз

  if (data.forecast && data.forecast.length > 0) {
    data.forecast.forEach((day) => {
      const dayEl = document.createElement("div");
      dayEl.className = "forecast-day";
      dayEl.innerHTML = `
                <div class="day">${day.day}</div>
                <div class="temp">${Math.round(day.temp)}°C</div>
            `;
      forecastContainer.appendChild(dayEl);
    });
  }
}

/**
 * Показывает сообщение об ошибке в интерфейсе
 * @param {string} message - Текст ошибки.
 */
export function showError(message) {
  // Можно улучшить, добавив красивый toast
  alert(`Weather Error: ${message}`);
}
