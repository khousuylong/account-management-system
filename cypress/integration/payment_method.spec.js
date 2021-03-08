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
    url: 'http://localhost:3000/checkout?subscription=eyJhY2NvdW50X2lkIjoiMjM0IiwicGxhbl9pZCI6InBwcHAtcHBwcC1wcHBwcCJ9',
    headers: {
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNDA4MzUwMn0.7BMpvb1Q_mddyIURNUq6_8zsSSDYW19ANRBfc9YWgdM'
    }
  });
}

describe('Checkout page', () => {
  
  context('Show permission denied', () => {
    it('Show permission denied when visting the checkout', () => {
      cy.visit('http://localhost:3000/plans')
      cy.get('#pro-button').click();
      cy.get('#error-message').should('contain', 'You do not have permission to perform this action');
    })
  });

  context('Got into the checkout but got permission denied when trying to checkut', () => {
    before(()=>{
      cy.visit('http://localhost:3000/login')
    })
    it('Press purchase but get permission denied', () => {
      cy.get("#user-name").type('randomuser');
      cy.get("#password").type('password'); 
      cy.get('#login-button').click();

      cy.get('#pro-button').should('contain', 'Professional')
      cy.get('#pro-button').click();
      cy.get("#plan-name").should('contain', 'Subscribe to Professional');
      cy.get('#total-price').should('contain', '$49.00 per month');

      fillTheForm();
      cy.get('#purchase-order').click()
      cy.get('#error-message').should('contain', 'You do not have permission to perform this action');
    })
  })

  context('Login flow and proceed to checkout page', () => {
    before(()=>{
      cy.visit('http://localhost:3000/login')
    })

    it('It should show the login form and able to login', () => {
      cy.get("#user-name").type('admin');
      cy.get("#password").type('password'); 
      cy.get('#login-button').click();
    })

    it('It should show plans buttton and able to click all of them', () => {
      cy.get('#pro-button').should('contain', 'Professional')
      cy.get('#pro-button').click();
      cy.get("#plan-name").should('contain', 'Subscribe to Professional');
      cy.get('#total-price').should('contain', '$49.00 per month');
    })
  })

  context('Checkout business plan', () => {
    before(()=>{
      cy.visit({
        url: `http://localhost:3000/checkout?subscription=eyJhY2NvdW50X2lkIjoiMjM0IiwicGxhbl9pZCI6ImJiYmJiLWJiYmJiLWJiYmJiYiJ9`,
        headers: {
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNDA4MzUwMn0.7BMpvb1Q_mddyIURNUq6_8zsSSDYW19ANRBfc9YWgdM'
        }
      })
    });
    it("It should show 'Subscribe to Business - Monthly' plan and the total price", () => {
      cy.get("#plan-name").should('contain', 'Subscribe to Business - Monthly');
      cy.get('#total-price').should('contain', '$99.00 per month');
    })
  })

  context('Checkout enterprise plan', () => {
    before(()=>{
      cy.visit({
        url: 'http://localhost:3000/checkout?subscription=eyJhY2NvdW50X2lkIjoiMjM0IiwicGxhbl9pZCI6ImVlZWVlZWVlZS1lZWVlZWVlZWUtZWVlZWVlZWUtZWVlZWVlZSIsImFkZF9vbnMiOlt7ImFkZF9vbl9jb2RlIjoiMTMzMzAwMCIsInF1YW50aXR5Ijo0fSx7ImFkZF9vbl9jb2RlIjoiMTIyMjAwMCIsInF1YW50aXR5IjoyfV19',
        headers: {
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNDA4MzUwMn0.7BMpvb1Q_mddyIURNUq6_8zsSSDYW19ANRBfc9YWgdM'
        }
      })
    });
    it("It should show 'Subscribe to Enterprise - Monthly' plan and the total price", () => {
      cy.get("#plan-name").should('contain', 'Subscribe to Enterprise - Monthly');
      cy.get('#total-price').should('contain', '$396.00 per month');
      cy.get('.add-ons').should('contain', '4 * Administrators');
      cy.get('.add-ons').should('contain', '2 * Data Editors');
    })
  })

  context('Checkout agency plan', () => {
    before(()=>{
      cy.visit({
        url: 'http://localhost:3000/checkout?subscription=eyJhY2NvdW50X2lkIjoiMjM0IiwicGxhbl9pZCI6ImFhYWFhLWFhYWFhLWFhYWFhYSIsImFkZF9vbnMiOlt7ImFkZF9vbl9jb2RlIjoiMTIyMjEwMCIsInF1YW50aXR5Ijo4fSx7ImFkZF9vbl9jb2RlIjoiMTMzMzEwMCIsInF1YW50aXR5IjoxMn1dfQ==',
        headers: {
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNDA4MzUwMn0.7BMpvb1Q_mddyIURNUq6_8zsSSDYW19ANRBfc9YWgdM'
        }
      });
    });
    it("It should show 'Subscribe to Agency - Monthly' plan and the total price", () => {
      cy.get("#plan-name").should('contain', 'Subscribe to Agency - Monthly');
      cy.get('#total-price').should('contain', '$1028.60 per month');
      cy.get('.add-ons').should('contain', '8 * Administrators');
      cy.get('.add-ons').should('contain', '12 * Data Editors');
    })
  })

  context('Checkout enterprise 3 years plan', () => {
    before(()=>{
      cy.visit({
        url: 'http://localhost:3000/checkout?subscription=eyJhY2NvdW50X2lkIjoiMjM0IiwicGxhbl9pZCI6ImVlZWUtZWVlZS1lZWVlLTN5IiwiYWRkX29ucyI6W3siYWRkX29uX2NvZGUiOiIxMzMzMDAzIiwicXVhbnRpdHkiOjV9LHsiYWRkX29uX2NvZGUiOiIxMjIyMDAzIiwicXVhbnRpdHkiOjJ9XX0=',
        headers: {
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNDA4MzUwMn0.7BMpvb1Q_mddyIURNUq6_8zsSSDYW19ANRBfc9YWgdM'
        }
      });
    });

    it("It should show 'Subscribe to Enterprise - 3 Years' plan and the total price", () => {
      cy.get("#plan-name").should('contain', 'Subscribe to Enterprise - 3 Years');
      cy.get('#total-price').should('contain', '$9979.00 every 36 months');
      cy.get('.add-ons').should('contain', '5 * Data Editors');
      cy.get('.add-ons').should('contain', '2 * Administrators');
    })
  })

  context('Show 20% tax for UK', () => {
    before(() => {
      visitProfessional();
    })
    it('It should show total price plus tax for UI', () => {
      cy.get('#country-select-demo').type('united kingdom')
      cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
      cy.get('#total-price').should('contain', '$49.00 + VAT 20%')
    })
  });

  context('Checkout professional plan and test the whole checkout flow', () => {
    before(()=>{
      visitProfessional();
    });
    it("It should show 'Subscribe to Professional' plan and the total price", () => {
      cy.get("#plan-name").should('contain', 'Subscribe to Professional');
      cy.get('#total-price').should('contain', '$49.00 per month');
    }) 

    it('it should be able to validate the form', () => {
      cy.get("#purchase-order").click();
      cy.get("#purchase-order").click();
      cy.get("#purchase-order").click();
      cy.get('.MuiFormHelperText-root').should('contain', "can't be blank")

      getIframeBody().find('#recurly-hosted-field-input').type('4111111111111111')
      getIframeBody().find('.recurly-hosted-field-input-expiry').type('1223')
      getIframeBody().find('.recurly-hosted-field-input-cvv').type('123')
      cy.get('#first_name').type('first name');
      cy.get('#last_name').type('laster');
      cy.get("#purchase-order").click();
      cy.get('.MuiFormHelperText-root').should('contain', "can't be empty")

      clearTheForm();
    })

    context('Validate VAT number', () => {

      it('Select an EU country and leave the vat number blank', () => {
        fillTheForm();
        cy.get('#country-select-demo').clear();
        cy.get('#country-select-demo').type('ireland');
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
        cy.get('.business-purchase').should('contain', 'Is this a business purchase')
        cy.get('.have-vat').should('contain', 'Do you have VAT ID on hand')
        cy.get('#business').click();
        cy.get('#vat-now').click();
        cy.get('#vat_id').clear();
        cy.get('#purchase-order').click()
        cy.get(".MuiFormHelperText-root").should('contain', "can't be blank");
      })

      it('selct a none business purchase in EU country should not allowed to proceed', () => {
        cy.get('#none-business').click()
        cy.get('.error-alert ').should('contain', 'Unfortunately we do not currently support non-business EU customers');
        cy.get('#purchase-order').should('be.disabled')
      });

      it('selct a business purchase in EU country but provide vat number later', () => {
        cy.get('#business').click()
        cy.get('.error-alert ').should('not.exist')
        cy.get('#purchase-order').should('not.be.disabled')
        cy.get('#vat-later').click();
        cy.get('#vat_id').should('not.exist');
      });

      it('Select an EU country and enter invalid tax number then it should validate the vat nubmer', () => {
        cy.get('#business').click();
        cy.get('#vat-now').click();
        cy.get('#vat_id').type('000000000')
        cy.get('#purchase-order').click()
        cy.get(".MuiAlert-standardError").should('contain', "Sorry we couldn’t verify this VAT number in the European Commission's VAT Information Exchange System (VIES). You can test your VAT number");
        cy.get('#vat_id').clear();
      });

      it('Enter all correct information and procceed to purcahse order', () => {
        cy.get('#vat_id').type('1234567WA')
        cy.get("#purchase-order").click();
        cy.get('#return-to-account').should('contain', 'Return to account');
        visitProfessional();
      })
    });

    

    context('3DS challenge required', () => {
      before(() => {
        visitProfessional();
      })
      it('it should request challenge before proceed', () => {
        fillTheForm()
        cy.get('#first_name').clear();
        cy.get('#first_name').type('3-d-secure');
        cy.get('#purchase-order').click();
        cy.get('.challenge-pass').should('contain', 'Challenge Pass')
        cy.get('.challenge-failed').should('contain', 'Challenge failed')
      });

      it('trigger fail challenge', () => {
        cy.get('.challenge-failed').click();
        cy.get('.MuiAlert-message').should('contain', '3DS failed, try again');
      })

      it('trigger a pass challenged', () => {
        visitProfessional();
        fillTheForm();
        cy.get('#first_name').clear();
        cy.get('#first_name').type('3-d-secure');
        cy.get('#purchase-order').click();
        cy.get('.challenge-pass').should('contain', 'Challenge Pass')
        cy.get('.challenge-pass').click();
        cy.get('#return-to-account').should('contain', 'Return to account');
        visitProfessional();
      });
    })
  })
});
