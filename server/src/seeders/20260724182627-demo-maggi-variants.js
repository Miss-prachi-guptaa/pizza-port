'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_item_variants', [
      // Plain Maggi (menu_item_id = 12)
      {
        menu_item_id: 12,
        label: 'Half',
        price: 69,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        menu_item_id: 12,
        label: 'Full',
        price: 119,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Veg Maggi (menu_item_id = 13)
      {
        menu_item_id: 13,
        label: 'Half',
        price: 89,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        menu_item_id: 13,
        label: 'Full',
        price: 139,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Cheese Maggi (menu_item_id = 14)
      {
        menu_item_id: 14,
        label: 'Half',
        price: 109,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        menu_item_id: 14,
        label: 'Full',
        price: 169,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menu_item_variants', {
      menu_item_id: {
        [Sequelize.Op.in]: [12, 13, 14],
      },
    });
  },
};