module.exports = (sequelize, Sequelize) => {
  const lecture = sequelize.define(
    "lectures",
    {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      video: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preview: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return lecture;
};
