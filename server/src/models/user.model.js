import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js'; // .js extension zaroori hai ES Modules mein

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: true },
  avatar: { type: DataTypes.STRING, allowNull: true },
google_id: { type: DataTypes.STRING, allowNull: true, unique: true, field: 'google_id' },
  provider: { type: DataTypes.ENUM('email', 'google'), allowNull: false, defaultValue: 'email' },
  role: { type: DataTypes.ENUM('customer', 'owner', 'admin'), allowNull: false, defaultValue: 'customer' },
  phone: { type: DataTypes.STRING, allowNull: true },
 
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password') && user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

User.prototype.comparePassword = async function (plainPassword) {
  if (!this.password) return false;
  return bcrypt.compare(plainPassword, this.password);
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

User.associate = (models) => {
  User.hasOne(models.Restaurant, { foreignKey: 'owner_id', as: 'restaurant' });
  User.hasOne(models.Cart, { foreignKey: 'user_id', as: 'cart' });
  User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
  User.hasMany(models.UserAddress, {
  foreignKey: 'user_id',
  as: 'addresses',
});
  User.hasMany(models.Notification, { foreignKey: 'recipient_id', as: 'notifications' });
};

export default User;