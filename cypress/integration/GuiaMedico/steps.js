import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("que eu acessei a página da Unimed", () => {
	cy.viewport(1920, 1080);
	cy.visit("https://www.unimed.coop.br");
});

Given("que estou na página de Guia Médico", () => {
	cy.get("a")
	.filter(":contains(Guia Médico)")
	.filter(":visible")
	.first()
	.click();
});

Then("com a aba Busca detalhada ativada", () => {
	cy.contains("Busca detalhada")
	.click();
});

When("eu busco pela especialidade Alergia e Imunologia e cidade Rio de Janeiro", () => {
	cy.wait(5000);

	cy.get("#province-input > div > div.css-5ahn1r > div.css-tlfecz-indicatorContainer > svg").click();
	cy.contains("Rio de Janeiro").click();
	cy.get("#react-tabs-3 > form > div > div:nth-child(3) > div:nth-child(1) > div > div > div.css-5ahn1r > div > svg").click();
	cy.contains("Alergia e Imunologia").click();
	cy.contains("Pesquisar").click();
});

Then("todos os resultados devem conter Alergia e Imunologia no campo de especialidade", () => {
	cy.wait(5000);

	cy.get("div")
	.filter(".ProviderSpecialties")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", "Alergia e Imunologia");
	});cy.get("div")
	.filter(".ProviderSpecialties")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", "Alergia e Imunologia");
	});
});

Then("todos os resultados devem conter Rio de Janeiro no campo de cidade", () => {
	cy.wait(5000);

	cy.get("a")
	.filter(".ProviderAddressAsGrid--address-link")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", "Rio de Janeiro/RJ");
	});
});

Then("nenhum resultado nas 3 primeiras paáginas devem conter São Paulo no campo de cidade", () => {
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
