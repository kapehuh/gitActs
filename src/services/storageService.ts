const storageService = {
  saveLastCity(city: string): void {
    localStorage.setItem("lastCity", city);
  },

  getLastCity(): string | null {
    return localStorage.getItem("lastCity");
  },
  clearLastCity(): void {
    localStorage.removeItem("lastCity");
  },
};

export default storageService;
