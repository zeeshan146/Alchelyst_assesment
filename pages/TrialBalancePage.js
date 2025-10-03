// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for Trial Balance Report
 */
class TrialBalancePage {
  constructor(page) {
    this.page = page;
    
    // Navigation elements - SAME AS NAVPackReportPage
    this.arrowButton = page.locator("(//img[@role='button' and contains(@src,'ClickArrow.svg')])[2]");
    this.liveReportsTab = page.locator("//a[@role='tab' and normalize-space(text())='Live Reports']");
    this.accountingSection = page.locator("//span[contains(@class,'widget-tree-node-branch-header-clickable') and .//span[text()='Accounting']]");
    
    // Report page elements
    this.reportTitle = page.locator("//h5[contains(@class,'mx-name-text2') and normalize-space(text())='Trial Balance']");
    
    // Buttons
    this.viewReportButton = page.locator("//button[normalize-space()='View Report']");
    
    // Report container
    this.reportContainer = page.locator('.mx-dataview, [class*="report"], table, form');
  }

  // Navigate to Trial Balance Report from logged-in state - SAME AS NAVPackReportPage until Accounting
  async navigateToReport() {
    console.log('🔍 Looking for arrow button...');
    
    // Wait for page to be fully loaded first
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Try multiple locators for arrow button
    const arrowButtonSelectors = [
      "(//img[@role='button' and contains(@src,'ClickArrow.svg')])[2]",
      "//img[@role='button' and contains(@src,'ClickArrow.svg')]",
      "//img[contains(@src,'ClickArrow')]",
      "//img[contains(@src,'arrow')]",
      "//button[contains(@class,'arrow')]",
      "//div[contains(@class,'arrow')]"
    ];
    
    let arrowButtonFound = false;
    for (const selector of arrowButtonSelectors) {
      try {
        const button = this.page.locator(selector).first();
        await button.waitFor({ state: 'visible', timeout: 5000 });
        console.log(`✅ Arrow button found with selector: ${selector}`);
        await button.click();
        arrowButtonFound = true;
        break;
      } catch (error) {
        console.log(`❌ Arrow button not found with selector: ${selector}`);
        continue;
      }
    }
    
    if (!arrowButtonFound) {
      console.log('❌ No arrow button found with any selector');
      console.log('🔍 Current page URL:', this.page.url());
      console.log('🔍 Page title:', await this.page.title());
      
      // Take screenshot for debugging
      await this.page.screenshot({ path: 'screenshots/debug-arrow-button-not-found.png', fullPage: true });
      throw new Error('Arrow button not found - user may not be logged in or page structure changed');
    }
    
    // Smart wait - wait for Live Reports tab to be visible (up to 10 seconds)
    await this.liveReportsTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.liveReportsTab.click();
    
    // Smart wait - wait for Accounting section to be visible (up to 10 seconds)
    await this.accountingSection.waitFor({ state: 'visible', timeout: 10000 });
    await this.accountingSection.click();
    
    // Smart wait - wait for page to stabilize after accounting section click
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    console.log('✅ Navigation completed: Reports > Live Reports > Accounting');
    console.log('📋 Ready to add trial balance functionality from here...');
  }

  // Verify report title is visible
  async verifyReportTitleVisible() {
    await expect(this.reportTitle).toBeVisible({ timeout: 10000 });
  }

  // Verify report title text
  async verifyReportTitleText() {
    const titleText = await this.reportTitle.textContent();
    expect(titleText).toBe('Trial Balance');
  }

  // Verify report data is loaded
  async verifyReportDataLoaded() {
    const containerCount = await this.reportContainer.count();
    expect(containerCount).toBeGreaterThan(0);
  }

  // Verify View Report button is visible and enabled
  async verifyViewReportButton() {
    await expect(this.viewReportButton).toBeVisible({ timeout: 5000 });
    await expect(this.viewReportButton).toBeEnabled();
  }

  // Click View Report button
  async clickViewReport() {
    await this.viewReportButton.click();
  }

  // Get current URL
  async getCurrentURL() {
    return this.page.url();
  }

  // Verify URL contains expected domain
  async verifyURL() {
    const url = this.page.url();
    expect(url).toContain('https://aurum-test.alchelyst.com');
  }

  // Take screenshot
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
  }

  // Refresh page
  async refreshPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(3000);
  }

  // Verify page is not broken after refresh
  async verifyPageNotBroken() {
    const body = this.page.locator('body');
    await expect(body).toBeVisible();

    const errorText = this.page.locator('text=Error, text=404, text=500');
    const hasError = await errorText.count() > 0;
    expect(hasError).toBe(false);
  }
}

module.exports = { TrialBalancePage };