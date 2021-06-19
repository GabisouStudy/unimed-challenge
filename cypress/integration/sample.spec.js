/// <reference types ="cypress"/>

Cypress.on("uncaught:exception", (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

/*describe('Unimed', () => {
	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.visit("https://www.unimed.coop.br");
	});

	it('Searching cidade and especialidade', () => {
		cy.get("a").filter(":contains(Guia Médico)").filter(":visible").first().click();

		cy.contains("Busca detalhada").click();

		cy.wait(5000);
		
		cy.get("#province-input > div > div.css-5ahn1r > div.css-tlfecz-indicatorContainer > svg").click();
		cy.contains("Rio de Janeiro").click();
		cy.get("#react-tabs-3 > form > div > div:nth-child(3) > div:nth-child(1) > div > div > div.css-5ahn1r > div > svg").click();
		cy.contains("Alergia e Imunologia").click();
		cy.contains("Pesquisar").click();

		cy.wait(5000);

		cy.get("a")
		.filter(".ProviderAddressAsGrid--address-link")
		.each(($elem) => {
			cy.wrap($elem)
			.should("contains.text", "Rio de Janeiro/RJ");
		});

		cy.get("div")
		.filter(".ProviderSpecialties")
		.each(($elem) => {
			cy.wrap($elem).should("contains.text", "Alergia e Imunologia");
		});
	});

	it("Checking if it's not São Paulo", ()=>{
		cy.get("a")
		.filter(":contains(Guia Médico)")
		.filter(":visible")
		.first()
		.click();

		cy.contains("Busca detalhada").click();

		cy.wait(5000);

		cy.get(
			"#province-input > div > div.css-5ahn1r > div.css-tlfecz-indicatorContainer > svg"
		).click();
		cy.contains("Rio de Janeiro").click();
		cy.get(
			"#react-tabs-3 > form > div > div:nth-child(3) > div:nth-child(1) > div > div > div.css-5ahn1r > div > svg"
		).click();
		cy.contains("Alergia e Imunologia").click();
		cy.contains("Pesquisar").click();

		cy.wait(5000);


		for(let i = 0; i < 3; i++){
			cy.get("a")
			.filter(".ProviderAddressAsGrid--address-link")
			.each(($elem) => {
				cy.wrap($elem).should("not.contains.text", "São Paulo");
			});
			if(i == 3 - 1) break;
			cy.contains("Ver mais resultados").click();
		}
 	});
});*/