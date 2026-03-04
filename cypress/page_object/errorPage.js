class ErrorPage {
  getNotFoundMessage() {
    return cy.contains('body', /Page not found|404|Not found/i)
  }

  getSomethingWentWrongMessage() {
    return cy.contains('body', /Something went wrong/i)
  }
}

export default ErrorPage
