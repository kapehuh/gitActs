import { WeatherData } from '../types/weather';

// interface WeatherData {
//   name?: string;
//   main: {
//     temp: number;
//     feels_like: number;
//     humidity: number;
//   };
//   wind: {
//     speed: number;
//   };
// }

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
export function updateUI(weatherData: WeatherData): void {
  if (!weatherData) return;

  if (!cityNameEl || !currentTempEl || !feelsLikeEl || !humidityEl || !windSpeedEl) {
    console.error("One or more DOM elements are missing");
    return;
  }

  cityNameEl.textContent = weatherData.name || "Unknown";
  currentTempEl.textContent = Math.round(weatherData.main.temp).toString();
  feelsLikeEl.textContent = Math.round(weatherData.main.feels_like).toString();
  humidityEl.textContent = weatherData.main.humidity.toString();

  //const windSpeedKmh = (weatherData.wind.speed * 3.6).toFixed(1);
  windSpeedEl.textContent = weatherData.wind.speed.toString();
}

/**
 * Показывает сообщение об ошибке
 * @param {string} message
 */
export function showError(message: string): void {
  alert(message);
  console.error(message);
}
