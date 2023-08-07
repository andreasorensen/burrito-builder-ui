describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', { fixture: 'orders.json' }).as('getOrders');
    cy.visit('http://localhost:3000/');
    cy.wait('@getOrders');
  });

  it('should not allow order submission without a name and at least one ingredient', () => {
    cy.get('button').contains('Submit Order').should('be.disabled');

    cy.get('input[placeholder="Name"]').type('John');
    cy.get('button').contains('Submit Order').should('be.disabled');

    cy.get('input[placeholder="Name"]').clear();
    cy.get('button').contains('beans').click();
    cy.get('button').contains('Submit Order').should('be.disabled');

    cy.get('input[placeholder="Name"]').type('John');
    cy.get('button').contains('Submit Order').should('not.be.disabled');

  });
});