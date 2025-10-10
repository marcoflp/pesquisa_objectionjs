const knex = require('../db');
const Usuario = require('../models/Usuario');

async function main() {
  // inserir
  const novo = await Usuario.query().insert({ nome: 'Ana', email: 'ana@email.com' });
  console.log('Usuário inserido:', novo);
}

main();
