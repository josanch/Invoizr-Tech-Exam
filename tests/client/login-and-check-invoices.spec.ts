import { test, expect } from '@playwright/test';

test('Log in and check if the invoice page has invoices', async ({ page }) => {
  // Step 1: Go to the login page
  await page.goto('http://localhost:5173/login');

  // Step 2: Fill in credentials and submit
  await page.fill('input#email', 'john@example.com'); 
  await page.fill('input#password', '1234567');
  await page.click('button[type="submit"]');

  // Step 3: Verify login
  await expect(page.locator('h2.text-2xl.font-bold')).toHaveText('Dashboard');

  // Step 4: Navigate to the invoices page
  await page.goto('http://localhost:5173/invoices'); 

  // Step 5: Wait for invoices
  // Wait for the invoices API response 
  await page.waitForResponse((response) =>
    response.url().includes('/invoices') && response.status() === 200
  );

  // Ensure the invoices container is visible
  await expect(page.locator('#invoices-container')).toBeVisible();

  // Verify at least one invoice
  const invoices = await page.locator('.invoice-item');
  const count = await invoices.count();
  expect(count).toBeGreaterThan(0);
});
