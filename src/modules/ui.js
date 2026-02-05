// ==============================================================================================================
/**
 * Обновляет все элементы интерфейса данными о погоде
 * @param {object} data - Данные о погоде
 */
export function updateUI(weatherData) {
  //console.log('Структура данных:', weatherData);
  //console.log('Все ключи:', Object.keys(weatherData));

  //const currentTemp = weatherData.fact?.temp;
  //console.log(currentTemp);

  //exploreObject(weatherData);

  document.getElementById("city-name").textContent =
    weatherData.info?.tzinfo?.name;
  document.getElementById("current-temp").textContent = Math.round(
    weatherData.fact?.temp,
  );
  document.getElementById("feels-like").textContent = Math.round(
    weatherData.fact?.feels_like,
  );
  document.getElementById("humidity").textContent = Math.round(
    weatherData.fact?.humidity,
  );
  document.getElementById("wind-speed").textContent = Math.round(
    weatherData.fact?.wind_speed,
  );
}

/**
 * Показывает сообщение об ошибке
 * @param {string} message - Текст ошибки
 */
export function showError(message) {
  alert(`Error: ${message}`); // Временное решение
  console.error("[UI] Error:", message);
  // TODO: Реализовать красивый вывод ошибок в интерфейсе
}

/**
 * Конвертирует температуру из Кельвинов в Цельсии
 * @param {number} frgh - Температура в Кельвинах
 * @returns {number} Температура в Цельсиях
 */
export function frhgToCelsius(frgh) {
  return (frgh - 32) / 1.8;
}

// function exploreObject(obj, indent = '') {
//     for (let key in obj) {
//         console.log(indent + key + ':', typeof obj[key]);
//         if (typeof obj[key] === 'object' && obj[key] !== null) {
//             exploreObject(obj[key], indent + '  ');
//         }
//     }
// }
