Feature: Guia Médico

	Background: Usuário acessa a página de Busca detalhada no site da Unimed
		Given que o usuário acessa o site da Unimed
		And acessa a página de "Guia Médico"
		And ativa a aba "Busca detalhada"

	@focus
	Scenario: Busca por médicos deve retornar especialidade e cidade inseridas pelo usuário
		When eu busco pela especialidade "Alergia e Imunologia", estado "Rio de Janeiro" e cidade "Rio de Janeiro"
		Then todos os resultados devem conter "Alergia e Imunologia" no campo de especialidade
		And todos os resultados devem conter "Rio de Janeiro" no campo de cidade

	@focus
	Scenario: Busca por médicos não pode retornar um resultado com uma cidade diferente da inserida pelo usuário
		When eu busco pela especialidade "Alergia e Imunologia", estado "Rio de Janeiro" e cidade "Rio de Janeiro"
		Then nenhum resultado nas "3" primeiras páginas devem conter "São Paulo" no campo de cidade