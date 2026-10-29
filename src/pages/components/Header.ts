import { Page, Locator } from '@playwright/test';

/** Header and burger menu shared by every page after login. */
export class Header {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly menuItems: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn, [data-test="open-menu"]').first();
    this.menuItems = page.locator('.bm-item');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }
}
