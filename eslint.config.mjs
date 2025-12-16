import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Example overrides for TypeScript ESLint rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],
    },
  },
  {
    // Playwright test files configuration
    files: ['tests/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Example overrides for Playwright ESLint rules
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-focused-test': 'error',
      'playwright/expect-expect': [
        'warn',
        {
          assertFunctionNames: ['expect', 'expectToContain'],
        },
      ],
      'playwright/max-nested-describe': [
        'warn',
        {
          max: 3,
        },
      ],
      'playwright/no-conditional-expect': 'error',
      'playwright/prefer-web-first-assertions': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
      // Disable some TypeScript rules for test files if needed
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage', '*.config.js'],
  },
];
