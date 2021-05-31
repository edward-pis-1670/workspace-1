module.exports = (sequelize, Sequelize) => {
    const notification = sequelize.define(
      "notifications",
      {
        _id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        preview: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        timestamps: true,
      }
    );
    return notification;
  };
  