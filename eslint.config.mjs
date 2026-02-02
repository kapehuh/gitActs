import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: { ...globals.browser },
    },
    rules: {
      "no-console": "warn",
      "no-console": ["warn", { allow: ["warn", "error", "debug"] }],
    },
    rules: { "no-unused-vars": "off" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  prettierConfig,
]);
