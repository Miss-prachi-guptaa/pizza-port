import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const MenuItemVariant = sequelize.define(
  'MenuItemVariant',
  {
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'menu_item_variants',
    timestamps: true,
    underscored: true,
  }
);

MenuItemVariant.associate = (models) => {
  MenuItemVariant.belongsTo(models.MenuItem, {
    foreignKey: 'menu_item_id',
    as: 'menuItem',
  });
};

export default MenuItemVariant;