import { test, expect } from '@playwright/test';

test('Renders Correctly', async ({ page }) => {
  // GIVEN the user is on the login page
  await page.goto('http://localhost:3000/login');

  const logo = page.getByTestId('logo');
  await expect(logo).toBeVisible();
  await expect(page).toHaveTitle(/Login | Earnbetter/);
  const title = page.getByText(/Sign in/);
  await expect(title).toBeVisible();
  // Form
  const background = page.getByTestId('login-background');
  await expect(background).toBeVisible();
});

test('Redirects to /documents on valid login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('[data-test-id="email-input"]').click();
  await page
    .locator('[data-test-id="email-input"]')
    .fill('enrique@earnbetter.com'); // TODO: emails from secret
  await page.locator('[data-test-id="email-input"]').press('Tab');
  await page.locator('[data-test-id="password-input"]').fill('por!Qkikei7'); // TODO: passwords from secret
  await page.locator('[data-test-id="submit-button"]').click();
  await expect(page).toHaveURL('http://localhost:3000/documents');
});
