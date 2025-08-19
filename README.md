# 🚀 MFE1 - Gerenciamento de Contas (ByteBank)

## 🎯 Sobre o Projeto

Este repositório contém o **Micro Frontend (MFE) "MFE1"**, uma parte integrante da aplicação de gerenciamento financeiro **ByteBank**. O principal objetivo deste MFE é entregar funcionalidades específicas e modulares que são consumidas e orquestradas pelo [Projeto Host](https://github.com/jhonsoad/projeto-financeiro-host). Operando de forma autônoma, este MFE pode ser desenvolvido, testado e implantado independentemente, garantindo uma integração fluida com a aplicação principal.

### Responsabilidades Chave deste MFE:

*   **Funcionalidade Específica:** Este módulo é dedicado a exibir o saldo da conta, o extrato detalhado e permitir a visualização de transações recentes. Além disso, capacita o usuário a realizar transações financeiras de débito e crédito, proporcionando controle total sobre suas finanças.
*   **Componentes Expostos:** Para facilitar a integração com o Projeto Host, o arquivo `federation.config.js` expõe o componente `./Component`, que por sua vez aponta para `inicio.component.ts`, tornando-o acessível para carregamento dinâmico.

## 🏛️ Arquitetura e Tecnologias

A arquitetura deste projeto é baseada em **Micro Frontends (MFEs)**, seguindo a mesma abordagem modular do Projeto Host. Para a orquestração dos módulos e a federação de componentes, utilizamos a biblioteca `@angular-architects/native-federation`, garantindo escalabilidade e flexibilidade no desenvolvimento.

### Tecnologias Principais Utilizadas:

*   **Angular v19.2.0:** O framework front-end de escolha, fornecendo uma base robusta e de alto desempenho para o desenvolvimento da interface do usuário.
*   **Angular CLI:** Ferramenta de linha de comando essencial para otimizar o fluxo de trabalho de desenvolvimento, desde a inicialização do projeto até a manutenção e deploy.
*   **RxJS:** Biblioteca poderosa para programação reativa, utilizada para gerenciar eventos assíncronos e fluxos de dados, tornando a aplicação mais responsiva e eficiente.
*   **@angular-architects/native-federation:** Ferramenta crucial para a implementação da arquitetura de Micro Frontends, permitindo a federação e o compartilhamento de módulos entre diferentes aplicações Angular.
*   **TypeScript:** Um superset do JavaScript que adiciona tipagem estática, elevando a qualidade do código, facilitando a detecção de erros em tempo de desenvolvimento e melhorando a manutenibilidade.

## 📁 Estrutura de Pastas e Organização

A estrutura deste projeto segue as convenções padrão do Angular, promovendo uma organização clara e modular que facilita a manutenção, a colaboração e o desenvolvimento contínuo.

```
. 
├── src/
│   └── app/
│       ├── components/
│       │   ├── dashboard/
│       │   │   ├── sidebar/
│       │   │   ├── balance-card/
│       │   │   ├── statement-card/
│       │   │   └── transaction-form/
│       │   └── common/
│       │       ├── button/
│       │       ├── input/
│       │       └── dropdown/
│       ├── core/
│       │   └── auth-interceptor/
│       ├── pages/
│       │   └── dashboard/inicio/
│       ├── services/
│       │   ├── account.service.ts
│       │   ├── post-saldo.service.ts
│       │   └── delete-transaction.service.ts
│       └── shared/
│           ├── interfaces/
│           │   ├── account.ts
│           │   ├── transaction.ts
│           │   └── card.ts
│           └── design-system/
├── data/
│   └── db.json
├── environments/
├── package.json
├── angular.json
└── federation.config.js
```

### Detalhamento dos Arquivos e Diretórios:

*   `src/app/`: O diretório principal que encapsula a lógica central da aplicação e seus componentes.
    *   `components/`: Contém componentes reutilizáveis, categorizados para facilitar a localização e o reuso.
        *   `dashboard/`: Componentes específicos para a área do dashboard, como `sidebar`, `balance-card`, `statement-card`, `transaction-form`, entre outros, que compõem a interface principal do usuário.
        *   `common/`: Componentes genéricos e de uso comum, como `button`, `input` e `dropdown`, que podem ser utilizados em diversas partes da aplicação.
    *   `core/`: Abriga serviços e lógicas de baixo nível, como o `AuthInterceptor`, responsável por manipular requisições HTTP e adicionar tokens de autenticação.
    *   `pages/`: Agrupa os componentes que representam rotas ou "páginas" da aplicação, como o `InicioComponent` dentro de `dashboard`.
    *   `services/`: Contém os serviços responsáveis pela comunicação com a API de back-end, como `AccountService`, `PostSaldoService` e `DeleteTransactionService`, que gerenciam as operações de dados.
    *   `shared/`: Armazena interfaces, modelos de dados e outros recursos que são compartilhados por múltiplos módulos da aplicação, como as interfaces `Account`, `Transaction` e `Card`.
        *   `design-system/`: Inclui arquivos CSS para estilização global e variáveis de design, garantindo a consistência visual da aplicação.
*   `data/`: Contém o arquivo `db.json`, utilizado em conjunto com o `json-server` para simular uma API local durante o desenvolvimento, facilitando testes e prototipagem.
*   `environments/`: Contém as configurações de ambiente (desenvolvimento, produção, etc.), como a URL da API, permitindo uma fácil adaptação a diferentes cenários de deploy.
*   `package.json`: Lista todas as dependências do projeto (tanto de produção quanto de desenvolvimento) e define os scripts para executar tarefas como `start`, `build` e `test`. Também especifica o nome do projeto como "projeto-financeiro".
*   `angular.json`: O arquivo de configuração principal do Angular CLI, que define a estrutura do projeto, as configurações de build, serve e teste, incluindo a configuração do `esbuild` e o builder de `native-federation`.
*   `federation.config.js`: O arquivo de configuração essencial para o `native-federation`, onde são definidos quais componentes o projeto expõe (neste caso, o `InicioComponent`) e quais dependências são compartilhadas com outros MFEs, otimizando o carregamento e a performance.

## ⚙️ Como Começar

Para configurar e executar o projeto MFE1 localmente, siga as instruções detalhadas abaixo. Certifique-se de ter os pré-requisitos necessários instalados em seu ambiente.

### Pré-requisitos

Certifique-se de ter o **Node.js** (com uma versão compatível com Angular 19.2.0) e/ou **Docker** instalados em seu sistema.

### Com Docker

Para uma inicialização rápida e um ambiente isolado, utilize o Docker:

1.  **Construir a imagem Docker:**

    ```bash
    docker build -t mfe1-app .
    ```

2.  **Executar o container:**

    ```bash
    docker run -p 4201:4201 mfe1-app
    ```

    A aplicação estará acessível em seu navegador através do endereço: `http://localhost:4201`.

### Sem Docker

Caso prefira rodar o projeto diretamente em seu ambiente local:

1.  **Navegue até o diretório do projeto.**

2.  **Instale as dependências:** Execute o comando abaixo no terminal para instalar todas as dependências do projeto:

    ```bash
    npm install
    ```

### Execução

Para iniciar o projeto MFE1 em modo de desenvolvimento:

```bash
ng serve --port 4201
```

Este comando iniciará o servidor de desenvolvimento do Angular na porta `4201`, tornando o MFE1 acessível para testes e desenvolvimento. Lembre-se que, para a integração completa, o Projeto Host também deve estar em execução e configurado para carregar este MFE.
