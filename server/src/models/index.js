import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../config/db.js';

const __filename = fileURLToPath(import.meta.url); // ES Modules mein __dirname manually banana padta hai
const __dirname = path.dirname(__filename);

const models = {};

const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js' && file.endsWith('.model.js'));

// import() async hai — isliye Promise.all use karke sab files parallel load karenge
const loadedModules = await Promise.all(
  modelFiles.map((file) => import(`./${file}`))
);

loadedModules.forEach((module) => {
  const model = module.default; // ES module default export
  models[model.name] = model;
});

Object.keys(models).forEach((modelName) => {
  if (typeof models[modelName].associate === 'function') {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

export default models;