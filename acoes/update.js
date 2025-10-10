const knex = require('../db');
const Usuario = require('../models/Usuario');

async function main() {
  // atualizar
  const atualizado = await Usuario.query().findById(1).patch({ nome: 'Ana Silva' });
  console.log('Usuário atualizado:', atualizado);
}

main();
