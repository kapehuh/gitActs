/**
 * Преобразует сырые данные прогноза API в удобный формат для UI
 * @param {object} forecastData - Ответ от endpoint /forecast.
 * @returns {Array} Массив объектов прогноза на 5 дней.
 */
export function processForecastData(forecastData) {
  // API возвращает прогноз с интервалом 3 часа на 5 дней (40 записей).
  // Нам нужно по одной записи на день (например, на 12:00).
  const dailyForecast = [];
  const seenDays = new Set();

  for (const item of forecastData.list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString(); // Уникальный ключ дня

    // Берем запись, которая примерно в середине дня (12:00-15:00)
    if (
      !seenDays.has(dayKey) &&
      date.getHours() >= 12 &&
      date.getHours() <= 15
    ) {
      dailyForecast.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }), // 'Mon', 'Tue'
        temp: item.main.temp,
      });
      seenDays.add(dayKey);
    }
    if (dailyForecast.length >= 5) break; // Нужно 5 дней
  }
  return dailyForecast;
}
