// Импорт стилей
import "./styles/index.css";

// Импорт модулей (заготовки)
//import { fetchWeather } from './modules/api.js';
import { updateUI, showError } from "./modules/ui.js";
// DOM-элементы
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const defaultCityAmsterdam = {
  lat: "52.3730796",
  lon: "4.8924534",
  name: "Amsterdam",
};
const moscowCity = {
  lat: "55.625578",
  lon: "37.6063916",
  name: "Moscow",
};
const spbCity = {
  lat: "59.938784",
  lon: "30.314997",
  name: "SaintPetersburg",
};
const newYorkCity = {
  lat: "40.7127281",
  lon: "-74.0060152",
  name: "NewYork",
};
const parisCity = {
  lat: "48.856663",
  lon: "2.351556",
  name: "Paris",
};
// ======================================================================================
const API_KEY = "a45d67a4-3189-4adc-bd2d-fa7f3085bd59";
const headers = {
  "X-Yandex-Weather-Key": API_KEY,
};
// ======================================================================================
/**
 * Основная функция инициализации приложения
 */
async function initApp() {
  const userCity = {};
  try {
    const position = await getCurrentPosition();
    userCity = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: "",
    };
  } catch (error) {
    console.warn("Не удалось получить геолокацию:", error.message);
    // Загружаем погоду для города по умолчанию
    loadWeatherData(defaultCityAmsterdam);
    return;
  }

  // Загружаем погоду для города по умолчанию
  loadWeatherData(userCity);

  // Обработчик кнопки поиска
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    console.log(`Перехвачено событие КЛИК - город = ${city}`);
    switch (city) {
      case "Amsterdam":
        loadWeatherData(defaultCityAmsterdam);
        cityInput.value = ""; // Очищаем поле ввода
        break;
      case "Moscow":
        loadWeatherData(moscowCity);
        cityInput.value = ""; // Очищаем поле ввода
        break;
      case "SaintPetersburg":
        loadWeatherData(spbCity);
        cityInput.value = ""; // Очищаем поле ввода
        break;
      case "NewYork":
        loadWeatherData(newYorkCity);
        cityInput.value = ""; // Очищаем поле ввода
        break;
      case "Paris":
        loadWeatherData(parisCity);
        cityInput.value = ""; // Очищаем поле ввода
        break;
      default:
        break;
    }
    // if (city) {
    //     loadWeatherData(city);
    // }
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
    console.log(`Начало обработки`);
    let rspnce = await fetch(
      `https://api.weather.yandex.ru/v2/forecast?lat=${city.lat}&lon=${city.lon}`,
      { headers },
    );
    // .then(response => response.json())
    // .then(json => console.log(json));

    if (!rspnce.ok) {
      console.log(`rspnc не ок`);
      // Обработка ошибок HTTP
      const errorText = await rspnce.text();
      console.error("HTTP Error:", rspnce.status, errorText);
      // Показать сообщение пользователю
      showError(`Ошибка ${rspnce.status}: Не удалось получить данные о погоде`);
      return;
    }

    const data = await rspnce.json();
    console.log("Полные данные API:", data);
    updateUI(data);
    console.log(`Weather data loaded for ${city.name}`); // Для отладки
  } catch (error) {
    showError("Failed to load weather data. Please try again.");
    console.error("Error loading weather:", error);
  }
}

// Функция получения геолокации с Promise
function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается браузером"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true, // Высокая точность
      timeout: 10000, // 10 секунд на получение
      maximumAge: 600000, // Кэшировать на 10 минут
      ...options,
    });
  });
}

// Инициализация приложения после загрузки DOM
document.addEventListener("DOMContentLoaded", initApp);

// Экспорты для возможного тестирования
export { initApp, loadWeatherData };
