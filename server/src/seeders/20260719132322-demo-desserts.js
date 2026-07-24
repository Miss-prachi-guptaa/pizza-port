'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurant_id: 1,
        category_id: 12,
        cuisine_id: 5,
        name: 'Chocolate Brownie',
        description: 'Soft chocolate brownie',
        image: null,
        food_type: 'veg',
       base_price: 99,
        is_available: true,
        display_order: 17,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurant_id: 1,
        category_id: 12,
        cuisine_id: 5,
        name: 'Vanilla Ice Cream',
        description: 'Classic vanilla ice cream',
        image: null,
        food_type: 'veg',
        base_price: 78,
        is_available: true,
        display_order: 18,
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
      category_id: 12
    }, {});
  }
};