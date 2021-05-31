module.exports = (sequelize, Sequelize) => {
  const subGenre = sequelize.define(
    "subgenres",
    {
      _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, //
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return subGenre;
};
