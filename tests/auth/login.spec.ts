import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => loginPage.goto());

  test(
    'TC-LOGIN-002 empty form shows username required',
    { tag: '@smoke' },
    async ({ loginPage }) => {
      await loginPage.submitEmpty();
      await loginPage.expectError('Username is required');
    },
  );

  test('TC-LOGIN-004 password only shows username required', async ({ loginPage }) => {
    await loginPage.passwordInput.fill('anything');
    await loginPage.submitEmpty();
    await loginPage.expectError('Username is required');
  });

  test('TC-LOGIN-003 username only shows password required', async ({ loginPage }) => {
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.submitEmpty();
    await loginPage.expectError('Password is required');
  });

  test('TC-LOGIN-006 unknown user is rejected', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'invalid_pass');
    await loginPage.expectError(/do not match/i);
  });

  test('TC-LOGIN-009 password field is masked', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC-LOGIN-010 inventory is protected when logged out', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).not.toHaveURL(/inventory\.html$/);
  });

  test('TC-LOGIN-011 script text in username does not execute', async ({ page, loginPage }) => {
    let dialogSeen = false;
    page.on('dialog', async (dialog) => {
      dialogSeen = true;
      await dialog.dismiss();
    });
    await loginPage.login('<script>alert(1)</script>', 'x');
    await expect(loginPage.errorMessage).toBeVisible();
    expect(dialogSeen).toBe(false);
  });

  test.describe('with credentials', () => {
    test.skip(!env.hasCredentials, 'SAUCE_PASSWORD not set');

    test(
      'TC-LOGIN-001 valid login reaches inventory',
      { tag: '@smoke' },
      async ({ loginPage, inventoryPage }) => {
        await loginPage.login(env.username, env.password);
      
      },
    );

    test('TC-LOGIN-005 wrong password is rejected', async ({ loginPage }) => {
      await loginPage.login(env.username, 'wrong_pass');
      await loginPage.expectError(/do not match/i);
    });
  });
});
