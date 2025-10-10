const knex = require('./db');
const Usuario = require('./models/Usuario');

async function main() {
  // inserir
  const novo = await Usuario.query().insert({ nome: 'Ana', email: 'ana@email.com' });
  console.log('Usuário inserido:', novo);

  // buscar todos
//   const usuarios = await Usuario.query();
//   console.log('Todos os usuários:', usuarios);

//   // atualizar
//   const atualizado = await Usuario.query().findById(1).patch({ nome: 'Ana Silva' });
//   console.log('Usuário atualizado:', atualizado);

//   // deletar
//   const deletado = await Usuario.query().deleteById(1);
//   console.log('Usuário deletado:', deletado);
}

main();
