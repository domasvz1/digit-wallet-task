export enum KycStatus {
  NO_DOCUMENTS = 'no_documents',
  VALIDATING = 'validating',
  VALID = 'valid',
  INVALID = 'invalid'
}

export interface UserData {
  email: string;
  password: string;
  phone: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    userId: string;
    email: string;
    phone: string;
    createdAt: string;
    kycStatus: KycStatus;
    kycVerifiedAt: string | null;
  };
}

export interface KycUploadResponse {
  success: boolean;
  message: string;
  data?: {
    documentId: string;
    filename: string;
    status: KycStatus;
    uploadedAt: string;
  };
}

export interface KycStatusResponse {
  success: boolean;
  message?: string;
  data?: {
    kycStatus: KycStatus;
    kycVerifiedAt: string | null;
    documents: Array<{
      id: string;
      filename: string;
      originalName: string;
      status: KycStatus;
      uploadedAt: string;
    }>;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
}
