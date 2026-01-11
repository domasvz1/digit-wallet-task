import { Page } from '@playwright/test';

export class KycPage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async uploadDocument(filePath: string): Promise<void> {
    const fileInput = this.page.locator('.dropzone input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  async waitForVerificationComplete(): Promise<void> {
    await this.page.waitForSelector('h2:has-text("Welcome to Your Dashboard"), h2:has-text("Document Verification Failed")', {
      timeout: 25000,
    });
  }

  async isDocumentUploadVisible(): Promise<boolean> {
    const uploadArea = this.page.locator('.dropzone');
    return uploadArea.isVisible();
  }

  async isVerificationComplete(): Promise<boolean> {
    const completeText = this.page.locator('h2:has-text("Welcome to Your Dashboard")');
    return completeText.isVisible();
  }

  async canAccessFeatures(): Promise<boolean> {
    const sendPaymentButton = this.page.locator('button:has-text("Send Payment")');
    return sendPaymentButton.isVisible();
  }
}
