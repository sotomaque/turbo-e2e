import { test, expect, chromium } from '@playwright/test';
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

test('Redirects to /documents on valid login', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({});
  await context.route('**/*', (route) => route.continue());
  const _page = await context.newPage();

  // SETUP /jwt/ requests are mocked to return a valid token
  const json = {
    refresh: 'mockRefreshToken',
    access: 'mockAccessToken',
  };
  await _page.route(`**/api/v1/jwt/`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json),
    })
  );

  // GIVEN the user is on the login _page
  await _page.goto('http://localhost:3000/login');

  // WHEN the user fills the form and submits
  await _page.locator('[data-test-id="email-input"]').click();
  await _page
    .locator('[data-test-id="email-input"]')
    .fill('test@earnbetter.com');
  await _page.locator('[data-test-id="email-input"]').press('Tab');
  await _page.locator('[data-test-id="password-input"]').fill('test');
  await _page.locator('[data-test-id="submit-button"]').click();

  // THEN the user is redirected to /documents
  await expect(_page).toHaveURL('http://localhost:3000/documents');
});

test('Shows error message on invalid login attemp', async () => {
  test.slow(); // Easy way to triple the default timeout

  // TODO: do i actually need this setup?
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({});
  await context.route('**/*', (route) => route.continue());
  const _page = await context.newPage();

  // GIVEN the user is on the login _page
  await _page.goto('http://localhost:3000/login');

  // WHEN the user fills the form and submits
  await _page.locator('[data-test-id="email-input"]').click();
  await _page
    .locator('[data-test-id="email-input"]')
    .fill('test@earnbetter.com');
  await _page.locator('[data-test-id="email-input"]').press('Tab');
  await _page.locator('[data-test-id="password-input"]').fill('test');
  const responsePromise = _page.waitForResponse(
    (resp) => resp.url().includes('/jwt/') && resp.status() === 401
  );

  await _page.locator('[data-test-id="submit-button"]').click();

  // THEN we should see a 401
  // with the error message "Whoops! Those credentials don`t look right."
  await responsePromise;
  await expect(_page).toHaveURL('http://localhost:3000/login');
  const errorMessage = _page.getByTestId('error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    'Whoops! Those credentials don`t look right.'
  );
});
