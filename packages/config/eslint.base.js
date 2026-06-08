/* eslint-env node */
/**
 * Base ESLint config shared across the Horttifruti monorepo.
 * Each package/app extends this and may add framework-specific overrides.
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: false,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  ignorePatterns: ["dist/**", "node_modules/**", ".turbo/**", "*.config.js"],
};
