import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  // Override tseslint default config rules to something of your teams choice.
  // Default recommended tseslint rules are here: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/recommended.ts
  // To protect users from making mistakes of not awaiting on asyn functions, thus making tests brittle (say), "this.todoInput.click();" with missing await.
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        // Node.js globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/ban-types": "off",
    },
  },
  // Override playwright default config rules to something of your teams choice.
  // Default recommended playwright rules are here: https://www.npmjs.com/package/eslint-plugin-playwright
  {
    files: ["tests/**"],
    extends: [playwright.configs["flat/recommended"]],
    rules: {
      "playwright/expect-expect": [
        "error",
        {
          assertFunctionNames: ["assertCustomCondition"],
          assertFunctionPatterns: ["^assert.*", "^verify.*"],
        },
      ],
    },
  },
]);
