interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

class LocationService {
  /**
   * Получение текущих координат через Geolocation API
   * @param {object} options
   * @returns {Promise<{lat: number, lon: number}>}
   */
  getCurrentPosition(options: GeolocationOptions = {}): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      const defaultOptions: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
      };

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          let message = "Failed to get location";
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              message = "Location access denied";
              break;
            case 2: // POSITION_UNAVAILABLE
              message = "Location information unavailable";
              break;
            case 3: // TIMEOUT
              message = "Location request timed out";
              break;
          }
          reject(new Error(message));
        },
        { ...defaultOptions, ...options },
      );
    });
  }
}

export default new LocationService();
