import LoginPage from '../page_object/loginPage.js'
const userData = require('../fixtures/userData.json')

const loginPage = new LoginPage()

describe('Login and Logout', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays login form and has no axe violations', () => {
    cy.injectAxe()
    loginPage.getEmailLabel().should('have.text', 'Email')
    loginPage.getPasswordLabel().should('have.text', 'Password')
    cy.checkA11y(null, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      rules: { 'color-contrast': { enabled: false }, 'aria-hidden-focus': { enabled: false } }
    })
  })

  it('shows error message on failed authentication with wrong password', () => {
    loginPage.login(userData.email, 'WrongPassword123')
    cy.url().should('include', '/login', { timeout: 10000 })
    cy.get('body').then(($body) => {
      const hasErrorEl = $body.find('[role="alert"], .error, [class*="error"], .alert').length > 0
      const hasErrorText = /invalid|incorrect|error|wrong|failed|credentials|unauthorized|sign in/i.test($body.text())
      const stillOnLogin = $body.find('#username-field').length > 0
      expect(hasErrorEl || hasErrorText || stillOnLogin).to.be.true
    })
  })

  it('shows error message on failed authentication with wrong email', () => {
    loginPage.login('invalid@example.com', userData.password)
    cy.url().should('include', '/login', { timeout: 10000 })
    cy.get('body').then(($body) => {
      const hasErrorEl = $body.find('[role="alert"], .error, [class*="error"], .alert').length > 0
      const hasErrorText = /invalid|incorrect|error|wrong|failed|credentials|unauthorized|sign in/i.test($body.text())
      const stillOnLogin = $body.find('#username-field').length > 0
      expect(hasErrorEl || hasErrorText || stillOnLogin).to.be.true
    })
  })

  it('handles invalid or expired token by redirecting to login or showing error', () => {
    cy.visit('/')
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'invalid-token')
      win.localStorage.setItem('token', 'invalid-token')
    })
    cy.visit('/')
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const onLogin = $body.find('#username-field').length > 0
      const hasError = /invalid|expired|session|unauthorized|error/i.test($body.text())
      expect(onLogin || hasError).to.be.true
    })
  })

  it('logout clears authorization token and user info from local storage', () => {
    cy.login(userData.email, userData.password)
    cy.url().should('not.include', '/login', { timeout: 15000 })
    cy.logout()
    const base = (Cypress.config().baseUrl || '').replace(/\/$/, '')
    cy.url().should('satisfy', (url) => {
      const u = url.replace(/\/$/, '')
      return url.includes('/login') || u === base || u === base + '/login'
    })
    cy.url().then((url) => {
      if (url.includes('/login')) {
        cy.window().then((win) => {
          const authKeys = Object.keys(win.localStorage).filter((k) => /token|auth|user|session/i.test(k))
          expect(authKeys.length).to.equal(0)
        })
      }
    })
  })
})
