module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("users", {
    _id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING,
      defaultValue: "defaultValue",
    },
    biography: {
      type: Sequelize.STRING(5000),
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    facebookid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    googleid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    twitter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    youtube: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    linkedin: {
      type: Sequelize.STRING,
    },
    creditbalance: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    verifyToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    paypalid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return user;
};
