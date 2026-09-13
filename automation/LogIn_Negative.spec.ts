import { test, expect } from '@playwright/test';

test('Scenario: invalid credentials do not log the user in', async ({ page }) => {
	await page.goto('https://automationexercise.com/');
	await page.getByRole('link', { name: /Signup \/ Login/ }).click();

	await expect(page).toHaveURL(/login/);
	await page.locator('input[data-qa="login-email"]').fill('invalid.user@example.com');
	await page.locator('input[data-qa="login-password"]').fill('InvalidPassword123!');
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
	await expect(page.getByRole('link', { name: /Signup \/ Login/ })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Logout' })).not.toBeVisible();
	await expect(page.getByText(/Logged in as/)).not.toBeVisible();
});