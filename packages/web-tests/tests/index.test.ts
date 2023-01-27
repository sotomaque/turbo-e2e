import { test, expect } from '@playwright/test';

test('homepage has a button', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const myButton = page.getByRole('button', {
    name: /Boop/i,
  });

  await expect(myButton).toBeVisible();
});
