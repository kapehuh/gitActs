// src/services/locationService.js

class LocationService {
  /**
   * Получение текущих координат через Geolocation API
   * @param {object} options - настройки геолокации
   * @returns {Promise<{lat: number, lon: number}>}
   */
  getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          let message = "Failed to get location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "Location access denied";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "Location information unavailable";
              break;
            case error.TIMEOUT:
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
