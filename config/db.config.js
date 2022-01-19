module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "planner",
  dialect: "mysql",
  pool: {
    min: 1,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
};
