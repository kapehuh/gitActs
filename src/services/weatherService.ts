interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const API_KEY = "85b882b62fd1ca76d52cf910a69a5296"; // .env
const BASE_URL = "https://api.openweathermap.org/data/2.5";

class WeatherService {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeatherByCity(city: string): Promise<OpenWeatherResponse> {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather fetch failed: ${response.statusText}`);
    }
    const data = await response.json();
    return this._transformCurrentWeather(data);
  }

  async getCurrentWeatherByCoords(
    lat: number,
    lon: number,
  ): Promise<OpenWeatherResponse> {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather fetch failed: ${response.statusText}`);
    }
    const data = await response.json();
    return this._transformCurrentWeather(data);
  }

  _transformCurrentWeather(data: OpenWeatherResponse): OpenWeatherResponse {
    return {
      name: data.name,
      main: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
      },
      wind: {
        speed: data.wind.speed,
      },
    };
  }
}

export default WeatherService;
