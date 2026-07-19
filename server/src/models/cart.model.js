// src/models/cart.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // ek user ka sirf ek hi cart
    references: { model: 'users', key: 'id' },
  },
}, {
  tableName: 'carts',
  timestamps: true,
});

Cart.associate = (models) => {
  Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'items', onDelete: 'CASCADE' });
};

export default Cart;