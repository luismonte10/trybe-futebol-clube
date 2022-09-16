
<h1 align="center">Trybe Futebol Clube</h1>
<p align="center">O TFC é um site informativo sobre partidas e classificações de futebol.</p>

# Sobre o projeto:

O front-end foi diponibilizado pela equipe da Trybe. Portanto, fiquei responsavél por construir uma API RESTful com um back-end dockerizado utilizando modelagem de dados através do Sequelize, respeitando regras de negócio providas no projeto e que pudesse ser consumida pelo front-end.

<strong>Nesse projeto você pode:</strong>
 - Acompanhar a <strong>classificação geral</strong> e também pode filtrar a classificação por <strong>mandantes</strong> ou <strong>visitantes</strong>
 - Acompanhar as partidas, podendo filtrar por partidas já <strong>finalizadas</strong> ou <strong>em andamento</strong>
 - Adicionar um <strong>nova partida</strong> ou <strong>editar e finalizar</strong> uma já em andamento. Para isso é necessário estar logado com uma conta com status de ADMIN.

## Layout:
  <img src="/app/backend/src/assets/Login.png" alt="" />
  <img src="/app/backend/src/assets/Classificação.png" alt="" />
  <img src="/app/backend/src/assets/Partidas.png" alt="" />



# Tecnologias utilizadas:

- TypeScript
- NodeJS
- Express
- Sequelize
- Json Web Token
- Docker
- Testes: Mocha, Chai e Sinon

# Como executar o projeto:

<details>
  <summary><strong>Configurações mínimas para execução do projeto</strong></summary><br />
  
  Na sua máquina você deve ter:<br />

  - Sistema Operacional Distribuição Unix
  - Node versão >= 16.15
  - Docker
  - Docker-compose versão >=1.29.2
</details>

Para clonar o repositório e instalar as dependências:
```bash
# clonar repositório
git clone git@github.com:luismonte10/trybe-futebol-clube.git
# entrar na pasta do projeto
cd trybe-futebol-clube
# Instale as dependências
npm run install:apps
```
Para executar o projeto:
```bash
# Abrar um terminal na pasta de back-end e use o script
npm run dev
# Abrar um terminal na pasta de front-end e use o script
npm start
# Para logar como admin use
email: admin@admin.com
senha: secret_admin
```
