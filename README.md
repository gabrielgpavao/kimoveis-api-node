# Documentação da API

## Sumário

- [Visão Geral](#1-visão-geral)
- [Diagrama de Entidade Relacionamento (DER)](#2-diagrama-de-entidade-relacionamento)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Endpoints](#4-endpoints)
- [Sobre os Testes](#5-sobre-os-testes)

---

## 1. Visão Geral

Aplicação Backend (API) criada para gerenciar os dados de uma imobiliária. É possível cadastrar novos clientes, cadastrar novos imóveis, associá-los a um endereço e categoria, bem como agendar uma visita do cliente para o imóvel.

Principais tecnologias utilizadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)

---

## 2. Diagrama de Entidade Relacionamento
[ Voltar para o topo ](#sumário)


Relações entre as tabelas do banco de dados.

![DER](https://m4-seven.vercel.app/modulo_4/_entregas/sprint_6/projeto_semanal/der.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#sumário)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

Caso use npm
```bash
npm install
```

Caso use yarn
```bash
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do PostgreSQL e um novo Banco de Dados da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

Caso use npm
```bash
npm run typeorm migration:run -d src/data-source.ts
```

Caso use yarn
```bash
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Endpoints

[ Voltar para o topo ](#sumário)

### Índice

- [Login](#41-login)
    - [POST - /login](#login)
- [Users](#42-users)
    - [POST - /users](#21-criação-de-usuário)
    - [GET - /users](#422-listando-usuários)
    - [PATCH - /users/:id](#423-atualização-de-usuário)
    - [DELETE - /users/:id](#424-deleção-de-usuário)
- [Categories](#43-categories)
    - [POST - /categories](#431-criação-de-categorias)
    - [GET - /categories](#432-listando-as-categorias)
    - [GET - /categories/:id/realEstate](#433-listando-imóveis-de-uma-categoria)
- [Real Estate](#44-real-estates)
    - [POST - /realEstate](#441-criação-de-imóveis)
    - [GET - /realEstate](#442-listando-imóveis)
- [Schedules](#45-schedules)
    - [POST - /schedules](#451-agendando-visita-a-um-imóvel)
    - [GET - /schedules/realEstate/:id](#452-listar-agendamentos-de-um-imóvel)

---

## 4.1. **Login**
[ Voltar para os Endpoints ](#4-endpoints)

### `/login`

### Exemplo de Request:
```
POST /login
Host: http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "gabriel@mail.com",
	"password": "1234"
}
```

### Schema de Validação com Zod:
```javascript
email: z
  .string()
  .email(),
password: z
  .string()
```
OBS.: Chaves não presentes no schema serão ignoradas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjc4ODE2MzE4LCJleHAiOjE2Nzg5MDI3MTgsInN1YiI6IjYifQ.TLL1i1jU4rpOwiqqS8n0J4vr2rMa4i68hZ0v6yIwTdI"
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 400 Bad Request   | ZodError - Invalid Body. | Corpo da requisição possui alguma chave ou valor incorreto. |
| 401 Unauthorized | Invalid credentials | Email ou senha estão incorretos. |

---

## 4.2. **Users**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário. Valor Único.               |
| password   | string | A senha de acesso do usuário                    |
| admin      | boolean | Define se o usuário é Administrador ou não. Campo opcional. |
| createdAt  | date | Data de criação gerada no momento da criação. Read-only.       |
| updatedAt  | date | Data de atualização gerada no momento de qualquer alteração. Read-only. |
| deletedAt  | date | Data de deleção gerada no momento da deleção. Read-only.       |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| GET      | /users     | Lista todos os usuários                 |
| PATCH    | /users/:id     | Atualiza um usuário usando seu ID como parâmetro |
| DELETE   | /users/:id     | Realiza um soft delete em um usuário usando seu ID como parâmetro |

---

### 2.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Gabriel",
	"email": "gabriel@mail.com",
	"password": "1234"
}
```
OBS.: A chave "admin" é opcional. O valor padrão é *false*.

### Schema de Validação com Zod:
```javascript
name: z
  .string()
  .max(45, 'String must contain at most 45 character(s)'),
email: z
  .string()
  .email('Invalid email'),
password: z
  .string()
  .max(120, 'String must contain at most 120 character(s)'),
admin: z
  .boolean()
  .default(false)
```
OBS.: Chaves não presentes no schema serão ignoradas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 1,
	"name": "Gabriel",
	"email": "gabriel@mail.com",
	"admin": false,
  "createdAt": "2023-04-16",
  "updatedAt": "2023-04-16",
  "deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 409 Conflict   | Email already registered. | Email inserido já está registrado. |
| 400 Bad Request   | ZodError - Invalid Body. | Corpo da requisição possui alguma chave ou valor incorreto. |

---

### 4.2.2. **Listando Usuários**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users`

Esta rota só pode ser acessada por usuários administradores que estão logados.

### Exemplo de Request:
```
GET /users
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
  {
    "id": 1,
    "name": "Gabriel",
    "email": "gabriel@mail.com",
    "admin": false,
    "createdAt": "2023-04-16",
    "updatedAt": "2023-04-16",
    "deletedAt": null
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 403 Forbidden   | Insufficient Permission. | Tentativa de acesso sem permissão de administrador |

---

### 4.2.3. **Atualização de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users/:id`

Apenas administradores podem atualizar qualquer usuário.
Usuários não-administradores podem apenas atualizar a si mesmo.

### Exemplo de Request:
```
PATCH /users/1
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Gabriel Pavão"
}
```
OBS.: A chave "admin" não pode ser atualizada.

### Schema de Validação com Zod:
```javascript
name: z
  .string()
  .max(45, 'String must contain at most 45 character(s)')
  .optional(),
email: z
  .string()
  .email('Invalid email')
  .optional(),
password: z
  .string()
  .max(120, 'String must contain at most 120 character(s)')
  .optional()
```
OBS.: Chaves não presentes no schema serão ignoradas.

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": 1,
	"name": "Gabriel Pavão",
	"email": "gabriel@mail.com",
	"admin": false,
  "createdAt": "2023-04-16",
  "updatedAt": "2023-04-16",
  "deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 400 Bad Request   | ZodError - Invalid Body. | Corpo da requisição possui alguma chave ou valor incorreto. |
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 403 Forbidden   | Insufficient Permission. | Tentativa de acesso sem permissão de administrador |
| 404 Not Found   | User not found. | ID inserido na url não existe. |
| 409 Conflict   | Email already registered. | Email inserido já está registrado. |

---

### 4.2.4. **Deleção de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users/:id`

A rota realiza um soft delete do usuário e pode ser acessada apenas por usuários administradores.

### Exemplo de Request:
```
DELETE /users/1
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```
Vazio
```

### Exemplo de Response:
```
204 No Content
```

```
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 403 Forbidden   | Insufficient Permission. | Tentativa de acesso sem permissão de administrador |
| 404 Not Found   | User not found. | ID inserido na url não existe. |

---

## 4.3. **Categories**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Category é definido como:

| Campo      | Tipo   | Descrição                                       |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único da categoria                |
| name       | string | O nome da categoria. Valor único.               |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /categories     | Criação de uma categoria           |
| GET      | /categories     | Lista todas as categorias          |
| GET      | /categories/:id/realEstate     | Lista todos imóveis que pertencem a uma categoria |

---

### 4.3.1. **Criação de Categorias**

[ Voltar para os Endpoints ](#4-endpoints)

### `/categories`

A rota pode ser acessada apenas por usuários administradores.

### Exemplo de Request:
```
POST /categories
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Apartamento"
}
```

### Schema de Validação com Zod:
```javascript
name: z
  .string()
  .max(45)
```
OBS.: Chaves não presentes no schema serão ignoradas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 1,
	"name": "Apartamento"
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 400 Bad Request   | ZodError - Invalid Body. | Corpo da requisição possui alguma chave ou valor incorreto. |
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 403 Forbidden   | Insufficient Permission. | Tentativa de acesso sem permissão de administrador |
| 409 Conflict   | Category already exists. | Categoria inserida já está registrada. |

---

### 4.3.2. **Listando as Categorias**

[ Voltar aos Endpoints ](#4-endpoints)

### `/categories`

A rota possui acesso livre.

### Exemplo de Request:
```
GET /categories
Host: http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
  {
	  "id": 1,
	  "name": "Apartamento"
  }
]
```

### Possíveis Erros:
Nenhum erro é esperado para essa rota.
O máximo que pode acontecer é o retorno de uma lista vazia.

---

### 4.3.3. **Listando Imóveis de uma Categoria**

[ Voltar aos Endpoints ](#4-endpoints)

### `/categories/:id/realEstate`

A rota possui acesso livre.

### Exemplo de Request:
```
GET /categories/1/realEstate
Host: http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
  "id": 1,
  "name": "Apartamento",
  "realEstate": [
    {
      "id": 1,
      "value": "100000.00",
      "size": 500,
      "sold": false,
      "createdAt": "2023-03-02",
      "updatedAt": "2023-03-02"
    }
  ]
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 404 Not Found  | Category not found. | ID da categoria informada não existe. |

---

## 4.4. **Real Estates**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Real Estate é definido como:

| Campo      | Tipo   | Descrição                                       |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único do imóvel                   |
| value      | float  | Preço do imóvel                                 |
| size       | number | Área total do imóvel                            |
| categoryId | number | ID da categoria da qual o imóvel pertence       |
| sold       | boolean | Booleano que informa se o imóvel foi vendido. Read-only. |
| createdAt  | date | Data de criação gerada no momento da criação. Read-only.       |
| updatedAt  | date | Data de atualização gerada no momento de qualquer alteração. Read-only. |
| address | object | Objeto contendo os dados do endereço do imóvel. Ver tabela abaixo para saber mais. |

O objeto Address é definido como:

| Campo      | Tipo   | Descrição                                        |
| -----------|--------|--------------------------------------------------|
| id         | number | Identificador único do endereço                  |
| street     | string | Nome da rua do endereço                          |
| zipCode    | string | Código postal (CEP) do endereço em até 8 dígitos | 
| number     | string | Número do imóvel                                 |
| city       | string | Cidade do endereço                               |
| state      | string | Estado do endereço no formato AA. Ex: SP.        |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /realEstate     | Criação de um imóvel               |
| GET      | /realEstate     | Lista todos os imóveis             |

---

### 4.4.1. **Criação de Imóveis**

[ Voltar para os Endpoints ](#4-endpoints)

### `/realEstate`

A rota pode ser acessada apenas por usuários administradores.

### Exemplo de Request:
```
POST /realEstate
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"value": 100000.00,
	"size": 500,
	"categoryId": 1,
	"address": {
		"street": "Rua das Flores",
		"number": "15"
		"zipCode": "66520000",
		"city": "Curitiba",
		"state": "PR"
	}
}
```

### Schema de Validação de Real Estate com Zod:
```javascript
value: z
	.number()
	.min(-9999999999.99)
	.max(9999999999.99)
	.or(z.string()),
size: z
	.number()
	.int()
	.positive()
categoryId: z
	.number()
	.int()
address: Address
```

### Schema de Validação de Address com Zod:
```javascript
street: z
	.string()
	.max(45),
zipCode: z
	.string()
	.max(8),
number: z
	.string()
	.max(7)
	.nullish(),
city: z
	.string()
	.max(20),
state: z.string().max(2)
```

OBS.: Chaves não presentes no schema serão ignoradas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 1,
	"value": "100000.00",
	"size": 500,
	"sold": false,
	"createdAt": "2023-04-27",
	"updatedAt": "2023-04-27",
	"address": {
		"id": 1,
		"street": "Rua das Flores",
		"number": "15",
		"zipCode": "66520000",
		"city": "Curitiba",
		"state": "PR",
	},
	"category": {
		"id": 1,
		"name": "Apartamento"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 400 Bad Request   | ZodError - Invalid Body. | Corpo da requisição possui alguma chave ou valor incorreto. |
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 403 Forbidden   | Insufficient Permission. | Tentativa de acesso sem permissão de administrador |
| 409 Conflict   | Address already exists. | Endereço inserido já está registrado. |

---

### 4.4.2. **Listando Imóveis**

[ Voltar para os Endpoints ](#4-endpoints)

### `/realEstate`

A rota possui acesso livre.

### Exemplo de Request:
```
POST /realEstate
Host: http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
[
	{
		"id": 1,
		"value": "100000.00",
		"size": 500,
		"createdAt": "2023-04-27",
		"updatedAt": "2023-04-27",
		"sold": false,
		"address": {
			"id": 1,
			"street": "Rua das Flores",
			"number": "15",
			"zipCode": "66520000",
			"city": "Curitiba",
			"state": "PR",
		}
	}
]
```

### Possíveis Erros:
Nenhum erro é esperado para essa rota.
O máximo que pode acontecer é o retorno de uma lista vazia.

 ---
 
## 4.5. **Schedules**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Schedules é definido como:

| Campo        | Tipo   | Descrição                                                     |
| -------------|--------|---------------------------------------------------------------|
| id           | number | Identificador único da categoria                              |
| date         | date   | Data de agendamento da visita ao imóvel no formato AAAA-DD-MM |
| hour         | string | Horário de agendamento da visita ao imóvel no formato HH:MM   |
| realEstateId | number | ID do imóvel a ser visitado                                   |
| userId       | number | ID do usuário que está agendando a visita. Read-only.         |

### Endpoints

| Método   | Rota                      | Descrição                                |
|----------|---------------------------|------------------------------------------|
| POST     | /schedules                | Agenda uma visita a um imóvel            |
| GET      | /schedules/realEstate/:id | Lista todos os agendamentos de um imóvel |

---

### 4.5.1. **Agendando Visita a um Imóvel**

[ Voltar para os Endpoints ](#4-endpoints)

### `/schedules`

A rota pode ser acessada apenas por usuários logados.

### Exemplo de Request:
```
POST /schedules
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"date": "2023/04/19",
  	"hour": "15:00",
	"realEstateId": 1
}
```

### Schema de Validação de Real Estate com Zod:
```javascript
date: z
	.string()
	.refine((date: string) => {
		const dateRegex: RegExp = /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
		return dateRegex.test(date)
	}, { message: 'Invalid date, date format is YYYY/DD/MM' })
	.refine((date: any) => {
		date = date.split('/')
		const handleDate = new Date(date[0], date[2] - 1, date[1])
		const dateDay = handleDate.getDay()	
		return dateDay >= 1 && dateDay <= 5
	}, { message: 'Invalid date, work days are monday to friday'}),
hour: z
	.string()
	.refine((hour: string) => {
		const hourRegex: RegExp = /^(0[8-9]|1[0-7]):[0-5][0-9]$/
		return hourRegex.test(hour)
	}, { message: `Invalid hour, available times are 8AM to 18PM` }),

realEstateId: z
	.number()
	.int()
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"message": "Schedule created"
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 400 Bad Request   | ZodError - Invalid Body. | Corpo da requisição possui alguma chave ou valor incorreto. |
| 400 Bad Request   | Invalid hour, available times are 8AM to 18PMy. | A hora informada é antes das 8:00 ou depois das 18:00. |
| 400 Bad Request   | Invalid date, work days are monday to friday. | A data informada corresponde a um sábado ou domingo. |
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 404 Not Found   | RealEstate not found. | ID do imóvel fornecido não existe |
| 409 Conflict   | Schedule to this real estate at this date and time already exists. | Já existe uma visita marcada para esse imóvel nessa mesma data e hora. |
| 409 Conflict   | User schedule to this real estate at this date and time already exists. | O próprio usuário já possui uma outra visita agendada nessa mesma data e hora. |

---

### 4.5.2. **Listar Agendamentos de um Imóvel**

[ Voltar para os Endpoints ](#4-endpoints)

### `/schedules/realEstate/:id`

A rota pode ser acessada apenas por usuários administradores.

### Exemplo de Request:
```
POST /schedules/realEstate/:id
Host: http://localhost:3000/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": 1,
	"value": "100000.00",
	"size": 500,
	"createdAt": "2023-04-27",
	"updatedAt": "2023-04-27",
	"sold": false,
	"category": {
		"id": 1,
		"name": "Apartamento"
	},
	"address": {
		"id": 1,
		"street": "Rua das Flores",
		"zipCode": "66520000",
		"number": 15,
		"city": "Curitiba",
		"state": "PR"
	},
	"schedules": [
		{
			"id": 1,
			"date": "2023-04-19",
			"hour": "15:00:00",
			"user": {
				"id": 1,
				"name": "Gabriel",
				"email": "gabriel@mail.com",
				"admin": true,
				"createdAt": "2023-03-01",
				"updatedAt": "2023-03-01",
				"deletedAt": null
			}
		}
	]
}
```

### Possíveis Erros:
| Código do Erro | Descrição | Causa |
|----------------|-----------|-------|
| 401 Unauthorized   | Missing Bearer Token. | Token não enviado. |
| 401 Unauthorized   | JWT malformed. | Token violado ou incompleto |
| 403 Forbidden   | Insufficient Permission. | Tentativa de acesso sem permissão de administrador |

---

## 5. Sobre os Testes

Essa aplicação possui testes, que são utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.ts` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

## Rodando os testes

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes

```bash
# caso use npm
npm run test

# caso use yarn
yarn test
```

### Rodar todos os testes e ter um log ainda mais completo

```bash
# caso use npm
npm run test --all

# caso use yarn
yarn test --all
```

### Rodar os testes de uma pasta específica

> detalhe: repare que tests está envolvido por 2 underlines. Isso se chama ***dunder***.

```bash
# caso use npm
npm run test <subpasta>

# caso use yarn
yarn test <subpasta>
```

### Rodar os testes de um arquivo específico

```bash
# caso use npm
npm run test <subpasta>/<arquivo>

# caso use yarn
yarn test <subpasta>/<arquivo>
```

**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.
