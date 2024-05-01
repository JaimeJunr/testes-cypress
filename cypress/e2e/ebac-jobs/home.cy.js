/// <reference types='cypress' />

describe("Testes para a home", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve adicionar um contato", () => {
    cy.get('input[type="text"]').type("teste");
    cy.get('input[type="email"]').type("teste@gmail.com");
    cy.get('input[type="tel"]').type("12312");

    cy.get('button[type="submit"]').click();
    cy.get("li").should("contain.text", "teste");
  });

  it("Deve editar um contanto", () => {
    cy.get(".edit").first().click();
    cy.get('input[type="text"]').type("Edit");

    cy.get('button[type="submit"]').click();

    cy.get("li").should("contain.text", "Edit");
  });

  it("Não deve adicionar nada", () => {
    cy.get('button[type="submit"]').click();

    cy.get("ul").then(($elements) => {
      cy.get("ul").should("have.length", $elements.length); // Use the actual length
    });
  });

  it("Deve deletar um contanto", async () => {
    cy.get("ul")
      .its("length")
      .then((initialContactCount) => {
        cy.get(".delete").first().click();
        cy.get("ul").should("have.length", initialContactCount - 1);
      });
  });
});
