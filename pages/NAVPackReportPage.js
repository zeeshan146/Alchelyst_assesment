// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for NAV Pack Report
 */
class NAVPackReportPage {
  constructor(page) {
    this.page = page;
    
    // Navigation elements
    this.arrowButton = page.locator("(//img[@role='button' and contains(@src,'ClickArrow.svg')])[2]");
    this.liveReportsTab = page.locator("//a[@role='tab' and normalize-space(text())='Live Reports']");
    this.accountingSection = page.locator("//span[contains(@class,'widget-tree-node-branch-header-clickable') and .//span[text()='Accounting']]");
    this.navPackReportLink = page.locator("//span[text()='NAV Pack Report']");
    
    // Report page elements
    this.reportTitle = page.locator("//h5[contains(@class,'mx-name-text2') and normalize-space(text())='NAV Pack Report']");
    // Form fields (using more specific selectors to avoid hidden elements)
    this.clientField = page.locator('label:has-text("Client"), div:has-text("Client")').first();
    this.dateModeField = page.locator('label:has-text("Date Mode"), div:has-text("Date Mode")').first();
    this.asAtDateField = page.locator('label:has-text("As at Date"), div:has-text("As at Date")').first();
    this.glProfileCodeField = page.locator('label:has-text("GL Profile Code"), div:has-text("GL Profile Code")').first();
    this.glProfileValue = page.locator('text=AlchelystGLStrategy').first();
    this.effectiveStartDateField = page.locator('label:has-text("Effective Start Date"), div:has-text("Effective Start")').first();
    this.effectiveEndDateField = page.locator('label:has-text("Effective End Date"), div:has-text("Effective End")').first();
    
    // Buttons
    this.viewReportButton = page.locator("//button[normalize-space()='View Report']");

    ////*[@id="id_qdf_20-p1"]/div/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/button
    
    // Form inputs
    this.clientDropdown = page.locator('select, .mx-referenceselector').first();
    this.dateModeDropdown = page.locator('select').first();
    this.dateInputs = page.locator('input[type="text"]');
    
    // Report container
    this.reportContainer = page.locator('.mx-dataview, [class*="report"], table, form');
  }

  // Navigate to NAV Pack Report from logged-in state
  async navigateToReport() {
    await this.arrowButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.arrowButton.click();
    await this.page.waitForTimeout(3000);
    
    await this.liveReportsTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.liveReportsTab.click();
    await this.page.waitForTimeout(3000);
    
    await this.accountingSection.waitFor({ state: 'visible', timeout: 10000 });
    await this.accountingSection.click();
    await this.page.waitForTimeout(2000);
    
    await this.navPackReportLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.navPackReportLink.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify report title is visible
  async verifyReportTitleVisible() {
    await expect(this.reportTitle).toBeVisible({ timeout: 10000 });
  }

  // Verify report title text
  async verifyReportTitleText() {
    const titleText = await this.reportTitle.textContent();
    expect(titleText).toBe('NAV Pack Report');
  }

  // Verify all form fields are visible
  async verifyAllFieldsVisible() {
    await expect(this.clientField).toBeVisible({ timeout: 5000 });
    await expect(this.dateModeField).toBeVisible({ timeout: 5000 });
    await expect(this.asAtDateField).toBeVisible({ timeout: 5000 });
    await expect(this.glProfileCodeField).toBeVisible({ timeout: 5000 });
    await expect(this.effectiveStartDateField).toBeVisible({ timeout: 5000 });
    await expect(this.effectiveEndDateField).toBeVisible({ timeout: 5000 });
  }

  // Verify View Report button is visible and enabled
  async verifyViewReportButton() {
    await expect(this.viewReportButton).toBeVisible({ timeout: 5000 });
    await expect(this.viewReportButton).toBeEnabled();
  }

  // Verify report data is loaded
  async verifyReportDataLoaded() {
    const containerCount = await this.reportContainer.count();
    expect(containerCount).toBeGreaterThan(0);
  }

  // Click View Report button
  async clickViewReport() {
    await this.viewReportButton.click();
  }

  // Select client from dropdown
  async selectClient(clientName) {
    await this.clientDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const clientOption = this.page.locator(`text=${clientName}, option:has-text("${clientName}")`).first();
    await clientOption.click();
    await this.page.waitForTimeout(1000);
  }

  // Select Date Mode
  async selectDateMode(mode) {
    await this.dateModeDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const modeOption = this.page.locator(`option:has-text("${mode}")`).first();
    await modeOption.click();
    await this.page.waitForTimeout(1000);
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

  // Verify GL Profile Code is disabled
  async verifyGLProfileDisabled() {
    const glInput = this.page.locator('input, select').nth(3);
    const isDisabled = await glInput.isDisabled().catch(() => false);
    const isReadOnly = await glInput.getAttribute('readonly').catch(() => null);
    
    expect(isDisabled || isReadOnly !== null).toBeTruthy();
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

module.exports = { NAVPackReportPage };

