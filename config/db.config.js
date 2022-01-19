module.exports = {
  HOST: "us-cdbr-east-05.cleardb.net",
  USER: "bf84f0a143b672",
  PASSWORD: "20c5b289",
  DB: "heroku_87705128ed9f88a",
  dialect: "mysql",
  pool: {
    min: 1,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
};
