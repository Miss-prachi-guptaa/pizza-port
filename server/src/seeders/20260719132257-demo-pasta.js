'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurantId: 1,
        categoryId: 2,
        cuisineId: 1,
        name: 'Red Sauce Pasta',
        description: 'Classic red sauce pasta',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 80,
        isAvailable: true,
        displayOrder: 1,
        ratingAverage: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        restaurantId: 1,
        categoryId: 2,
        cuisineId: 1,
        name: 'White Sauce Pasta',
        description: 'Creamy white sauce pasta',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 99,
        isAvailable: true,
        displayOrder: 2,
        ratingAverage: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        restaurantId: 1,
        categoryId: 2,
        cuisineId: 1,
        name: 'Pink Sauce Pasta',
        description: 'Combination of red & white sauce',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 119,
        isAvailable: true,
        displayOrder: 3,
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
      categoryId: 2,
      restaurantId: 1
    }, {});
  }
};