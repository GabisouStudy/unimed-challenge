/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

const FIRST_RESULT_SELECTOR = "#gm-v3-root > div > div:nth-child(2) > div.col-lg-9 > div.d-block > div:nth-child(2) > div:nth-child(1) > div > div.ProviderAddressWrapper > div.ProviderAddressColumn.col-lg-7 > a";
const ESTADO_DROPDOWN_SELECTOR = "#province-input > div.css-8plzl5-menu";
const CIDADE_DROPDOWN_SELECTOR = "#city-input > div.css-8plzl5-menu";
const ESPECIALIDADE_DROPDOWN_SELECTOR = "#react-tabs-3 > form > div > div:nth-child(3) > div:nth-child(1) > div > div.css-8plzl5-menu";

Given(/^que o usuário acessa o site da Unimed$/, () => {
	cy.viewport(1920, 1080);
	cy.visit("https://www.unimed.coop.br");
});

And(/^acessa a página de "([^"]*)"$/, (pageName) => {
	cy.get("a")
	.filter(":contains("+pageName+")")
	.filter(":visible")
	.first()
	.click();
	cy.intercept("GET", "/guia-medico/v3/filtro/especialidades?tipo=MISTO")
	.as("requestEspecialidades");
	cy.intercept("GET", "/guia-medico/v3/filtro/estados")
	.as("requestEstados");
});

And(/^ativa a aba "([^"]*)"$/, (tabName) => {
	cy.contains(tabName)
	.click();
});

When(/^eu busco pela especialidade "([^"]*)", estado "([^"]*)" e cidade "([^"]*)"$/, (especialidade, estado, cidade) => {
	cy.wait("@requestEspecialidades");
	cy.wait("@requestEstados");

	cy.contains("Especialidade").click();
	cy.get(ESPECIALIDADE_DROPDOWN_SELECTOR).children().contains(especialidade).click();

	cy.contains("Estado").click();
	cy.get(ESTADO_DROPDOWN_SELECTOR).children().contains(estado).click();

	cy.contains("Cidade").click();
	cy.get(CIDADE_DROPDOWN_SELECTOR).children().contains(cidade).click();

	cy.contains("Pesquisar").click();
});


And(/^todos os resultados devem conter "([^"]*)" no campo de especialidade$/,(especialidade) => {
	cy.get(FIRST_RESULT_SELECTOR);

	cy.get("div")
	.filter(".ProviderSpecialties")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", especialidade);
	});
});

Then(/^todos os resultados devem conter "([^"]*)" no campo de cidade$/,(cidade) => {
	cy.get(FIRST_RESULT_SELECTOR);

	cy.get("a")
	.filter(".ProviderAddressAsGrid--address-link")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", cidade);
	});
});


Then(/^nenhum resultado nas "([^"]*)" primeiras páginas devem conter "([^"]*)" no campo de cidade$/, (pageAmount, cidade) => {
	cy.get(FIRST_RESULT_SELECTOR);

	for(let i = 0; i < parseInt(pageAmount); i++){
		cy.get("a")
		.filter(".ProviderAddressAsGrid--address-link")
		.each(($elem) => {
			cy.wrap($elem).should("not.contains.text", cidade);
		});
		if(i == 3 - 1) break;
		cy.contains("Ver mais resultados").click();
	}
});