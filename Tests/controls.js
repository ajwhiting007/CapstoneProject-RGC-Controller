const LoginTester = require('./Utility-Function/Login')
console.log(typeof LoginTester, LoginTester)
const { Builder, By, Key } = require('selenium-webdriver')
;(async function myFunction() {
  let driver = await new Builder().forBrowser('chrome').build()

  let logintest = LoginTester(driver)
  let gameCode = 'MWF9T'
  let index = 0

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
  driver.findElement(By.xpath('//div[contains(text(), "×")]')).click()
  await sleep(5000)

  while (index < 1000) {
    let inputSwitch = Math.floor(Math.random() * (100 + 1))
    if (inputSwitch % 2 == 0) {
      inputSwitch = Math.floor(Math.random() * (2 + 1))
      driver
        .findElement(By.xpath('//button[contains(text(), "Send Down")]'))
        .click()
      await sleep(500)
    } else {
      inputSwitch = Math.floor(Math.random() * (2 + 1))
      driver
        .findElement(By.xpath('//button[contains(text(), "Send Up")]'))
        .click()
      await sleep(500)
    }
    index += 1
  }

  driver.findElement(By.xpath("//div[@class='bottomReturn']/button[1]")).click()
  await sleep(5000)
})()
