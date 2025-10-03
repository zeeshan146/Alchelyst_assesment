// @ts-check
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Flexible locators
    this.usernameField = page.locator('input[type="text"]').first();
    this.passwordField = page.locator('input[type="password"]').first();
    this.loginButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
  }

  // Navigate to login page
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    console.log('Successfully navigated to login page');
  }

  // Fill username
  async fillUsername(username) {
    await this.usernameField.waitFor({ state: 'visible', timeout: 30000 });
    await this.usernameField.fill(username);
    console.log(`Filled username: ${username}`);
  }

  // Fill password
  async fillPassword(password) {
    await this.passwordField.waitFor({ state: 'visible', timeout: 30000 });
    await this.passwordField.fill(password);
    console.log(`Filled password: ${password}`);
  }

  // Click login button
  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.loginButton.click();
    console.log('Clicked login button');
  }

  // Complete login process
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.page.waitForTimeout(3000);
    console.log('Login completed');
  }
}

module.exports = { LoginPage };
