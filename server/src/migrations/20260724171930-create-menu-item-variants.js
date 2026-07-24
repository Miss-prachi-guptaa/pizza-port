'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_item_variants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      menu_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'menu_items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      label: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addIndex('menu_item_variants', ['menu_item_id']);

    // Same label ek hi item me duplicate na ho
    await queryInterface.addConstraint('menu_item_variants', {
      fields: ['menu_item_id', 'label'],
      type: 'unique',
      name: 'unique_menu_item_variant_label',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('menu_item_variants');
  },
};