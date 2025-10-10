const knex = require('../db');
const Usuario = require('../models/Usuario');

async function main() {
  // deletar
  const deletado = await Usuario.query().deleteById(1);
  console.log('Usuário deletado:', deletado);
}

main();
