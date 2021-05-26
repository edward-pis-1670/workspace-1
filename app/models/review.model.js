module.exports = (sequelize, Sequelize) => {
  const review = sequelize.define(
    "reviews",
    {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      star: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      timestamp: true,
    }
  );
  return review;
};
