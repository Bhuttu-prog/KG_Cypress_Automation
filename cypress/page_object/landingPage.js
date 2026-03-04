class LandingPage {
  getPageTitle() {
    return cy.contains(/KG Auction Hub|Auction Hub/i)
  }

  getActiveCampaignsHeading() {
    return cy.contains(/Active Campaigns/i)
  }

  getPastCampaignsSection() {
    return cy.contains(/Past Campaigns/i).parent()
  }

  getLocationFilter() {
    return cy.get('select[name*="location"], select[name*="Location"], select[id*="location"], [aria-label*="location" i]').first()
  }

  getPagination() {
    return cy.get('nav[aria-label*="pagination" i], [class*="pagination"]').first()
  }

  getNextPageButton() {
    return cy.contains('button, a', /Next/i)
  }

  getCampaignCards() {
    return cy.get('a[href*="campaign"], a[href*="/c/"], [class*="card"], article, [class*="campaign"], [data-testid*="campaign"], main a[href], main')
  }

  getFirstCampaignLink() {
    return cy.get('a[href*="campaign"], a[href*="/c/"], main a[href]').first()
  }

  getCampaignLink(campaignName) {
    return cy.contains('a, [role="link"]', campaignName).first()
  }
}

export default LandingPage