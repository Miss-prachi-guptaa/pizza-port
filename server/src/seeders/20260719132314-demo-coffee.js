'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurant_id: 1,
        category_id: 9,
        cuisine_id: 4,
        name: 'Hot Coffee',
        description: 'Fresh hot coffee',
        image: null,
        food_type: 'veg',
       base_price: 48,
        is_available: true,
        display_order: 15,
        rating_average: 0,
        rating_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurant_id: 1,
        category_id: 9,
        cuisine_id: 4,
        name: 'Cold Coffee',
        description: 'Chilled coffee with ice cream',
        image: null,
        food_type: 'veg',
        base_price: 78,
        is_available: true,
        display_order: 16,
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
      category_id: 9
    }, {});
  }
};