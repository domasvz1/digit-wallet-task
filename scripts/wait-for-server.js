const http = require('http');

async function waitForServer(port, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
          resolve(true);
        });
        req.on('error', reject);
        req.setTimeout(1000);
      });
      return true;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error(`Server on port ${port} did not start within ${maxAttempts} seconds`);
}

module.exports = { waitForServer };
