const puppeteer = require("puppeteer");


(async () => {

  let number_random = Math.random();  //a random number is generated
  var email = "homam57854@dedatre.com"; //email used for signup and login
  var password = "17againpc"; // default password for all the accounts
  var name = "Test-Operation"; // default name for all the accounts

  const browser = await puppeteer.launch({
    headless: false,
    product:'chrome',
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

  await login(page,email,password);
  await page.waitForTimeout(5000); // delay for 5 second for website to load


  await browser.close();
})();


//Login function for entering credentials from login page
async function login(page_entry, email, password) {

    var xpath_login_b_mainp = "//*[@id='_next']/div/div/div/div/div/div[2]/div/div[3]/div[1]/div[1]/button";
    var xpath_email_if = "//*[@id='email']"; //xpath of email input field on login page
    var xpath_password_if = "//*[@id='password']"; //xpath of password input field on login page
    var xpath_login_b_happen = "///*[@id='_next']/div/div/form/div[4]/button"; //xpath of login button on sign up page
    
 
    
    let login_mainp = await page_entry.waitForXPath(xpath_login_b_mainp, {
        visible: true,
      }); //login button is to be found here
    
    await login_mainp.evaluate((b) => b.click()); //login button is clicked

    await page_entry.waitForTimeout(4000); // delay for 4 second for website to load


      


}