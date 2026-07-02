# CRUD de Produtos — Desenvolvimento Web (SENAI)

Trabalho prático da disciplina de Desenvolvimento Web: implementar um CRUD completo de **Produtos**, ponta a ponta, sobre uma base full-stack que já vem pronta com autenticação JWT, conexão ao banco via Knex e um front-end Next.js com Axios configurado.

> O enunciado completo do exercício está em [`TRABALHO.md`](./TRABALHO.md).

## Stack

| Camada    | Tecnologias                                                                 |
|-----------|-------------------------------------------------------------------------------|
| Backend   | Express 5, TypeScript, Knex + MySQL (`mysql2`), JWT (`jsonwebtoken`), Zod    |
| Frontend  | Next.js (Pages Router), React 19, Axios (com interceptor de token), Tailwind CSS |
| Banco     | MySQL — banco `desenv_web_rpv`                                              |

## Estrutura do projeto

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts      # login (pronto) — modelo de referência
│   │   │   └── productController.ts   # 5 funções do CRUD (a implementar)
│   │   ├── middleware/authMiddleware.ts  # verifyJWT (pronto, reutilizável)
│   │   ├── database/connection.ts     # instância do Knex (pronta)
│   │   ├── services/validate.ts       # middleware de validação com Zod
│   │   └── index.ts                   # registro de rotas do Express
│   └── routes.http                    # requisições prontas para testar cada rota
├── frontend/
│   └── src/
│       ├── api/axiosInstance.ts       # instância do Axios (pronta, não mexer)
│       └── pages/produtos/
│           ├── index.tsx              # listagem (a implementar)
│           ├── novo.tsx                # cadastro (a implementar)
│           └── [id].tsx               # edição — rota dinâmica (a implementar)
└── banco/setup_produtos.sql           # script de criação da tabela `produtos`
```

## Como rodar

### 1. Banco de dados

Execute o script contra o MySQL local (banco `desenv_web_rpv`, mesmo usado em aula):

```bash
mysql -u root -p desenv_web_rpv < banco/setup_produtos.sql
```

Confira as credenciais em `backend/src/database/connection.ts` caso seu MySQL local use host/porta/usuário/senha diferentes.

### 2. Backend

```bash
cd backend
pnpm install
pnpm dev        # http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:3000
```

### Testando as rotas

Use `backend/routes.http` (extensão REST Client do VS Code, ou equivalente) para testar cada rota de `/produtos` isoladamente antes de integrar com as telas do front-end. Já existe um bloco de exemplo para as 5 chamadas do CRUD.

Login de teste (mock, ver `authController.ts`):
```json
{ "email": "teste@usuario.com", "password": "teste" }
```

## O que precisa ser implementado

Este repositório é um **scaffold**: a base de autenticação, banco e Axios já funciona, mas o CRUD de Produtos em si ainda não foi escrito — os 5 métodos do controller e as 3 páginas do front-end estão vazios, marcados com `// TODO`.

**Backend** — `backend/src/controllers/productController.ts`
- [ ] `getProducts` — `GET /produtos`, aceitando `?q=` para busca por nome
- [ ] `getProductById` — `GET /produtos/:id`, 404 se não existir
- [ ] `createProduct` — `POST /produtos`
- [ ] `updateProduct` — `PUT /produtos/:id`, 404 se não existir
- [ ] `deleteProduct` — `DELETE /produtos/:id`, 404 se não existir
- [ ] Registrar as 5 rotas em `backend/src/index.ts` (mesmo padrão de `/login` e `/perfil`)

**Frontend** — `frontend/src/pages/produtos/`
- [ ] `index.tsx` — busca e lista produtos (`useEffect`), com links Editar/Excluir
- [ ] `novo.tsx` — formulário controlado, `POST /produtos`
- [ ] `[id].tsx` — carrega produto por id (`useRouter().query.id`), `PUT /produtos/:id`

## Pontos de atenção

- As rotas de produtos **não exigem autenticação** — o middleware `verifyJWT` existe e pode ser reaproveitado, mas não é obrigatório para este exercício.
- Não é necessário mexer na lógica de login/JWT já existente.
- Conceitos novos necessários: `req.params`, verbos `PUT`/`DELETE`, `useEffect`, rota dinâmica `[id].tsx` do Next.js — ver seção 4 do [`TRABALHO.md`](./TRABALHO.md) para links de estudo.
- Critério de avaliação inclui "sem `console.log` de debug esquecido" — vale revisar antes de entregar.
