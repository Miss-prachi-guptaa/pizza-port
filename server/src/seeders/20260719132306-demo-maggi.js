'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurantId: 1,
        categoryId: 4,
        cuisineId: 3,
        name: 'Plain Maggi',
        description: 'Classic Maggi',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 49,
        isAvailable: true,
        displayOrder: 12,
        ratingAverage: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        restaurantId: 1,
        categoryId: 4,
        cuisineId: 3,
        name: 'Veg Maggi',
        description: 'Loaded with fresh vegetables',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 69,
        isAvailable: true,
        displayOrder: 13,
        ratingAverage: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        restaurantId: 1,
        categoryId: 4,
        cuisineId: 3,
        name: 'Cheese Maggi',
        description: 'Cheesy Maggi',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 89,
        isAvailable: true,
        displayOrder: 14,
        ratingAverage: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menu_items', {
      restaurantId: 1,
      categoryId: 4
    }, {});
  }
};