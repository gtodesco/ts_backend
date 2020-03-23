'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('equipes', {
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
      dt_ativacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      dt_desativacao: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      sn_ativa: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('equipes');
  }
};
