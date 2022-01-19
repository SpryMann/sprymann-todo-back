module.exports = (Sequelize, sequelize) => {
  const Task = sequelize.define("tasks", {
    title: {
      type: Sequelize.STRING,
      require: true,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Task;
};
