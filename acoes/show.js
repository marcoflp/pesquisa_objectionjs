const knex = require('../db');
const Usuario = require('../models/Usuario');

async function main() {

    // buscar todos
  const usuarios = await Usuario.query();
  console.log('Todos os usuários:', usuarios);
}

main();
