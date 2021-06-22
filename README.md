# Desafio 1
## Guia de Médicos - Unimed

### Descrição do desafio
Criar um projeto de automação utilizando BDD e em linguagem de programação de sua preferência os cenários para as duas funcionalidades abaixo:
1. No site https://www.unimed.coop.br/ validar a seguinte sequência de ações:
   - Acessar Guia Médico
   - Realizar uma pesquisa de médicos no Rio de Janeiro.
   - Validar a apresentação dos resultados com a Especialidade e Cidade

 <br/>

2. No mesmo site, validar:
   - Acessar Guia Médico
   - Realizar uma pesquisa de médicos no Rio de Janeiro.
   - Validar nas páginas 1, 2, e 3 do resultado, NÃO apresentação do resultado com cidade São 
Paulo

### Instruções para execução
1. Baixe o projeto na sua máquina local.
2. Através de um terminal, navegue até o diretório do projeto e instale as dependências npm com o comando:
```
npm install
```
3. No arquivo ```cypress.env.json``` configures as variáveis de ambiente desejadas para executar os testes na configuração de sua preferência:
	- ```viewport_width``` ==> Resolução da _**largura** da viewport_.
	- ```viewport_height``` ==> Resolução da _**altura** da viewport_.
	- ```useAvailableViewportSize``` ==> Modifica testes no Cypress para _utilizar o espaço disponível no navegador para a viewport_. Recomendado deixar como ```false``` pois a interface do Cypress força a viewport para tamanhos inutilizáveis.
	- ```force_click``` ==> Força _clique nos elementos mesmo quando estão cobertos_. Recomendado deixar como ```false``` na maioria dos testes. Recomendado mudar para ```true``` se ```useAvailableViewportSize``` também for ```true``` ou se uma resolução muito pequena for utilizada nos testes.
4. Execute os testes com Cypress utilizando um dos comandos personalizados
   - Executar testes com navegador interno (Electron sem interface)
     - ```npm run test```
   - Executar testes com navegador interno (Electron sem interface) e enviar resultados para Cypress Dashboard/GitHub
     - ```npm run test-ci```
   - Executar testes com Google Chrome
     - ```npm run test-chrome```
   - Executar testes com Google Chrome e enviar resultados para Cypress Dashboard/GitHub 
     - ```npm run test-chrome-ci```
   - Executar testes com Microsoft Edge
     - ```npm run test-edge```
   - Executar testes com Microsoft Edge e enviar resultados para Cypress Dashboard/GitHub 
     - ```npm run test-edge-ci```
   - Executar testes com Mozilla Firefox
     - ```npm run test-firefox```
   - Executar testes com Mozilla Firefox e enviar resultados para Cypress Dashboard/GitHub 
     - ```npm run test-firefox-ci```
   - Abrir Cypress IDE (Contém mais opções padrões de teste, porém não gera artefatos, como vídeos)
     - ```npm run cypress-ide```
5. O Cypress irá gerar gravações de vídeo dos testes como artefatos na pasta ```cypress\videos```
6. No caso dos testes com CI, os relatórios, resultados, vídeos e artefatos podem ser acessados no link: [Cypress Dashboard: unimed-challenge](https://dashboard.cypress.io/projects/zrjbig/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D)