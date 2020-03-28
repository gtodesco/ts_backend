'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('impedimentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pessoa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pessoas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sprint_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'sprints', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      horas: {
        type: Sequelize.TIME,
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
    return queryInterface.dropTable('impedimentos');
  }
};
