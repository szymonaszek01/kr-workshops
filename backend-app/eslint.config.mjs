import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "n/no-missing-import": "error", // Prevent missing imports
      "n/no-deprecated-api": "warn", // Warn about deprecated APIs
      "n/no-unpublished-require": "error", // Avoid using dependencies not in `package.json`
      "no-console": "off", // Allow `console.log` (useful in Node.js apps)
      strict: ["error", "global"], // Enforce global strict mode
    },
  },
];
