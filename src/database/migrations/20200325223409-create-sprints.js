'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sprints', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      equipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'equipes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dt_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      dt_fim: {
        type: Sequelize.DATEONLY,
        allowNull: false
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
    return queryInterface.dropTable('sprints');
  }

}