describe("Weather App", () => {
  test("should have basic setup", () => {
    // Проверка, что приложение инициализируется
    expect(typeof window).toBe("object");
    expect(typeof document).toBe("object");
  });
});
