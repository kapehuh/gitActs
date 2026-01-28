import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  { files: ["**/*.js"], languageOptions: { sourceType: "module", ecmaVersion: "latest", globals:{...globals.browser} }, rules: { "no-unused-vars": "warn", "no-console": "error" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  prettierConfig,
]);
