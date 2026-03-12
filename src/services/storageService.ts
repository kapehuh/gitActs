const storageService = {
  saveLastCity(city: string): void {
    localStorage.setItem("lastCity", city);
  },

  getLastCity(): string | null {
    return localStorage.getItem("lastCity");
  },
};

export default storageService;
