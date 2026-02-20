import locationService from "../services/locationService";

describe("LocationService", () => {
  let geolocationMock;

  beforeEach(() => {
    geolocationMock = {
      getCurrentPosition: jest.fn(),
    };
    global.navigator.geolocation = geolocationMock;
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
    geolocationMock.getCurrentPosition.mockImplementation((_, error) =>
      error({ code: 1 }),
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
