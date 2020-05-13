'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("UPDATE status SET descricao='To do' WHERE id='2'");
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("UPDATE status SET descricao='Fila de desenvolvimento' WHERE id='2'");
  }
};
