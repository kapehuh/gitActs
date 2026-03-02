class CurrentWeatherWidget {
  constructor(elements) {
    this.cityNameEl = elements.cityName;
    this.tempEl = elements.temp;
    this.feelsLikeEl = elements.feelsLike;
    this.humidityEl = elements.humidity;
    this.windEl = elements.wind;
  }

  update(weatherData) {
    this.cityNameEl.textContent = weatherData.name || "Unknown";
    this.tempEl.textContent = Math.round(weatherData.main.temp);
    this.feelsLikeEl.textContent = Math.round(weatherData.main.feels_like);
    this.humidityEl.textContent = weatherData.main.humidity;
    const windSpeedKmh = weatherData.wind.speed;
    this.windEl.textContent = windSpeedKmh;
  }

  showError(message) {
    this.cityNameEl.textContent = "Error";
    console.error(message);
  }
}

export default CurrentWeatherWidget;
