import { test as base, expect } from '@playwright/test';
import { env } from '../config/env';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

interface Fixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Inventory page reached after a real UI login. Needs SAUCE_PASSWORD. */
  authenticatedInventory: InventoryPage;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  authenticatedInventory: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(env.username, env.password);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect };
