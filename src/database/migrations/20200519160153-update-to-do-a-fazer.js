'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("UPDATE status SET descricao='A fazer' WHERE id='2'");
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("UPDATE status SET descricao='To do' WHERE id='2'");
  }
};
