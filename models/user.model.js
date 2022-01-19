module.exports = (Sequelize, sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
  });

  return User;
};
