class LoginPage {
  getEmailLabel() {
    return cy.contains('label', 'Email')
  }

  getEmailInput() {
    return cy.get('#username-field')
  }

  getPasswordLabel() {
    return cy.contains('label', 'Password')
  }

  getPasswordInput() {
    return cy.get('#password-field')
  }

  getLoginButton() {
    return cy.contains('button', 'Sign in')
  }

  getErrorMessage() {
    return cy.get('[role="alert"], .error, [class*="error"], .alert')
  }

  getLoginForm() {
    return cy.get('form').first()
  }

  login(email, password) {
    this.getEmailInput().clear().type(email)
    this.getPasswordInput().clear().type(password)
    this.getLoginButton().click()
  }
}

export default LoginPage