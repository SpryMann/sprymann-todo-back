module.exports = (Sequelize, sequelize) => {
  const Collection = sequelize.define("collections", {
    title: {
      type: Sequelize.STRING,
      require: true,
      allowNull: false,
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Collection;
};
