import './styles/style.css'; // путь к CSS-файлу
import Router from './core/router';
import WeatherService from './services/weatherService';
import locationService from './services/locationService';
import storageService from './services/storageService';
import SearchWidget from './components/SearchWidget';
import CurrentWeatherWidget from './components/CurrentWeatherWidget';
import { updateUI } from "./modules/ui";

function initApp() {
  // Получаем ссылки на DOM-элементы
  const cityNameEl = document.getElementById("city-name");
  const currentTempEl = document.getElementById("current-temp");
  const feelsLikeEl = document.getElementById("feels-like");
  const humidityEl = document.getElementById("humidity");
  const windSpeedEl = document.getElementById("wind-speed");

  if (!cityNameEl || !currentTempEl || !feelsLikeEl || !humidityEl || !windSpeedEl) {
    throw new Error("Critical DOM elements are missing");
  }

  const weatherService = new WeatherService('85b882b62fd1ca76d52cf910a69a5296');

  const router = new Router();

  let searchWidget: SearchWidget;
  try {
    searchWidget = new SearchWidget({
      formId: 'search-form',
      inputId: 'search-input',
      onSearch: (city: string) => {
        router.navigate(`/city/${encodeURIComponent(city)}`);
      },
    });
  } catch (error) {
    console.error('Failed to initialize SearchWidget:', error);
    return;
  }

  const weatherWidget = new CurrentWeatherWidget({
    cityName: cityNameEl,
    temp: currentTempEl,
    feelsLike: feelsLikeEl,
    humidity: humidityEl,
    wind: windSpeedEl,
  });



  // загрузка погоды
  async function loadWeatherForCity(city: string): Promise<void> {
    try {
      const data = await weatherService.getCurrentWeatherByCity(city);
      weatherWidget.update(data);
      storageService.saveLastCity(city);
    } catch (error: unknown) {
      if (error instanceof Error) {
        weatherWidget.showError(error.message);
      } else {
        weatherWidget.showError("Unknown error occurred");
      }
    }
  }

  // Функция загрузки погоды по координатам (для геолокации)
  async function loadWeatherForCoords(lat: number, lon: number): Promise<void> {
    try {
      const data = await weatherService.getCurrentWeatherByCoords(lat, lon);
      weatherWidget.update(data);
      storageService.saveLastCity(data.name);
      // После успешной загрузки обновляем URL на название города
      //window.location.hash = `/city/${encodeURIComponent(data.name)}`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        weatherWidget.showError(error.message);
      } else {
        weatherWidget.showError("Unknown error occurred");
      }
    }
  }

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
    const lastCity = storageService.getLastCity();
    if (lastCity) {
      //window.location.hash = `/city/${encodeURIComponent(lastCity)}`;
      loadWeatherForCity(lastCity);
    } else {
      try {
        const { lat, lon } = await locationService.getCurrentPosition();
        await loadWeatherForCoords(lat, lon);
      } catch (error) {
        console.warn("Geolocation failed:", error);
        weatherWidget.showError("Could not get your location. Please search for a city.");
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}




