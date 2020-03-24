'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dt_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      sn_scrummaster: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      sn_empresa: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: { 
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('pessoas');
  }
};
