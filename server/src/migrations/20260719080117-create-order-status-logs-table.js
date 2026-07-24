'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_status_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      },

      changedByRole: {
        type: Sequelize.ENUM(
          'customer',
          'owner',
          'system'
        ),
        allowNull: false,
      },

      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('order_status_logs');
  },
};