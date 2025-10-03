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

// vincula o knex ao objection
Model.knex(knexInstance);

module.exports = knexInstance;
