const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Intercept and log all API requests
  page.on('request', request => {
    if (request.url().includes('api')) {
      console.log('API Request:', request.url());
    }
  });
  
  page.on('response', async response => {
    if (response.url().includes('api')) {
      console.log('API Response:', response.status(), response.url());
    }
  });
  
  console.log('Loading page...');
  await page.goto('https://grid.steimercloud.xyz/', { waitUntil: 'networkidle', timeout: 30000 });
  
  await page.waitForTimeout(3000);
  
  // Try to login
  console.log('\nTrying to login...');
  await page.fill('#login-username', 'admin');
  await page.fill('#login-password', 'XbjJhxg6FQojT0kIu7Fg6kf0WDM4qDcg');
  await page.click('#login-submit');
  
  await page.waitForTimeout(3000);
  
  // Check what happened
  const currentUrl = page.url();
  const hasGrid = await page.evaluate(() => !!document.querySelector('.grid-section'));
  const hasError = await page.evaluate(() => !!document.querySelector('.error-message'));
  
  console.log('\nAfter login:');
  console.log('- URL:', currentUrl);
  console.log('- Has grid:', hasGrid);
  console.log('- Has error:', hasError);
  
  const body = await page.evaluate(() => document.body.innerHTML.substring(0, 1000));
  console.log('- Body:', body);
  
  await browser.close();
})();
