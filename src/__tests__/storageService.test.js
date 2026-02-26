import storageService from "../services/storageService";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saveLastCity stores city in localStorage", () => {
    storageService.saveLastCity("Moscow");
    expect(localStorage.getItem("lastCity")).toBe("Moscow");
  });

  test("getLastCity retrieves city", () => {
    localStorage.setItem("lastCity", "Paris");
    expect(storageService.getLastCity()).toBe("Paris");
  });

  test("clearLastCity removes city", () => {
    localStorage.setItem("lastCity", "London");
    storageService.clearLastCity();
    expect(localStorage.getItem("lastCity")).toBeNull();
  });

  test("saveLastCity does nothing if city is empty", () => {
    storageService.saveLastCity("");
    expect(localStorage.getItem("lastCity")).toBeNull();
    storageService.saveLastCity(null);
    expect(localStorage.getItem("lastCity")).toBeNull();
  });
});
