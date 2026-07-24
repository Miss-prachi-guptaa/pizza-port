'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
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
        onDelete: 'RESTRICT',
      },

      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      status: {
        type: Sequelize.ENUM(
          'placed',
          'preparing',
          'out_for_delivery',
          'delivered',
          'rejected',
          'cancelled'
        ),
        allowNull: false,
        defaultValue: 'placed',
      },

      paymentMethod: {
        type: Sequelize.ENUM(
          'upi_card',
          'cash_on_delivery'
        ),
        allowNull: false,
      },

      paymentStatus: {
        type: Sequelize.ENUM(
          'pending',
          'paid',
          'failed',
          'refunded'
        ),
        allowNull: false,
        defaultValue: 'pending',
      },

      totalAmount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },

      deliveryCharge: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
      },

      deliveryAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      acceptedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      closedAt: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex(
      'orders',
      ['restaurantId', 'status']
    );

    await queryInterface.addIndex(
      'orders',
      ['userId']
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  },
};