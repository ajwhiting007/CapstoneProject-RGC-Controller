const { Builder, By, Key } = require('selenium-webdriver')
async function LoginTester(driver) {
  await driver.get('http://localhost:3000/')
}
module.exports = LoginTester
