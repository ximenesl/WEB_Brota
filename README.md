# Brota

Este é um projeto de um sistema de gerenciamento de sementes, com um frontend em React e um backend em Java com Spring Boot.

## Como Rodar o Projeto

### Pré-requisitos

-   **Java 17 ou superior:** Para rodar o backend.
-   **Maven:** Para gerenciar as dependências do backend.
-   **Node.js:** Para rodar o frontend.

### Backend

1.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```

2.  **Execute o servidor:**
    ```bash
    ./mvnw spring-boot:run
    ```
    No Windows, use:
    ```bash
    .\mvnw.cmd spring-boot:run
    ```

O servidor backend estará rodando em `http://localhost:8080`.

### Frontend

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O servidor frontend estará rodando em `http://localhost:5173`.
