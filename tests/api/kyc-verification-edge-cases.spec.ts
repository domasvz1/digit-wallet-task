import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { TestDataGenerator, VALID_DOCUMENT_PATH } from '../fixtures/test-data';
import { KycStatus } from '../types';
import { pollUntilKycComplete } from '../helpers/poll-kyc-status';
import * as fs from 'fs';
import * as path from 'path';

test.describe('KYC Verification Edge Cases', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should reject upload when KYC already valid', async () => {
    const userData = TestDataGenerator.generateValidUserData();
    const registerResponse = await apiClient.registerUser(userData);
    const userId = registerResponse.data?.userId;

    if (!userId) {
      throw new Error('Failed to register user');
    }

    const testFilePath = path.join(process.cwd(), VALID_DOCUMENT_PATH);
    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    await apiClient.uploadKycDocument(userId, testFilePath);
    await pollUntilKycComplete(apiClient, userId);

    const secondUploadResponse = await apiClient.uploadKycDocument(userId, testFilePath);

    expect(secondUploadResponse.success).toBe(false);
    expect(secondUploadResponse.message).toBe('KYC is already completed for this user');
  });

  test('should retry upload after invalid verification', async () => {
    test.setTimeout(60000);
    const userData = TestDataGenerator.generateValidUserData();
    const registerResponse = await apiClient.registerUser(userData);
    const userId = registerResponse.data?.userId;

    if (!userId) {
      throw new Error('Failed to register user');
    }

    const invalidPath = path.join(process.cwd(), 'tests/fixtures/files/rejected-id.jpg');
    const validPath = path.join(process.cwd(), VALID_DOCUMENT_PATH);

    if (!fs.existsSync(invalidPath) || !fs.existsSync(validPath)) {
      test.skip();
      return;
    }

    await apiClient.uploadKycDocument(userId, invalidPath);
    const firstResult = await pollUntilKycComplete(apiClient, userId);
    expect(firstResult.kycStatus).toBe(KycStatus.INVALID);

    await apiClient.uploadKycDocument(userId, validPath);
    const secondResult = await pollUntilKycComplete(apiClient, userId);
    expect(secondResult.kycStatus).toBe(KycStatus.VALID);
    expect(secondResult.documents).toHaveLength(2);
  });
});
