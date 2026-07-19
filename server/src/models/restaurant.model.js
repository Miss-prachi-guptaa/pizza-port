// src/models/restaurant.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
 ownerId: {
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
  isOpen: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  avgPreparationTime: { type: DataTypes.INTEGER, allowNull: true, comment: 'in minutes' },
  minOrderForFreeDelivery: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  deliveryCharge: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
}, {
  tableName: 'restaurants',
  timestamps: true,
});

Restaurant.associate = (models) => {
  Restaurant.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
  Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurantId', as: 'menuItems' });
  Restaurant.hasMany(models.Order, { foreignKey: 'restaurantId', as: 'orders' });
};

export default Restaurant;