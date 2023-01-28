import { test, expect } from '@playwright/test';
import { dotenvLoad } from 'dotenv-mono';

dotenvLoad(); // Dotenv instance

test('Renders Correctly', async ({ page }) => {
  // GIVEN the user is on the login page
  await page.goto('http://localhost:3000/login');

  // THEN the page renders correctly
  const logo = page.getByTestId('logo');
  await expect(logo).toBeVisible();
  await expect(page).toHaveTitle(/Login | Earnbetter/);
  const title = page.getByText(/Sign in/);
  await expect(title).toBeVisible();
  const background = page.getByTestId('login-background');
  await expect(background).toBeVisible();
});

test('Redirects to /documents on valid login', async ({ page }) => {
  // SETUP /jwt/ requests are mocked to return a valid token
  const json = {
    refresh: 'mockRefreshToken',
    access: 'mockAccessToken',
  };
  await page.route(`**/api/v1/jwt/`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json),
    })
  );

  // GIVEN the user is on the login _page
  await page.goto('http://localhost:3000/login');

  // WHEN the user fills the form and submits
  await page.locator('[data-test-id="email-input"]').click();
  await page
    .locator('[data-test-id="email-input"]')
    .fill('test@earnbetter.com');
  await page.locator('[data-test-id="email-input"]').press('Tab');
  await page.locator('[data-test-id="password-input"]').fill('test');
  await page.locator('[data-test-id="submit-button"]').click();

  // THEN the user is redirected to /documents
  await expect(page).toHaveURL('http://localhost:3000/documents');
});

test('Shows error message on invalid login attemp', async ({ page }) => {
  // GIVEN the user is on the login _page
  await page.goto('http://localhost:3000/login');

  // WHEN the user fills the form and submits
  await page.locator('[data-test-id="email-input"]').click();
  await page
    .locator('[data-test-id="email-input"]')
    .fill('test@earnbetter.com');
  await page.locator('[data-test-id="email-input"]').press('Tab');
  await page.locator('[data-test-id="password-input"]').fill('test');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('/jwt/') && resp.status() === 401
  );

  await page.locator('[data-test-id="submit-button"]').click();

  // THEN we should see a 401
  // with the error message "Whoops! Those credentials don`t look right."
  await responsePromise;
  await expect(page).toHaveURL('http://localhost:3000/login');
  const errorMessage = page.getByTestId('error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    'Whoops! Those credentials don`t look right.'
  );
});
