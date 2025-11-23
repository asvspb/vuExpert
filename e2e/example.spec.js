// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Navigate to your application's URL
  await page.goto('http://localhost:5173/');

  // Expect the title to contain "Vue"
  await expect(page).toHaveTitle(/Vue/);
});

test('has main heading', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Check for the presence of the main heading
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Learning Project');
});