'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("DELETE FROM status WHERE id='5'");
  },
  down: (queryInterface, Sequelize) => {
    return;
  }
};
