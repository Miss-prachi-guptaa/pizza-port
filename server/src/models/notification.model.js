// src/models/notification.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notification = sequelize.define('Notification', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true, // kuch notifications order se unrelated bhi ho sakti hain (future: promo, etc.)
    references: { model: 'orders', key: 'id' },
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  channel: {
    type: DataTypes.ENUM('push', 'sms', 'whatsapp', 'in_app'),
    allowNull: false,
    defaultValue: 'in_app',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'sent', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'notifications',
  timestamps: true,
  indexes: [{ fields: ['recipient_id', 'is_read'] }], // "unread notifications" query ke liye
});

Notification.associate = (models) => {
  Notification.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  Notification.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
};

export default Notification;