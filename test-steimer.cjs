const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36'
  });
  
  let errors = [];
  page.on('response', res => {
    if (res.status() >= 400 && res.url().includes('api')) {
      errors.push(`❌ ${res.status()}: ${res.url()}`);
    }
  });
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`💬 ${msg.text()}`);
  });
  page.on('pageerror', err => errors.push(`❌ PageError: ${err.message}`));
  
  console.log('🚀 Loading page...');
  await page.goto('https://grid.steimercloud.xyz/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  console.log('🔐 Logging in as Steimer...');
  await page.fill('#login-username', 'Steimer');
  await page.fill('#login-password', 'XbjJhxg6FQojT0kIu7Fg6kf0WDM4qDcg');
  await page.click('#btn-login');
  
  // Wait and check for errors
  await page.waitForTimeout(5000);
  
  const result = await page.evaluate(() => ({
    header: !!document.querySelector('.header'),
    grid: !!document.querySelector('.grid-section'),
    loginGone: !document.querySelector('#login-username'),
    error: document.querySelector('.error')?.textContent || document.querySelector('.error-message')?.textContent,
    bodyHTML: document.body.innerHTML.substring(0, 500)
  }));
  
  console.log('\n📱 Results:');
  console.log('   Header:', result.header ? '✅' : '❌');
  console.log('   Grid:', result.grid ? '✅' : '❌');
  console.log('   Login gone:', result.loginGone ? '✅' : '❌');
  console.log('   Error:', result.error || 'none');
  
  if (errors.length) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log('   ' + e));
  }
  
  if (!result.header && !result.grid) {
    console.log('\n📄 Page HTML:', result.bodyHTML);
  }
  
  await browser.close();
})();
