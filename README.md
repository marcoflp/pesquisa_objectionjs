# Objection.js - Exemplo de Implementação

## O que é um ORM?

**ORM (Object-Relational Mapping)** é uma técnica de programação que permite mapear dados entre sistemas incompatíveis usando linguagens de programação orientadas a objetos. Em JavaScript, um ORM facilita a interação com bancos de dados relacionais, permitindo que você trabalhe com objetos JavaScript em vez de escrever SQL diretamente.

### Vantagens dos ORMs:
- **Abstração**: Você trabalha com objetos em vez de SQL puro
- **Segurança**: Proteção automática contra SQL injection
- **Produtividade**: Menos código repetitivo (boilerplate)
- **Manutenibilidade**: Código mais limpo e organizad
- **Portabilidade**: Facilita mudanças entre diferentes bancos de dados

## Sobre o Objection.js

Objection.js é um ORM moderno para Node.js construído sobre o query builder Knex.js. Ele oferece:

- Sintaxe limpa e intuitiva
- Suporte a relacionamentos complexos
- Validação de dados
- Hooks e plugins
- Suporte a transações
- Compatibilidade com PostgreSQL, MySQL, SQLite e outros

## Estrutura do Projeto

```
objection.js/
├── models/
│   └── Usuario.js      # Modelo de dados
├── db.js              # Configuração do banco
├── migrate.js         # Script de migração
├── index.js           # Arquivo principal
└── package.json       # Dependências
```

## Configuração

### 1. Dependências

```json
{
  "dependencies": {
    "knex": "^3.1.0",
    "objection": "^3.1.5",
    "pg": "^8.16.3"
  }
}
```

### 2. Configuração do Banco (db.js)

```javascript
const { knex } = require('knex');
const { Model } = require('objection');

const knexInstance = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'postgres',
    database: 'novo_banco'
  }
});

// Vincula o Knex ao Objection
Model.knex(knexInstance);

module.exports = knexInstance;
```

### 3. Modelo de Dados (models/Usuario.js)

```javascript
const { Model } = require('objection');

class Usuario extends Model {
  static get tableName() {
    return 'usuarios';
  }
}

module.exports = Usuario;
```

## Como Usar

### 1. Criar a Tabela

Execute o script de migração para criar a tabela:

```bash
node migrate.js
```

### 2. Operações CRUD

#### Inserir Dados
```javascript
const novo = await Usuario.query().insert({ 
  nome: 'Ana', 
  email: 'ana@email.com' 
});
```

#### Buscar Dados
```javascript
// Buscar todos
const usuarios = await Usuario.query();

// Buscar por ID
const usuario = await Usuario.query().findById(1);

// Buscar com filtros
const usuarios = await Usuario.query().where('nome', 'Ana');
```

#### Atualizar Dados
```javascript
const atualizado = await Usuario.query()
  .findById(1)
  .patch({ nome: 'Ana Silva' });
```

#### Deletar Dados
```javascript
const deletado = await Usuario.query().deleteById(1);
```

## Executando o Projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar o banco PostgreSQL** com as credenciais em `db.js`

3. **Criar a tabela:**
   ```bash
   node migrate.js
   ```

4. **Executar o exemplo:**
   ```bash
   node index.js
   ```

## Recursos Avançados

### Validação de Dados
```javascript
class Usuario extends Model {
  static get tableName() {
    return 'usuarios';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'email'],
      properties: {
        id: { type: 'integer' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' }
      }
    };
  }
}
```

### Relacionamentos
```javascript
class Usuario extends Model {
  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'usuarios.id',
          to: 'posts.usuario_id'
        }
      }
    };
  }
}
```

### Consultas Complexas
```javascript
// Buscar com relacionamentos
const usuarios = await Usuario.query()
  .withGraphFetched('posts')
  .where('nome', 'like', '%Ana%');

// Paginação
const usuarios = await Usuario.query()
  .page(0, 10);
```

## Comparação com SQL Puro

### SQL Tradicional:
```sql
INSERT INTO usuarios (nome, email) VALUES ('Ana', 'ana@email.com');
SELECT * FROM usuarios WHERE nome = 'Ana';
UPDATE usuarios SET nome = 'Ana Silva' WHERE id = 1;
DELETE FROM usuarios WHERE id = 1;
```

### Com Objection.js:
```javascript
await Usuario.query().insert({ nome: 'Ana', email: 'ana@email.com' });
await Usuario.query().where('nome', 'Ana');
await Usuario.query().findById(1).patch({ nome: 'Ana Silva' });
await Usuario.query().deleteById(1);
```

## Conclusão

O Objection.js oferece uma forma elegante e produtiva de trabalhar com bancos de dados em Node.js, combinando a flexibilidade do SQL com a conveniência de um ORM moderno. É ideal para projetos que precisam de um equilíbrio entre controle e abstração.