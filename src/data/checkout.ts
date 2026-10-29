/** Dummy shipping details used for checkout tests. */
export const checkoutInfo = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
} as const;

/** Expected order summary for a single Sauce Labs Backpack (verified manually). */
export const backpackOrderSummary = {
  itemTotal: '$29.99',
  tax: '$2.40',
  total: '$32.39',
} as const;
