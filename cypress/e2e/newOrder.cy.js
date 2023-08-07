describe("Add New Order Flow", () => {
  beforeEach(() => {
    cy.fixture("orders.json").then((orders) => {
      cy.intercept("GET", "http://localhost:3001/api/v1/orders", orders).as(
        "getOrders"
      );
    });

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/orders'
    }, {
      statusCode: 201,
      body: {
        name: 'John',
        ingredients: ["beans", "lettuce"],
        id: Date.now()
      }
    }).as('postOrder');

    cy.visit("http://localhost:3000");
  });

  it("should allow user to add a new order", () => {

    cy.get('input[placeholder="Name"]').type("John");

    cy.get("button").contains("beans").click();
    cy.get("button").contains("lettuce").click();

    cy.get("p").contains("Order: beans, lettuce");

    cy.get("button").contains("Submit Order").click();

    cy.get(".order").should("have.length", 4);
    cy.get(".order").last().contains("John");
    cy.get(".order").last().contains("beans");
    cy.get(".order").last().contains("lettuce");
  });
});
