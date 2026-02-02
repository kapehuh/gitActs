// Импорт стилей
import "./styles/main.css";
// Импорт модулей (заготовки)
import { fetchWeather, fetchForecast } from "./modules/api.js";
import { updateUI, showError } from "./modules/ui.js";
import { processForecastData } from "./modules/utils.js";

console.debug("[Weather App] Main module loaded");

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
// Начальные данные для примера (замените на вызов API)
const defaultCity = "Moscow";

/**
 * Основная функция инициализации приложения
 */
function initApp() {
  console.debug("[Weather App] initApp called");
  // Загружаем погоду для города по умолчанию
  loadWeatherData(defaultCity);

  searchBtn.addEventListener("click", handleSearch);
  cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
  });
}

async function handleSearch() {
  const city = cityInput.value.trim();
  if (city) {
    await loadWeatherData(city);
    cityInput.value = "";
  }
}

async function loadWeatherData(city) {
  try {
    console.debug("[Weather App] Starting to load weather for:", city);
    // Параллельно запрашиваем текущую погоду и прогноз
    const [currentData, forecastData] = await Promise.all([
      fetchWeather(city),
      fetchForecast(city),
    ]);

    // Формируем объект для UI
    const weatherData = {
      city: currentData.name,
      temperature: currentData.main.temp,
      feelsLike: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      forecast: processForecastData(forecastData),
    };

    console.debug("[Weather App] Processed data:", weatherData);
    updateUI(weatherData);
    console.debug("[Weather App] UI updated successfully");
  } catch (error) {
    console.error("Ошибка загрузки погоды:", error);
    showError(error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.debug("[Weather App] DOM fully loaded");
  initApp();
});
