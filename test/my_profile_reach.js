const puppeteer = require("puppeteer");

(async () => {

  var email = "homam57854@dedatre.com"; //email used for signup and login
  var password = "17againpc"; // default password for all the accounts
  var name = "Test-Operation"; // default name for all the accounts

  const browser = await puppeteer.launch({
    headless: false,
    product:'chrome',
    defaultViewport: null,
    args: ["--start-maximized"],
  }); //browser is launched

  var page = await browser.newPage(); // a new page is created

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://gelukzaaiers.learnforce.cloud/"); //mentioned site is then reached
  await page.waitForTimeout(4000); // delay for 5 second for website to load

  await account_settings(page,email,password);
  await page.waitForTimeout(3000); // delay for 3 second 


  await browser.close();
})();


//account_settings function for updating settings
async function account_settings(page_entry, email, password) {

    var xpath_login_b_mainp = "//*[@id='_next']/div/div/div/div/div/div[2]/div/div[3]/div[1]/div[1]/button";
    var xpath_email_if = "//*[@id='email']"; //xpath of email input field on login page
    var xpath_password_if = "//*[@id='password']"; //xpath of password input field on login page
    var xpath_login_b_happen = "//*[@id='_next']/div/div/form/div[4]/button"; //xpath of login button on sign up page
        
    let login_mainp = await page_entry.waitForXPath(xpath_login_b_mainp, {
        visible: true,
      }); //login button is to be found here
    
    await login_mainp.evaluate((b) => b.click()); //login button is clicked

    await page_entry.waitForTimeout(4000); // delay for 4 second for website to load

    let login_button = await page_entry.waitForXPath(
        xpath_login_b_happen,
        { visible: true }
      ); //login button is to be found here

    await login_button.evaluate((c) =>
      c.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    );   //scrolling till that component

    await page_entry.waitForTimeout(3001); // delay of 3 seconds
    let email_input_field = await page_entry.waitForXPath(xpath_email_if, {
        visible: true,
      }); //email input field is to be found here
    await email_input_field.evaluate((b) => b.click({ clickCount: 3 })); //it selects the already written text and is overwritten in next line
    
    await email_input_field.type(email); //input is entered in email input field
    console.log("Email Input is entered");
  
    await page_entry.waitForTimeout(1500); // delay of 1.5 seconds
  
    let password_input_field = await page_entry.waitForXPath(
        xpath_password_if,
        { visible: true }
    ); //password input field is to be found here
    await password_input_field.evaluate((b) => b.click({ clickCount: 3 })); //it selects the already written text and is overwritten in next line
    await password_input_field.type(password); //input is entered in password input field
    console.log("Password Input is entered");

    await page_entry.waitForTimeout(3500); // delay of 3.5 seconds

    await login_button.click();

    await page_entry.waitForTimeout(4100); // delay of 4.1 seconds

    var xpath_arrow_drop_down = "//*[@id='_next']/div/div[1]/div/div[1]/div/div/div/div/div/div[1]/div"; //xpath of dropdown
    var xpath_menu_drop_down = "//*[@id='_next']/div/div[1]/div/div[1]/div/div/div/div/div/div[2]/ul/a"; //xpath of dropdown_menu


    let arrow_drop = await page_entry.waitForXPath(xpath_arrow_drop_down, {
      visible: true,
    }); //arrow drop down is to be found here
    console.log("dropm down clicked");
    await arrow_drop.evaluate((b) => b.click()); //arrow drop down is clicked

    await page_entry.waitForTimeout(3000); // delay of 3 seconds

    let menu_drop = await page_entry.waitForXPath(xpath_menu_drop_down, {
      visible: true,
    }); //menu my profile is to be found here
    console.log("profile licked");
    await menu_drop.evaluate((b) => b.click()); //menu my profile is clicked

    await page_entry.waitForTimeout(5000); // delay of 5 seconds

          //verifyuing that it should reach the my profile page
    if (page_entry.url() === "https://gelukzaaiers.learnforce.cloud/dashboard/") {
        console.log("Test is successful");
    }
}