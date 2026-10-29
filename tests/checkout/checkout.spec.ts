import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';
import { products } from '../../src/data/products';
import { checkoutInfo, backpackOrderSummary } from '../../src/data/checkout';

test.describe('Checkout', () => {
  test.skip(!env.hasCredentials, 'SAUCE_PASSWORD not set - authenticated tests skipped');

  test.beforeEach(async ({ authenticatedInventory: inventory, cartPage }) => {
    await inventory.addToCart(products.backpack.name);
    await inventory.header.openCart();
    await cartPage.proceedToCheckout();
  });

  test('TC-CHK-002 empty info shows first name required', async ({ checkoutPage }) => {
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('TC-CHK-006 complete order end to end', { tag: '@smoke' }, async ({ checkoutPage }) => {
    await checkoutPage.fillShippingInfo(checkoutInfo);
    await checkoutPage.continue();
    await expect(checkoutPage.itemTotal).toContainText(backpackOrderSummary.itemTotal);
    await expect(checkoutPage.tax).toContainText(backpackOrderSummary.tax);
    await expect(checkoutPage.total).toContainText(backpackOrderSummary.total);
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
