const puppeteer = require("puppeteer");

(async () => {
  var email = "homam57854@dedatre.com"; //email used for signup and login
  var password = "17againpc"; // default password for all the accounts
  var name = "Test-Operation"; // default name for all the accounts

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  }); //browser is launched

  var page = await browser.newPage(); // a new page is created

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://gelukzaaiers.learnforce.cloud/"); //mentioned site is then reached
  await page.waitForTimeout(4000); // delay for 5 second for website to load
  await login(page, email, password);
  await page.waitForTimeout(3000); // delay for 3 second

  await browser.close();
})();

//Login function for entering credentials from login page
async function login(page_entry, email, password) {
  var xpath_login_b_mainp =
    "//*[@id='_next']/div/div/div/div/div/div[2]/div/div[3]/div[1]/div[1]/button";
  var xpath_email_if = "//*[@id='email']"; //xpath of email input field on login page
  var xpath_password_if = "//*[@id='password']"; //xpath of password input field on login page
  var xpath_login_b_happen = "//*[@id='_next']/div/div/form/div[4]/button"; //xpath of login button on sign up page

  let login_mainp = await page_entry.waitForXPath(xpath_login_b_mainp, {
    visible: true,
  }); //login button is to be found here

  await login_mainp.evaluate((b) => b.click()); //login button is clicked

  await page_entry.waitForTimeout(3000); // delay for 3 second for website to load

  let login_button = await page_entry.waitForXPath(xpath_login_b_happen, {visible: true,}); //login button is to be found here

  await login_button.evaluate((c) =>
    c.scrollIntoView({behavior: "smooth",block: "center",inline: "center",})); //scrolling till that component

  await page_entry.waitForTimeout(3001); // delay of 3 seconds
  let email_input_field = await page_entry.waitForXPath(xpath_email_if, {visible: true,}); //email input field is to be found here
  await email_input_field.evaluate((b) => b.click({ clickCount: 3 })); //it selects the already written text and is overwritten in next line

  await email_input_field.type(email); //input is entered in email input field
  console.log("Email Input is entered");

  await page_entry.waitForTimeout(1500); // delay of 1.5 seconds

  let password_input_field = await page_entry.waitForXPath(xpath_password_if, {visible: true,}); //password input field is to be found here
  await password_input_field.evaluate((b) => b.click({ clickCount: 3 })); //it selects the already written text and is overwritten in next line
  await password_input_field.type(password); //input is entered in password input field
  console.log("Password Input is entered");

  await page_entry.waitForTimeout(2500); // delay of 2.5 seconds

  await login_button.click();

  await page_entry.waitForTimeout(7000); // delay of 7 seconds


  var xpath_all_courses = '//*[@id="_next"]/div/div[2]/div/div[2]/div[2]/div[1]/div/ul/li[2]/a';    //xpath of all cousres tab
  let all_courses_section = await page_entry.waitForXPath(xpath_all_courses, {visible: true,}); //all cousres tab is to be found here
  await all_courses_section.evaluate((c) =>
    c.scrollIntoView({behavior: "smooth",block: "center",inline: "center",})); //scrolling till that component
  await page_entry.waitForTimeout(7000); // delay of 7 seconds
  await all_courses_section.evaluate((b)=>b.click());   //all cousres tab is clicked

  await page_entry.waitForTimeout(2000); // delay of 2 seconds

  var xpath_forward_slider = '//*[@id="_next"]/div/div[2]/div/div[2]/div[2]/div[2]/div/button[2]'     //xpath of forward slider
  let forward_slider = await page_entry.waitForXPath(xpath_forward_slider, {visible: true,}); //forward_slider is to be found here
  await forward_slider.evaluate((c) =>
    c.scrollIntoView({behavior: "smooth",block: "center",inline: "center",})); //scrolling till that component

  await page_entry.waitForTimeout(1000); // delay of 1 seconds
  await forward_slider.click();

  await page_entry.waitForTimeout(1122); // delay of 1 seconds

  await page_entry.screenshot({path:"./screenshots/forward_slider.png"})    //capturing screenshots

  var xpath_backward_slider = '//*[@id="_next"]/div/div[2]/div/div[2]/div[2]/div[2]/div/button[1]'     //xpath of backward slider
  let backward_slider = await page_entry.waitForXPath(xpath_backward_slider, {visible: true,}); //backward_slider is to be found here
  await backward_slider.evaluate((c) =>
    c.scrollIntoView({behavior: "smooth",block: "center",inline: "center",})); //scrolling till that component

  await page_entry.waitForTimeout(1000); // delay of 1 seconds
  await backward_slider.click();
    
  await page_entry.waitForTimeout(1122); // delay of 2 seconds

  await page_entry.screenshot({path:"./screenshots/backward_slider.png"})    //capturing screenshots
}
