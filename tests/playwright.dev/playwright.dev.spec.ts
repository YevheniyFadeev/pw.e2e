import { test, expect } from '@playwright/test';

test('PW-1 switch to the correct links', async ({ page }) => { 
  await page.goto('https://playwright.dev/');
  const pageNew = page.waitForEvent('popup');
  await page.locator('img[alt="VS Code"]').click(); // пошук за атрибутом alt
  const pageVS = await pageNew;
  await pageVS.waitForLoadState();
  await expect(pageVS).toHaveURL('https://code.visualstudio.com/');
});

test('PW-2 search works correctly', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.locator('.DocSearch-Button-Placeholder').click(); // пошук за class="DocSearch-Hit-title"
  await page.locator('.DocSearch-Input').fill('test');
  await page.getByRole('link', { name: 'Writing tests' }).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/writing-tests');
});

test('PW-3 switch from theme to theme', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const currentTheme = await page.getAttribute('html', 'data-theme');
  await page.locator('button[title*="dark and light mode"]').click(); // пошук за атрибутом title
  const newTheme = await page.getAttribute('html', 'data-theme');
  expect(newTheme).not.toBe(currentTheme);
  await page.locator('button[title*="dark and light mode"]').click();
  const revertedTheme = await page.getAttribute('html', 'data-theme');
  expect(revertedTheme).toBe(currentTheme);
});