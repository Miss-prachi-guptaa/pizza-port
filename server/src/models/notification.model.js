// src/models/notification.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notification = sequelize.define('Notification', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // kuch notifications order se unrelated bhi ho sakti hain (future: promo, etc.)
    references: { model: 'orders', key: 'id' },
  },
  recipient_id: {
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
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'notifications',
  timestamps: true,
  indexes: [{ fields: ['recipient_id', 'is_read'] }], // "unread notifications" query ke liye
});

Notification.associate = (models) => {
  Notification.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  Notification.belongsTo(models.User, { foreignKey: 'recipient_id', as: 'recipient' });
};

export default Notification;