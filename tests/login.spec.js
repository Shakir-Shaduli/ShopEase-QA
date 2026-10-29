
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