'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurant_id: 1,
        category_id: 4,
        cuisine_id: 3,
        name: 'Plain Maggi',
        description: 'Classic Maggi',
        image: null,
        food_type: 'veg',
      base_price: null,
        is_available: true,
        display_order: 12,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurant_id: 1,
        category_id: 4,
        cuisine_id: 3,
        name: 'Veg Maggi',
        description: 'Loaded with fresh vegetables',
        image: null,
        food_type: 'veg',
       base_price: null,
        is_available: true,
        display_order: 13,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurant_id: 1,
        category_id: 4,
        cuisine_id: 3,
        name: 'Cheese Maggi',
        description: 'Cheesy Maggi',
        image: null,
        food_type: 'veg',
       base_price: null,
        is_available: true,
        display_order: 14,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menu_items', {
      restaurant_id: 1,
      category_id: 4
    }, {});
  }
};