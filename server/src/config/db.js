import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    timezone: '+05:30', // IST — warna Sequelize UTC assume karega aur timestamps 5.5hr off dikhenge
    define: {
      underscored: true,   // camelCase (JS) -> snake_case (MySQL columns)
    },
    pool: {
      max: 10,       // ek saath max 10 DB connections
      min: 0,
      acquire: 30000, // 30s tak try karega connection lene ki, phir error
      idle: 10000,    // 10s idle rehne ke baad connection release
    },
    logging: false,
  }
);

export default sequelize;