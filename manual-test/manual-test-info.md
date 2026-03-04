# Manual Test – Completed Assignment

## Instructions (as required)

- Create a list of test cases for the page.
- Log any bugs you may find, with all relevant information.
- Add any other information you think is necessary.
- Use a spreadsheet to create the test cases and bugs.

## Testing details

| Item | Value |
|------|--------|
| **Testing site URL** | https://auction.hiring.kgportal.com/ |
| **Test user email** | user@example.com |
| **Test user password** | cAcJrnkDXsHRncF9qHcm |

## Deliverables

| Deliverable | File | Description |
|-------------|------|-------------|
| Test cases | test-cases.csv | 24 test cases in spreadsheet format. Columns: ID, Module, Test Case, Preconditions, Steps, Expected Result, Priority, Status. |
| Bugs | bug-log.csv | 6 logged bugs with ID, Title, Module, Severity, Steps to Reproduce, Expected Result, Actual Result, Environment, Browser/Version, Status. |

## Test execution summary

| Metric | Count |
|--------|--------|
| Total test cases | 24 |
| Pass | 18 |
| Fail | 5 |
| Blocked | 1 |

**Pass:** TC01, TC04, TC06–TC10, TC12, TC15–TC24 (login with valid credentials, token handling, home/campaign/bidding flows, something went wrong, form validation).

**Fail:** TC02, TC03 (failed login error message not shown), TC11 (invalid URL shows redirect not Page not found), TC13, TC14 (AXE/AAA violations).

**Blocked:** TC05 (logout flow blocked by missing or unclear logout control).

## Requirements coverage

- **Log in/Log out:** Test cases TC01–TC05. Bugs B002, B005, B006.
- **Home page:** Test cases TC06–TC10. Campaign Landing, active/past campaigns, filter by location, pagination covered.
- **Error pages:** Test cases TC11–TC12. Bug B001 (Page not found).
- **Accessibility:** Test cases TC13–TC14. Bugs B003, B004.
- **Bidding process:** Test cases TC15–TC24. List items, filter, add, donated by me, edit, form validation (empty, error clear, incorrect value, confirmation modal) covered.

## Bug summary

| ID | Title | Severity |
|----|--------|----------|
| B001 | Invalid URL redirects to login instead of Page not found | High |
| B002 | No visible Log out / Sign out control | High |
| B003 | Accessibility: Color contrast violations (AXE) | High |
| B004 | Accessibility: aria-hidden-focus violation | Medium |
| B005 | Failed login does not always show explicit error message | High |
| B006 | Auth keys remain in localStorage when logout not used | Medium |

## How to use the spreadsheets

- **test-cases.csv:** Open in Excel, Google Sheets, or any CSV editor. Filter by Module or Status. Re-run tests and update Status (Pass/Fail/Blocked) as needed.
- **bug-log.csv:** Same. Add rows for new bugs; update Status (Open/Fixed/Won't fix) as development resolves issues.

## Additional notes

- Test user credentials above are required for all flows that need an authenticated session.
- For TC11 (Page not found), the app currently redirects unauthenticated users to login; requirement expects a dedicated ""Page not found"" message.
- For TC05 (Logout), verification of ""clears authorization token and user information from local storage"" depends on a visible and working logout control (see B002).
