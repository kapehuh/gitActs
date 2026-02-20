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
});
