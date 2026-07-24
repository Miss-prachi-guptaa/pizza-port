'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('menu_item_variants', [
      // Red Sauce Pasta (id = 9)
      {
        menu_item_id: 9,
        label: 'Regular',
        price: 149,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        menu_item_id: 9,
        label: 'Large',
        price: 249,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // White Sauce Pasta (id = 10)
      {
        menu_item_id: 10,
        label: 'Regular',
        price: 169,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        menu_item_id: 10,
        label: 'Large',
        price: 269,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Pink Sauce Pasta (id = 11)
      {
        menu_item_id: 11,
        label: 'Regular',
        price: 179,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        menu_item_id: 11,
        label: 'Large',
        price: 279,
        display_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('menu_item_variants', {
      menu_item_id: [9, 10, 11],
    });
  },
};