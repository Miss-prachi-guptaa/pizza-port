import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const MenuItemAddon = sequelize.define(
  'MenuItemAddon',
  {
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menu_items',
        key: 'id',
      },
    },

    addon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'addons',
        key: 'id',
      },
    },
  },
  {
    tableName: 'menu_item_addons',
    timestamps: true,
    underscored: true,
  }
);

MenuItemAddon.associate = (models) => {
  MenuItemAddon.belongsTo(models.MenuItem, {
    foreignKey: 'menu_item_id',
    as: 'menuItem',
  });

  MenuItemAddon.belongsTo(models.Addon, {
    foreignKey: 'addon_id',
    as: 'addon',
  });
};

export default MenuItemAddon;