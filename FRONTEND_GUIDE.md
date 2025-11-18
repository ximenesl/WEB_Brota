# Guia do Frontend para Iniciantes

Olá! Este guia foi criado para te ajudar a entender e rodar o frontend deste projeto, mesmo que você nunca tenha trabalhado com desenvolvimento frontend antes.

## O que é o Frontend?

O frontend é a parte visual da aplicação, ou seja, tudo o que você vê e interage no seu navegador. Ele é construído com tecnologias como HTML, CSS e JavaScript. Neste projeto, estamos usando uma biblioteca chamada **React** para construir a interface, e **TypeScript** para adicionar tipos ao JavaScript, o que nos ajuda a evitar erros.

## Estrutura de Pastas do Frontend

Vamos dar uma olhada na estrutura de pastas do frontend:

-   `frontend/`
    -   `node_modules/`: Esta pasta contém todas as dependências (bibliotecas e ferramentas) que o projeto precisa para funcionar. Você não precisa se preocupar com ela, pois ela é gerenciada pelo `npm`, o gerenciador de pacotes do Node.js.
    -   `public/`: Contém arquivos estáticos que são servidos diretamente pelo servidor, como o `index.html`.
    -   `src/`: Esta é a pasta mais importante. É onde fica todo o código-fonte do frontend.
        -   `assets/`: Contém imagens e outros arquivos de mídia.
        -   `components/`: Contém os componentes React, que são como "peças de lego" que usamos para construir a interface. Cada arquivo `.tsx` é um componente.
        -   `services/`: Contém o código para se comunicar com o backend (a API).
        -   `styles/`: Contém os arquivos de estilo (CSS).
        -   `App.tsx`: É o componente principal da aplicação, que organiza todos os outros componentes.
        -   `main.tsx`: É o ponto de entrada da aplicação. Ele renderiza o componente `App` na página.
    -   `package.json`: Este arquivo contém informações sobre o projeto, como o nome, a versão e as dependências.
    -   `vite.config.ts`: Arquivo de configuração do Vite, a ferramenta que usamos para rodar o servidor de desenvolvimento e para "compilar" o código para produção.

## Pré-requisitos

Antes de rodar o frontend, você precisa ter o **Node.js** instalado no seu computador. O Node.js é um ambiente que permite executar JavaScript fora do navegador. Para instalá-lo, siga os passos abaixo:

1.  Acesse o site oficial do Node.js: [https://nodejs.org/](https://nodejs.org/)
2.  Baixe a versão LTS (Long-Term Support), que é a mais estável.
3.  Execute o instalador e siga as instruções.

Para verificar se o Node.js foi instalado corretamente, abra o seu terminal (no Windows, você pode usar o "Prompt de Comando" ou o "PowerShell") e digite o seguinte comando:

```bash
node -v
```

Se tudo estiver certo, você verá a versão do Node.js que você instalou.

## Como Rodar o Frontend

Agora que você tem o Node.js instalado, siga os passos abaixo para rodar o frontend:

1.  **Abra o terminal na pasta do frontend:**
    Navegue até a pasta `frontend` do projeto no seu terminal. Você pode fazer isso usando o comando `cd`:

    ```bash
    cd caminho/para/o/projeto/frontend
    ```

2.  **Instale as dependências:**
    Antes de rodar o projeto pela primeira vez, você precisa instalar todas as dependências listadas no arquivo `package.json`. Para fazer isso, execute o seguinte comando:

    ```bash
    npm install
    ```

    Este comando vai baixar todas as dependências e criar a pasta `node_modules`.

3.  **Inicie o servidor de desenvolvimento:**
    Depois de instalar as dependências, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

    ```bash
    npm run dev
    ```

    Este comando vai iniciar um servidor local (geralmente em `http://localhost:5173`) e abrir a aplicação no seu navegador. Qualquer alteração que você fizer no código-fonte será refletida automaticamente no navegador.

## O que vem a seguir?

Agora que o frontend está rodando, você pode começar a explorar o código. Tente fazer pequenas alterações nos arquivos da pasta `src/components` e veja o que acontece no navegador. Por exemplo, tente mudar algum texto em um dos componentes.

Se você tiver alguma dúvida, não hesite em perguntar!
