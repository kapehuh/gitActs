import { WeatherData } from "../types/weather";

interface CurrentWeatherWidgetElements {
  cityName: HTMLElement;
  temp: HTMLElement;
  feelsLike: HTMLElement;
  humidity: HTMLElement;
  wind: HTMLElement;
}

class CurrentWeatherWidget {
  private cityNameEl: HTMLElement;
  private tempEl: HTMLElement;
  private feelsLikeEl: HTMLElement;
  private humidityEl: HTMLElement;
  private windEl: HTMLElement;

  constructor(elements: CurrentWeatherWidgetElements) {
    this.cityNameEl = elements.cityName;
    this.tempEl = elements.temp;
    this.feelsLikeEl = elements.feelsLike;
    this.humidityEl = elements.humidity;
    this.windEl = elements.wind;
  }

  update(weatherData: WeatherData): void {
    this.cityNameEl.textContent = weatherData.name || "Unknown";
    this.tempEl.textContent = Math.round(weatherData.main.temp).toString();
    this.feelsLikeEl.textContent = Math.round(
      weatherData.main.feels_like,
    ).toString();
    this.humidityEl.textContent = weatherData.main.humidity.toString();
    const windSpeedKmh = weatherData.wind.speed;
    this.windEl.textContent = windSpeedKmh.toString();
  }

  showError(message: string): void {
    this.cityNameEl.textContent = "Error";
    this.tempEl.textContent = "--";
    this.feelsLikeEl.textContent = "--";
    this.humidityEl.textContent = "--";
    this.windEl.textContent = "--";
    console.error(message);
  }
}

export default CurrentWeatherWidget;
