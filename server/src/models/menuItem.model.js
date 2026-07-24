// src/models/menuItem.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const MenuItem = sequelize.define(
  'MenuItem',
  {
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'id',
      },
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },

    cuisine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cuisines',
        key: 'id',
      },
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

    food_type: {
      type: DataTypes.ENUM('veg', 'non_veg', 'egg'),
      allowNull: false,
      defaultValue: 'veg',
    },

    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    rating_average: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 0,
    },

    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'menu_items',
    timestamps: true,
    paranoid: true,
    underscored: true,

    indexes: [
      {
        fields: ['restaurant_id', 'is_available'],
      },
      {
        fields: ['category_id'],
      },
    ],
  }
);

MenuItem.associate = (models) => {
  MenuItem.belongsTo(models.Restaurant, {
    foreignKey: 'restaurant_id',
    as: 'restaurant',
  });

  MenuItem.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'category',
  });

  MenuItem.belongsTo(models.Cuisine, {
    foreignKey: 'cuisine_id',
    as: 'cuisine',
  });

  MenuItem.hasMany(models.MenuItemVariant, {
    foreignKey: 'menu_item_id',
    as: 'variants',
  });

  MenuItem.belongsToMany(models.Addon, {
    through: models.MenuItemAddon,
    foreignKey: 'menu_item_id',
    otherKey: 'addon_id',
    as: 'addons',
  });

  MenuItem.hasMany(models.CartItem, {
    foreignKey: 'menu_item_id',
    as: 'cartItems',
  });

  MenuItem.hasMany(models.OrderItem, {
    foreignKey: 'menu_item_id',
    as: 'orderItems',
  });
};

export default MenuItem;