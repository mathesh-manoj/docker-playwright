import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';
import { products, PRODUCT_COUNT, menuLabels } from '../../src/data/products';

test.describe('Inventory', () => {
  test.skip(!env.hasCredentials, 'SAUCE_PASSWORD not set - authenticated tests skipped');

  test(
    'TC-INV-001 all products are listed',
    { tag: '@smoke' },
    async ({ authenticatedInventory: inventory }) => {
      await expect(inventory.items).toHaveCount(PRODUCT_COUNT);
    },
  );

  test('TC-INV-002 sort price low to high', async ({ authenticatedInventory: inventory }) => {
    await inventory.sortBy('Price (low to high)');
    const prices = await inventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-INV-003 sort price high to low', async ({ authenticatedInventory: inventory }) => {
    await inventory.sortBy('Price (high to low)');
    const prices = await inventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-INV-005 add item updates cart badge', async ({ authenticatedInventory: inventory }) => {
    await inventory.addToCart(products.backpack.name);
    await expect(inventory.header.cartBadge).toHaveText('1');
  });

  test('TC-INV-006 remove item clears cart badge', async ({
    authenticatedInventory: inventory,
  }) => {
    await inventory.addToCart(products.backpack.name);
    await inventory.removeFromCart(products.backpack.name);
    await expect(inventory.header.cartBadge).toHaveCount(0);
  });

  test('TC-INV-009 burger menu lists expected options', async ({
    authenticatedInventory: inventory,
  }) => {
    await inventory.header.openMenu();
    await expect(inventory.header.menuItems).toHaveText([...menuLabels]);
  });

  test('TC-SESS-001 logout returns to login', async ({
    authenticatedInventory: inventory,
    page,
  }) => {
    await inventory.header.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
