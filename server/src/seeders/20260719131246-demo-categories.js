'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Pizza',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Pasta',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Pav Bhaji',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Maggi',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Noodles',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Twister',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Chilli',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Manchurian',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Coffee',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Milk Shake',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 11,
        name: 'Mocktail',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        name: 'Dessert',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('categories', null, {});

  }
};