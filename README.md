# KG Test Automation with Cypress

## Automation rationale

The automation focuses on the requirements that are both high-impact and stable enough to run repeatedly: login and logout (including error handling and token behaviour), access to the Campaign Landing Page and campaign list, filtering and pagination, error pages (Page not found and Something went wrong), and the bidding flow (viewing and filtering items, add-item form validation, and donated-items behaviour). These were chosen because they cover the main user journeys, align with the stated requirements (including accessibility via axe), and fit the Page Object Model already in the project.

## Additional steps with more time

1. Add API-level tests for auth and GraphQL so failures can be traced to front-end vs back-end.
2. Expand accessibility checks to cover all key pages with a single AAA-focused suite and consistent rule exclusions.
3. Add visual regression (e.g. Percy or Cypress screenshot diff) for landing and campaign layouts.
4. Introduce data-driven tests for form validation (invalid emails, boundary values, special characters).
5. Run the suite in CI with retries and failure reporting so regressions are caught on every commit.

## Help + Testing

The steps below will take you all the way through Cypress. It is assumed you have nothing installed except for node + git.

**If you get stuck, here is more help:**

* [Cypress Support](https://on.cypress.io/support)

### 1. Install Cypress

[Follow these instructions to install Cypress](https://on.cypress.io/installing-cypress)

## cd into the cloned repo
cd cypress-test

## install the node_modules
npm install

## start the cypress vm
npx cypress open

### 3. Add the project to Cypress

[Follow these instructions to add the project to Cypress](https://on.cypress.io/writing-your-first-test)

### 4. Run in Continuous Integration for more points

[Follow these instructions to run the tests in CI](https://on.cypress.io/continuous-integration)

## Troubleshooting
1. npm install cypress --save-dev
2. ./node_modules/.bin/cypress install
3. Run the app using npx cypress open or node_modules/.bin/cypress open
