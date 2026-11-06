import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export const test = base.extend({
  inventoryPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);

    await page.locator('.inventory_item').first().waitFor();

    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';