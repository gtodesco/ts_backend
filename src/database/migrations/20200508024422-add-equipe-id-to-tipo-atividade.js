'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'tipos_atividade',
      'equipe_id',
      {
        type: Sequelize.INTEGER,
      }
    );

    return queryInterface.addConstraint(
      'tipos_atividade',
      ['equipe_id'],
      {
        type: 'foreign key',
        name: 'equipe_ibfk_4',
        references: { table: 'equipes', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'tipos_atividade',
      'equipe_id',
    );
  }
};
