const puppeteer = require("puppeteer");


(async () => {

  let number_random = Math.random();  //a random number is generated
  var email = "testoperation"+number_random+"@testABC.com"; //email used for signup and login
  var password = "176hgwqctest"; // default password for all the accounts
  var name = "Test-Operation"; // default name for all the accounts

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  }); //browser is launched

  // Create a new incognito browser context.
  //const context = await browser.createIncognitoBrowserContext(); // for testing

  var page = await browser.newPage(); // a new page is created

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://learnforce-students-next.vercel.app/"); //mentioned site is then reached
  await page.waitForTimeout(4000); // delay for 5 second for website to load

  await register(page,email,password);
  await page.waitForTimeout(5000); // delay for 5 second for website to load


  await browser.close();
})();


//Login function for entering credentials from login page
async function register(page_entry, email, password) {


}