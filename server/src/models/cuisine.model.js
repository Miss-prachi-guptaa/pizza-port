// src/models/cuisine.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cuisine = sequelize.define('Cuisine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'cuisines',
  timestamps: true,
});

Cuisine.associate = (models) => {
  Cuisine.hasMany(models.MenuItem, { foreignKey: 'cuisineId', as: 'menuItems' });
};

export default Cuisine;