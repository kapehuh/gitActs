// Импорт стилей
import "./styles/index.css";

// Импорт модулей (заготовки)
import { updateUI, showError } from "./modules/ui.js";
// DOM-элементы
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const searchForm = document.getElementById("search-box");

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
  let userCity = {};
  try {
    const position = await getCurrentPosition();
    userCity = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: "Ваше местоположение",
    };
    console.log("Геолокация получена:", userCity.name);
  } catch (error) {
    console.warn("Не удалось получить геолокацию:", error.message);
    // Загружаем погоду для города по умолчанию
    loadWeatherData(defaultCityAmsterdam);
    return;
  }

  if (userCity.lat && userCity.lon) {
    loadWeatherData(userCity);
  }

  // Обработчик формы (заменяем click и keyup)
  searchForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  const city = cityInput ? cityInput.value.trim() : "";
  console.log(`Перехвачено событие SUBMIT - город = ${city}`);

  if (city) {
    handleCitySearch(city);
    cityInput.value = ""; // Очищаем поле ввода
  } else {
    showError("Пожалуйста, введите название города");
  }
}

/**
 * Обработка поиска города
 */
function handleCitySearch(city) {
  console.log(`Обрабатываем город: ${city}`);
  switch (city) {
    case "amsterdam":
      loadWeatherData(defaultCityAmsterdam);
      break;
    case "moscow":
    case "Moscow":
    case "Москва":
    case "москва":
      loadWeatherData(moscowCity);
      break;
    case "saintpetersburg":
    case "SaintPetersburg":
    case "Петербург":
    case "СанктПетербург":
      loadWeatherData(spbCity);
      break;
    case "newyork":
    case "NewYork":
      loadWeatherData(newYorkCity);
      break;
    case "paris":
    case "Paris":
    case "Париж":
      loadWeatherData(parisCity);
      break;
    default:
      if (city) {
        showError(
          `Город "${city}" не найден. Попробуйте: Amsterdam, Moscow, SaintPetersburg, NewYork, Paris`,
        );
      }
      break;
  }
}

/**
 * Загружает данные о погоде и обновляет интерфейс
 */
async function loadWeatherData(city) {
  try {
    console.log(`Начало обработки для города: ${city.name || "неизвестный"}`);
    let rspnce = await fetch(
      `https://api.weather.yandex.ru/v2/forecast?lat=${city.lat}&lon=${city.lon}`,
      { headers },
    );

    if (!rspnce.ok) {
      console.log(`rspnc не ок`);
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

    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        let errorMessage = "Не удалось получить геолокацию";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Пользователь отказал в доступе к геолокации";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Информация о местоположении недоступна";
            break;
          case error.TIMEOUT:
            errorMessage = "Время ожидания геолокации истекло";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
        ...options,
      },
    );
  });
}

// Инициализация приложения после загрузки DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Экспорты для возможного тестирования
export {
  initApp,
  handleCitySearch,
  handleFormSubmit,
  getCurrentPosition,
  loadWeatherData,
};
