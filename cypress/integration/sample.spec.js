/// <reference types ="cypress"/>

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Unimed', ()=>{
	const email = "teste@email.com";
	const passw = "Abc123";

	beforeEach(()=>{
		//cy.visit('http://www.unimed.coop.br/');
		cy.viewport(1920, 1080);
	});

	it('has a title', ()=>{
		//expect(2).to.equal(2);
		cy.visit("http://www.unimed.coop.br");

		//cy.contains("Guia Médico:visible");

		//cy.filter(":contains(Guia Médico)");
		cy.get("a").filter(":contains(Guia Médico)").filter(":visible").first().click();
		//cy.get("h2").filter(":contains(Guia Médico)").click();
	})
})