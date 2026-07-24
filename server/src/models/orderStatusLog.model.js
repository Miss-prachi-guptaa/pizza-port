// src/models/orderStatusLog.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const OrderStatusLog = sequelize.define('OrderStatusLog', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'orders', key: 'id' },
  },
  status: {
    type: DataTypes.ENUM('placed', 'preparing', 'out_for_delivery', 'delivered', 'rejected', 'cancelled'),
    allowNull: false,
  },
  changedByRole: {
    type: DataTypes.ENUM('customer', 'owner', 'system'),
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true, // e.g. rejection reason: "Out of stock"
  },
}, {
  tableName: 'order_status_logs',
  timestamps: true, // created_at = exact moment of this transition
  updated_at: false,  // logs are append-only, never edited
});

OrderStatusLog.associate = (models) => {
  OrderStatusLog.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
};

export default OrderStatusLog;