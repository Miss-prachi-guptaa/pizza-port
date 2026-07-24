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

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      restaurant_id: {
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

 payment_method: {
        type: Sequelize.ENUM(
          'upi_card',
          'cash_on_delivery'
        ),
        allowNull: false,
      },

       payment_status: {
        type: Sequelize.ENUM(
          'pending',
          'paid',
          'failed',
          'refunded'
        ),
        allowNull: false,
        defaultValue: 'pending',
      },

      total_amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },

      delivery_charge: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
      },

      delivery_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      accepted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      closed_at: {
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
      ['restaurant_id', 'status']
    );

    await queryInterface.addIndex(
      'orders',
      ['user_id']
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  },
};