import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { KycPage } from '../../pages/kyc.page';
import { TestDataGenerator, VALID_DOCUMENT_PATH } from '../fixtures/test-data';
import * as path from 'path';
import * as fs from 'fs';

test.describe('KYC Upload E2E Flow', () => {
  let registrationPage: RegistrationPage;
  let kycPage: KycPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    kycPage = new KycPage(page);

    await registrationPage.navigate();
    const userData = TestDataGenerator.generateValidUserData();
    await registrationPage.registerUser(userData);
  });

  test('should upload document and complete verification', async () => {
    const testFilePath = path.join(process.cwd(), VALID_DOCUMENT_PATH);

    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    await kycPage.page.waitForSelector('.dropzone', { timeout: 5000 });
    await kycPage.uploadDocument(testFilePath);
    await kycPage.waitForVerificationComplete();

    const isComplete = await kycPage.isVerificationComplete();
    expect(isComplete).toBe(true);
  });

  test('should allow access to features after successful verification', async () => {
    const testFilePath = path.join(process.cwd(), VALID_DOCUMENT_PATH);

    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    await kycPage.page.waitForSelector('.dropzone', { timeout: 5000 });
    await kycPage.uploadDocument(testFilePath);
    await kycPage.waitForVerificationComplete();

    const canAccess = await kycPage.canAccessFeatures();
    expect(canAccess).toBe(true);
  });
});
