const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:9222/devtools/page/291');

ws.on('open', async () => {
  // Test the full flow
  ws.send(JSON.stringify({
    id: 1, 
    method: 'Runtime.evaluate',
    params: { expression: `
      (async () => {
        try {
          const res = await fetch('/api/config');
          const config = await res.json();
          console.log('Config:', JSON.stringify(config));
          if (config.frontendUrl) {
            const newAPI = config.frontendUrl + '/api';
            console.log('New API would be:', newAPI);
            const tagsRes = await fetch(newAPI + '/tags');
            console.log('Tags status:', tagsRes.status);
          }
        } catch(e) {
          console.log('Error:', e.message);
        }
      })()
    `, returnByValue: false }
  }));
  
  setTimeout(() => ws.close(), 5000);
});

ws.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.params?.entry) {
    console.log('[LOG]', msg.params.entry.text);
  }
});
