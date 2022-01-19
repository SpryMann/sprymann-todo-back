module.exports = (Sequelize, sequelize) => {
  const Role = sequelize.define("roles", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
  });

  return Role;
};
