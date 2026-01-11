const { spawn } = require('child_process');
const path = require('path');
const { waitForServer } = require('./wait-for-server');

let serverProcess = null;

console.log('='.repeat(60));
console.log('Starting API Tests');
console.log('='.repeat(60));
console.log('[1/3] Starting backend server on port 3000...');

const serverPath = path.join(__dirname, '..', 'kyc-mock-app', 'server');
serverProcess = spawn('npm', ['start'], {
  cwd: serverPath,
  shell: true,
  stdio: 'ignore'
});

(async () => {
  try {
    await waitForServer(3000);
    console.log('[2/3] Backend server is ready');
    console.log('[3/3] Running API tests...');
    console.log('');
    
    const testProcess = spawn('npx', ['playwright', 'test', 'tests/api', '--reporter=list'], {
      cwd: path.join(__dirname, '..'),
      shell: true,
      stdio: 'inherit'
    });

    testProcess.on('close', (code) => {
      console.log('');
      console.log('='.repeat(60));
      console.log(`API tests completed with exit code ${code}`);
      console.log('='.repeat(60));
      if (serverProcess) {
        serverProcess.kill();
      }
      process.exit(code);
    });
  } catch (error) {
    console.error('Failed to start backend server:', error.message);
    if (serverProcess) {
      serverProcess.kill();
    }
    process.exit(1);
  }
})();

process.on('SIGINT', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(0);
});
