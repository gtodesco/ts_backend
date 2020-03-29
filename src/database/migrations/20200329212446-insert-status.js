'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
      {
        descricao: 'Backlog',
        created_at: new Date(),
        updated_at: new Date()
      }, 
      {
        descricao: 'Fila de desenvolvimento',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'Em desenvolvimento',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'Impedimento',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'Fila de testes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'Em testes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'Concluídos',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
