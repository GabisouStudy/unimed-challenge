/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

const VIEW_WIDTH = Cypress.env("viewport_width");
const VIEW_HEIGHT = Cypress.env("viewport_height");

const FORCE_CLICK = Cypress.env("force_click");


const ESPECIALIDADE_DROPDOWN = Cypress.env("especialidade_dropdown_selector") ;
const ESTADO_DROPDOWN = Cypress.env("estado_dropdown_selector");
const CIDADE_DROPDOWN = Cypress.env("cidade_dropdown_selector");

//#region Workaround para executar os testes no firefox
/*
Cypress está automaticamente tentando elimnar o cookie JSESSIONID
no começo de cada cenário, porém o Firefox não permite.
Problema parece estar relacionado com a ISSUE: https://github.com/cypress-io/cypress/issues/6375
*/
before(()=>{
	Cypress.Cookies.defaults({
		preserve: ['session_id', 'JSESSIONID'],
	});

});

beforeEach(()=>{
	Cypress.Cookies.defaults({
		preserve: ['session_id', 'JSESSIONID'],
	});
});

afterEach(()=>{
	Cypress.Cookies.defaults({
		preserve: ['session_id', 'JSESSIONID'],
	});
});
//#endregion

Given(/^que o usuário acessa o site da Unimed$/, () => {
	if(!Cypress.env("useAvailableViewportSize")) cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
	cy.visit("https://www.unimed.coop.br");
});

And(/^acessa a página de "([^"]*)"$/, (pageName) => {
	cy.get("a")
	.filter(":contains("+pageName+")")
	.filter(":visible")
	.first()
	.click({ force: FORCE_CLICK });

	cy.intercept("GET", "/guia-medico/v3/filtro/especialidades?tipo=MISTO")
	.as("requestEspecialidades");

	cy.intercept("GET", "/guia-medico/v3/filtro/estados")
	.as("requestEstados");
});

And(/^ativa a aba "([^"]*)"$/, (tabName) => {
	cy.contains(tabName)
	.click({ force: FORCE_CLICK });
});

When(/^eu busco pela especialidade "([^"]*)", estado "([^"]*)" e cidade "([^"]*)"$/, (especialidade, estado, cidade) => {
	cy.wait("@requestEspecialidades");
	cy.wait("@requestEstados");

	cy.contains("Especialidade").click({ force: FORCE_CLICK });
	cy.get(ESPECIALIDADE_DROPDOWN).children().contains(especialidade).click({ force: FORCE_CLICK });

	cy.intercept("GET", "/guia-medico/v3/filtro/cidades?estado="+ estado.replaceAll(" ", "+"))
	.as("requestCidades");

	cy.contains("Estado").click({ force: FORCE_CLICK });
	cy.get(ESTADO_DROPDOWN).children().contains(estado).click({ force: FORCE_CLICK });

	cy.wait("@requestCidades");

	cy.contains("Cidade").click({ force: FORCE_CLICK });
	cy.get(CIDADE_DROPDOWN).children().contains(cidade).click({ force: FORCE_CLICK });

	cy.contains("Pesquisar").click({ force: FORCE_CLICK });
});


And(/^todos os resultados devem conter "([^"]*)" no campo de especialidade$/,(especialidade) => {
	cy.contains("Perfil do Prestador");

	cy.get("div")
	.filter(".ProviderSpecialties")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", especialidade);
	});
});

Then(/^todos os resultados devem conter "([^"]*)" no campo de cidade$/,(cidade) => {
	cy.contains("Perfil do Prestador");

	cy.get("a")
	.filter(".ProviderAddressAsGrid--address-link")
	.each(($elem) => {
		cy.wrap($elem).should("contains.text", cidade);
	});
});


Then(/^nenhum resultado nas "([^"]*)" primeiras páginas devem conter "([^"]*)" no campo de cidade$/, (pageAmount, cidade) => {
	cy.contains("Perfil do Prestador");

	for(let i = 0; i < parseInt(pageAmount); i++){
		cy.get("a")
		.filter(".ProviderAddressAsGrid--address-link")
		.each(($elem) => {
			cy.wrap($elem).should("not.contains.text", cidade);
		});
		if(i == 3 - 1) break;
		cy.contains("Ver mais resultados").click({ force: FORCE_CLICK });
	}
});