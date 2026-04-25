const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  
  const page = await context.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });
  
  // Capture failed requests
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), '-', request.failure()?.errorText);
  });
  
  try {
    console.log('Loading page...');
    await page.goto('https://grid.steimercloud.xyz/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait a bit for JS to execute
    await page.waitForTimeout(3000);
    
    // Check what's on the page
    const title = await page.title();
    console.log('Page title:', title);
    
    const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
    console.log('Body HTML:', bodyHTML);
    
    // Check if app container has content
    const appContent = await page.evaluate(() => {
      const app = document.getElementById('app');
      return app ? app.innerHTML.substring(0, 500) : 'No #app found';
    });
    console.log('App content:', appContent);
    
    // Check for login form
    const hasLogin = await page.evaluate(() => !!document.querySelector('.login-screen'));
    console.log('Has login screen:', hasLogin);
    
  } catch (error) {
    console.log('ERROR:', error.message);
  }
  
  await browser.close();
})();
