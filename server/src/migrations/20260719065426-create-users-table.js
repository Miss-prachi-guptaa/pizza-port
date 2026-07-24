'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      provider: {
        type: Sequelize.ENUM('email', 'google'),
        allowNull: false,
        defaultValue: 'email',
      },

      role: {
        type: Sequelize.ENUM('customer', 'owner', 'admin'),
        allowNull: false,
        defaultValue: 'customer',
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};