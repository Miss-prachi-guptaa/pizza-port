'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('menu_item_addons', [
      // ==========================
      // Margherita Pizza (1)
      // ==========================
      { menu_item_id: 1, addon_id: 1, created_at: new Date(), updated_at: new Date() }, // Extra Cheese
      { menu_item_id: 1, addon_id: 2, created_at: new Date(), updated_at: new Date() }, // Extra Sauce
      { menu_item_id: 1, addon_id: 5, created_at: new Date(), updated_at: new Date() }, // Jalapenos

      // Farm Fresh Pizza (2)
      { menu_item_id: 2, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 2, addon_id: 4, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 2, addon_id: 8, created_at: new Date(), updated_at: new Date() },

      // Veg Supreme Pizza (3)
      { menu_item_id: 3, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 3, addon_id: 4, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 3, addon_id: 6, created_at: new Date(), updated_at: new Date() },

      // Paneer Tikka Pizza (4)
      { menu_item_id: 4, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 4, addon_id: 3, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 4, addon_id: 2, created_at: new Date(), updated_at: new Date() },

      // Corn Cheese Pizza (5)
      { menu_item_id: 5, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 5, addon_id: 8, created_at: new Date(), updated_at: new Date() },

      // White Sauce Pasta (9)
      { menu_item_id: 9, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 9, addon_id: 7, created_at: new Date(), updated_at: new Date() },

      // Red Sauce Pasta (10)
      { menu_item_id: 10, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 10, addon_id: 2, created_at: new Date(), updated_at: new Date() },

      // Mix Sauce Pasta (11)
      { menu_item_id: 11, addon_id: 1, created_at: new Date(), updated_at: new Date() },
      { menu_item_id: 11, addon_id: 7, created_at: new Date(), updated_at: new Date() },

      // Cheese Maggi (12)
      { menu_item_id: 12, addon_id: 1, created_at: new Date(), updated_at: new Date() },

      // Veg Maggi (13)
      { menu_item_id: 13, addon_id: 4, created_at: new Date(), updated_at: new Date() },

      // Masala Maggi (14)
      { menu_item_id: 14, addon_id: 2, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('menu_item_addons', null, {});
  },
};