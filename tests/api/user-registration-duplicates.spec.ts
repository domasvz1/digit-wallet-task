import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { TestDataGenerator } from '../fixtures/test-data';

test.describe('User Registration Duplicates', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should reject duplicate email registration', async () => {
    const userData = TestDataGenerator.generateValidUserData();

    await apiClient.registerUser(userData);
    const duplicateResponse = await apiClient.registerUser(userData);

    expect(duplicateResponse.success).toBe(false);
    expect(duplicateResponse.message).toBe('User with this email already exists');
  });

  test('should reject duplicate phone registration', async () => {
    const userData1 = TestDataGenerator.generateValidUserData();
    const userData2 = TestDataGenerator.generateValidUserData();
    userData2.phone = userData1.phone;

    await apiClient.registerUser(userData1);
    const duplicateResponse = await apiClient.registerUser(userData2);

    expect(duplicateResponse.success).toBe(false);
    expect(duplicateResponse.message).toBe('Phone number is already registered by another user');
  });
});
