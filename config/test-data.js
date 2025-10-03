// Test data configuration
const testData = {
  // Login credentials
  login: {
    username: 'TestUser',
    password: 'Password@123'
  },
  
  // You can add more test data here
  users: {
    validUser: {
      username: 'TestUser',
      password: 'Password@123'
    },
    invalidUser: {
      username: 'WrongUser',
      password: 'WrongPassword'
    }
  },
  
  // URLs
  urls: {
    baseUrl: 'https://aurum-test.alchelyst.com',
    loginPage: '/'
  }
};

module.exports = { testData };
