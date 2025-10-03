// Environment configuration
// You can set these as environment variables or modify directly

const environment = {
  // Login credentials - you can set these as environment variables
  username: process.env.TEST_USERNAME || 'TestUser',
  password: process.env.TEST_PASSWORD || 'Password@123',
  
  // URLs
  baseUrl: process.env.BASE_URL || 'https://aurum-test.alchelyst.com',
  
  // Timeouts
  defaultTimeout: 10000,
  loginTimeout: 3000
};

module.exports = { environment };
