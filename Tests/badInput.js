const LoginTester = require('./Utility-Function/Login')
console.log(typeof LoginTester, LoginTester)
const { Builder, By, Key } = require('selenium-webdriver')
;(async function myFunction() {
  let driver = await new Builder().forBrowser('chrome').build()

  let logintest = LoginTester(driver)
  let gameCode = '0000'

  let afterLogin = async function (driver) {}

  logintest.then(() => {
    afterLogin(driver)
  })

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  await sleep(5000)
  driver.findElement(By.xpath('//input')).sendKeys(gameCode)
  await sleep(5000)
  driver.findElement(By.xpath('//button[contains(text(), "Connect")]')).click()
  await sleep(5000)

  driver.close()
})()
