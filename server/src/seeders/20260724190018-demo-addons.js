'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('addons', [
      {
        name: 'Extra Cheese',
        price: 30,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Extra Sauce',
        price: 20,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Extra Paneer',
        price: 50,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Extra Veggies',
        price: 40,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jalapenos',
        price: 35,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Black Olives',
        price: 35,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mushrooms',
        price: 40,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Sweet Corn',
        price: 25,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('addons', null, {});
  },
};