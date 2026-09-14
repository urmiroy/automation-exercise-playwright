import { test, expect } from '@playwright/test';

test('Scenario 1: Signup - Checkout', async ({ page }) => {

  // Generate a unique email and password 
  const email = `sonam.${Date.now()}@example.com`;
  const password = 'Playwright123!';


  //Signup//

  // step 1: visit the Automation Exercise homepage
  await page.goto('https://automationexercise.com/');

  // step 2: Navigate to the Signup / Login page
  await page.getByRole('link', { name: /Signup \/ Login/ }).click();

  // Verify that the New User Signup section is displayed
  await expect(
    page.getByRole('heading', { name: 'New User Signup!' })
  ).toBeVisible();

  // Enter the new user's name
  await page.locator('input[data-qa="signup-name"]').fill('Sonam Kapoor');

  // Enter the unique email address
  await page.locator('input[data-qa="signup-email"]').fill(email);

  // Click the Signup button
  await page.getByRole('button', { name: 'Signup' }).click();

  // Verify that the account registration page is displayed
  await expect(page).toHaveURL(/signup/);

  // Select gender
  await page.locator('#id_gender1').check();

  // Enter account password
  await page.locator('#password').fill(password);


// Generate random date of birth for an adult user
const randomDay = String(Math.floor(Math.random() * 28) + 1);
const randomMonth = String(Math.floor(Math.random() * 12) + 1);
const randomYear = String(Math.floor(Math.random() * 15) + 1985);

// Select random date of birth
await page.locator('#days').selectOption(randomDay);
await page.locator('#months').selectOption(randomMonth);
await page.locator('#years').selectOption(randomYear);


  // Subscribe to newsletter and special offers
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();

  // Enter user's personal information
  await page.locator('#first_name').fill('Sonam');
  await page.locator('#last_name').fill('Kapoor');

  // Enter company and address information
  await page.locator('#company').fill('Test Company');
  await page.locator('#address1').fill('10 Test Street');
  await page.locator('#address2').fill('Test District');

  // Select country
  await page.locator('#country').selectOption({ label: 'United States' });

  // Enter location details
  await page.locator('#state').fill('California');
  await page.locator('#city').fill('San Francisco');
  await page.locator('#zipcode').fill('94105');
  await page.locator('#mobile_number').fill('4155550100');

  // Create the new user account
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Verify that the account was successfully created
  await expect(page.getByText('Account Created!')).toBeVisible();

  // Continue after account creation
  await page.getByRole('link', { name: 'Continue' }).click();

  // Verify that the user is logged in
  await expect(
    page.getByText('Logged in as Sonam Kapoor')
  ).toBeVisible();


  //PRODUCT PAGE //

  // Navigate to the Products page
  await page.getByRole('link', { name: /Products/ }).click();

   // Verify that the product details page is displayed
  await expect(page).toHaveURL(/products/);

// Open Summer White Top product details
await page.locator('a[href="/product_details/6"]').click();

// Verify that the Summer White Top product details page is displayed
await expect(page).toHaveURL(/product_details\/6/);

 // Verify the product name
  await expect(
    page.locator('.product-information h2')
  ).toHaveText('Summer White Top');

  // Verify the product price
  await expect(
    page.locator('.product-information')
  ).toContainText('Rs. 400');

  // Set the product quantity to 2
  await page.locator('#quantity').fill('2');

  // Add the product to the cart
  await page.getByText('Add to cart', { exact: true }).click();


  //--------------Add product to cart--------------//

  // Open the shopping cart
  await page.getByRole('link', { name: /View Cart/ }).click();

  // Verify that the cart page is displayed
  await expect(page).toHaveURL(/view_cart/);

  // Verify that the selected product is in the cart
  await expect(
    page.locator('#cart_info_table')
  ).toContainText('Summer White Top');

  // Verify that the product quantity is 2
  await expect(
    page.locator('.cart_quantity button')
  ).toHaveText('2');

  // Proceed to checkout
  await page.getByText('Proceed To Checkout', { exact: true }).click();

  // Verify that the checkout page is displayed
  await expect(page).toHaveURL(/checkout/);

  // Verify the delivery address
  await expect(
    page.locator('#address_delivery')
  ).toContainText('Sonam Kapoor');

  // Verify that the selected product appears in the order summary
  await expect(
    page.locator('#cart_info')
  ).toContainText('Summer White Top');

  // Place the order
  await page.getByText('Place Order', { exact: true }).click();

  // Verify that the payment page is displayed
  await expect(page).toHaveURL(/payment/);

  // Enter payment information
  await page.locator('[data-qa="name-on-card"]').fill('Tom Cruise');
  await page.locator('[data-qa="card-number"]').fill('4111111111111111');
  await page.locator('[data-qa="cvc"]').fill('123');
  await page.locator('[data-qa="expiry-month"]').fill('12');
  await page.locator('[data-qa="expiry-year"]').fill('2030');

  // Submit the payment and confirm the order
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // Verify that the order was successfully placed
  await expect(page.getByText('Order Placed!')).toBeVisible();

  // Logout from the application
  await page.getByRole('link', { name: 'Logout' }).click();

  // Verify that the user is redirected to the Login page
  await expect(page).toHaveURL(/login/);

  // Verify that the Login page is displayed
  await expect(
    page.getByRole('heading', { name: 'Login to your account' })
  ).toBeVisible();
});