import { APIRequestContext } from '@playwright/test';
import { UserData, UserResponse, KycUploadResponse, KycStatusResponse } from '../types';
import * as fs from 'fs';

const API_BASE_URL = 'http://localhost:3000/api';

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(userData: UserData): Promise<UserResponse> {
    const response = await this.request.post(`${API_BASE_URL}/users`, {
      data: userData,
    });
    return response.json() as Promise<UserResponse>;
  }

  async getUser(userId: string): Promise<UserResponse> {
    const response = await this.request.get(`${API_BASE_URL}/users/${userId}`);
    return response.json() as Promise<UserResponse>;
  }

  async uploadKycDocument(userId: string, filePath: string): Promise<KycUploadResponse> {
    const fileBuffer = fs.existsSync(filePath) ? fs.readFileSync(filePath) : Buffer.from('');
    const response = await this.request.post(`${API_BASE_URL}/kyc/${userId}`, {
      multipart: {
        document: {
          name: filePath.split(/[\\/]/).pop() ?? 'document',
          mimeType: this.getMimeType(filePath),
          buffer: fileBuffer,
        },
      },
    });
    return response.json() as Promise<KycUploadResponse>;
  }

  async getKycStatus(userId: string): Promise<KycStatusResponse> {
    const response = await this.request.get(`${API_BASE_URL}/kyc/${userId}`);
    return response.json() as Promise<KycStatusResponse>;
  }

  private getMimeType(filePath: string): string {
    const extension = filePath.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
    };
    return mimeTypes[extension ?? ''] ?? 'application/octet-stream';
  }
}
