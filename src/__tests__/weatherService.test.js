import WeatherService from "../services/weatherService";

// Мок глобального fetch
global.fetch = jest.fn();

describe("WeatherService", () => {
  let weatherService;
  const fakeApiKey = "85b882b62fd1ca76d52cf910a69a5296";

  beforeEach(() => {
    weatherService = new WeatherService(fakeApiKey);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getCurrentWeatherByCity returns transformed data on success", async () => {
    const mockApiResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        name: "London",
        main: { temp: 15, feels_like: 14, humidity: 80 },
        wind: { speed: 5 },
      }),
    };
    fetch.mockResolvedValue(mockApiResponse);

    const result = await weatherService.getCurrentWeatherByCity("London");
    expect(result).toEqual({
      name: "London",
      main: { temp: 15, feels_like: 14, humidity: 80 },
      wind: { speed: 5 },
    });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`q=London`));
  });

  test("getCurrentWeatherByCity throws error on failed response", async () => {
    const mockResponse = {
      ok: false,
      statusText: "city not found",
    };
    fetch.mockResolvedValue(mockResponse);

    await expect(
      weatherService.getCurrentWeatherByCity("Unknown"),
    ).rejects.toThrow("city not found");
  });
});
