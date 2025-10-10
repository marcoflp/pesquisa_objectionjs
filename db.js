const { knex } = require('knex');
const { Model } = require('objection');

const knexInstance = knex({
  client: 'pg',
  connection: {
    host: 'localhost',     
    user: 'postgres',      
    password: 'postgres', 
    database: 'teste_objectionjs'  
  }
});

// vincula o knex ao objection
Model.knex(knexInstance);

module.exports = knexInstance;
