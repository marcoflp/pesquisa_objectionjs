const knex = require('./db');

async function criarTabela() {
  const existe = await knex.schema.hasTable('usuarios');
  if (!existe) {
    await knex.schema.createTable('usuarios', (table) => {
      table.increments('id').primary();
      table.string('nome');
      table.string('email').unique();
    });
    console.log('Tabela criada!');
  }
  process.exit();
}

criarTabela();
