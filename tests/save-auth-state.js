const { chromium } = require('@playwright/test');
const { testData } = require('../config/test-data');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://aurum-test.alchelyst.com');
  await page.locator('[id="379.Portal.Login_Page.loginIdTextBox2"]').fill(testData.login.username);
  await page.locator('[id="379.Portal.Login_Page.passwordTextBox2"]').fill(testData.login.password);
  await page.locator('[id="mxui_widget_LoginButton_0"]').click();
  await page.waitForTimeout(3000);
  await page.context().storageState({ path: 'auth-state.json' });
  await browser.close();
})();