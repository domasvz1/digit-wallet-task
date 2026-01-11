import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { TestDataGenerator } from '../fixtures/test-data';
import { KycStatus } from '../types';

test.describe('User Registration API', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should successfully register a user with valid data', async () => {
    const userData = TestDataGenerator.generateValidUserData();
    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(true);
    expect(response.message).toBe('User registered successfully');
    expect(response.data).toBeDefined();
    expect(response.data?.userId).toBeDefined();
    expect(response.data?.email).toBe(userData.email);
    expect(response.data?.phone).toBe(userData.phone);
    expect(response.data?.kycStatus).toBe(KycStatus.NO_DOCUMENTS);
    expect(response.data?.kycVerifiedAt).toBeNull();
  });

  test('should retrieve user information by userId', async () => {
    const userData = TestDataGenerator.generateValidUserData();
    const registerResponse = await apiClient.registerUser(userData);
    const userId = registerResponse.data?.userId;

    if (!userId) {
      throw new Error('User ID not found in registration response');
    }

    const getUserResponse = await apiClient.getUser(userId);

    expect(getUserResponse.success).toBe(true);
    expect(getUserResponse.data?.id).toBe(userId);
    expect(getUserResponse.data?.email).toBe(userData.email);
    expect(getUserResponse.data?.phone).toBe(userData.phone);
    expect(getUserResponse.data?.kycStatus).toBe(KycStatus.NO_DOCUMENTS);
  });
});
