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
    
    var xpath_google_login = "//*[@id='_next']/div/div/button[1]"; //xpath for google on login
    
    var xpath_gmail_google = "//*[@id='identifierId']"; //xpath of email input field on google page
    var xpath_gmail_to_pass_next = "//*[@id='identifierNext']/div/button/div[1]"; //xpath of next button on gmail
    
    var xpath_gmail_password_google = "//*[@id='identifierId]"; //xpath of email input field on google page

    var xpath_name_set = "//*[@id='_next']/div/div/div/div/div[1]/input"; //name set on complete profile page
    var xpath_button_on_CP_page = "//*[@id='_next']/div/div/div/button" ////name set on complete profile page

    let login_mainp = await page_entry.waitForXPath(xpath_login_b_mainp, {
        visible: true,
      }); //login button is to be found here
    
    await login_mainp.evaluate((b) => b.click()); //login button is clicked

    await page_entry.waitForTimeout(4000); // delay for 4 second for website to load

    let login_google = await page_entry.waitForXPath(xpath_google_login, {
        visible: true,
      }); //login button is to be found here
    
    await login_google.evaluate((b) => b.click()); //login button for google is clicked


    await page_entry.waitForTimeout(4000); // delay for 4 second for website to load
    
    let login_google_gmail = await page_entry.waitForXPath(xpath_gmail_google, {
        visible: true,
      }); //gmail input field is to be found here
    
    await login_google_gmail.type(process.env.GOOGLE_USER); //gmail input field is centered

    await page_entry.waitForTimeout(4000); // delay for 4 second for website to load
    let gmail_to_pass_next = await page_entry.waitForXPath(xpath_gmail_to_pass_next, {
        visible: true,
      }); //gmail email next is to be found here
    
    await gmail_to_pass_next.click(); //linput field is clicked

    //await page_entry.waitForTimeout(40000); // delay for 4 second for website to load

      //complete profile page functionality
    if (page_entry.url() === "https://learnforce-students-next.vercel.app/complete-profile/" ){
        await page_entry.waitForTimeout(4000); // delay for 4 second for website to load
        
        let name_input_field_cp = await page_entry.waitForXPath(xpath_name_set, {
            visible: true,
        }); //name input field is to be found here
        await name_input_field_cp.evaluate((b) => b.click({ clickCount: 3 })); //it selects the already written text and is overwritten in next line
        //console.log(typeof email_input);
        await name_input_field_cp.type("Tester"); //input is entered in name input field
        console.log("name input is entered");

        await page_entry.waitForTimeout(3000); // delay for 3 second for website to load

        let b_CPpage= await page_entry.waitForXPath(xpath_button_on_CP_page, {
            visible: true,
        }); //login button is to be found here
        
        await b_CPpage.evaluate((c) =>
            c.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            })
        );   //scrolling till that component
        await page_entry.waitForTimeout(3001); // delay of 3 seconds
        await b_CPpage.evaluate((b) => b.click()); //next button is clicked

    }


}