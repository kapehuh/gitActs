// src/services/weatherService.js

const API_KEY = "ваш_ключ_OpenWeatherMap"; // лучше через .env
const BASE_URL = "https://api.openweathermap.org/data/2.5";

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Получение текущей погоды по названию города
   * @param {string} city - название города
   * @returns {Promise<object>} - данные погоды
   */
  async getCurrentWeatherByCity(city) {
    if (!city) throw new Error("City name is required");

    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${this.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return this._transformCurrentWeather(data);
  }

  /**
   * Получение текущей погоды по координатам
   * @param {number} lat - широта
   * @param {number} lon - долгота
   * @returns {Promise<object>} - данные погоды
   */
  async getCurrentWeatherByCoords(lat, lon) {
    if (!lat || !lon) throw new Error("Latitude and longitude are required");

    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return this._transformCurrentWeather(data);
  }

  /**
   * Приведение ответа OpenWeatherMap к единому формату, ожидаемому UI
   * @private
   */
  _transformCurrentWeather(data) {
    return {
      name: data.name,
      main: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
      },
      wind: {
        speed: data.wind.speed, // уже в м/с, но можно преобразовать в км/ч *3.6
      },
      weather: data.weather[0],
    };
  }
}

// Экспортируем экземпляр с ключом (ключ лучше брать из process.env)
export default new WeatherService(API_KEY);
