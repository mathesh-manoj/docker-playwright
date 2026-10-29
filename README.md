# SauceDemo E2E Tests

Playwright + TypeScript end-to-end tests for https://www.saucedemo.com, built with the Page Object Model.

## Project structure

```
.
├── .github/workflows/playwright.yml   CI pipeline
├── src/
│   ├── config/env.ts                  environment configuration
│   ├── data/                          test data (products, checkout details)
│   ├── fixtures/index.ts              Playwright fixtures (page objects, logged-in state)
│   └── pages/                         page objects
│       ├── BasePage.ts
│       ├── LoginPage.ts / InventoryPage.ts / CartPage.ts / CheckoutPage.ts
│       └── components/Header.ts       shared header and menu
├── tests/                             specs grouped by feature
│   ├── auth/  inventory/  cart/  checkout/
├── Dockerfile / docker-compose.yml
├── playwright.config.ts
└── .env.example
```

## Setup

```bash
npm ci
npx playwright install chromium
cp .env.example .env     # then set SAUCE_PASSWORD
```

Tests that need to sign in are skipped automatically when `SAUCE_PASSWORD` is empty.
Credentials are never stored in the code or the Docker image.

## Run

| Command               | Purpose               |
| --------------------- | --------------------- |
| `npm test`            | all tests             |
| `npm run test:smoke`  | tests tagged `@smoke` |
| `npm run test:headed` | watch in a browser    |
| `npm run test:ui`     | Playwright UI mode    |
| `npm run typecheck`   | TypeScript check      |
| `npm run format`      | format code           |
| `npm run report`      | open the HTML report  |

## Docker

```bash
docker build -t saucedemo-tests .
docker run --rm -e SAUCE_PASSWORD=<password> saucedemo-tests
# or
docker compose up --build
```

## CI

GitHub Actions runs type check, format check and the tests on every push and pull request to `main`.
Add the repository secret `SAUCE_PASSWORD` (Settings > Secrets and variables > Actions) so the
authenticated tests run. The HTML report is uploaded as a build artifact.

## Conventions

- Selectors live only in page objects; specs contain actions and assertions.
- Test titles start with the test case ID (for example `TC-LOGIN-002`) from the test case workbook.
- Tag key flows `@smoke`.
