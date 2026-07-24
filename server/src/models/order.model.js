// src/models/order.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' },
  },
  status: {
    type: DataTypes.ENUM('placed', 'preparing', 'out_for_delivery', 'delivered', 'rejected', 'cancelled'),
    allowNull: false,
    defaultValue: 'placed',
  },
  payment_method: {
    type: DataTypes.ENUM('upi_card', 'cash_on_delivery'),
    allowNull: false,
  },
   payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    allowNull: false,
    defaultValue: 'pending',
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  delivery_charge: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: false, // order snapshot — even if user later edits their saved address, this stays frozen
  },
  accepted_at: {
    type: DataTypes.DATE,
    allowNull: true, // set only when owner accepts — used for "response time" SLA metric later
  },
  closed_at: {
    type: DataTypes.DATE,
    allowNull: true, // set when order reaches delivered / rejected / cancelled — marks it "no longer active"
  },
}, {
  tableName: 'orders',
  timestamps: true, // created_at IS placed_at — no need for a separate redundant column
  indexes: [
    { fields: ['restaurant_id', 'status'] }, // owner's "incoming orders" query
    { fields: ['user_id'] },                  // customer's order history query
  ],
});

Order.associate = (models) => {
  Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'customer' });
  Order.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
  Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
  Order.hasOne(models.Payment, { foreignKey: 'order_id', as: 'payment' });
  Order.hasMany(models.Notification, { foreignKey: 'order_id', as: 'notifications' });
  Order.hasMany(models.OrderStatusLog, { foreignKey: 'order_id', as: 'statusHistory' });
};

export default Order;