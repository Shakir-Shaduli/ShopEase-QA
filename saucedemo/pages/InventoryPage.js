export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
  }
  async getProductNames() {
    return await this.productItems.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productItems.locator('.inventory_item_price').allTextContents();

    return prices.map(price => Number(price.replace('$', '')));
  }

  async sortProducts(option) {
    await this.sortDropdown.selectOption(option);
  }

  getExpectedNames(originalNames, order) {
    const expectedNames = [...originalNames].sort((a, b) =>
      a.localeCompare(b)
    );

    if (order === 'za') {
      expectedNames.reverse();
    }

    return expectedNames;
  }

  getExpectedPrices(originalPrices, order) {
    const expectedPrices = [...originalPrices].sort((a, b) =>
      order === 'lohi' ? a - b : b - a
    );

    return expectedPrices;
  }
}
