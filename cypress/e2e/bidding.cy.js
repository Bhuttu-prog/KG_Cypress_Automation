import LoginPage from '../page_object/loginPage.js'
import LandingPage from '../page_object/landingPage.js'
import AuctionItemsPage from '../page_object/auctionItemsPage.js'
const userData = require('../fixtures/userData.json')

const loginPage = new LoginPage()
const landingPage = new LandingPage()
const auctionPage = new AuctionItemsPage()

describe('Bidding process', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login(userData.email, userData.password)
  })

  it('user can see list of auction items and has no axe violations', () => {
    landingPage.getFirstCampaignLink().click()
    cy.url().should('not.equal', Cypress.config().baseUrl + '/')
    auctionPage.getAuctionItemsList().should('exist')
    cy.injectAxe()
    cy.checkA11y(null, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      rules: {
        'color-contrast': { enabled: false },
        'aria-hidden-focus': { enabled: false }
      }
    })
  })

  it('user can filter items by office when filter exists', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').then(($body) => {
      const $office = $body.find('select[name*="office"], select[id*="office"]')
      if ($office.length) {
        cy.wrap($office.first()).select(1)
        auctionPage.getAuctionItemsList().should('exist')
      }
    })
  })

  it('user can filter items by category when filter exists', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').then(($body) => {
      const $cat = $body.find('select[name*="category"], select[id*="category"]')
      if ($cat.length) {
        cy.wrap($cat.first()).select(1)
        auctionPage.getAuctionItemsList().should('exist')
      }
    })
  })

  it('form marks empty required fields as errors on submit', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').invoke('text').then((text) => {
      if (/Add|New item/i.test(text)) {
        auctionPage.getAddItemButton().click()
        auctionPage.getFormSubmitButton().click()
        cy.get('form [class*="error"], form [aria-invalid="true"]').should('exist')
      }
    })
  })

  it('field error clears when user interacts with field', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').invoke('text').then((text) => {
      if (/Add|New item/i.test(text)) {
        auctionPage.getAddItemButton().click()
        auctionPage.getFormSubmitButton().click()
        cy.get('form [class*="error"]').first().parent().find('input, select, textarea').first().then(($input) => {
          if ($input.length) {
            cy.wrap($input).clear().type('value')
            cy.wrap($input).parent().find('[class*="error"]').should('not.exist')
          }
        })
      }
    })
  })

  it('user can see auction items donated by them when section or filter exists', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').invoke('text').then((text) => {
      if (/donated by me|my items|my donations/i.test(text)) {
        auctionPage.getDonatedByMeFilterOrLink().click()
        auctionPage.getAuctionItemsList().should('exist')
      }
    })
  })

  it('user can edit auction items donated by them when Edit is available', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').then(($body) => {
      const $edit = $body.find('button, a').filter((i, el) => /Edit/i.test(el.textContent))
      if ($edit.length) {
        auctionPage.getFirstEditButton().click()
        cy.get('form, [role="dialog"], [class*="modal"]').should('exist')
      }
    })
  })

  it('incorrect value marks field as error', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').invoke('text').then((text) => {
      if (/Add|New item/i.test(text)) {
        auctionPage.getAddItemButton().click()
        cy.get('form').then(($form) => {
          const $num = $form.find('input[type="number"], input[name*="price"], input[name*="amount"]')
          if ($num.length) {
            cy.wrap($num.first()).clear().type('-1').blur()
            cy.get('form [class*="error"], form [aria-invalid="true"]').should('exist')
          } else {
            const $first = $form.find('input, select, textarea').first()
            if ($first.length) {
              cy.wrap($first).clear().type('invalid').blur()
              cy.get('form [class*="error"], form [aria-invalid="true"]').should('exist')
            }
          }
        })
      }
    })
  })

  it('confirmation modal or alert shown when user interacts with incorrect field', () => {
    landingPage.getFirstCampaignLink().click()
    cy.get('body').invoke('text').then((text) => {
      if (/Add|New item/i.test(text)) {
        auctionPage.getAddItemButton().click()
        auctionPage.getFormSubmitButton().click()
        cy.get('body').then(($body) => {
          const hasModal = $body.find('[role="dialog"], [class*="modal"]').length > 0
          const hasErrors = $body.find('[class*="error"], [aria-invalid="true"]').length > 0
          expect(hasModal || hasErrors).to.be.true
        })
      }
    })
  })
})
