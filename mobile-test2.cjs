const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true
  });
  
  const page = await context.newPage();
  
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({ url: request.url(), failure: request.failure()?.errorText });
  });
  
  page.on('response', async response => {
    if (response.status() >= 400) {
      console.log('HTTP ERROR:', response.status(), response.url());
    }
  });
  
  page.on('console', msg => {
    console.log(`[${msg.type()}]`, msg.text());
  });
  
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });
  
  console.log('Loading page...');
  await page.goto('https://grid.steimercloud.xyz/', { waitUntil: 'networkidle', timeout: 30000 });
  
  await page.waitForTimeout(2000);
  
  if (failedRequests.length > 0) {
    console.log('\nFailed requests:');
    failedRequests.forEach(r => console.log(' -', r.url, '-', r.failure));
  }
  
  // Check localStorage
  const localStorage = await page.evaluate(() => {
    return { session: window.localStorage.getItem('site-grid-session') };
  });
  console.log('\nLocalStorage:', localStorage);
  
  await browser.close();
})();
