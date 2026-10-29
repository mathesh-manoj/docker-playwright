import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';
import { products } from '../../src/data/products';

test.describe('Cart', () => {
  test.skip(!env.hasCredentials, 'SAUCE_PASSWORD not set - authenticated tests skipped');

  test('TC-CART-001 cart shows added item', async ({
    authenticatedInventory: inventory,
    cartPage,
  }) => {
    await inventory.addToCart(products.backpack.name);
    await inventory.header.openCart();
    await cartPage.expectLoaded();
    await expect(cartPage.items).toHaveCount(1);
  });
});
