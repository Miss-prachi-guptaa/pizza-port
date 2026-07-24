// src/models/payment.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Payment = sequelize.define('Payment', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // 1 order : 1 payment record
    references: { model: 'orders', key: 'id' },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM('upi_card', 'cash_on_delivery'),
    allowNull: false, // Order.paymentMethod se hamesha match hona chahiye
  },
  gateway_txn_id: {
    type: DataTypes.STRING,
    allowNull: true, // COD ke liye null; online payment ke liye gateway ID
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
    allowNull: false,
    defaultValue: 'pending',
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'payments',
  timestamps: true,
});

Payment.associate = (models) => {
  Payment.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
};

export default Payment;