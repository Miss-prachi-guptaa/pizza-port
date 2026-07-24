// src/models/category.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
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
  tableName: 'categories',
  timestamps: true,
});

Category.associate = (models) => {
  Category.hasMany(models.MenuItem, { foreignKey: 'category_id', as: 'menuItems' });
};

export default Category;