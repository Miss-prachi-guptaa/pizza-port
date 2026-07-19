'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {

    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Pizza Garage Owner',
        email: 'owner@pizzagarage.com',
        password: password,
        avatar: null,
        googleId: null,
        provider: 'email',
        role: 'owner',
        phone: '7267807008',
        address: 'Main Road, Front of Cinema Hall, Ghosi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 2,
        name: 'Demo Customer',
        email: 'customer@test.com',
        password: password,
        avatar: null,
        googleId: null,
        provider: 'email',
        role: 'customer',
        phone: '9876543210',
        address: 'Ghosi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 3,
        name: 'Admin',
        email: 'admin@test.com',
        password: password,
        avatar: null,
        googleId: null,
        provider: 'email',
        role: 'admin',
        phone: '9999999999',
        address: 'Head Office',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};