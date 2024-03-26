const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Navigate to the Login Page
    await driver.get('http://127.0.0.1:5500/Task2/webapp/');

    // Step 2: Login with Valid Credentials
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!', Key.RETURN);

    // Step 3: Verify Successful Login
    await driver.wait(until.titleIs('Home Page'), 5000);

    // Step 4: Logout
    await driver.findElement(By.xpath('//button[text()="Logout"]')).click();

    // Step 5: Verify Logout
    await driver.wait(until.titleIs('The Internet'), 1000);

    // Step 6: Login with Invalid Credentials
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('1234556', Key.RETURN);

    // Step 7: Verify Invalid Login Attempt
    let errorMessage = await driver.findElement(By.id('flash')).getText();
    console.log(errorMessage);

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
})();