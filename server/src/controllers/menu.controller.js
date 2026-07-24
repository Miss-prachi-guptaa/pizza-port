// menu.controller.js
import models from '../models/index.js';

const { MenuItem, Category, MenuItemVariant, Addon } = models;

export const getMenuItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    const { category } = req.query;

    const whereCondition = { is_available: true };
    const includeCategory = { model: Category, as: 'category', attributes: ['id', 'name'] };

    if (category && category.toLowerCase() !== 'all') {
      includeCategory.where = { name: category };
    }

   const { rows, count } = await MenuItem.findAndCountAll({
  attributes: [
    'id', 'name', 'description', 'image', 'food_type',
    'base_price', 'is_available', 'rating_average', 'rating_count', 'display_order'
  ],
  where: whereCondition,
  include: [
    includeCategory,
    {
      model: MenuItemVariant,
      as: 'variants',
      attributes: ['id', 'label', 'price'],
    },
    {
      model: Addon,
      as: 'addons',
      attributes: ['id', 'name', 'price'],
      through: { attributes: [] },
    },
  ],
  order: [
    ['display_order', 'ASC'],
    [{ model: MenuItemVariant, as: 'variants' }, 'id', 'ASC'],
  ],
  limit,
  offset,
  distinct: true,
});

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('getMenuItems error:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};