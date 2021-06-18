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
		cy.visit("https://www.unimed.coop.br");

		//cy.contains("Guia Médico:visible");

		//cy.filter(":contains(Guia Médico)");
		cy.log("adding intercept");
		//cy.intercept("GET", "https://www.cloudflare.com/cdn-cgi/trace").as("trace");
		//cy.wait("@getEspecs", { timeout: 2000 });
		cy.get("a").filter(":contains(Guia Médico)").filter(":visible").first().click();
		//cy.wait(6000);
		//cy.get("h2").filter(":contains(Guia Médico)").click();

		cy.contains("Busca detalhada").click();
		cy.get("#province-input > div > div.css-5ahn1r > div.css-tlfecz-indicatorContainer > svg").click();
		cy.contains("Rio de Janeiro").click();
		cy.get("#react-tabs-3 > form > div > div:nth-child(3) > div:nth-child(1) > div > div > div.css-5ahn1r > div > svg").click();
		cy.contains("Alergia e Imunologia").click();
		cy.contains("Pesquisar").click();
	})
})