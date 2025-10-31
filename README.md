# Projeto FullStack: Angular + Node.js + PostgreSQL

Este é um projeto FullStack utilizando **Angular no Frontend** e **Node.js com Express no Backend**, seguindo boas práticas de arquitetura, autenticação JWT e banco de dados relacional utilizando Sequelize + PostgreSQL.

---

## Tecnologias Utilizadas

### **Frontend**
- Angular
- SCSS
- JWT Interceptor
- Guards de Autenticação

### **Backend**
- Node.js (versão 20+ obrigatória)
- Express
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- Yup para validação de requisições
- Bcrypt para criptografia de senhas
- async/await para operações assíncronas

---

### **Funcionalidades a Serem Implementadas**

#### Usuários
| Método | Rota | Descrição |
|--------|--------|-------------|
| POST | `/user` | Criação de usuário com validações |
| POST | `/authenticate` | Autenticação e retorno de token JWT |

**Regras de Negócio**
- Senha e confirmação devem ser iguais
- Não permite cadastro com e-mail duplicado

Campos:
| Campo | DB Column | Tipo |
|--------|-------------|--------|
| nome | name | VARCHAR(255) |
| email | email | VARCHAR(255) |
| senha | password | VARCHAR(255) |

---

#### Publicações (Posts)

| Método | Rota | Descrição |
|--------|--------|-------------|
| POST | `/post` | Criar post (auth obrigatória) |
| PUT | `/post/:id` | Atualizar post (auth obrigatória) |
| DELETE | `/post/:id` | Remover post (somente autor) |
| GET | `/post` | Listagem com paginação estilo Instagram |
| POST | `/post/:id/like` | Like / Deslike |

**Campos do Post**
- Usuário
- Título
- Texto
- Resumo
- Total de likes (baseado em `post_likes`)
- Data de publicação (obrigatória e pode ser futura)

**Regras de Negócio**
- Apenas o criador pode editar/remover
- Respeita agendamento: só mostra posts com `available_at <= now()`
- Retorna `allowEdit` e `allowRemove` para o usuário logado

---

## **Comandos Utilizados no Projeto**

### **Backend – Node.js + Express + Sequelize**

| Comando                                                                          | Para que serve                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cd backend` | Acessa a pasta do backend para instalar dependências e configurar o servidor.|
| `npm init -y` | Inicializa o projeto Node criando o arquivo `package.json` com configurações padrão.|
| `npm install express cors dotenv yup jsonwebtoken bcrypt sequelize pg pg-hstore` | Instala as dependências de produção do backend:<br>• **express**: framework para criar API<br>• **cors**: libera acesso entre domínios (Angular ↔ Node)<br>• **dotenv**: gerenciar variáveis de ambiente (`.env`)<br>• **yup**: validação de requisições<br>• **jsonwebtoken (JWT)**: autenticação por token<br>• **bcrypt**: criptografar senhas<br>• **sequelize**: ORM de acesso ao banco<br>• **pg / pg-hstore**: drivers do PostgreSQL para Sequelize |
| `npm install --save-dev sequelize-cli nodemon`| Instala dependências de desenvolvimento:<br>• **sequelize-cli**: cria models, migrations e seeds<br>• **nodemon**: reinicia o servidor automaticamente ao salvar arquivos|
| `npx sequelize-cli init`| Cria a estrutura inicial do Sequelize (`models`, `migrations`, `seeders`, `config`).|
| `npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string` | Gera automaticamente o **model** e a **migration** do usuário (**User**) com os campos `name`, `email` e `password`. <br>O Sequelize cria os arquivos necessários em `src/models/` e `src/migrations/`, permitindo editar e ajustar os tipos de dados e validações antes de executar as migrations.|


---

### **Frontend – Angular**

| Comando                                  | Para que serve                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm install -g @angular/cli` | Instala o **Angular CLI** globalmente, permitindo criar e gerenciar projetos Angular via terminal. |
| `ng new frontend --routing --style=scss` | Cria o projeto Angular com sistema de rotas habilitado e utilizando **SCSS** para estilização. |
| `cd frontend`| Entra na pasta do frontend para instalar libs e criar componentes.                                 |
| `npm install @auth0/angular-jwt`| Instala biblioteca para integrar **JWT** no Angular e interceptar requisições autenticadas. |

---