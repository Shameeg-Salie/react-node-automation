import { test, expect } from '@playwright/test';

test.describe('UI Negative Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Login fails with invalid credentials and shows inline error', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('wronguser');
    await page.getByPlaceholder('Password').fill('wrongpass');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMsg = page.getByRole('alert');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Invalid username or password.');
  });
});
