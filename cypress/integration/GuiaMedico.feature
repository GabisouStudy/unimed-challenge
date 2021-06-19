# languange: pt

Feature: Guia Médico
	
	Background: Usuário acessa o site da Unimed
		Given que eu acessei a página da Unimed

	@focus
	Scenario: Busca por médicos deve retornar especialidade e cidade inseridas pelo usuário
		Given que estou na página de Guia Médico
		And com a aba Busca detalhada ativada
		When eu busco pela especialidade Alergia e Imunologia e cidade Rio de Janeiro
		Then todos os resultados devem conter Alergia e Imunologia no campo de especialidade
		And todos os resultados devem conter Rio de Janeiro no campo de cidade

	@focus
	Scenario: Busca por médicos não pode retornar um resultado com uma cidade diferente da inserida pelo usuário
		Given que estou na página de Guia Médico
		And com a aba Busca detalhada ativada
		When eu busco pela especialidade Alergia e Imunologia e cidade Rio de Janeiro
		Then nenhum resultado nas 3 primeiras paáginas devem conter São Paulo no campo de cidade