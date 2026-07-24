'use strict';

module.exports = {
  async up(queryInterface) {
    const variants = [];

    const pizzaPrices = [
      { id: 1, small: 199, medium: 299, large: 399 }, // Margherita
      { id: 2, small: 249, medium: 349, large: 449 }, // OCT
      { id: 3, small: 279, medium: 379, large: 479 }, // Cheese & Mushroom
      { id: 4, small: 299, medium: 399, large: 499 }, // Veg Supreme
      { id: 5, small: 349, medium: 449, large: 549 }, // Cheese Burst
      { id: 6, small: 289, medium: 389, large: 489 }, // Makhani
      { id: 7, small: 299, medium: 399, large: 499 }, // Peri Peri
      { id: 8, small: 319, medium: 419, large: 519 }, // Tandoori
    ];

    pizzaPrices.forEach((pizza) => {
      variants.push(
        {
          menu_item_id: pizza.id,
          label: 'Small',
          price: pizza.small,
          display_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          menu_item_id: pizza.id,
          label: 'Medium',
          price: pizza.medium,
          display_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          menu_item_id: pizza.id,
          label: 'Large',
          price: pizza.large,
          display_order: 3,
          created_at: new Date(),
          updated_at: new Date(),
        }
      );
    });


    

    await queryInterface.bulkInsert('menu_item_variants', variants);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('menu_item_variants', {
      menu_item_id: [1, 2, 3, 4, 5, 6, 7, 8],
    });
  },
};