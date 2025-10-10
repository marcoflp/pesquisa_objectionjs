const { Model } = require('objection');

class Usuario extends Model {
  static get tableName() {
    return 'usuarios';
  }
}

module.exports = Usuario;
