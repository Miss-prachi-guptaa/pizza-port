'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('restaurants', [
      {
        id: 1,
        owner_id: 1,
        name: 'Pizza Garage',
        address: 'Main Road, Front of Cinema Hall, Ghosi',
        phone: '7267807008',
        logo: null,
        is_open: true,
        avg_preparation_time: 25,
        min_order_for_free_delivery: 299.00,
        delivery_charge: 0.00,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('restaurants', null, {});

  }
};