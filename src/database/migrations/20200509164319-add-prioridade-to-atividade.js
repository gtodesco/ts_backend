'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'atividades',
      'prioridade',
      {
        type: Sequelize.INTEGER,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'atividades',
      'prioridade',
    );
  }
};