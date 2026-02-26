module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/**/index.js",
    "!src/modules/ui.js",
  ],
  coverageThreshold: {
    global: {
      lines: 60,
      functions: 60,
      branches: 50,
    },
    "./src/core/eventEmitter.js": {
      lines: 70,
      functions: 70,
      branches: 70,
    },
  },
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
