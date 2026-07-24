'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('cuisines', [
      {
        id: 1,
        name: 'Italian',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Chinese',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Indian',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Beverages',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Desserts',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('cuisines', null, {});

  }
};