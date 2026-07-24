// src/models/userAddress.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserAddress = sequelize.define('UserAddress', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },

  label: {
    type: DataTypes.ENUM('home', 'work', 'other'),
    allowNull: false,
    defaultValue: 'home',
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address_line_1: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address_line_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  landmark: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'user_addresses',
  timestamps: true,
});

UserAddress.associate = (models) => {
  UserAddress.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
  });
};

export default UserAddress;