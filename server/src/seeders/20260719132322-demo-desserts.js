'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menu_items', [
      {
        restaurantId: 1,
        categoryId: 12,
        cuisineId: 5,
        name: 'Chocolate Brownie',
        description: 'Soft chocolate brownie',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 99,
        isAvailable: true,
        displayOrder: 17,
        ratingAverage: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        restaurantId: 1,
        categoryId: 12,
        cuisineId: 5,
        name: 'Vanilla Ice Cream',
        description: 'Classic vanilla ice cream',
        image: null,
        foodType: 'veg',
        halfPrice: null,
        fullPrice: 69,
        isAvailable: true,
        displayOrder: 18,
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
      categoryId: 12
    }, {});
  }
};