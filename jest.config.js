module.exports = {
  // Указываем Jest использовать Babel для транспиляции JS
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  // Заглушаем (игнорируем) определённые типы файлов
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  // Если нужно тестировать код для браузера, а не Node.js
  testEnvironment: "jsdom",
};
