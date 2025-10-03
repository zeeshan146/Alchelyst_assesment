# Alchelyst Playwright Test Suite

This is a comprehensive Playwright test automation project for the Alchelyst assessment. It includes robust test automation for Live Reports functionality including NAV Pack Report and Trial Balance Report.

## Project Structure

```
alchelyst/
├── tests/                           # Test files
│   ├── assessment-short.spec.js     # Main test suite (18 scenarios)
│   ├── assessment.spec.js.backup    # Original test backup
│   ├── save-auth-state.js          # Authentication helper
│   └── *.backup                    # Backup test files
├── pages/                          # Page Object Model
│   ├── LoginPage.js                # Login page interactions
│   ├── NAVPackReportPage.js        # NAV Pack Report page
│   ├── TrialBalancePage.js         # Trial Balance page
│   └── DashboardPage.js            # Dashboard page
├── config/                         # Configuration files
│   ├── environment.js              # Environment settings
│   └── test-data.js                # Test data configuration
├── utils/                          # Helper functions
│   └── test-helpers.js             # Common test utilities
├── downloads/                      # Exported reports (gitignored)
├── screenshots/                    # Test screenshots (gitignored)
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## Features

- **Complete Test Coverage**: 18 comprehensive test scenarios
- **Page Object Model**: Organized, reusable page classes
- **Professional Code**: Clean, maintainable, production-ready
- **Robust Waits**: Smart waiting mechanisms for stability
- **Data Validation**: Comprehensive data integrity checks
- **Export Functionality**: Excel file export and validation
- **Error Handling**: Comprehensive error handling and reporting

## Test Scenarios

### NAV Pack Report Tests (Scenarios 1-8)
1. Basic page validation and navigation
2. Client selection functionality
3. Fund selection functionality
4. Date mode selection
5. Date entry functionality
6. Error handling for no client selected
7. Complete end-to-end workflow
8. Data validation and integrity

### Trial Balance Tests (Scenarios 9-15)
9. Navigation and access verification
10. Complete end-to-end flow
11. Data loading and display
12. Fund selection functionality
13. Live Reports tab access
14. Accounting section expansion
15. Arrow button navigation

### Utility Tests (Scenarios 16-18)
16. Page refresh functionality
17. Excel file validation
18. Export functionality and stability

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

### Run All Tests
```bash
npx playwright test tests/assessment-short.spec.js
```

### Run in UI Mode (for demonstrations)
```bash
npx playwright test tests/assessment-short.spec.js --ui
```

### Run in Headless Mode (for CI/CD)
```bash
npx playwright test tests/assessment-short.spec.js --project=chromium --reporter=line
```

### Run Specific Test
```bash
npx playwright test tests/assessment-short.spec.js --grep "Scenario 9"
```

## Test Data Configuration

The test data is centralized in the `TEST_DATA` constant within `assessment-short.spec.js`:

```javascript
const TEST_DATA = {
  client: 'STEERHEAD',
  fund: 'Steerhead Alternative Energy Fund',
  dateMode: 'AccountingDate',
  startDate: '30APR2025',
  endDate: '30APR2025',
  url: 'https://aurum-test.alchelyst.com'
};
```

## Page Object Model

### LoginPage.js
- Handles user authentication
- Manages login state
- Provides login utility methods

### NAVPackReportPage.js
- NAV Pack Report specific interactions
- Form filling and validation
- Report generation and export

### TrialBalancePage.js
- Trial Balance Report interactions
- Navigation and data validation
- Export functionality

## Key Features

### Smart Waits
- Network idle detection
- Element visibility checks
- Custom timeout handling
- Export button detection

### Data Validation
- Row count verification
- Content presence checks
- File existence validation
- File size and extension checks

### Error Handling
- Comprehensive error messages
- Screenshot capture on failure
- Detailed logging
- Graceful failure handling

## Configuration

The `playwright.config.js` is configured for:
- Parallel test execution
- Multiple browser support
- HTML report generation
- Trace collection for debugging
- Screenshot capture on failure

## Export Functionality

Tests include comprehensive Excel file export validation:
- File existence checks
- File size validation
- File extension verification
- Download location confirmation

## Professional Standards

- Clean, readable code structure
- Comprehensive documentation
- Error handling and logging
- Maintainable architecture
- Production-ready quality
