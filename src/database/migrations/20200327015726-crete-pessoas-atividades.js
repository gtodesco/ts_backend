'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas_atividades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      atividade_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'atividades', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pessoa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pessoas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('pessoas_atividades');
  }
};
