test("should clear cityInput.value after handleCitySearch", () => {
  const mockCityInput = { value: "Москва" };
  const mockHandleCitySearch = jest.fn();

  const testHandleFormSubmit = (event) => {
    event.preventDefault();
    const city = mockCityInput.value.trim();

    if (city) {
      mockHandleCitySearch(city);
      mockCityInput.value = "";
    }
  };

  testHandleFormSubmit({ preventDefault: jest.fn() });

  expect(mockCityInput.value).toBe("");
  expect(mockHandleCitySearch).toHaveBeenCalledWith("Москва");
});
