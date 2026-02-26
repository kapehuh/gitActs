class CurrentWeatherWidget {
  constructor(eventBus, elements) {
    this.eventBus = eventBus;
    this.cityNameEl = elements.cityName;
    this.tempEl = elements.temp;
    this.feelsLikeEl = elements.feelsLike;
    this.humidityEl = elements.humidity;
    this.windEl = elements.wind;
    this.init();
  }

  init() {
    this.eventBus.on("weather:loaded", this.update.bind(this));
    this.eventBus.on("weather:error", this.showError.bind(this));
  }

  update(weatherData) {
    this.cityNameEl.textContent = weatherData.name || "Unknown";
    this.tempEl.textContent = Math.round(weatherData.main.temp);
    this.feelsLikeEl.textContent = Math.round(weatherData.main.feels_like);
    this.humidityEl.textContent = weatherData.main.humidity;
    //const windSpeedKmh = (weatherData.wind.speed * 3.6).toFixed(1);
    this.windEl.textContent = weatherData.wind.speed;
  }

  showError(message) {
    this.cityNameEl.textContent = "Error";
    console.error(message);
  }
}

export default CurrentWeatherWidget;
