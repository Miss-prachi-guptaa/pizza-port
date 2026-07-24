'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Pizza',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Pasta',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Pav Bhaji',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Maggi',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Noodles',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Twister',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Chilli',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Manchurian',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Coffee',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Milk Shake',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 11,
        name: 'Mocktail',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        name: 'Dessert',
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('categories', null, {});

  }
};