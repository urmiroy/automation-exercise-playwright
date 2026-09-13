import { test, expect } from '@playwright/test';

test('Scenario 2: Sign up with an existing email', async ({ page }) => {

  await page.goto('https://automationexercise.com/');

  // Go to Signup / Login
  await page.getByRole('link', { name: /Signup \/ Login/ }).click();

  // Verify Signup section
  await expect(
    page.getByRole('heading', { name: 'New User Signup!' })
  ).toBeVisible();

  // Enter name
  await page
    .locator('input[data-qa="signup-name"]')
    .fill('Test User');

  // Enter existing email
  await page
    .locator('input[data-qa="signup-email"]')
    .fill('demo.manage@yopmail.com');

  // Click Signup
  await page.getByRole('button', { name: 'Signup' }).click();

  // Verify existing email error
  await expect(
    page.getByText('Email Address already exist!')
  ).toBeVisible();
});