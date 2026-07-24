'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurantId: 1,
        categoryId: 9,
        cuisineId: 4,
        name: 'Hot Coffee',
        description: 'Fresh hot coffee',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 49,
        isAvailable: true,
        displayOrder: 15,
        ratingAverage: 0,
        ratingCount: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        restaurantId: 1,
        categoryId: 9,
        cuisineId: 4,
        name: 'Cold Coffee',
        description: 'Chilled coffee with ice cream',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 89,
        isAvailable: true,
        displayOrder: 16,
        ratingAverage: 0,
        ratingCount: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menu_items', {
      restaurantId: 1,
      categoryId: 9
    }, {});
  }
};