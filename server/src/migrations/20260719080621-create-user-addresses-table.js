'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      label: {
        type: Sequelize.ENUM('home', 'work', 'other'),
        allowNull: false,
        defaultValue: 'home',
      },

      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      addressLine1: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      addressLine2: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      pincode: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      landmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.addIndex('user_addresses', ['userId']);

    await queryInterface.addIndex('user_addresses', [
      'userId',
      'isDefault',
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_addresses');
  },
};
