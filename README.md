# Playwright TypeScript Automation Project

End-to-end test automation project built using **Playwright with TypeScript** for testing the [Automation Exercise](https://automationexercise.com/) web application.

## Project Overview

This project demonstrates automated testing of common e-commerce user workflows, including:

- User signup
- Product selection
- Add to cart
- Checkout
- Payment
- Logout
- Negative testing for existing email registration
- Negative testing for invalid login credentials

## Tech Stack

- **Automation Tool:** Playwright
- **Programming Language:** TypeScript
- **Test Framework:** Playwright Test
- **Browser Coverage:** Chromium, Firefox, WebKit
- **Package Manager:** npm
- **Version Control:** Git & GitHub
- **CI/CD:** GitHub Actions

## Test Scenarios

### 1. Signup to Checkout

**File:** `automation/signup-checkout.spec.ts`

Covers the complete e-commerce flow:

1. Open Automation Exercise
2. Navigate to Signup / Login
3. Create a new user account
4. Complete registration
5. Verify account creation
6. Navigate to Products
7. Open product details
8. Verify product information
9. Add product to cart
10. Update product quantity
11. View cart
12. Proceed to checkout
13. Verify delivery address
14. Place order
15. Enter payment information
16. Confirm order
17. Verify order placement
18. Logout

A unique email address is generated for every test run to prevent duplicate-account conflicts.

### 2. Existing Email Signup - Negative Test

**File:** `automation/existing-email-signup.spec.ts`

Validates that the application prevents registration using an already registered email address.

**Expected Result:**

`Email Address already exist!`

### 3. Login - Negative Test

**File:** `automation/LogIn_Negative.spec.ts`

Validates login behavior using invalid credentials and verifies that the appropriate error message is displayed.

## Project Structure

```text
automation-exercise-playwright/
│
├── automation/
│   ├── signup-checkout.spec.ts
│   ├── existing-email-signup.spec.ts
│   └── LogIn_Negative.spec.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
