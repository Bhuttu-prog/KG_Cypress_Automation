class AuctionItemsPage {
  getAuctionItemsList() {
    return cy.get('[class*="item"], [data-testid*="item"], table tbody tr, [role="list"] [role="listitem"], main, [role="main"]')
  }

  getAddItemButton() {
    return cy.contains('button, a', /Add (item|new)/i).first()
  }

  getOfficeFilter() {
    return cy.get('select[name*="office"], select[id*="office"], [aria-label*="office" i]').first()
  }

  getCategoryFilter() {
    return cy.get('select[name*="category"], select[id*="category"], [aria-label*="category" i]').first()
  }

  getDonatedByMeSection() {
    return cy.contains(/donated by me|my items|my donations/i).parents().first()
  }

  getEditButtonForItem(itemName) {
    return cy.contains(itemName).parents('tr, [class*="item"], [class*="row"]').first().within(() => cy.contains('button, a', /Edit/i).first())
  }

  getItemForm() {
    return cy.get('form').first()
  }

  getFormSubmitButton() {
    return cy.get('form').find('button[type="submit"], input[type="submit"]').first()
  }

  getFormFieldError(fieldName) {
    return cy.get(`#${fieldName}-field, [name="${fieldName}"]`).parent().find('[class*="error"], [role="alert"]')
  }

  getConfirmationModal() {
    return cy.get('[role="dialog"], [class*="modal"]')
  }

  getModalConfirmButton() {
    return cy.get('[role="dialog"], [class*="modal"]').contains('button, [role="button"]', /OK|Confirm|Yes/i)
  }

  getDonatedByMeFilterOrLink() {
    return cy.contains('a, button, [role="tab"], [role="button"]', /donated by me|my items|my donations|my lots/i).first()
  }

  getFirstEditButton() {
    return cy.contains('button, a', /Edit/i).first()
  }

  getFormInputByLabel(labelPattern) {
    return cy.contains('label', labelPattern).first().parent().find('input, select, textarea').first()
  }
}

export default AuctionItemsPage
