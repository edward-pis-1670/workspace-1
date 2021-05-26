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
    },
    biography: {
      type: Sequelize.STRING,
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
      allowNull: false,
    },
  });
  return user;
};
