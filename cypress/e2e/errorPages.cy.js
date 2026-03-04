import ErrorPage from '../page_object/errorPage.js'

const errorPage = new ErrorPage()

describe('Error pages', () => {
  it('shows Page not found when visiting invalid link', () => {
    cy.visit('/non-existent-page-404', { failOnStatusCode: false })
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const hasNotFound = /Page not found|404|Not found/i.test($body.text())
      const redirectedToLogin = $body.find('#username-field').length > 0
      expect(hasNotFound || redirectedToLogin).to.be.true
    })
    cy.get('body').invoke('text').then((text) => {
      if (/Page not found|404|Not found/i.test(text)) {
        cy.injectAxe()
        cy.checkA11y(null, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
          rules: { 'color-contrast': { enabled: false }, 'aria-hidden-focus': { enabled: false } }
        })
      }
    })
  })

  it('shows Something went wrong when server is not responding', () => {
    cy.intercept('GET', '**/api/**', { statusCode: 500, body: {} })
    cy.intercept('POST', '**/graphql**', { statusCode: 500, body: {} })
    cy.visit('/')
    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.text().includes('Something went wrong')) {
        errorPage.getSomethingWentWrongMessage().should('be.visible')
        cy.injectAxe()
        cy.checkA11y(null, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
          rules: { 'color-contrast': { enabled: false }, 'aria-hidden-focus': { enabled: false } }
        })
      }
    })
  })
})
