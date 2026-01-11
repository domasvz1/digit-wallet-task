import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { TestDataGenerator } from '../fixtures/test-data';

test.describe('User Registration E2E Flow', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  test('should successfully register a new user', async () => {
    const userData = TestDataGenerator.generateValidUserData();

    await registrationPage.registerUser(userData);

    const isSuccessful = await registrationPage.isRegistrationSuccessful();
    expect(isSuccessful).toBe(true);
  });
});
