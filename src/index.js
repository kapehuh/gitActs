// src/index.js

import "./styles/index.css";
import { updateUI, showError } from "./modules/ui.js";
import weatherService from "./services/weatherService";
import locationService from "./services/locationService";
import storageService from "./services/storageService";

const cityInput = document.getElementById("city-input");
const searchForm = document.getElementById("search-box");

/**
 * Загружает погоду для указанного города
 * @param {string} city
 */
async function loadWeatherByCity(city) {
  try {
    const data = await weatherService.getCurrentWeatherByCity(city);
    updateUI(data);
    storageService.saveLastCity(city); // опц
  } catch (error) {
    showError(`Не удалось загрузить погоду для "${city}": ${error.message}`);
  }
}

/**
 * Загружает погоду по координатам
 * @param {number} lat
 * @param {number} lon
 */
async function loadWeatherByCoords(lat, lon) {
  try {
    const data = await weatherService.getCurrentWeatherByCoords(lat, lon);
    updateUI(data);
    storageService.saveLastCity(data.name); // сохраняем название города
  } catch (error) {
    showError(`Не удалось загрузить погоду: ${error.message}`);
  }
}

/**
 * Обработчик отправки формы поиска
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    showError("Введите название города");
    return;
  }
  await loadWeatherByCity(city);
  cityInput.value = ""; // очищаем поле после поиска
}

/**
 * Инициализация приложения
 */
async function initApp() {
  // Пробуем получить геолокацию
  try {
    const { lat, lon } = await locationService.getCurrentPosition();
    await loadWeatherByCoords(lat, lon);
  } catch (locationError) {
    console.warn("Геолокация не доступна:", locationError.message);

    // Если геолокация не сработала, пробуем загрузить последний сохранённый город
    const lastCity = storageService.getLastCity();
    if (lastCity) {
      await loadWeatherByCity(lastCity);
    } else {
      // Иначе показываем город по умолчанию (например, Москва)
      await loadWeatherByCity("Moscow");
    }
  }

  // Подписка на событие формы
  searchForm.addEventListener("submit", handleFormSubmit);
}

// Старт приложения после загрузки DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
