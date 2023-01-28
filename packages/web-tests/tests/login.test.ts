import { test, expect } from '@playwright/test';

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

test('Redirects to /documents on valid login', async ({ page, request }) => {
  // GIVEN the user is on the login page
  await page.goto('http://localhost:3000/login');

  // AND the login requeset is mocked to return a valid token
  const json = {
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTg5NDgxMywiaWF0IjoxNjc0MzU4ODEzLCJqdGkiOiJlZjY2OWFiODkwNDk0N2YxYjRmNTUxY2E3YzA4YmZiNyIsInVzZXJfaWQiOjV9.aLdmBHBFqO-anq1RBb1PJGS4IW7qXG9N9Uf3o36KTlw',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1ODk0ODEzLCJpYXQiOjE2NzQzNTg4MTMsImp0aSI6IjUwZjZhMWQ2Yzk2NTQxYzY5ZGE0NzhhNmJiYWI4OTE2IiwidXNlcl9pZCI6NX0.vDre4pK8fWGvt5jkXDWmGxy2lgbaYxTUCKn2kYoO8L4',
  };
  await request.post('http://localhost:8000/api/v1/jwt/', {
    data: json,
  });

  // WHEN the user fills the form and submits
  await page.goto('http://localhost:3000/login');
  await page.locator('[data-test-id="email-input"]').click();
  await page
    .locator('[data-test-id="email-input"]')
    .fill('enrique@earnbetter.com'); // TODO: emails from secret
  await page.locator('[data-test-id="email-input"]').press('Tab');
  await page.locator('[data-test-id="password-input"]').fill('por!Qkikei7'); // TODO: passwords from secret
  await page.locator('[data-test-id="submit-button"]').click();

  // THEN the user is redirected to /documents
  await expect(page).toHaveURL('http://localhost:3000/documents');
});
