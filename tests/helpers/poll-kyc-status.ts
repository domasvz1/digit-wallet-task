import { ApiClient } from './api-client';
import { KycStatus } from '../types';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 10;

async function pollRecursive(
  apiClient: ApiClient,
  userId: string,
  attempt: number
): Promise<{ success: boolean; kycStatus: KycStatus; kycVerifiedAt: string | null; documents: unknown[] }> {
  const response = await apiClient.getKycStatus(userId);
  
  if (!response.data) {
    throw new Error('Invalid response from KYC status endpoint');
  }
  
  if (response.data.kycStatus !== KycStatus.VALIDATING) {
    return {
      success: response.success,
      kycStatus: response.data.kycStatus,
      kycVerifiedAt: response.data.kycVerifiedAt,
      documents: response.data.documents
    };
  }
  
  if (attempt >= MAX_POLL_ATTEMPTS) {
    throw new Error('KYC verification did not complete within expected time');
  }
  
  await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
  return pollRecursive(apiClient, userId, attempt + 1);
}

export async function pollUntilKycComplete(
  apiClient: ApiClient,
  userId: string
): Promise<{ success: boolean; kycStatus: KycStatus; kycVerifiedAt: string | null; documents: unknown[] }> {
  return pollRecursive(apiClient, userId, 0);
}
