
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('SHOP-202: Product listing and sorting', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    inventoryPage = new InventoryPage(page);
  });

  test('TC-01: Verify six products are displayed', async () => {
  await expect(inventoryPage.productItems).toHaveCount(6);

  const names = await inventoryPage.getProductNames();

  expect(names).toHaveLength(6);
});

  test('TC-02: Verify default alphabetical sorting', async () => {
    const names = await inventoryPage.getProductNames();

    expect(names).toEqual([...names].sort());
  });

  test('TC-03: Sort products by price low to high', async () => {
    await inventoryPage.sortProducts('lohi');

    const prices = await inventoryPage.getProductPrices();

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-04: Sort products by price high to low', async () => {
    await inventoryPage.sortProducts('hilo');

    const prices = await inventoryPage.getProductPrices();

    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-05: Sort products by name Z to A', async () => {
    await inventoryPage.sortProducts('za');

    const names = await inventoryPage.getProductNames();

    expect(names).toEqual([...names].sort().reverse());
  });
  test('TC-06: Sort products by name A to Z', async () => {
  await inventoryPage.sortProducts('az');

  const names = await inventoryPage.getProductNames();

  expect(names).toEqual([...names].sort());
});
});