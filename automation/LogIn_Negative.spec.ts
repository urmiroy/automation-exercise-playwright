import { test, expect } from '@playwright/test';

test('Scenario: invalid credentials do not log the user in', async ({ page }) => {
  // Open the Automation Exercise homepage
  await page.goto('https://automationexercise.com/');

  // Click on the Signup / Login link
  await page.getByRole('link', { name: /Signup \/ Login/ }).click();

  // Verify that the Login page is displayed
  await expect(page).toHaveURL(/login/);

  // Enter an invalid email address
  await page.locator('input[data-qa="login-email"]').fill('invalid.user@example.com');

  // Enter an invalid password
  await page.locator('input[data-qa="login-password"]').fill('InvalidPassword123!');

  // Click the Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the invalid credentials error message is displayed
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

  // Verify that the user remains on the Login page
  await expect(
    page.getByRole('heading', { name: 'Login to your account' })
  ).toBeVisible();

  // Verify that the Signup / Login link is still visible
  await expect(
    page.getByRole('link', { name: /Signup \/ Login/ })
  ).toBeVisible();

  // Verify that the Logout link is NOT displayed
  await expect(
    page.getByRole('link', { name: 'Logout' })
  ).not.toBeVisible();

  // Verify that the user is NOT logged in
  await expect(
    page.getByText(/Logged in as/)
  ).not.toBeVisible();
});