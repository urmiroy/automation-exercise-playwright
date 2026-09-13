import { test, expect } from '@playwright/test';

test('Scenario 1: sign up, shop, checkout, and log out', async ({ page }) => {
  const email = `playwright.${Date.now()}@example.com`;
  const password = 'Playwright123!';

  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: /Signup \/ Login/ }).click();

  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  await page.locator('input[data-qa="signup-name"]').fill('Playwright User');
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  await expect(page).toHaveURL(/signup/);
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(password);
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1990');
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();
  await page.locator('#first_name').fill('Playwright');
  await page.locator('#last_name').fill('User');
  await page.locator('#company').fill('Test Company');
  await page.locator('#address1').fill('10 Test Street');
  await page.locator('#address2').fill('Test District');
  await page.locator('#country').selectOption({ label: 'United States' });
  await page.locator('#state').fill('California');
  await page.locator('#city').fill('San Francisco');
  await page.locator('#zipcode').fill('94105');
  await page.locator('#mobile_number').fill('4155550100');
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText('Logged in as Playwright User')).toBeVisible();

  await page.getByRole('link', { name: /Products/ }).click();
  await page.locator('a[href="/product_details/1"]').click();

  await expect(page).toHaveURL(/product_details\/1/);
  await expect(page.locator('.product-information h2')).toHaveText('Blue Top');
  await expect(page.locator('.product-information')).toContainText('Rs. 500');

  await page.locator('#quantity').fill('2');
  await page.getByText('Add to cart', { exact: true }).click();
  await page.getByRole('link', { name: /View Cart/ }).click();

  await expect(page).toHaveURL(/view_cart/);
  await expect(page.locator('#cart_info_table')).toContainText('Blue Top');
  await expect(page.locator('.cart_quantity button')).toHaveText('2');

  await page.getByText('Proceed To Checkout', { exact: true }).click();

  await expect(page).toHaveURL(/checkout/);
  await expect(page.locator('#address_delivery')).toContainText('Playwright User');
  await expect(page.locator('#cart_info')).toContainText('Blue Top');

  await page.getByText('Place Order', { exact: true }).click();

  await expect(page).toHaveURL(/payment/);
  await page.locator('[data-qa="name-on-card"]').fill('Playwright User');
  await page.locator('[data-qa="card-number"]').fill('4111111111111111');
  await page.locator('[data-qa="cvc"]').fill('123');
  await page.locator('[data-qa="expiry-month"]').fill('12');
  await page.locator('[data-qa="expiry-year"]').fill('2030');

  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  await expect(page.getByText('Order Placed!')).toBeVisible();

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
});