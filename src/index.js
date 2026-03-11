import "./styles/index.css";
import Router from "./core/router";
import weatherService from "./services/weatherService";
import locationService from "./services/locationService";
import storageService from "./services/storageService";
import SearchWidget from "./components/SearchWidget";
import CurrentWeatherWidget from "./components/CurrentWeatherWidget";

// Получаем ссылки на DOM-элементы
const cityNameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("current-temp");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");

// виджет
const searchWidget = new SearchWidget({
  formId: "search-box",
  inputId: "city-input",
  onSearch: (city) => {
    // хэш /city/город
    window.location.hash = `/city/${encodeURIComponent(city)}`;
  },
});

const weatherWidget = new CurrentWeatherWidget({
  cityName: cityNameEl,
  temp: currentTempEl,
  feelsLike: feelsLikeEl,
  humidity: humidityEl,
  wind: windSpeedEl,
});

// загрузка погоды
async function loadWeatherForCity(city) {
  try {
    const data = await weatherService.getCurrentWeatherByCity(city);
    weatherWidget.update(data);
    storageService.saveLastCity(city);
  } catch (error) {
    weatherWidget.showError(error.message);
  }
}

// Функция загрузки погоды по координатам (для геолокации)
async function loadWeatherForCoords(lat, lon) {
  try {
    const data = await weatherService.getCurrentWeatherByCoords(lat, lon);
    weatherWidget.update(data);
    storageService.saveLastCity(data.name);
    // После успешной загрузки обновляем URL на название города
    window.location.hash = `/city/${encodeURIComponent(data.name)}`;
  } catch (error) {
    weatherWidget.showError(error.message);
  }
}

// экземпляр роутера
const router = new Router();

// Регистрируем маршруты
router.addRoute("/city/:cityName", (params) => {
  const city = decodeURIComponent(params.cityName);
  loadWeatherForCity(city);
});

router.addRoute("/about", () => {
  // меняем текст в виджете
  cityNameEl.textContent = " ... - enter a city name to get weather info!";
  currentTempEl.textContent = "--";
  feelsLikeEl.textContent = "--";
  humidityEl.textContent = "--";
  windSpeedEl.textContent = "--";
});

router.addRoute("/", async () => {
  // Пытаемся получить геолокацию
  try {
    const { lat, lon } = await locationService.getCurrentPosition();
    await loadWeatherForCoords(lat, lon);
  } catch (error) {
    console.warn("Geolocation failed:", error.message);
    // Если не удалось, пробуем последний сохранённый город
    const lastCity = storageService.getLastCity();
    if (lastCity) {
      window.location.hash = `/city/${encodeURIComponent(lastCity)}`;
    } else {
      // Иначе город по умолчанию
      window.location.hash = "/city/Moscow";
    }
  }
});

// Запускаем роутер
router.start();

// ссылка "О приложении" в футер
const footer = document.querySelector(".footer p");
if (footer) {
  const aboutLink = document.createElement("a");
  aboutLink.href = "#/about";
  aboutLink.textContent = " About";
  aboutLink.style.marginLeft = "10px";
  footer.appendChild(aboutLink);
}
