'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'atividades',
      'status_id',
      {
        type: Sequelize.INTEGER
      }
    );

    return queryInterface.addConstraint(
      'atividades',
      ['status_id'],
      {
        type: 'foreign key',
        name: 'atividades_ibfk_3',
        references: { table: 'status', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'atividades',
      'status_id',
    );
  }
};
