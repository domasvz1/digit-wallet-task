import { UserData } from '../types';

export class TestDataGenerator {
  private static counter = 0;

  static generateUniqueEmail(): string {
    const timestamp = Date.now();
    this.counter += 1;
    return `test.user.${timestamp}.${this.counter}@example.com`;
  }

  static generateUniquePhone(): string {
    const timestamp = Date.now();
    const randomDigits = Math.floor(Math.random() * 10000);
    return `+1${timestamp.toString().slice(-6)}${randomDigits.toString().padStart(4, '0')}`;
  }

  static generateValidUserData(): UserData {
    return {
      email: this.generateUniqueEmail(),
      password: 'SecurePass123!',
      phone: this.generateUniquePhone(),
    };
  }

  static generateInvalidEmailUserData(): UserData {
    return {
      email: 'invalid-email-format',
      password: 'SecurePass123!',
      phone: this.generateUniquePhone(),
    };
  }

  static generateInvalidPhoneUserData(): UserData {
    return {
      email: this.generateUniqueEmail(),
      password: 'SecurePass123!',
      phone: '123',
    };
  }

  static generateShortPasswordUserData(): UserData {
    return {
      email: this.generateUniqueEmail(),
      password: '12345',
      phone: this.generateUniquePhone(),
    };
  }
}

export const VALID_DOCUMENT_PATH = 'tests/fixtures/files/valid-passport.pdf';
export const INVALID_DOCUMENT_PATH = 'tests/fixtures/files/rejected-id.jpg';
