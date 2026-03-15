import locationService from "../services/locationService";

describe("LocationService", () => {
  let geolocationMock;

  beforeEach(() => {
    jest.resetAllMocks();
    geolocationMock = {
      getCurrentPosition: jest.fn(),
    };
    Object.defineProperty(global.navigator, "geolocation", {
      value: geolocationMock,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete global.navigator.geolocation;
  });

  test("getCurrentPosition resolves with coordinates", async () => {
    const mockPosition = {
      coords: { latitude: 55.75, longitude: 37.62 },
    };
    geolocationMock.getCurrentPosition.mockImplementation((success) =>
      success(mockPosition),
    );

    const result = await locationService.getCurrentPosition();
    expect(result).toEqual({ lat: 55.75, lon: 37.62 });
  });

  test("getCurrentPosition rejects on error", async () => {
    const error = new Error("Location access denied");
    geolocationMock.getCurrentPosition.mockImplementation(
      (success, errorCallback) => {
        errorCallback(error);
      },
    );

    await expect(locationService.getCurrentPosition()).rejects.toThrow(
      "Location access denied",
    );
  });

  test("getCurrentPosition rejects if geolocation not supported", async () => {
    delete global.navigator.geolocation;
    await expect(locationService.getCurrentPosition()).rejects.toThrow(
      "Geolocation is not supported",
    );
  });
});
