'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('restaurants', [
      {
        id: 1,
        ownerId: 1,
        name: 'Pizza Garage',
        address: 'Main Road, Front of Cinema Hall, Ghosi',
        phone: '7267807008',
        logo: null,
        isOpen: true,
        avgPreparationTime: 25,
        minOrderForFreeDelivery: 299.00,
        deliveryCharge: 0.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('restaurants', null, {});

  }
};