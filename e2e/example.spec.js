// @ts-check
import { test, expect } from '@playwright/test';

// Tests use baseURL from playwright.config.js (PW_BASE_URL or default http://localhost:5173)

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/vuExpert/);
});

test('has system dashboard heading', async ({ page }) => {
  await page.goto('/');

  // Expects page to have a heading with the name of System Health Dashboard.
  await expect(page.getByRole('heading', { name: 'System Health Dashboard' })).toBeVisible();
});
