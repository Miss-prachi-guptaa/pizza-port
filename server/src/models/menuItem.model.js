// src/models/menuItem.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const MenuItem = sequelize.define('MenuItem', {
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
  },
  cuisineId: {
    type: DataTypes.INTEGER,
    allowNull: true, // har item ka cuisine tag hona zaroori nahi (e.g. "Water Bottle")
    references: { model: 'cuisines', key: 'id' },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foodType: {
    type: DataTypes.ENUM('veg', 'non_veg', 'egg'),
    allowNull: false,
    defaultValue: 'veg',
  },
  halfPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  fullPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ratingAverage: {
    type: DataTypes.DECIMAL(2, 1), // 0.0 to 5.0
    allowNull: false,
    defaultValue: 0,
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'menu_items',
  timestamps: true,
  paranoid: true, // soft delete — adds deleted_at, destroy() just sets this instead of removing the row
  indexes: [
    { fields: ['restaurant_id', 'is_available'] }, // menu-load query ke liye
    { fields: ['category_id'] },
  ],
  validate: {
    atLeastOnePrice() {
      if (this.halfPrice == null && this.fullPrice == null) {
        throw new Error('At least one of halfPrice or fullPrice must be set');
      }
    },
  },
});

MenuItem.associate = (models) => {
  MenuItem.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
  MenuItem.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  MenuItem.belongsTo(models.Cuisine, { foreignKey: 'cuisineId', as: 'cuisine' });
  MenuItem.hasMany(models.CartItem, { foreignKey: 'menuItemId', as: 'cartItems' });
  MenuItem.hasMany(models.OrderItem, { foreignKey: 'menuItemId', as: 'orderItems' });
};

export default MenuItem;