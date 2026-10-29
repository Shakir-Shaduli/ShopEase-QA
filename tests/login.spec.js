
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';

test('TC-01: Login with valid credentials', async ({ page }) => {
  // Arrange: Open the login page
   const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('student', 'Password123');

  // Assert: Verify successful login and destination
  await expect(page).toHaveURL(
    /\/logged-in-successfully\/$/
  );

  await expect(
    page.getByRole('heading', { name: 'Logged In Successfully' })
  ).toBeVisible();
});
test('TC-02: Login with incorrect password', async ({ page }) => {
  // Arrange: Open the login page
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('student', 'incorrectPassword');

  // Assert: Verify the invalid-password error

  await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});
test('TC-03: Login with incorrect username', async ({ page }) => {
  // Arrange: Open the login page
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('unknown_student', 'Password123');

  // Assert: Verify the invalid-username error

  await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});
test('TC-04: Reject login when both fields are empty', async ({ page }) => {
  const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.submit();

await expect(page.locator('#error')).toHaveText(
  'Your username is invalid!'
);
});
test('TC-04b: Reject login when username field is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await page.getByLabel('Password').fill('Password123');
  await loginPage.submit();

  await expect(page.locator('#error')).toHaveText(
    'Your username is invalid!'
  );
});
test('TC-04c: Reject login when password field is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await page.getByLabel('Username').fill('student');
  await loginPage.submit();

  await expect(page.locator('#error')).toHaveText(
    'Your password is invalid!'
  );
});
test('TC-05: Password field masks input', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(page.getByLabel('Password'))
  .toHaveAttribute('type', 'password');
});

test.describe('SHOP-102: Logout functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('student', 'Password123');
  });

  test('TC-01: Logout link is visible after login', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Log out' })
    ).toBeVisible();
  });

  test('TC-02: Clicking logout navigates to login page', async ({ page }) => {
    await loginPage.logout();

    await expect(page).toHaveURL(
      'https://practicetestautomation.com/practice-test-login/'
    );
  });

  test('TC-03: Browser Back after logout returns to logged-in page', async ({ page }) => {
    await loginPage.logout();
    await page.goBack();

    await expect(page).toHaveURL(
      'https://practicetestautomation.com/logged-in-successfully/'
    );
  });
});