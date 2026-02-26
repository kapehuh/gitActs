import EventEmitter from "../core/eventEmitter";
import CurrentWeatherWidget from "../components/CurrentWeatherWidget";

describe("CurrentWeatherWidget", () => {
  let eventBus;
  let elements;

  beforeEach(() => {
    eventBus = new EventEmitter();
    document.body.innerHTML = `
      <span id="city-name"></span>
      <span id="current-temp"></span>
      <span id="feels-like"></span>
      <span id="humidity"></span>
      <span id="wind-speed"></span>
    `;
    elements = {
      cityName: document.getElementById("city-name"),
      temp: document.getElementById("current-temp"),
      feelsLike: document.getElementById("feels-like"),
      humidity: document.getElementById("humidity"),
      wind: document.getElementById("wind-speed"),
    };
    new CurrentWeatherWidget(eventBus, elements); // widget сам подпишется
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("updates UI on weather:loaded", () => {
    const data = {
      name: "London",
      main: { temp: 15, feels_like: 13, humidity: 80 },
      wind: { speed: 3.5 },
    };
    eventBus.emit("weather:loaded", data);
    expect(elements.cityName.textContent).toBe("London");
    expect(elements.temp.textContent).toBe("15");
    expect(elements.feelsLike.textContent).toBe("13");
    expect(elements.humidity.textContent).toBe("80");
    expect(elements.wind.textContent).toBe("3.5");
  });

  test("shows error on weather:error", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    eventBus.emit("weather:error", "City not found");
    expect(elements.cityName.textContent).toBe("Error");
    expect(consoleSpy).toHaveBeenCalledWith("City not found");
    consoleSpy.mockRestore();
  });
});
