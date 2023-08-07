describe('Burrito Builder App', () => {
  beforeEach(() => {
    cy.fixture('orders.json').then((orders) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', orders).as('getOrders');
      cy.visit('http://localhost:3000');
    });
  });

  it('should display the correct content on page load', () => {
    cy.get('h1').contains('Burrito Builder');

    cy.get('input[placeholder="Name"]');

    const ingredients = ["beans", "steak", "carnitas", "sofritas", "lettuce", "queso fresco", 
                         "pico de gallo", "hot sauce", "guacamole", "jalapenos", "cilantro", "sour cream"];
    ingredients.forEach(ingredient => {
      cy.get('button').contains(ingredient);
    });

    cy.get('p').contains('Order: Nothing selected');

    cy.get('button').contains('Submit Order');

    cy.get('.order').should('have.length', 3);
    cy.get('.order').first().contains('Pat');
    cy.get('.order').first().contains('beans');

  });
});