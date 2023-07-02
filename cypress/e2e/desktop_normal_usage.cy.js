describe('Normal usage - desktop', () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('/');
  });

  Cypress.Commands.add('fillForm', () => {
    cy.get('#name').type('Stephen King').should('have.value', 'Stephen King');
    cy.get('#email').type('stephenking@lorem.com').should('have.value', 'stephenking@lorem.com');
    cy.get('#phone').type('+1 998 132 944').should('have.value', '+1 998 132 944');
  });

  it('can fill out the form', () => {
    cy.fillForm();
  });

  it('display errors if the form is incorrect', () => {
    cy.get('#name').click();
    cy.contains('Personal info').click();
    cy.contains('This field is required').should('be.visible');
    cy.get('#name').type('Stephen King').should('have.value', 'Stephen King');
    cy.contains('Personal info').click();
    cy.contains('This field is required').should('not.exist');

    cy.get('#email').click();
    cy.contains('Personal info').click();
    cy.contains('This field is required').should('be.visible');
    cy.get('#email').type('stephenking@lorem.com').should('have.value', 'stephenking@lorem.com');
    cy.contains('Personal info').click();
    cy.contains('This field is required').should('not.exist');

    cy.get('#phone').click();
    cy.contains('Personal info').click();
    cy.contains('This field is required').should('be.visible');
    cy.get('#phone').type('+1 998 132 944').should('have.value', '+1 998 132 944');
    cy.contains('Personal info').click();
    cy.contains('This field is required').should('not.exist');
  });

  it('should not proceed if the form is wrong', () => {
    cy.contains('Next Step').click();
    cy.contains('Next Step').click();
    cy.contains('Next Step').click();
    cy.contains('Confirm').click();
    cy.contains('Personal info').should('be.visible');
    cy.contains('This field is required').should('be.visible');
  });

  it('can select Pro plan', () => {
    cy.fillForm();
    cy.contains('Next Step').click();
    cy.get('label[for="pro"]').click();
    cy.get('label[for="pro"]').should('have.css', 'border', '1px solid rgb(71, 61, 255)');
  });

  it('can change between Monthly and Yearly', () => {
    cy.fillForm();
    cy.contains('Next Step').click();
    cy.get('label[for="switchInput"]').click();
    cy.contains('Yearly').should('have.css', 'color', 'rgb(2, 41, 90)');
    cy.get('label[for="switchInput"]').click();
    cy.contains('Yearly').should('have.css', 'color', 'rgb(150, 153, 171)');
    cy.contains('Monthly').should('have.css', 'color', 'rgb(2, 41, 90)');
  });

  it('can choose add-ons', () => {
    cy.fillForm();
    cy.contains('Next Step').click();
    cy.contains('Next Step').click();
    cy.get('label[for="onlineService"]').click();
    cy.get('label[for="onlineService"]').should('have.css', 'border', '1px solid rgb(71, 61, 255)');
  });

  it('displays which plan and which add-ons the user has selected on the Finishing up screen', () => {
    cy.fillForm();
    cy.contains('Next Step').click();
    cy.contains('Next Step').click();
    cy.get('label[for="onlineService"]').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').should('be.visible');
  });

  it('display a message after submitting the form', () => {
    cy.fillForm();
    cy.contains('Next Step').click();
    cy.contains('Next Step').click();
    cy.contains('Next Step').click();
    cy.contains('Confirm').click();
  });

  it('can switch to any screen by clicking menu buttons', () => {
    cy.get('#form4').click();
    cy.contains('Finishing up').should('be.visible');
    cy.get('#form3').click();
    cy.contains('Pick Add-ons').should('be.visible');
    cy.get('#form2').click();
    cy.contains('Select your plan').should('be.visible');
    cy.get('#form1').click();
    cy.contains('Personal info').should('be.visible');
  });
});
