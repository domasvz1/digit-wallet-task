import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { TestDataGenerator, VALID_DOCUMENT_PATH } from '../fixtures/test-data';
import { KycStatus } from '../types';
import * as fs from 'fs';
import * as path from 'path';

test.describe('KYC Verification API', () => {
  let apiClient: ApiClient;
  let userId: string;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    const userData = TestDataGenerator.generateValidUserData();
    const registerResponse = await apiClient.registerUser(userData);
    
    if (!registerResponse.data?.userId) {
      throw new Error('Failed to register user for test setup');
    }
    
    userId = registerResponse.data.userId;
  });

  test('should upload document and start validation', async () => {
    const testFilePath = path.join(process.cwd(), VALID_DOCUMENT_PATH);
    
    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    const response = await apiClient.uploadKycDocument(userId, testFilePath);

    expect(response.success).toBe(true);
    expect(response.message).toContain('uploaded successfully');
    expect(response.data?.status).toBe(KycStatus.VALIDATING);
  });

  test('should reject upload for non-existent user', async () => {
    const testFilePath = path.join(process.cwd(), VALID_DOCUMENT_PATH);
    const fakeUserId = 'non-existent-user-id';

    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    const response = await apiClient.uploadKycDocument(fakeUserId, testFilePath);

    expect(response.success).toBe(false);
    expect(response.message).toBe('User not found');
  });
});
