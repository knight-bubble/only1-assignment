describe("Navigation", () => {
  it("should navigate to index page", () => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/");
    cy.get(".navbar a").contains("Only1");
  });
});
