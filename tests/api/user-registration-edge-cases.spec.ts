import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { KycStatus } from '../types';

test.describe('User Registration Edge Cases', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should accept password exactly 6 characters', async () => {
    const userData = {
      email: `test.${Date.now()}@example.com`,
      password: '123456',
      phone: `+1${Date.now().toString().slice(-10)}`
    };

    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(true);
    expect(response.data?.kycStatus).toBe(KycStatus.NO_DOCUMENTS);
  });

  test('should accept phone number with 10+ digits', async () => {
    const timestamp = Date.now();
    const userData = {
      email: `test.${timestamp}@example.com`,
      password: 'SecurePass123',
      phone: `+${timestamp.toString().slice(-11)}`
    };

    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(true);
    expect(response.data?.phone).toBe(userData.phone);
  });

  test('should accept special characters in email', async () => {
    const timestamp = Date.now();
    const userData = {
      email: `test+tag.${timestamp}@example.com`,
      password: 'SecurePass123',
      phone: `+1${timestamp.toString().slice(-10)}`
    };

    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(true);
    expect(response.data?.email).toBe(userData.email);
  });
});
