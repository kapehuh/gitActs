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
});
