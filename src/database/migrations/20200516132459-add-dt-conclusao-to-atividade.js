'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'atividades',
      'dt_conclusao',
      {
        type: Sequelize.DATEONLY,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'atividades',
      'dt_conclusao',
    );
  }
};
