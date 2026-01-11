const { spawn } = require('child_process');
const path = require('path');
const { waitForServer } = require('./wait-for-server');

let serverProcess = null;
let clientProcess = null;

console.log('='.repeat(60));
console.log('Starting E2E UI Tests');
console.log('='.repeat(60));
console.log('[1/4] Starting backend server on port 3000...');

const serverPath = path.join(__dirname, '..', 'kyc-mock-app', 'server');
const clientPath = path.join(__dirname, '..', 'kyc-mock-app', 'client');

serverProcess = spawn('npm', ['start'], {
  cwd: serverPath,
  shell: true,
  stdio: 'ignore'
});

(async () => {
  try {
    await waitForServer(3000);
    console.log('[2/4] Backend server is ready');
    console.log('[3/4] Starting frontend on port 3001...');
    
    clientProcess = spawn('npm', ['start'], {
      cwd: clientPath,
      shell: true,
      stdio: 'ignore'
    });

    await waitForServer(3001);
    console.log('[4/4] Frontend is ready');
    console.log('');
    console.log('Running E2E tests...');
    console.log('');
    
    const testProcess = spawn('npx', ['playwright', 'test', 'tests/e2e', '--reporter=list'], {
      cwd: path.join(__dirname, '..'),
      shell: true,
      stdio: 'inherit'
    });

    testProcess.on('close', (code) => {
      console.log('');
      console.log('='.repeat(60));
      console.log(`E2E UI tests completed with exit code ${code}`);
      console.log('='.repeat(60));
      if (serverProcess) serverProcess.kill();
      if (clientProcess) clientProcess.kill();
      process.exit(code);
    });
  } catch (error) {
    console.error('Failed to start servers:', error.message);
    if (serverProcess) serverProcess.kill();
    if (clientProcess) clientProcess.kill();
    process.exit(1);
  }
})();

process.on('SIGINT', () => {
  if (serverProcess) serverProcess.kill();
  if (clientProcess) clientProcess.kill();
  process.exit(0);
});
