const config = require("./../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    min: config.pool.min,
    max: config.pool.max,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.collections = require("./collection.model")(Sequelize, sequelize);
db.tasks = require("./task.model")(Sequelize, sequelize);
db.user = require("./user.model")(Sequelize, sequelize);
db.role = require("./role.models")(Sequelize, sequelize);

db.tasks.belongsTo(db.collections);
db.collections.hasMany(db.tasks);
db.collections.belongsTo(db.user);
db.user.hasMany(db.collections);
db.user.belongsTo(db.role);
db.role.hasMany(db.user);

module.exports = db;
