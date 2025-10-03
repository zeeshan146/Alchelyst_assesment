# Alchelyst Playwright Test Suite

This is a Playwright test automation project set up for assessment purposes.

## Project Structure

```
alchelyst/
├── tests/                 # Test files
│   ├── example.spec.js    # Basic example tests
│   └── assessment.spec.js # Assessment-specific tests
├── utils/                 # Helper functions
│   └── test-helpers.js    # Common test utilities
├── playwright.config.js   # Playwright configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

- Run all tests: `npm test`
- Run tests in headed mode: `npm run test:headed`
- Run tests with UI: `npm run test:ui`
- Debug tests: `npm run test:debug`
- View test report: `npm run test:report`

## Test Files

- `example.spec.js`: Basic Playwright examples
- `assessment.spec.js`: Assessment-specific test scenarios including:
  - Navigation tests
  - Form interaction tests
  - API testing examples

## Helper Functions

The `utils/test-helpers.js` file contains reusable functions:
- `waitForElement()`: Wait for elements to be visible
- `takeScreenshot()`: Take timestamped screenshots
- `fillForm()`: Fill forms with data objects
- `waitForNetworkIdle()`: Wait for network activity to settle
- `generateTestData()`: Generate random test data

## Configuration

The `playwright.config.js` file is configured to:
- Run tests in parallel
- Support multiple browsers (Chrome, Firefox, Safari)
- Generate HTML reports
- Include trace collection for debugging
