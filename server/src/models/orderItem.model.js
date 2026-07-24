// src/models/orderItem.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const OrderItem = sequelize.define('OrderItem', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'orders', key: 'id' },
  },
  menu_item_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // agar original MenuItem kabhi delete ho jaye, history phir bhi surakshit rahe
    references: { model: 'menu_items', key: 'id' },
  },
  item_name_snapshot: {
    type: DataTypes.STRING,
    allowNull: false, // MenuItem.name badal jaye to bhi ye order ka purana naam hi dikhayega
  },
  portion: {
    type: DataTypes.ENUM('half', 'full'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // order ke waqt ki price — future price-change se ye kabhi nahi badlega
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },
}, {
  tableName: 'order_items',
  timestamps: true,
  indexes: [{ fields: ['order_id'] }],
  hooks: {
    beforeUpdate: () => {
      throw new Error('OrderItem records are immutable — create a new order instead of editing history');
    },
  },
});

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  OrderItem.belongsTo(models.MenuItem, { foreignKey: 'menu_item_id', as: 'menuItem' });
};

export default OrderItem;