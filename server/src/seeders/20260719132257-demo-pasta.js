'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurant_id: 1,
        category_id: 2,
        cuisine_id: 1,
        name: 'Red Sauce Pasta',
        description: 'Classic red sauce pasta',
        image: null,
        base_price: null,
        is_available: true,
        display_order: 1,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurant_id: 1,
        category_id: 2,
        cuisine_id: 1,
        name: 'White Sauce Pasta',
        description: 'Creamy white sauce pasta',
        image: null,
        food_type: 'veg',
        base_price: null,
        is_available: true,
        display_order: 2,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurant_id: 1,
        category_id: 2,
        cuisine_id: 1,
        name: 'Pink Sauce Pasta',
        description: 'Combination of red & white sauce',
        image: null,
        food_type: 'veg',
       base_price: null,
        is_available: true,
        display_order: 3,
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
      category_id: 2,
      restaurant_id: 1
    }, {});
  }
};