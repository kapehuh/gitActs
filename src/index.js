// Импорт стилей
import "./styles/main.css";
// Импорт модулей (заготовки)
import { fetchWeather } from "./modules/api.js";
import { updateUI, showError } from "./modules/ui.js";
import { formatDate } from "./modules/utils.js";
// DOM-элементы
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityNameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("current-temp");

// Начальные данные для примера (замените на вызов API)
const defaultCity = "Moscow";

/**
 * Основная функция инициализации приложения
 */
function initApp() {
  // Загружаем погоду для города по умолчанию
  loadWeatherData(defaultCity);

  // Обработчик кнопки поиска
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      loadWeatherData(city);
      cityInput.value = ""; // Очищаем поле ввода
    }
  });

  // Поиск по нажатию Enter
  cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });
}

/**
 * Загружает данные о погоде и обновляет интерфейс
 * @param {string} city - Название города
 */
async function loadWeatherData(city) {
  try {
    // Временная заглушка (замените на реальный вызов API)
    const mockData = {
      city: city,
      temperature: 15,
      feelsLike: 14,
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: "Mon", temp: 16 },
        { day: "Tue", temp: 18 },
        { day: "Wed", temp: 14 },
        { day: "Thu", temp: 12 },
        { day: "Fri", temp: 17 },
      ],
    };

    // Обновляем интерфейс с мок-данными
    updateUI(mockData);
    //console.log(`Weather data loaded for ${city}`); // Для отладки
  } catch (error) {
    showError("Failed to load weather data. Please try again.");
    //console.error('Error loading weather:', error);
  }
}

// Инициализация приложения после загрузки DOM
document.addEventListener("DOMContentLoaded", initApp);

// Экспорты для возможного тестирования
export { initApp, loadWeatherData };

// import { initApp } from "./initApp";
// initApp(document.body);
