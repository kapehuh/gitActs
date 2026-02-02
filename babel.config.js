module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // Использует версию Node.js, на которой запущен Jest
        },
      },
    ],
  ],
};
