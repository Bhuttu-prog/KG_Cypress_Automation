Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('#username-field').clear().type(email)
  cy.get('#password-field').clear().type(password)
  cy.contains('button', 'Sign in').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('body').then(($body) => {
    const $logout = $body.find('button, a, [role="button"], [role="menuitem"], [role="link"]').filter((i, el) => {
      const text = (el.textContent || '').trim()
      const label = (el.getAttribute('aria-label') || el.getAttribute('title') || '').toLowerCase()
      return /log\s*out|logout|sign\s*out|signout/i.test(text) || /log\s*out|sign\s*out/.test(label)
    })
    if ($logout.length) {
      cy.wrap($logout.first()).click()
      return
    }
    const $menu = $body.find('[aria-haspopup="menu"], [data-testid="user-menu"], [aria-label*="user"], [aria-label*="account"], [class*="user"], [class*="account"], [class*="avatar"], [class*="profile"]').filter('button, a, [role="button"]')
    if ($menu.length) {
      cy.wrap($menu.first()).click()
      cy.get('body').invoke('text').then((text) => {
        if (/log\s*out|logout|sign\s*out|signout/i.test(text)) {
          cy.contains(/log\s*out|logout|sign\s*out|signout/i).first().click()
        }
      })
    } else {
      const hasLogoutText = /log\s*out|logout|sign\s*out|signout/i.test($body.text())
      if (hasLogoutText) {
        cy.contains(/log\s*out|logout|sign\s*out|signout/i).first().click()
      }
    }
  })
})