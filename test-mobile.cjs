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
  
  console.log('🚀 Testing mobile...');
  await page.goto('https://grid.steimercloud.xyz/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  
  // Login
  await page.fill('#login-username', 'admin');
  await page.fill('#login-password', 'XbjJhxg6FQojT0kIu7Fg6kf0WDM4qDcg');
  await page.click('#btn-login');
  await page.waitForTimeout(3000);
  
  const result = await page.evaluate(() => ({
    header: !!document.querySelector('.header'),
    grid: !!document.querySelector('.grid-section'),
    sidebar: !!document.querySelector('.sidebar-panel'),
    stats: document.getElementById('stat-logins')?.textContent,
    loginGone: !document.querySelector('#login-username')
  }));
  
  console.log('\n📱 Mobile Test Results:');
  console.log('   Header:', result.header ? '✅' : '❌');
  console.log('   Grid:', result.grid ? '✅' : '❌');
  console.log('   Sidebar:', result.sidebar ? '✅' : '❌');
  console.log('   Login gone:', result.loginGone ? '✅' : '❌');
  console.log('   Stats loaded:', result.stats && result.stats !== '-' ? '✅ (' + result.stats + ')' : '❌');
  
  if (errors.length) {
    console.log('\n❌ Errors found:');
    errors.forEach(e => console.log('   ' + e));
  } else {
    console.log('\n✅ No errors!');
  }
  
  await browser.close();
})();
