// src/models/restaurant.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
 owner_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id',
  },
  onUpdate: 'CASCADE',
  onDelete: "RESTRICT",
},
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  logo: { type: DataTypes.STRING, allowNull: true },
  is_open: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  avg_preparation_time: { type: DataTypes.INTEGER, allowNull: true, comment: 'in minutes' },
  min_order_for_free_delivery: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  delivery_charge: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
}, {
  tableName: 'restaurants',
  timestamps: true,
});

Restaurant.associate = (models) => {
  Restaurant.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
  Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurant_id', as: 'menuItems' });
  Restaurant.hasMany(models.Order, { foreignKey: 'restaurant_id', as: 'orders' });
};

export default Restaurant;