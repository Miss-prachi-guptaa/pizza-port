// src/models/addon.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Addon = sequelize.define(
  'Addon',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'addons',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

Addon.associate = (models) => {
  Addon.belongsToMany(models.MenuItem, {
    through: models.MenuItemAddon,
    foreignKey: 'addon_id',
    otherKey: 'menu_item_id',
    as: 'menuItems',
  });
};

export default Addon;