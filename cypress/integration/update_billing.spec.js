/// <reference types="cypress" />

const getIframeDocument = () => {
  return cy
  .get('.recurly-element-card iframe')
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  .then(cy.wrap)
}

const fillTheForm = () => {
  getIframeBody().find('#recurly-hosted-field-input').type('4111111111111111')
  getIframeBody().find('.recurly-hosted-field-input-expiry').type('1223')
  getIframeBody().find('.recurly-hosted-field-input-cvv').type('123')
  cy.get('#first_name').type('Jimmy');
  cy.get('#last_name').type('Carter')
  cy.get('#address1').type('76 Hawkins Cres, Bradley Stoke');
  cy.get("#postal_code").type('BS32 8EH');
  cy.get('#city').type('Bristol');
  cy.get('#country-select-demo').type('united kingdom')
  cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
}

const clearTheForm = () => {
  getIframeBody().find('.recurly-hosted-field-input-expiry').clear();
  getIframeBody().find('.recurly-hosted-field-input-cvv').clear()
  cy.get('#first_name').clear();
  cy.get('#last_name').clear();
  cy.get('#address1').clear();
  cy.get("#postal_code").clear();
  cy.get('#city').clear();
}

const visitProfessional = () => {
  cy.visit({
    url: `http://localhost:3000/billing/update?subscription=${btoa(JSON.stringify({"account_id": "234"}))}`,
    headers: {
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNDA4MzUwMn0.7BMpvb1Q_mddyIURNUq6_8zsSSDYW19ANRBfc9YWgdM'
    }
  });
}

describe('Update billing page', () => {
  
  context('Show permission denied', () => {
    it('Show permission denied when visting update billing page', () => {
      cy.visit('http://localhost:3000/plans')
      cy.get('#update-billing-button').click();
      cy.get('#error-message').should('contain', 'You do not have permission to perform this action');
    })
  });
  context('Login flow and proceed to checkout page', () => {
    before(()=>{
      visitProfessional();
    })
    it('Fill the form and update the card', ()=> {
      fillTheForm();
      cy.get("#purchase-order").click();
      cy.url()
      .should('be.equal', 'http://localhost:3000/login')
    })
  })
});
