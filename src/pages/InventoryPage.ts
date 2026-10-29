import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './components/Header';

export type SortOption =
  'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  readonly header: Header;
  readonly items: Locator;
  readonly prices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.items = page.locator('[data-test="inventory-item"]');
    this.prices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${toSlug(productName)}"]`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${toSlug(productName)}"]`).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.prices.allInnerTexts();
    return texts.map((text) => parseFloat(text.replace('$', '')));
  }
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/ /g, '-');
}
