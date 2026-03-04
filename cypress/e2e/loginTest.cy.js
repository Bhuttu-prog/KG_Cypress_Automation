import LoginPage from '../page_object/loginPage.js'
import LandingPage from '../page_object/landingPage.js'
const userData = require('../fixtures/userData.json')

const loginPage = new LoginPage()
const landingPage = new LandingPage()

describe('User can access with provided credentials', () => {
  it('user can access page and Campaign Landing Page', () => {
    cy.visit('/')
    loginPage.login(userData.email, userData.password)
    cy.url().should('not.include', '/login', { timeout: 15000 })
    landingPage.getPageTitle().should('be.visible', { timeout: 10000 })
    landingPage.getActiveCampaignsHeading().should('be.visible')
  })
})