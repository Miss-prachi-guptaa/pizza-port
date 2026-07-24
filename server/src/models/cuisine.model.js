// src/models/cuisine.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cuisine = sequelize.define('Cuisine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'cuisines',
  timestamps: true,
});

Cuisine.associate = (models) => {
  Cuisine.hasMany(models.MenuItem, { foreignKey: 'cuisine_id', as: 'menuItems' });
};

export default Cuisine;