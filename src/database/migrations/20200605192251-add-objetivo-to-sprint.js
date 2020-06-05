'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'sprints',
      'objetivo',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'sprints',
      'objetivo',
    );
  }
};
