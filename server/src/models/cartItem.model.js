// src/models/cartItem.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CartItem = sequelize.define('CartItem', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'carts', key: 'id' },
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'menu_items', key: 'id' },
  },
  portion: {
    type: DataTypes.ENUM('half', 'full'),
    allowNull: false,
    defaultValue: 'full',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },
}, {
  tableName: 'cart_items',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['cart_id', 'menu_item_id', 'portion'], // same item+portion dobara add ho to row duplicate na ho
    },
  ],
});

CartItem.associate = (models) => {
  CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
  CartItem.belongsTo(models.MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });
};

export default CartItem;