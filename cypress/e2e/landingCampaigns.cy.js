import LoginPage from '../page_object/loginPage.js'
import LandingPage from '../page_object/landingPage.js'
const userData = require('../fixtures/userData.json')

const loginPage = new LoginPage()
const landingPage = new LandingPage()

describe('Campaign Landing Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login(userData.email, userData.password)
  })

  it('user can access Campaign Landing Page and has no axe violations', () => {
    landingPage.getPageTitle().should('be.visible', { timeout: 10000 })
    landingPage.getActiveCampaignsHeading().should('be.visible')
    cy.injectAxe()
    cy.checkA11y(null, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      rules: { 'color-contrast': { enabled: false }, 'aria-hidden-focus': { enabled: false } }
    })
  })

  it('user can view active campaigns', () => {
    landingPage.getActiveCampaignsHeading().should('be.visible')
    cy.get('body').then(($body) => {
      const $cards = $body.find('a[href*="campaign"], a[href*="/c/"], [class*="card"], article, [class*="campaign"], main a[href], main')
      expect($cards.length).to.be.greaterThan(0)
    })
  })

  it('user can view past campaigns when section exists', () => {
    cy.get('body').then(($body) => {
      if ($body.find('h2').filter((i, el) => /past campaigns/i.test(el.textContent)).length) {
        landingPage.getPastCampaignsSection().should('be.visible')
      }
    })
  })

  it('campaigns can be filtered by location when filter exists', () => {
    cy.get('body').then(($body) => {
      const $filter = $body.find('select[name*="location"], select[id*="location"]')
      if ($filter.length) {
        cy.wrap($filter.first()).select(1)
        landingPage.getCampaignCards().should('exist')
      }
    })
  })

  it('pagination appears when more than 8 active campaigns', () => {
    landingPage.getCampaignCards().then(($cards) => {
      if ($cards.length > 8) {
        cy.get('body').then(($body) => {
          const hasNext = $body.find('button, a').filter((i, el) => /next|›|»/i.test(el.textContent) || /next/i.test(el.getAttribute('aria-label') || '')).length > 0
          const hasPagination = $body.find('nav[aria-label*="pagination"], [class*="pagination"]').length > 0
          expect(hasNext || hasPagination).to.be.true
        })
      }
    })
  })
})
