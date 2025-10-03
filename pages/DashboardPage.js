// @ts-check
const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    
    // Locators for dashboard elements
    this.reportCentreLink = page.locator('text=Report Centre');
    this.clickArrowButton = page.locator("(//img[@role='button' and contains(@src,'ClickArrow.svg')])[2]");
  }

  // Click on Report Centre
  async clickReportCentre() {
    await this.reportCentreLink.click();
    console.log('Clicked on Report Centre');
  }

  // Click on the arrow button
  async clickArrow() {
    await this.clickArrowButton.click();
    console.log('Clicked on arrow button');
  }

  // Verify Report Centre is visible
  async verifyReportCentreVisible() {
    await expect(this.reportCentreLink).toBeVisible();
    console.log('Report Centre is visible');
  }

  // Verify arrow button is visible
  async verifyArrowButtonVisible() {
    await expect(this.clickArrowButton).toBeVisible();
    console.log('Arrow button is visible');
  }
}

module.exports = { DashboardPage };
