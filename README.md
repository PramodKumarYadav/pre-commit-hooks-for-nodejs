# pre-commit-hooks-for-nodejs

A sandbox repository to test pre-commit hooks with Node.js, TypeScript, and Playwright.

## Features

- **Latest Node.js and TypeScript**: Uses the latest versions for modern JavaScript/TypeScript development
- **Git Hooks with Husky**: Automated pre-commit hooks for code quality
- **Lint-staged**: Runs linters and formatters only on staged files for faster commits
- **Prettier**: Automatic code formatting
- **ESLint**: TypeScript linting with custom rule overrides
- **Playwright**: End-to-end testing framework
- **Playwright ESLint Plugin**: Linting rules specific to Playwright tests

## Pre-commit Workflow

When you commit code, the following happens automatically:

1. **Formatting**: Prettier formats all staged TypeScript, JavaScript, JSON, and Markdown files
2. **Linting**: ESLint checks staged TypeScript files for code quality issues

> **Note**: Running tests on pre-commit is optional. You can add `"bash -c 'npm test'"` to the `*.{ts,tsx}` array in `.lintstagedrc.json` if you want to run tests before each commit. However, this will slow down commits, so it's recommended to run tests separately or in CI/CD pipelines.

## Setup

### Prerequisites

- Node.js v20 or higher
- npm v10 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/PramodKumarYadav/pre-commit-hooks-for-nodejs.git
cd pre-commit-hooks-for-nodejs

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium --with-deps
```

### Post-Installation

After running `npm install`, Husky will automatically set up the git hooks via the `prepare` script.

## Project Structure

```
.
├── src/                    # TypeScript source files
│   ├── calculator.ts       # Example calculator class
│   ├── userService.ts      # Example user service
│   └── index.ts            # Main entry point
├── tests/                  # Playwright test files
│   ├── example.spec.ts     # Example web tests
│   └── calculator.spec.ts  # Example calculator tests
├── .husky/                 # Husky git hooks
│   └── pre-commit          # Pre-commit hook script
├── eslint.config.mjs       # ESLint configuration
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── .prettierrc             # Prettier configuration
├── .lintstagedrc.json      # Lint-staged configuration
└── package.json            # Project dependencies and scripts
```

## Configuration Details

### ESLint Configuration

The ESLint configuration includes custom rule overrides for both TypeScript and Playwright:

**TypeScript ESLint Rules:**

- `@typescript-eslint/no-unused-vars`: Error with ignore patterns for variables starting with `_`
- `@typescript-eslint/explicit-function-return-type`: Warning with exceptions for expressions
- `@typescript-eslint/no-explicit-any`: Warning
- `@typescript-eslint/consistent-type-imports`: Enforces type-only imports
- `@typescript-eslint/naming-convention`: Enforces PascalCase for interfaces without `I` prefix

**Playwright ESLint Rules:**

- `playwright/no-conditional-in-test`: Warning
- `playwright/no-skipped-test`: Warning
- `playwright/no-focused-test`: Error (prevents `test.only` in commits)
- `playwright/expect-expect`: Warning with custom assertion function names
- `playwright/max-nested-describe`: Warning (max 3 levels)
- `playwright/no-conditional-expect`: Error
- `playwright/prefer-web-first-assertions`: Warning
- `playwright/no-wait-for-timeout`: Warning

### Lint-staged Configuration

Only staged files are processed:

- `.ts` and `.tsx` files: Prettier → ESLint
- `.js`, `.json`, `.md` files: Prettier only

**Optional: Running tests on pre-commit**

If you want to run tests before each commit, you can modify `.lintstagedrc.json`:

```json
{
  "*.{ts,tsx}": ["prettier --write", "eslint --fix", "bash -c 'npm test'"]
}
```

Note: This will slow down commits. Consider running tests in CI/CD instead.

## Available Scripts

```bash
# Run all Playwright tests
npm test

# Run only changed Playwright tests
npm run test:changed

# Lint all TypeScript files
npm run lint

# Lint and fix all TypeScript files
npm run lint:fix

# Format all files
npm run format

# Check formatting without making changes
npm run format:check

# Type-check TypeScript files
npm run typecheck
```

## Development Workflow

1. **Make changes** to your TypeScript files in `src/` or test files in `tests/`
2. **Stage your changes** with `git add`
3. **Commit your changes** with `git commit`
   - Husky will automatically run the pre-commit hook
   - Prettier will format your code
   - ESLint will check for issues
   - Playwright will run changed tests
4. If all checks pass, your commit will complete successfully

### Example Commit Flow

```bash
# Edit some files
vim src/calculator.ts
vim tests/calculator.spec.ts

# Stage the changes
git add src/calculator.ts tests/calculator.spec.ts

# Commit (triggers pre-commit hook)
git commit -m "Add new calculator method"

# Pre-commit hook runs:
# ✓ Prettier formats the files
# ✓ ESLint checks the files
# ✓ Playwright runs changed tests
# ✓ Commit succeeds
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

### Run Specific Test File

```bash
npx playwright test tests/example.spec.ts
```

### View Test Report

```bash
npx playwright show-report
```

## Linting and Formatting

### Check Code Style

```bash
npm run lint
npm run format:check
```

### Fix Issues Automatically

```bash
npm run lint:fix
npm run format
```

## Troubleshooting

### Pre-commit Hook Not Running

If the pre-commit hook doesn't run:

```bash
# Reinstall Husky
npm run prepare
```

### Playwright Browser Issues

If Playwright tests fail due to missing browsers:

```bash
# Install all browsers
npx playwright install --with-deps

# Or install specific browser
npx playwright install chromium --with-deps
```

### ESLint Errors

If you encounter ESLint errors:

1. Check the error message and fix the issue manually
2. Or run `npm run lint:fix` to auto-fix issues
3. Some rules may need to be adjusted in `eslint.config.mjs`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Commit your changes (pre-commit hooks will run automatically)
6. Push to your fork
7. Create a Pull Request

## License

ISC
