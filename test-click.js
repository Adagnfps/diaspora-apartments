const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/#agent'); // assumes preview server running

  await page.waitForSelector('[data-tab="leads"]');
  console.log("Leads tab found");

  await page.click('[data-tab="leads"]');
  console.log("Leads tab clicked");

  await page.waitForTimeout(500);

  const leadsContent = await page.$eval('main', el => el.innerHTML);
  console.log("Main content contains leads:", leadsContent.includes('Leads Inbox'));

  await browser.close();
})();
