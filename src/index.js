import "./styles/index.css";
import EventEmitter from "./core/eventEmitter";
import weatherService from "./services/weatherService";
import locationService from "./services/locationService";
import storageService from "./services/storageService";
import SearchWidget from "./components/SearchWidget";
import CurrentWeatherWidget from "./components/CurrentWeatherWidget";

const eventBus = new EventEmitter();

// Инициализация виджетов
const searchWidget = new SearchWidget(eventBus, {
  formId: "search-box",
  inputId: "city-input",
});

const currentWeatherWidget = new CurrentWeatherWidget(eventBus, {
  cityName: document.getElementById("city-name"),
  temp: document.getElementById("current-temp"),
  feelsLike: document.getElementById("feels-like"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind-speed"),
});

// Обработчики событий на уровне приложения
eventBus.on("city:changed", async (city) => {
  try {
    const data = await weatherService.getCurrentWeatherByCity(city);
    eventBus.emit("weather:loaded", data);
    storageService.saveLastCity(city);
  } catch (error) {
    eventBus.emit("weather:error", error.message);
  }
});

async function loadWeatherByCoords(lat, lon) {
  try {
    const data = await weatherService.getCurrentWeatherByCoords(lat, lon);
    eventBus.emit("weather:loaded", data);
    storageService.saveLastCity(data.name);
  } catch (error) {
    eventBus.emit("weather:error", error.message);
  }
}

// Стартовая загрузка: геолокация или последний город
async function initApp() {
  try {
    const { lat, lon } = await locationService.getCurrentPosition();
    await loadWeatherByCoords(lat, lon);
  } catch {
    const lastCity = storageService.getLastCity();
    if (lastCity) {
      eventBus.emit("city:changed", lastCity);
    } else {
      eventBus.emit("city:changed", "Moscow");
    }
  }
}

initApp();
