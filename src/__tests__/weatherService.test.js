import weatherService from "../services/weatherService";

// Мок глобального fetch
global.fetch = jest.fn();

describe("WeatherService", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("getCurrentWeatherByCity returns transformed data on success", async () => {
    const mockApiResponse = {
      name: "London",
      main: { temp: 15, feels_like: 14, humidity: 80 },
      wind: { speed: 3.5 },
      weather: [{ description: "clouds" }],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await weatherService.getCurrentWeatherByCity("London");
    expect(result).toEqual({
      name: "London",
      main: { temp: 15, feels_like: 14, humidity: 80 },
      wind: { speed: 3.5 },
      weather: mockApiResponse.weather[0],
    });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("q=London"));
  });

  test("getCurrentWeatherByCity throws error on failed response", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "city not found" }),
    });

    await expect(
      weatherService.getCurrentWeatherByCity("Unknown"),
    ).rejects.toThrow("city not found");
  });

  test("throws error with message from API on failed response", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "city not found" }),
    });

    await expect(
      weatherService.getCurrentWeatherByCity("Unknown"),
    ).rejects.toThrow("city not found");
  });

  test("throws generic HTTP error when response has no message", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}), // пустой объект, без message
    });

    await expect(
      weatherService.getCurrentWeatherByCity("London"),
    ).rejects.toThrow("HTTP error 500");
  });

  test("throws error if city name is empty", async () => {
    await expect(weatherService.getCurrentWeatherByCity("")).rejects.toThrow(
      "City name is required",
    );
    await expect(weatherService.getCurrentWeatherByCity(null)).rejects.toThrow(
      "City name is required",
    );
  });

  test("throws error on network failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));
    await expect(
      weatherService.getCurrentWeatherByCity("London"),
    ).rejects.toThrow("Network error");
  });

  test("throws error if coordinates missing", async () => {
    await expect(
      weatherService.getCurrentWeatherByCoords(null, 10),
    ).rejects.toThrow("Latitude and longitude are required");
    await expect(
      weatherService.getCurrentWeatherByCoords(10, null),
    ).rejects.toThrow("Latitude and longitude are required");
  });

  test("throws error on HTTP 404 with message", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "location not found" }),
    });
    await expect(
      weatherService.getCurrentWeatherByCoords(0, 0),
    ).rejects.toThrow("location not found");
  });
});
