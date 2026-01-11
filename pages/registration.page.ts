import { Page } from '@playwright/test';
import { UserData } from '../tests/types';

export class RegistrationPage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async fillRegistrationForm(userData: UserData): Promise<void> {
    await this.page.fill('#email', userData.email);
    await this.page.fill('#password', userData.password);
    await this.page.fill('#phone', userData.phone);
  }

  async submitRegistration(): Promise<void> {
    await this.page.click('button[type="submit"]');
  }

  async registerUser(userData: UserData): Promise<void> {
    await this.fillRegistrationForm(userData);
    await this.submitRegistration();
  }

  async getErrorMessage(): Promise<string> {
    try {
      const errorElement = this.page.locator('.alert-error').first();
      await errorElement.waitFor({ timeout: 2000 });
      const text = await errorElement.textContent();
      return text ?? '';
    } catch {
      return '';
    }
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForSelector('h2:has-text("Complete Your KYC Verification")', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
