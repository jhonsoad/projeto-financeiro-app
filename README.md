🚀 MFE1 - Nome do MFE (Ex: Gerenciamento de Contas)

🎯 Sobre o Projeto
Este repositório contém o Micro Frontend (MFE) "MFE1" da aplicação de gerenciamento financeiro ByteBank. O objetivo deste projeto é fornecer uma funcionalidade específica e modular que é consumida pelo projeto Host. Este MFE opera de forma independente, o que permite que ele seja desenvolvido, testado e implantado separadamente, mas se integra perfeitamente à aplicação principal.

As responsabilidades deste MFE incluem:

Funcionalidade Específica: "Exibir o saldo da conta, o extrato detalhado e permitir a visualização de transações recentes. Realizar transações financeiras de debito e crédito"

Componentes Expostos: o federation.config.js expõe o componente ./Component que aponta para inicio.component.ts.

🏛️ Arquitetura e Tecnologias
A arquitetura do projeto é baseada em Micro Frontends (MFEs), utilizando a biblioteca @angular-architects/native-federation para a orquestração dos módulos, similar ao projeto host.

Tecnologias Principais:

Angular v19.2.0: O framework principal para o desenvolvimento da aplicação.

Angular CLI: Ferramenta de linha de comando para inicializar, desenvolver e manter aplicações Angular.

RxJS: Para programação reativa.

@angular-architects/native-federation: Ferramenta para gerenciar a federação de módulos.

TypeScript: Superset do JavaScript que adiciona tipagem estática, garantindo maior robustez e manutenibilidade ao código.


📁 Estrutura de Pastas e Organização
A estrutura do projeto segue as convenções padrão do Angular, com uma organização clara e modular para facilitar a manutenção e o desenvolvimento.

src/app/: Contém a lógica principal da aplicação.

components/: Armazena componentes reutilizáveis, categorizados por funcionalidade (e.g., dashboard, common).

dashboard/: Componentes específicos para a área do dashboard, como sidebar, balance-card, statement-card, transaction-form, etc.

common/: Componentes genéricos e reutilizáveis em toda a aplicação, como button, input e dropdown.

core/: Contém serviços e lógicas de baixo nível, como o AuthInterceptor para manipulação de requisições HTTP.

pages/: Agrupa os componentes de "página" que representam rotas, como o InicioComponent dentro de dashboard.

services/: Contém os serviços responsáveis pela comunicação com a API (e.g., AccountService, PostSaldoService, DeleteTransactionService).

shared/: Armazena interfaces e outros recursos compartilhados pela aplicação, como as interfaces Account, Transaction e Card.

design-system/: Arquivos CSS de estilização global e variáveis de design.

data/: Contém o arquivo db.json utilizado pelo json-server para simular uma API local.

environments/: Contém as configurações de ambiente, como a URL da API.

package.json: Lista as dependências do projeto, tanto de produção quanto de desenvolvimento, e scripts para executar tarefas como start, build e test. Ele também define o nome do projeto como "projeto-financeiro".

angular.json: Arquivo de configuração principal do Angular CLI, que define a estrutura do projeto, as configurações de build, serve e teste, incluindo a configuração do esbuild e o builder de native-federation.

federation.config.js: Arquivo de configuração para o native-federation, onde são definidos quais componentes o projeto expõe (neste caso, o InicioComponent) e quais dependências são compartilhadas.


⚙️ Como Começar
Siga estas instruções para configurar e executar o projeto localmente:

Pré-requisitos
Node.js (versão compatível com Angular 19.2.0)

Com Docker Construir a imagem:

docker build -t mfe1-app . Executar o container:

docker run -p 4201:4201 mfe1-app A aplicação estará disponível em http://localhost:4201/index.html.

Sem Docker

Navegue até o diretório do projeto.

Instale as dependências: npm install

Execução
Para executar o projeto MFE1 em modo de desenvolvimento:

ng serve --port 4201

Isso iniciará o servidor de desenvolvimento na porta 4201.
