/**
 * Test helper functions for Playwright tests
 */

/**
 * Wait for element to be visible and return it
 * @param {import('@playwright/test').Page} page 
 * @param {string} selector 
 * @param {number} timeout 
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function waitForElement(page, selector, timeout = 30000) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  return element;
}

/**
 * Take a screenshot with timestamp
 * @param {import('@playwright/test').Page} page 
 * @param {string} name 
 */
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ 
    path: `screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
}

/**
 * Fill form with data object
 * @param {import('@playwright/test').Page} page 
 * @param {Object} formData 
 */
async function fillForm(page, formData) {
  for (const [field, value] of Object.entries(formData)) {
    const selector = `input[name="${field}"], select[name="${field}"], textarea[name="${field}"]`;
    const element = page.locator(selector);
    
    if (await element.count() > 0) {
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      
      if (tagName === 'select') {
        await element.selectOption(value);
      } else if (tagName === 'input' && await element.getAttribute('type') === 'checkbox') {
        if (value) {
          await element.check();
        } else {
          await element.uncheck();
        }
      } else {
        await element.fill(value);
      }
    }
  }
}

/**
 * Wait for network to be idle
 * @param {import('@playwright/test').Page} page 
 * @param {number} timeout 
 */
async function waitForNetworkIdle(page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Generate random test data
 * @returns {Object}
 */
function generateTestData() {
  const timestamp = Date.now();
  return {
    email: `test${timestamp}@example.com`,
    username: `testuser${timestamp}`,
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
    phone: '555-0123'
  };
}

module.exports = {
  waitForElement,
  takeScreenshot,
  fillForm,
  waitForNetworkIdle,
  generateTestData
};
