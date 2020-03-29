'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'atividades',
      'tipo_id',
      {
        type: Sequelize.INTEGER,
      }
    );

    return queryInterface.addConstraint(
      'atividades',
      ['tipo_id'],
      {
        type: 'foreign key',
        name: 'atividades_ibfk_4',
        references: { table: 'tipos_atividade', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'atividades',
      'tipo_id',
    );
  }
};
