// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
 // Замените на URL вашего приложения
  await page.goto('http://localhost:5173/');

  // Ожидаем, что заголовок содержит "Vue"
  await expect(page).toHaveTitle(/Vue/);
});

test('has main heading', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Проверяем наличие основного заголовка
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Learning Project');
});