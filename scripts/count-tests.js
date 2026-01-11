const fs = require('fs');
const path = require('path');

const apiTestFiles = [
  'tests/api/user-registration.spec.ts',
  'tests/api/user-registration-validation.spec.ts',
  'tests/api/user-registration-duplicates.spec.ts',
  'tests/api/user-registration-edge-cases.spec.ts',
  'tests/api/kyc-verification.spec.ts',
  'tests/api/kyc-verification-status.spec.ts',
  'tests/api/kyc-verification-edge-cases.spec.ts'
];

const e2eTestFiles = [
  'tests/e2e/registration-flow.spec.ts',
  'tests/e2e/kyc-upload-flow.spec.ts'
];

let totalApiTests = 0;
let totalE2eTests = 0;

console.log('API Test Files:');
apiTestFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const tests = content.match(/test\(/g);
  const count = tests ? tests.length : 0;
  totalApiTests += count;
  console.log(`  ${file}: ${count} tests`);
});

console.log('\nE2E Test Files:');
e2eTestFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const tests = content.match(/test\(/g);
  const count = tests ? tests.length : 0;
  totalE2eTests += count;
  console.log(`  ${file}: ${count} tests`);
});

console.log('\nTotal:');
console.log(`  API Tests: ${totalApiTests}`);
console.log(`  E2E Tests: ${totalE2eTests}`);
console.log(`  Grand Total: ${totalApiTests + totalE2eTests}`);
