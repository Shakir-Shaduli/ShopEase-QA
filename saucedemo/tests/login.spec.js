
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SHOP-201: SauceDemo Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-01: Login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-02: Login with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-03: Login with empty credentials', async ({ page }) => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toContainText(
      'Username is required'
    );
  });
});