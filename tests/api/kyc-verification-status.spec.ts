import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { pollUntilKycComplete } from '../helpers/poll-kyc-status';
import { TestDataGenerator, VALID_DOCUMENT_PATH, INVALID_DOCUMENT_PATH } from '../fixtures/test-data';
import { KycStatus } from '../types';
import * as fs from 'fs';
import * as path from 'path';

test.describe('KYC Status Verification', () => {
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

  test('should transition to valid status after verification', async () => {
    const testFilePath = path.join(process.cwd(), VALID_DOCUMENT_PATH);
    
    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    await apiClient.uploadKycDocument(userId, testFilePath);
    
    const result = await pollUntilKycComplete(apiClient, userId);

    expect(result.success).toBe(true);
    expect(result.kycStatus).toBe(KycStatus.VALID);
    expect(result.kycVerifiedAt).toBeDefined();
    expect(result.documents).toHaveLength(1);
  });

  test('should transition to invalid status for non-valid document', async () => {
    const testFilePath = path.join(process.cwd(), INVALID_DOCUMENT_PATH);
    
    if (!fs.existsSync(testFilePath)) {
      test.skip();
      return;
    }

    await apiClient.uploadKycDocument(userId, testFilePath);
    
    const result = await pollUntilKycComplete(apiClient, userId);

    expect(result.success).toBe(true);
    expect(result.kycStatus).toBe(KycStatus.INVALID);
    expect(result.kycVerifiedAt).toBeNull();
  });

  test('should get KYC status for user', async () => {
    const statusResponse = await apiClient.getKycStatus(userId);

    expect(statusResponse.success).toBe(true);
    expect(statusResponse.data?.kycStatus).toBe(KycStatus.NO_DOCUMENTS);
    expect(statusResponse.data?.documents).toHaveLength(0);
  });
});
