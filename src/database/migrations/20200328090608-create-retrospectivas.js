'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('retrospectivas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sprint_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sprints', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stop: {
        type: Sequelize.STRING,
        allowNull: true
      },
      continuar: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('retrospectivas');
  }
};
