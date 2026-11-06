
import { test, expect } from '../fixtures/fixtures';

test.describe('SHOP-202: Product listing and sorting', () => {

  test('TC-01: Verify six products are displayed', async ({ inventoryPage }) => {
    await expect(inventoryPage.productItems).toHaveCount(6);

    const names = await inventoryPage.getProductNames();

    expect(names).toHaveLength(6);
  });

  test('TC-02: Verify default alphabetical sorting', async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();

    expect(names).toEqual([...names].sort());
  });

  const sortingScenarios = [
    {
      title: 'Sort products by price low to high',
      option: 'lohi',
      type: 'price',
      order: 'lohi'
    },
    {
      title: 'Sort products by price high to low',
      option: 'hilo',
      type: 'price',
      order: 'hilo'
    },
    {
      title: 'Sort products by name A to Z',
      option: 'az',
      type: 'name',
      order: 'az'
    },
    {
      title: 'Sort products by name Z to A',
      option: 'za',
      type: 'name',
      order: 'za'
    }
  ];

  for (const scenario of sortingScenarios) {
    test(`Verify ${scenario.title}`, async ({ inventoryPage }) => {

      // Step 1: Capture the original product data
      const originalData = scenario.type === 'name'
        ? await inventoryPage.getProductNames()
        : await inventoryPage.getProductPrices();

      // Step 2: Apply sorting
      await inventoryPage.sortProducts(scenario.option);

      // Step 3: Get the actual sorted data
      const actualData = scenario.type === 'name'
        ? await inventoryPage.getProductNames()
        : await inventoryPage.getProductPrices();

      // Step 4: Calculate expected data
      const expectedData = scenario.type === 'name'
        ? inventoryPage.getExpectedNames(originalData, scenario.order)
        : inventoryPage.getExpectedPrices(originalData, scenario.order);

      // Step 5: Validate
      expect(actualData).toEqual(expectedData);
    });
  }
});