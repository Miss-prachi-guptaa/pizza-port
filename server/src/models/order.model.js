// src/models/order.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurants', key: 'id' },
  },
  status: {
    type: DataTypes.ENUM('placed', 'preparing', 'out_for_delivery', 'delivered', 'rejected', 'cancelled'),
    allowNull: false,
    defaultValue: 'placed',
  },
  paymentMethod: {
    type: DataTypes.ENUM('upi_card', 'cash_on_delivery'),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    allowNull: false,
    defaultValue: 'pending',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  deliveryCharge: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  deliveryAddress: {
    type: DataTypes.TEXT,
    allowNull: false, // order snapshot — even if user later edits their saved address, this stays frozen
  },
  acceptedAt: {
    type: DataTypes.DATE,
    allowNull: true, // set only when owner accepts — used for "response time" SLA metric later
  },
  closedAt: {
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
  Order.belongsTo(models.User, { foreignKey: 'userId', as: 'customer' });
  Order.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
  Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
  Order.hasOne(models.Payment, { foreignKey: 'orderId', as: 'payment' });
  Order.hasMany(models.Notification, { foreignKey: 'orderId', as: 'notifications' });
  Order.hasMany(models.OrderStatusLog, { foreignKey: 'orderId', as: 'statusHistory' });
};

export default Order;