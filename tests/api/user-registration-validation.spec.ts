import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { TestDataGenerator } from '../fixtures/test-data';

test.describe('User Registration Validation', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should reject registration with invalid email format', async () => {
    const userData = TestDataGenerator.generateInvalidEmailUserData();
    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Invalid email format');
  });

  test('should reject registration with invalid phone number', async () => {
    const userData = TestDataGenerator.generateInvalidPhoneUserData();
    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Invalid phone number format');
  });

  test('should reject registration with short password', async () => {
    const userData = TestDataGenerator.generateShortPasswordUserData();
    const response = await apiClient.registerUser(userData);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Password must be at least 6 characters long');
  });

  test('should reject registration with missing email', async () => {
    const userData = TestDataGenerator.generateValidUserData();
    const incompleteData = { ...userData, email: '' };
    const response = await apiClient.registerUser(incompleteData);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Email, password, and phone number are required');
  });

  test('should reject registration with missing password', async () => {
    const userData = TestDataGenerator.generateValidUserData();
    const incompleteData = { ...userData, password: '' };
    const response = await apiClient.registerUser(incompleteData);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Email, password, and phone number are required');
  });

  test('should reject registration with missing phone', async () => {
    const userData = TestDataGenerator.generateValidUserData();
    const incompleteData = { ...userData, phone: '' };
    const response = await apiClient.registerUser(incompleteData);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Email, password, and phone number are required');
  });
});
